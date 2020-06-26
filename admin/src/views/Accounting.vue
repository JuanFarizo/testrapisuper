

      <!-- Cuanto en tarjeta y cuánto en efectivo -->
      <!-- Mostrar saldo caja -->
      <!-- Mostrar saldo banco -->
      <!-- Pagado con banco, pagado con efectivo, o no pagado -->
      <!-- Si no pagado, poner cuando hay que pagar -->
      <!-- Compras a proveedores -->
      <!-- No solo compras a proveedores. Cualquier salida de plata. -->
      <!-- Y lo mismo que en la parte de ventas, -->
      <!-- me tendría que dejar cargar manualmente cualquier otro -->
      <!-- ingreso de dinero que no sea x ventas. -->




<template>
  <div class="data-list-container">

    <!-- Prompts -->
    <columns-manager
      :isPromptActive="IsPromptActive.columnsManager"
      :HideableColumns="Columns"
      :isHidden="isHidden"
      @updatePromptColumns="isHidden = $event;"
      @closePromptColumns="IsPromptActive.columnsManager = false;"
    />

    <NewMovement
      :vmMain="getThis()"
      :allAccounts="allAccounts"
      :isPromptActive="IsPromptActive.newMovement"
      :movementCategories="movementCategories"
      :NewMovementDefault="newMovement"
      @closePrompt="IsPromptActive.newMovement = false;"
    />

    <vs-popup :active.sync="IsPromptActive.newMovementTransfer"
    title="Nuevo movimiento" @accept="addTransfer()">
      <div class="newPrompt">

        <h2 class="text-center my-2" :class="'text-'+newMovement.type.color">{{newMovement.type.title}}</h2>

        <label for="" class="vs-select--label">Fecha de pago</label>
        <vs-input placeholder="" type="date" v-model="newMovement.datePayment" class="newPrompt-item mt-2"/>
        <vs-input placeholder="Precio" v-model.number="newMovement.price" class="newPrompt-item mt-2"/>
        <vs-select autocomplete class="mx-auto mt-2" label="Cuenta" v-model="newMovement.accountID">
          <vs-select-item :key="index" :value="acc.id" :text="acc.name" v-for="(acc,index) in allAccounts"/>
        </vs-select>
        <vs-select v-if="newMovement.type.type == 'transferencia'" autocomplete class="mx-auto mt-2" label="Cuenta a transferir" v-model="newMovement.receivingAccountID">
          <vs-select-item :key="index" :value="acc.id" :text="acc.name" v-for="(acc,index) in allAccounts"/>
        </vs-select>
        <vs-input placeholder="Descripción" v-model="newMovement.description" size="large" class="newPrompt-item mt-2"/>

      </div>
    </vs-popup>

    <NewAccount
      :vmMain="getThis()"
      :isPromptActive="IsPromptActive.newAccount"
      @closePrompt="IsPromptActive.newAccount = false"
    />

    <vs-popup :active.sync="IsPromptActive.editAccount"
    title="Editar cuenta" @accept="saveAccount()">
      <div class="newPrompt">

        <vs-input placeholder="Nombre" v-model="currentAccount.name" class="newPrompt-item"/>
        <vs-input placeholder="Sucursal" v-model="currentAccount.branchID" type="number" class="newPrompt-item"/>
        <vs-input placeholder="Relevancia" v-model="currentAccount.relevance" type="number" class="newPrompt-item"/>
        <vs-input placeholder="Color" v-model="currentAccount.color" type="color" class="newPrompt-item"/>
        <p style="color: orange; font-size: smaller;">Seleccionar colores claros o dejarlo por default en blanco</p>

      </div>
    </vs-popup>



    <AcountsSummary
      :vmMain="getThis()"
      :allAccounts="allAccounts"
    />


    <TableMovements
      :vmMain="getThis()"
      :allMovements="allMovements"
      :Columns="Columns"
      :isHidden="isHidden"
    />

  </div>
</template>











<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';

