<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  :title="isEditing ? 'Editar movimiento' : 'Crear movimiento'">
    <div style="margin-top: 50px; margin-bottom: 90px;">
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <div class="imgContainer m-auto">
            <img :src="getImg(`employees/${NewMovement.employeeID}.png`)">
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <div class="w-full pt-4">
            <label class="w-full">Empleado</label>
            <v-select label="fullName" class="w-full"
            ref="employeeSelector"
            :options="_allEmployees" :reduce="fullName => fullName.id"
            v-model="NewMovement.employeeID"/>
          </div>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <inputHour label="Horario de entrada" class="inputLine" v-model="NewMovement.entryTime"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Día de entrada" v-model="NewMovement.entryDate" type="date" class="inputLine"/>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <inputHour label="Horario de salida" class="inputLine" v-model="NewMovement.departureTime"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Día de salida" v-model="NewMovement.departureDate"
          @keyup.enter="finishAction" type="date" class="inputLine"/>
        </vs-col>
      </vs-row>
    </div>
    <PromptButtons @accept="finishAction" @cancel="isPromptActiveLocal = false;"/>
  </vs-popup>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    isEditing: { type: Boolean, required: true, },
    MovementToEdit: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      NewMovement: {},
    } // return DATA
  }, // DATA

  computed: {
    isPromptActiveLocal: {
      get(val) {
        return this.isPromptActive;
      },
      set(val) {
        if (val) return;
        this.$emit('closePrompt');
      }
    },
  }, // COMPUTED

  watch: {
    isPromptActiveLocal: function(val) {
      if (val) {
        // setTimeout(() => {
        //   this.$nextTick(() => {
        //     this.$refs.employeeSelector.focus()
        //   })
        // }, 1);

        if (!this.isEditing) {
          // new movement
          this.NewMovement = this.getNewMovement();
        } else {
          // edit movement
          this.copyEditData();
        }
      }
    },
    'NewMovement.entryDate': function(val) {
      this.NewMovement.departureDate = val;
    },
  },

  created() {
  },

  mounted() {
    let keyPressArray = [
      {
        key: 'esc',
        callback: (vm) => { vm.isPromptActiveLocal = false; },
        params: this,
      },
      // {
      //   key: 'enter',
      //   callback: (vm) => { vm.finishAction(); },
      //   params: this,
      // },
    ]
    this.checkKeyPressArray(keyPressArray);
  },

  methods: {
    // addMovement
    // checkData
    // copyEditData
    // finishAction
    // getNewMovement

    addMovement() {
      let Params = this.NewMovement;
      const vm = this;
      this.conectToDB({
        file: 'EmployeesSchedules', action: 'addScheduleMovement', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let newMovementID = res.data.data;
          vm.$emit('addedMovement', newMovementID);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    checkData() {
      let msg = '';
      if (this.NewMovement.employeeID == null) msg = 'Tenés que seleccionar un empleado';
      if (msg != '') {
        console.log(msg);
        this.myNotify('warning', 'Atención', msg);
        return false;
      }
      return true;
    },

    copyEditData() {
      for (let key in this.NewMovement) {
        if (typeof this.NewMovement[key] == 'undefined') continue;
        this.NewMovement[key] = this.MovementToEdit[key];
      }
    },

    finishAction() {
      if (!this.checkData()) return;
      if (this.isEditing) {
        let Params = this.NewMovement;
        Params.movementID = Params.id;
        this.$emit('modifyMovementDB', Params);
      } else {
        this.addMovement();
      }
      this.isPromptActiveLocal = false;
    },

    getNewMovement() {
      return {
        id:                 0,
        branchID:           this.getBranchID(),
        employeeID:         null,
        entryTime:          0,
        entryDate:          this.getActualDateToDB(),
        departureTime:      0,
        departureDate:      this.getActualDateToDB(),
        createdByEployeeID: this.getUser().id,
        dateCreated:        this.getActualDatetimeToDB(),
      }
    },

  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
  .inputLine {
    margin-top: 5px;
    width: 100%;
  }
  $vs-dropdown-max-height: 200px;
</style>
