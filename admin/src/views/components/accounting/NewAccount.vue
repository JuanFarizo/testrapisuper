<template>
  <div class="">
  <vs-popup :active.sync="isPromptActiveLocal"
  title="Nueva cuenta" @accept="addAccount()">

    <div class="newPrompt">
      <vs-input placeholder="Nombre" v-model="NewAccount.name" class="newPrompt-item"/>
      <vs-input placeholder="Valor monetario" v-model="NewAccount.value" type="number" class="newPrompt-item"/>
      <!-- <vs-input placeholder="Sucursal" v-model="NewAccount.branchID" type="number" class="newPrompt-item"/> -->
      <!-- <vs-input placeholder="Relevancia" v-model="NewAccount.relevance" type="number" class="newPrompt-item"/> -->
      <div class="colorContainer">
        <label>Color</label>
        <vs-input v-model="NewAccount.color" type="color" class="newPrompt-item inputColor"/>
        <p class="helpText">* Colores claros recomendados *</p>
      </div>
    </div>

    <vs-divider/>
    <div class="flex" style="justify-content: flex-end;">
      <vs-button type="border" color="danger" @click="isPromptActiveLocal = false">Cancelar</vs-button>
      <vs-button type="border" class="ml-2"@click="addAccount()">Aceptar</vs-button>
    </div>

  </vs-popup>
</div>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    vmMain: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      NewAccount: this.getNewAccount(),
    } // return DATA
  }, // DATA
  computed: {
    isPromptActiveLocal: {
      get(val) {
        if (val) {
          this.NewAccount = this.getNewAccount();
        }
        return this.isPromptActive
      },
      set(val) {
        if (val) return;
        this.$emit('closePrompt');
      }
    }
  }, // COMPUTED

  methods: {
    // addAccount
    // getNewAccount
    addAccount() {
      const vm = this;
      this.conectToDB({
        file: 'Accounting', action: 'addAccount', params: vm.NewAccount,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.loadAccounts() // Carga cuentas
          vm.myNotify('success', 'Exito!', "Cuenta agregada");
          vm.NewAccount = vm.getNewAccount();
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    getNewAccount() {
      return {
        name: '',
        value: '',
        color: '#FFFFFF',
        currencyID: 1,
        typeID: 1,
        branchID: 0,
        relevance: this.vmMain.allAccounts.length+1,
      }
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

  .colorContainer {
    position: relative;
    label {
      position: absolute;
      top: 8px !important;
      opacity: 0.7;
    }
    .inputColor {
      padding-left: 50px;
    }
    /deep/ div input {
      padding-bottom: 8px;
      padding-top: 8px;
      background-color: transparent;
      height: 35px;
    }
    // div /deep/ input {
    //   padding-bottom: 22px;
    //   padding-top: 13px;
    // }
    // div input /deep/ {
    //   padding-bottom: 22px;
    //   padding-top: 13px;
    // }
  }

</style>
