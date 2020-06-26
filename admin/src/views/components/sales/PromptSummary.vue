<template>
  <vs-popup :active.sync="isPromptActiveLocal" title="Resumen de estado diario">


  <b>10:30 a 12:30</b>
  <!-- Cada uno con su respectivo color -->
  <!-- Al posarte sobre por ejemplo "21 Pedidos" tiene que salir un pseudo popup que con una foto de cada uno y el número
  Por ejemplo, al pararme sobre 21 pedidos sale: 'Lisandro Dalla Costa: 4 ', 'Valeria Notta: 7', etc.
  La verdad que esto no sé si tiene mucho sentido. Pero si no lo tiene tambíen se puede hacer una tabla de este tipo al final del día
  para ver qué hizo cada uno, poniendo de un lado el empleado y del otro las tareas
 -->
    21 Pedidos
    14 Armados
    11 Controlados

    <b>10:30 a 12:30</b>
    21 Pedidos
    14 Armados
    11 Controlados

    <b>10:30 a 12:30</b>
    21 Pedidos
    14 Armados
    11 Controlados

    <b>10:30 a 12:30</b>
    21 Pedidos
    14 Armados
    11 Controlados

    <b>TOTAL:</b>
    21 Pedidos
    14 Armados
    11 Controlados


  </vs-popup>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    sales: { type: Array, required: true, },
  }, // PROPS
  data() {
    return {
      shippingSales: [],
      avoidDuplicate: 0,
    }; // return DATA
  }, // DATA

  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        this.$emit('closePrompt');
      }
    },
    shippingSalesTotal() {
      let total = 0;
      for (let Sale of this.Sales) {
        if (Sale.stateID != this._localDB.SaleStateIDs.EnCamino) continue;
        total++;
      }
    }
  }, // COMPUTED

  watch: {
    isPromptActive(val) {
      if (!val) return;
      this.getList();
    },
  }, // WATCH

  methods: {
    // changePayment
    // changeAllPayments
    // checkEmployeeName
    // finishEmployee
    // getList
    changePayment(tr) {
      if (this.avoidDuplicate++ % 2) return;
      this.calculateTotal();
      this.modifySaleState(tr);
    },
    changeAllPayments(tr) {
      let newValue = !this.isPayed;
      if (this.avoidDuplicate++ % 2) return;
      for (let Item of this.shippingSales) {
        if (Item.employeeID != tr.emploeeID) continue;
        if (Item.isPayed == newValue) continue;
        Item.isPayed = newValue;
        this.modifySaleState(Item);
      }
      this.calculateTotal();
    },
    showEmployee(tr, indextr) {
      if (indextr) {
        if (tr.employeeID == this.shippingSales[indextr-1].employeeID){
          return false;
        }
      }
      return true;
    },
    finishEmployee(employeeID) {
      console.log('Acabo '+ this.getEmployeeName(employeeID));
    },
    modifySaleState(tr) {
      let newStateID = tr.isPayed ? this._localDB.SaleStateIDs.Entregado : this._localDB.SaleStateIDs.EnCamino;
      let Params = {
        saleID: tr.saleID,
        paymentEmployeeID: tr.employeeID,
        paymentDatetime: tr.isPayed ? this.getActualDatetimeToDB() : this.emptyDatetime,
        stateID: newStateID,
      }
      this.$emit('modifySaleDB', Params);
      let Params2 = {
        saleID: tr.saleID,
        stateID: newStateID,
      }
      this.$emit('modifySaleState', Params2);
    },
    getList() {
      // console.log('---------');
      // console.log(this._localDB.SaleStateIDs.EnCamino);
      // console.log('---------');
      // console.log(Sale.stateID);
      let newList = [];
      for (let Sale of this.sales) {
        if (Sale.stateID != this._localDB.SaleStateIDs.EnCamino) continue;
        let Item = {
          saleID: Sale.id,
          employeeID: Sale.shippingEmployeeID,
          buyerFullName: Sale.buyerFullName,
          price: Sale.totalTotal,
          isPayed: Sale.isPayed,
        }
        newList.push(Item)
      }
      // Order by employee
      newList = newList.sort((a, b) => {if (a.employeeID < b.employeeID) return 1; if(b.employeeID < a.employeeID) return -1;});
      // Add total
      let totalResult = 0;
      let finalList = [];
      for (let i = 0; i < newList.length; i++) {
        let Item = newList[i];
        if (!Item.isPayed) totalResult += Item.price;
        finalList.push(Item);
        if (i == newList.length-1) continue;
        if (Item.employeeID == newList[i+1].employeeID) continue;
        let Total = {
          saleID: 0,
          employeeID: Item.employeeID,
          buyerFullName: 'TOTAL',
          price: totalResult,
          isPayed: null,
          allPayed: !totalResult,
          isTotal: true,
        }
        finalList.push(Total);
        let EmptyItem = {
          saleID: 0,
          employeeID: Item.employeeID,
          buyerFullName: '',
          price: '',
          isPayed: null,
          allPayed: null,
          isEmpty: true,
        }
        finalList.push(EmptyItem);
        totalResult = 0;
      }
       this.shippingSales = finalList;
    },
    calculateTotal() {
      let total = 0;
      for (let Item of this.shippingSales) {
        if (!Item.isTotal) {
          if (!Item.isPayed) total += +Item.price;
          continue;
        }
        Item.price = total;
        if (!total) Item.allPayed = true;
        else Item.allPayed = false;
        total = 0;
      }
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
  .userImg {
    height: 50px;
    width:  50px;
    border-radius: 100px;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .isTotalName {
    font-weight: bold;
    float: right;
    margin-right: 15px;
  }
  .isTotalPrice {
    font-weight: bold;
  }
  .isEmpty {
    height: 50px;
  }
</style>
