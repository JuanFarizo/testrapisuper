<template>
  <vs-popup :active.sync="isPromptActiveLocal" title="Nuevo movimiento">
    <div class="newPrompt">

      <h2 class="text-center my-2" :class="'text-'+newMovement.type.color">
        {{ newMovement.type.title }}
      </h2>

      <vs-row>
        <vs-col vs-w="6" class="colLeft">
          <vs-select autocomplete class="w-full mx-auto mt-2" label="Cuenta" v-model="newMovement.accountID">
            <vs-select-item :key="index" :value="acc.id" :text="acc.name" v-for="(acc,index) in allAccounts"/>
          </vs-select>
        </vs-col>
        <vs-col vs-w="6" class="colRight">
          <vs-select autocomplete class="w-full mx-auto mt-2" label="Categoria" v-model="newMovement.categoryID">
            <vs-select-item :key="index" :value="cat.id" :text="cat.name" v-for="(cat,index) in movementCategories"/>
          </vs-select>
        </vs-col>
      </vs-row>
      <vs-input placeholder="Precio" v-model.number="newMovement.price" type="number" class="newPrompt-item mt-2"/>
      <vs-input placeholder="Descripción" v-model="newMovement.description" size="large" class="newPrompt-item mt-2"/>
      <vs-row>
        <label class="mr-3">Está pago</label>
        <vs-switch v-model="newMovement.isPayed"/>
      </vs-row>
      <div v-if="!newMovement.isPayed" class="mt-2">
        <label class="vs-select--label">Fecha de pago Estimado</label>
        <vs-input v-model="newMovement.datePayment" type="date" class="newPrompt-item mt-2"/>
      </div>



      <vs-divider/>
      <div class="flex" style="justify-content: flex-end;">
        <vs-button type="border" color="danger" @click="isPromptActiveLocal = false">Cancelar</vs-button>
        <vs-button type="border" class="ml-2"@click="addMovement()">Aceptar</vs-button>
      </div>

    </div>
  </vs-popup>
</template>

<script>
export default {
  props: {
    vmMain: { type: Object, required: true, },
    isPromptActive: { type: Boolean, required: true, },
    allAccounts: { type: Array, required: true, },
    movementCategories: { type: Array, required: true, },
    NewMovementDefault: { type: Object, required: true, },
  },
  data() {
    return {
      newMovement: this.NewMovementDefault,
    } // return DATA
  }, // DATA
  computed: {
    isPromptActiveLocal: {
      get() { return this.isPromptActive },
      set(val) {
        if (val) return;
        this.$emit('closePrompt');
      }
    }
  }, // COMPUTED
  methods: {
    addMovement() {
      if (!this.vmMain.movementValidator()) return;

      if(this.newMovement.type.type == 'gasto') {
        this.newMovement.price>0 ? this.newMovement.price = -this.newMovement.price : null
      }
      if(this.newMovement.type.type == 'ingreso') {
        this.newMovement.price<0 ? this.newMovement.price = -this.newMovement.price : null
      }
      if(this.newMovement.isPayed == true) {
        this.newMovement.datePayment += " " + new Date().toLocaleTimeString()
        this.newMovement.datePaymentReal = this.newMovement.datePayment
      } else {
        this.newMovement.datePayment += " " + new Date().toLocaleTimeString()
        this.newMovement.datePaymentReal += " " + new Date().toLocaleTimeString()
      }
      this.isPromptActiveLocal = false;
      console.log("NewMov", this.newMovement)
      const vm = this;
      try {
        this.conectToDB({
          file: 'Accounting', action: 'addMovement', params: vm.newMovement,
          success: function(res){
            if (res.data.error) { console.log(res.data); return; }
            let Params = {
              id: vm.newMovement.accountID,
              value: vm.allAccounts.filter((e)=>{return e.id==vm.newMovement.accountID})[0].value+vm.newMovement.price
            }
            // console.log("Acc:", Params)
            let callback = function(vm) {
              // vm.myNotify('success', 'Exito!', "Cuenta de llegada editada");
              vm.loadAccounts()
            }
            vm.vmMain.modifyAccountDB(Params, callback)

            vm.myNotify('success', 'Exito!', "Movimiento creado!");
            vm.vmMain.loadMovements();
            vm.newMovement = vm.vmMain.getNewMovement();
          }, error: function(error) { vm.myNotify('danger', 'Error', error); },
        });
      }
      catch (error) {
        this.myNotify('danger', 'Error!', 'Ocurrio un error');
        console.log(error)
        this.vmMain.loadMovements();
        vm.newMovement = vm.vmMain.getNewMovement();
      }
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

.colLeft { padding-left: 0; padding-right:  5px; }
.colRight { padding-right: 0; padding-left: 5px; }

</style>