export default {
  mixins: [vsTableConfig],
  components: {
    NewAccount: () => import('./components/accounting/NewAccount.vue'),
    NewMovement: () => import('./components/accounting/NewMovement.vue'),
    TableMovements: () => import('./components/accounting/TableMovements.vue'),
    AcountsSummary: () => import('./components/accounting/AcountsSummary.vue'),
  },
  data() {
    return {
      movementsTypes: {
        'gasto': { type: 'gasto', title: 'Gasto', color: 'danger' },
        'ingreso': { type: 'ingreso', title: 'Ingreso', color: 'success', },
        'transferencia': { type: 'transferencia', title: 'Transferencia entre cuentas', color: 'warning' }
      },
      currentAccount: {
        name: '',
        value: '',
        color: 'white',
        currencyID: 1,
        typeID: 1,
        branchID: 0,
        relevance: 1,
      },
      newMovement: this.getNewMovement(), // asign employeeID on mounted
      IsPromptActive: {
        columnsManager: false,
        newMovement: false,
        newAccount: false,
        editAccount: false,
        newMovementTransfer: false,
      },
      // static
      itemsPerPage: 50,
      Columns: [
        { name: 'id', title: 'ID', },
        { name: 'price', title: 'Precio', },
        { name: 'category', title: 'Categoria', },
        { name: 'account', title: 'Cuenta de transferencia', nowrap: false, },
        { name: 'isPayed', title: 'Pagado', },
        { name: 'datePayment', title: 'Fecha de pago (estimado)', nowrap: false, },
        { name: 'datePaymentReal', title: 'Fecha de pago', nowrap: false, },
        { name: 'dateCreated', title: 'Fecha de creacion', nowrap: false, },
        { name: 'description', title: 'Descripción' },
        { name: 'paymentType', title: 'Tipo de pago' },
        { name: 'currency', title: 'Moneda' },
        { name: 'employee', title: 'Empleado' },
      ],
      selectedProfile: 0, // Lisandro
      Profiles: [
        /* 0 */ ['id', ],
      ],
      allAccounts: [],
      allMovements: [],
      movementCategories: [],
    } // return DATA
  }, // DATA
  watch: {

  }, // WATCH

  computed: {
  }, // COMPUTED
  created() {
    this.loadAccounts();
    this.loadMovementCategories();
    this.loadMovements();
  }, // CREATED
  mounted() {
    this.newMovement.employeeID = this.getUser().id;
  }, // MOUNTED
  methods: {
    // modifyAccountDB
    // loadMovements
    loadMovements() {
      let Params = { isActive: 1 };
      const vm = this;
      this.conectToDB({
        file: 'Accounting', action: 'getMovement', params: Params, //Hacer funcion
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log(res.data.data);
          // return;

          vm.allMovements = res.data.data;
          //console.log(res.data.data)
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    loadAccounts() {
      let Params = { isActive: 1 };
      const vm = this;
      this.conectToDB({
        file: 'Accounting', action: 'getAccount', params: Params, //Hacer funcion
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allAccounts = res.data.data;
          //console.log(res.data.data)
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    loadMovementCategories() {
      let Params = { isActive: 1 };
      const vm = this;
      this.conectToDB({
        file: 'Accounting', action: 'getMovementCategory', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.movementCategories = res.data.data;
          // console.log("cat", res.data.data)
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },

    modifyAccountDB(Params, callback = null) {
      Params.lastUpdate = this.getActualDatetimeToDB()
      const vm = this;
      this.conectToDB({
        file: 'Accounting', action: 'modifyAccount', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          if (callback) callback(vm);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      })
    },
    getNewMovement() {
      return {
        price: '',
        categoryID: '',
        accountID: '',
        supplierID: 0,
        employeeID: this.getUser().id,
        isPayed: 1,
        datePayment: null,
        datePaymentReal: null,
        description: '',
        paymentTypeID: 0,
        currencyID: 1,
        receivingAccountID: 0,
        type: {}
      }
    },












    toggleNewMovement(movementType){
      this.IsPromptActive.newMovement = true
      this.newMovement.type = this.movementsTypes[movementType]
    },

    toggleTransfer() {
      this.newMovement.receivingAccountID = null,
      this.IsPromptActive.newMovementTransfer = true
      this.newMovement.type = this.movementsTypes['transferencia']
      this.newMovement.categoryID = 6
      this.newMovement.isPayed = 1
    },
    addTransfer() {
      if (!this.movementValidator()) return;
      if(this.newMovement.price<=0) {this.myNotify('danger', 'El Precio debe ser mayor a 0');return}


      this.newMovement.datePayment += " " + new Date().toLocaleTimeString()
      this.newMovement.datePaymentReal = this.newMovement.datePayment


      // console.log("Iniciando Transfer")
      // console.log("NM1", this.newMovement)
      const vm = this;
      try {
        //Transferencia 1
        this.conectToDB({
          file: 'Accounting', action: 'addMovement', params: vm.newMovement,
          success: function(res){

            // console.log("Trans1 Exito")
            if (res.data.error) { console.log(res.data.data); return; }

            //Actualizo cuenta
            // console.log("Accs:",vm.allAccounts,"filt:", vm.allAccounts.filter((e)=>{return e.id==vm.newMovement.accountID}) )
            let Params = {
              id: vm.newMovement.accountID,
              value: vm.allAccounts.filter((e)=>{return e.id==vm.newMovement.accountID})[0].value-vm.newMovement.price
            }
            // console.log("Acc:", Account)
            let callback = function(vm) {
              vm.myNotify('success', 'Exito!', "Cuenta de salida editada");
            }
            vm.modifyAccountDB(Params, callback)


            // console.log("NM2",vm.newMovement)
            vm.newMovement.accountID = vm.newMovement.receivingAccountID // Ahora cambio la ID a la otra cuenta
            vm.newMovement.price = -vm.newMovement.price // Cambio el precio contrario
            //Transferencia 2
            vm.conectToDB({
              file: 'Accounting', action: 'addMovement', params: vm.newMovement,
              success: function(res){
                // console.log("Trans2 Exito")
                if (res.data.error) { console.log(res.data.data); return; }
                vm.myNotify('success', 'Exito!', "Transferencia creado!");

                // Actualizo cuenta
                let Params = {
                  id: vm.newMovement.accountID,
                  value: vm.allAccounts.filter((e)=>{return e.id==vm.newMovement.accountID})[0].value-vm.newMovement.price
                }
                // console.log("Acc:", Params)
                let callback = function(vm) {
                  vm.myNotify('success', 'Exito!', "Cuenta de llegada editada");
                  vm.loadAccounts()
                }
                vm.modifyAccountDB(Params, callback)

                vm.loadMovements();
                vm.newMovement = vm.getNewMovement();

              }, error: function(error) { vm.myNotify('danger', 'Error', error); },
            });

          }, error: function(error) {
            vm.myNotify('danger', 'Error', error);
            vm.newMovement = vm.getNewMovement();
          },
        });
      }
      catch (error) {
        this.myNotify('danger', 'Error!', 'Ocurrio un error');
        console.log(error)
      }
    },
    movementValidator() {
      let Errors = {}
      this.newMovement.datePayment == null ? Errors.datePayment = true : null
      this.newMovement.price == 0 ? Errors.price = true : null
      this.newMovement.accountID == this.newMovement.receivingAccountID ? Errors.account = true : null
      this.newMovement.accountID == 0 ? Errors.account = true : null
      this.newMovement.receivingAccountID == null | this.newMovement.receivingAccountID == 0 && this.newMovement.type.type == "transferencia" ? Errors.account = true : null

      if (Errors.price | Errors.account | Errors.datePayment) {Errors.error = true} else {Errors.error = false}

      if (Errors.error) {
        if (Errors.account) {
          this.myNotify('danger', 'Error', 'Tenés que seleccionar una cuenta'); return false;
        }
        if (Errors.price) {
          this.myNotify('danger', 'Error', 'El precio no puede ser 0'); return false;
        }
        // if (Errors.datePayment) {
        //   this.myNotify('danger', 'Ingresar una fecha de pago');
        // }
      }
      // console.log(Errors, this.newMovement)
      return true;
    },

    editAccountStart(index) {
      this.IsPromptActive.editAccount = true
      this.currentAccount = this.allAccounts[index]
    },
    saveAccount() {
      // console.log("Account: ", this.currentAccount)
      try {
        let Params = vm.currentAccount;
        let callback = function(vm) {
          vm.myNotify('success', 'Exito!', "Cuenta editada");
          vm.loadAccounts()
        }
        this.modifyAccount(Params, callback)
      }
      catch (error) {
        this.myNotify('danger', 'Error!', 'Ocurrio un error');
        console.log(error)
      }
      finally {
        this.currentAccount = {}
      }
    }
  }, // METHODS
} // export default
</script>

<style lang="scss">
  .newPrompt-item {
    margin-bottom: 10px;
    width: 100%;
  }
</style>
