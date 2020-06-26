<template>
  <vs-popup :active.sync="isPromptActiveLocal" title="Ventas en camino">

    <vs-table :data="shippingSales" noDataText="¡No hay ninguna venta en camino!">
      <template slot="thead">
        <vs-th>Cadete</vs-th>
        <vs-th>Comprador</vs-th>
        <vs-th>Pago</vs-th>
        <vs-th>Valor</vs-th>
        <vs-th>Recibido</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :class="{isEmpty: !!tr.isEmpty}">
            <div v-if="showEmployee(tr, indextr)" style="position: relative;">
              <div class="userImg" style="position: absolute;" v-if="!tr.isEmpty">
                <img :src="getImg(`employees/${tr.employeeID}.png`)">
              </div>
              <div class="flex" style="align-items: center; margin-left: 65px; height: 50px;">
                {{ getEmployeeName(tr.employeeID) }}
              </div>
            </div>
          </vs-td>
          <vs-td :class="{isTotalName: tr.isTotal}">{{ tr.buyerFullName }}</vs-td>
          <vs-td>
            <vx-tooltip :text="tr.paymentType">
              <font-awesome-icon v-if="!tr.isEmpty && !tr.isTotal" :icon="getPaymentIcon(tr.paymentTypeID)"
              :class="`payment${tr.paymentTypeID}`"/>
            </vx-tooltip>
          </vs-td>
          <vs-td :class="{isTotalPrice: tr.isTotal}">
            <div v-if="tr.price">
              ${{ showPrice(tr.price) }}
            </div>
            <div v-else-if="tr.price === 0" style="opacity: 0.5;">
              ¡Cobrado!
            </div>
          </vs-td>
          <vs-td>
            <vs-switch v-model="tr.isPayed" @change="changePayment(tr)" v-if="!tr.isEmpty"/>
         </vs-td>
        </vs-tr>
      </template>
    </vs-table>


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
      console.log(shippingSales);
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
    // getPaymentIcon
    // getList
    changePayment(tr) {
      if (this.avoidDuplicate++ % 2) return;
      if (tr.isTotal) {
        this.changeAllPayments(tr);
        return;
      }
      this.calculateTotal();
      this.modifySaleState(tr);
    },
    changeAllPayments(tr) {
      let newValue = tr.isPayed;
      for (let Item of this.shippingSales) {
        if (Item.employeeID != tr.employeeID) continue;
        if (Item.isPayed == newValue) continue;
        if (Item.isTotal) continue;
        Item.isPayed = newValue;
        console.log(Item);
        console.log(newValue);
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
    modifySaleState(tr) {
      let newStateID = tr.isPayed ? this._localDB.SaleStateIDs.Entregado : this._localDB.SaleStateIDs.EnCamino;
      let newIsPayed = tr.isPayed;
      let Params = {
        saleID: tr.saleID,
        paymentEmployeeID: tr.employeeID,
        paymentDatetime: tr.isPayed ? this.getActualDatetimeToDB() : this.emptyDatetime,
        stateID: newStateID,
        isPayed: newIsPayed,
      }
      this.$emit('modifySaleDB', Params); // Modify DB
      let Params2 = {
        saleID: tr.saleID,
        stateID: newStateID,
        isPayed: newIsPayed,
      }
      this.$emit('modifySaleState', Params2); // Modify DOM
    },
    getPaymentIcon(paymentTypeID) {
      switch (paymentTypeID) {
        case 1: // Efectivo
          return 'money-bill';
        case 2: // Argentino / Central
          return ['far', 'credit-card'];
        case 3: // Otras tarjetas
          return ['fab', 'cc-visa'];
        default: // Alerta
          return 'exclamation-circle';
      }
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
          paymentTypeID: Sale.paymentTypeID,
          paymentType: Sale.paymentType,
        }
        newList.push(Item)
      }
      // Order by employee
      newList = newList.sort((a, b) => {if (a.employeeID < b.employeeID) return 1; if(b.employeeID < a.employeeID) return -1;});
      // Add total
      let totalResult = 0;
      let isPayedTotal = true;
      let finalList = [];
      for (let i = 0; i < newList.length; i++) {
        let Item = newList[i];
        if (!Item.isPayed) totalResult += Item.price;
        if (!Item.isPayed) isPayedTotal = false;
        finalList.push(Item);
        if (i != newList.length-1) {
          if (Item.employeeID == newList[i+1].employeeID) continue;
        }
        let Total = {
          saleID: 0,
          employeeID: Item.employeeID,
          buyerFullName: 'TOTAL',
          price: totalResult,
          isPayed: isPayedTotal,
          isTotal: true,
        }
        finalList.push(Total);
        let EmptyItem = {
          saleID: 0,
          employeeID: 0,
          buyerFullName: '',
          price: '',
          isEmpty: true,
        }
        finalList.push(EmptyItem);
        totalResult = 0;
        isPayedTotal = true;
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
        if (!total) Item.isPayed = true;
        else Item.isPayed = false;
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
