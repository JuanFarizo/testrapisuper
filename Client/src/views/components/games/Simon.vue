<template>
  <div class="gameContainer">

    <h1 class="gameTitle">{{ gameTitle }}</h1>

    <div v-if="finalResponse != ''">
      <div class="response" :class="`response-${finalResponse}`"
      @click="finalResponse = ''">
        <span v-if="finalResponse == 'win'">
          <font-awesome-icon :icon="['far', 'laugh-beam']"/>
          ¡Ganaste!
        </span>
        <span v-if="finalResponse == 'lose'">
          <font-awesome-icon :icon="['far', 'frown']"/>
          Fin del juego
        </span>
      </div>
    </div>

    <div v-if="finalResponse == ''">
      <div v-if="!gameHasStarted">

        <div class="itemCentered recordTitle">
          <h2>Record: {{ record }}</h2>
        </div>

        <vs-button @click="startGame()" size="large" class="itemCentered">
          Iniciar juego
          <font-awesome-icon icon="play" class="ml-3"/>
        </vs-button>

        <div class="attention">
          <p>El juego está en modo <i>extremo</i>. Cada ronda es completamente distinta a la anterior</p>
          <p>El modo normal no está desarrollado</p>
        </div>

        <!-- <div class="">
          <h5>Configuración</h5>

        </div> -->

      </div>

      <div v-if="gameHasStarted">
        <h5 class="roundTitle itemCentered">
          Ronda <b>{{ round }}</b>
        </h5>
        <div v-if="isTesting">
          <div class="itemCentered">
            {{ model }}
          </div>
          <div class="itemCentered mb-5">
            {{ response }}
          </div>
        </div>
        <div class="containerCentered">
          <vs-button color="success" size="large"
            @click="addResponse('A')" :disabled="isReading"
            :type="readingOption == 'A' ? 'border' : 'filled'"
          >
            A
          </vs-button>
          <vs-button color="warning" size="large" class="ml-3"
            @click="addResponse('B')" :disabled="isReading"
            :type="readingOption == 'B' ? 'border' : 'filled'"
          >
            B
          </vs-button>
          <vs-button color="danger" size="large" class="ml-3"
            @click="addResponse('C')" :disabled="isReading"
            :type="readingOption == 'C' ? 'border' : 'filled'"
          >
            C
          </vs-button>
        </div>
      </div> <!-- if gameHasStarted -->
    </div> <!-- if finalResponse == '' -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      // vars
      readingOption: '',
      isReading: true,
      response: [],
      model: [],
      round: 0,
      record: 0,
      finalResponse: '',

      // constants
      roundObjetive: 5,
      nextRoundTime: 1000,
      nextBtnTime: 500,
      isTesting: false,
      gameTitle: 'Simon',
      options: ['A', 'B', 'C'],
      audioDictionary: {
        A: 'piano_A_major.wav',
        B: 'piano_C_major.wav',
        C: 'piano_F_major.wav',
      }
    } // return DATA
  }, // DATA
  computed: {
    gameHasStarted() {
      return this.round != 0;
    },
  },
  created() {
    this.resetVars();
  }, // CREATED
  methods: {
    // addResponse
    // checkResponse
    // endGame
    // nextRound
    // reproduceOptionAudio
    // resetVars
    // showModel
    // startGame
    // windGame
    addResponse(option) {
      if (this.isReading) return;
      this.reproduceOptionAudio(option)
      this.response.push(option);
      this.checkResponse();
    },
    checkResponse() {
      let i = this.response.length-1;
      console.log(i);
      if (this.response[i] != this.model[i]) {
        this.isReading = true;
        this.endGame();
        return;
      }
      if (i == this.model.length-1) {
        this.isReading = true;
        this.nextRound();
        return;
      }
    },
    endGame() {
      setTimeout(() => {
        this.finalResponse = 'lose';
        this.reproduceAudio(this.getAudio('games/simon/game_over.mp3'))
        // this.myNotify('danger', 'Fin del juego', '¡Te equivocaste!');
        this.resetVars();
      }, 1000)
    },
    nextRound() {
      console.log('otra ronda');
      if (this.round == this.roundObjetive) {
        this.windGame();
        return;
      }
      this.round++;
      this.record = this.round;
      if (this.round != 1) {
        this.myNotify('success', 'Éxito', `Pasaste a la ronda ${this.round}`);
      }
      let vm = this;
      setTimeout(function(){
        // reset data
        vm.response = [];
        // generate model
        let newModel = [];
        for (var i = 0; i < vm.round; i++) {
          let random = Math.floor(Math.random() * vm.options.length);
          newModel.push(vm.options[random]);
        }
        vm.model = newModel;
        vm.showModel();
      }, this.nextRoundTime);
    },
    reproduceOptionAudio(option) {
      let file = this.audioDictionary[option];
      if (typeof file == 'undefined') return;
      let sound = this.getAudio(`games/simon/${file}`);
      this.reproduceAudio(sound);
    },
    resetVars() {
      this.round = 0;
      this.model = [];
      this.response = [];
      this.isReading = true;
    },
    showModel() {
      this.showingModelIndex = 0;
      this.showModelNext();
    },
    showModelNext(noTimeOut = false) {
      const vm = this;
      this.isReading = true;
      setTimeout(function(){
        if (vm.showingModelIndex == vm.model.length) {
          console.log(false);
          vm.isReading = false;
          return;
        }
        let i = vm.showingModelIndex;
        let option = vm.model[i];
        vm.readingOption = option;
        vm.reproduceOptionAudio(option);
        vm.showingModelIndex++;
        setTimeout(function(){
          vm.showModelNext();
          vm.readingOption = '';
        }, 250);
      }, noTimeOut ? 1 : this.nextBtnTime);
    },
    startGame() {
      let sound = this.getAudio('games/simon/start_game.mp3')
      this.reproduceAudio(sound);
      this.nextRound();
    },
    windGame() {
      setTimeout(() => {
        this.finalResponse = 'win';
        this.reproduceAudio(this.getAudio('games/simon/win_game.mp3'))
        // this.myNotify('success', 'Ganaste', '¡Felicitaciones!');
        this.resetVars();
      }, 1000)
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

  .gameContainer {
    margin-top: 80px;
    padding-bottom: 50px;
  }

  .gameTitle {
    text-align: center;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 35px;
  }
  .roundTitle {
    margin-bottom: 30px;
    font-size: 20px;
  }
  .recordTitle {
    margin-bottom: 30px;
  }

  .itemCentered {
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
  }
  .containerCentered {
    display: flex;
    justify-content: center;
  }

  .attention {
    margin-top: 30px;
    text-align: center;
  }

  .response {
    width: 600px;
    font-size: 30px;
    border-radius: 30px;
    padding: 100px 0;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    color: white;
    background-color: #999;
    cursor: pointer;
  }
  .response-win {
    background-color: #2ECC40;
  }
  .response-lose {
    background-color: #FF4136;
  }


</style>
