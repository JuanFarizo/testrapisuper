
<!--

• que al cargar una compra te cambie el stock
• manejar productos que vienen de más en las compras
• que al hacer click en un botón te copie la lista

-->

<template>
  <div class="data-list-container">
    <template>
      <vs-table ref="table" :data="Purchases" pagination :max-items="itemsPerPage" noDataText="No hay ninguna compra" searchclass="text-center">

        <template slot="header">
          <top-list-actions
            btnTitle="Nueva compra" :btnClick="_ => {startNewPurchase()}"
            :itemsLength="Purchases.length" :currentPage ="currentPage" :itemsPerPage ="itemsPerPage"
          />
        </template>

        <!-- PURCHASES TITLES -->
        <template slot="thead">
          <vs-th v-if="!isHidden.id" sort-key="id">ID</vs-th>
          <vs-th v-if="!isHidden.isReceived" sort-key="isReceived">Recibido</vs-th>
          <vs-th v-if="!isHidden.dateCreated" sort-key="date">Fecha</vs-th>
          <vs-th v-if="!isHidden.state" sort-key="state">Estado</vs-th>
          <vs-th v-if="!isHidden.paymentType" sort-key="paymentType">Pago</vs-th>
          <vs-th v-if="!isHidden.total" sort-key="total">Total</vs-th>
          <vs-th v-if="!isHidden.supplier" sort-key="supplier">Proveedor</vs-th>
          <vs-th v-if="!isHidden.notes" sort-key="notes">Notas</vs-th>
          <vs-th v-if="!isHidden.reportIssue">Error</vs-th>
        </template>

        <!-- PURCHASES ITEMS -->
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <!-- id -->
            <vs-td v-if="!isHidden.Purchase.id" :data="tr.id">
              <vs-chip color="primary">{{ tr.id }}</vs-chip>
            </vs-td>
            <!-- isReceived -->
            <vs-td v-if="!isHidden.Purchase.isReceived" :data="tr.isReceived">
              <vs-switch v-model="tr.isReceived" @click="modifyReadyProduct(tr.id, !tr.isReceived)"/>
            </vs-td>
            <!-- dateCreated -->
            <vs-td v-if="!isHidden.Purchase.dateCreated" :data="tr.dateCreated" :title="getTimeOfDB(tr.dateCreated)">{{ getDateOfDB(tr.dateCreated) }}</vs-td>
            <!-- state -->
            <vs-td v-if="!isHidden.Purchase.state" :data="tr.stateID"><vs-chip :color="getPurchaseStateColor(tr.stateID)">{{ tr.state }}</vs-chip></vs-td>
            <!-- paymentType -->
            <vs-td v-if="!isHidden.Purchase.paymentType" :data="tr.paymentTypeID" class="nowrap">
              <font-awesome-icon :icon="getPaymentIcon(tr.paymentTypeID)" :class="`payment${tr.paymentTypeID}`"/> {{ tr.paymentType }}
            </vs-td>
            <!-- total -->
            <vs-td v-if="!isHidden.Purchase.total" :data="tr.totalTotal">${{ tr.totalTotal }}</vs-td>
            <!-- supplier -->
            <vs-td v-if="!isHidden.Purchase.supplier" :data="tr.supplierID">{{ tr.supplier }}</vs-td>
            <!-- notes -->
            <vs-td v-if="!isHidden.Purchase.notes" :data="tr.notes">{{ tr.notes }}</vs-td>
            <!-- reportIssue -->
            <vs-td v-if="!isHidden.Purchase.reportIssue">
              <vs-button color="danger" type="border" icon="report" @click="reportIssuePurchase(tr)"></vs-button>
            </vs-td>

            <!-- PRODUCT TITLES -->
            <template class="expand-user" slot="expand" style="padding: 0">
              <div class="con-expand-users w-full">
                <template lang="html">
                  <div>
                    <vs-table :data="tr.Products" noDataText="No hay productos en esta compra">
                      <template slot="thead">
                        <vs-th v-if="!isHidden.Product.id">ID</vs-th>
                        <vs-th v-if="!isHidden.Product.productID">ProdID</vs-th>
                        <vs-th v-if="!isHidden.Product.isReady">Listo</vs-th>
                        <vs-th v-if="!isHidden.Product.img" style="padding-left: 40px;">Img</vs-th>
                        <vs-th>
                          <span v-if="!isHidden.Product.amount">Cantidad</span>
                          <span v-if="!isHidden.Product.amount && !isHidden.Product.name">&nbspy&nbsp</span>
                          <span v-if="!isHidden.Product.name">Producto</span>
                        </vs-th>
                        <vs-th v-if="!isHidden.Product.reportIssue">Error</vs-th>
                      </template>

                      <!-- PRODUCT ITEMS -->
                      <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                          <!-- id -->
                          <vs-td v-if="!isHidden.Product.id" :data="tr.id" class="autoWidth">
                            <vs-chip color="primary" class="ml-2">{{ tr.id }}</vs-chip>
                          </vs-td>
                          <!-- product id -->
                          <vs-td v-if="!isHidden.Product.productID" :data="tr.productID" class="autoWidth">
                            <vs-chip color="primary">{{ tr.productID }}</vs-chip>
                          </vs-td>
                          <!-- isReady -->
                          <vs-td v-if="!isHidden.Product.isReady" :data="tr.isReady" class="autoWidth">
                            <vs-switch v-model="tr.isReady" @click="modifyReadyProduct(tr.id, !tr.isReady, tr.fullName)"/>
                          </vs-td>
                          <!-- img -->
                          <vs-td v-if="!isHidden.Product.img" :data="tr.id" class="autoWidth">
                            <div class="imgContainer">
                              <img :src="getImgDual(`${tr.productID}-1`)">
                            </div>
                          </vs-td>
                          <!-- amount & name -->
                          <vs-td :data="tr.fullName">
                            <span v-if="!isHidden.Product.amount" class="productAmount">{{ tr.amount }}x </span>
                            <span>{{ tr.product }}</span>
                          </vs-td>
                          <!-- reportIssue -->
                          <vs-td v-if="!isHidden.Product.functions" :data="tr.functions" class="autoWidth">
                            <vs-button color="danger" type="border" icon="report" @click="reportIssueProduct(tr)"></vs-button>
                          </vs-td>
                        </vs-tr>

                      </template>
                    </vs-table>
                  </div>
                </template>
              </div>
            </template> <!-- Products table -->


          </vs-tr>
        </template>
      </vs-table>
    </template> <!-- Purchase table -->
  </div>
</template>











<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
// components
// import topListActions from './components/topListActions/_index.vue';

export default {
  mixins: [vsTableConfig],
  components: {
    topListActions,
  },
  props: {
  },
  data: ()=>({
    isHidden: { Purchase: {}, Product: {}, },
    selected: [],
    // selectedProfile: 0, // Lisandro
    selectedProfile: 0, // Aldana
    Purchases: [],

    // static
    Profiles: [
      /* 00 - Lisandro */ { },
    ],
  }), // DATA
  created() {
    this.loadPurchases();
    // this.loadProfile({ Purchase: {}, Product: {}});
  },
  watch: {
    selectedProfile: function() {
      this.loadProfile();
    },
  }, // WATCH
  methods: {


    // getPurchaseStateColor
    // getPaymentIcon
    // getPaymentIconColor
    // modifyReadyProduct
    // loadPurchaseProducts
    // loadPurchases
    // modifyPurchaseProduct
    // reportIssueProduct
    // reportIssuePurchase
    // startNewPurchase


    getPurchaseStateColor(stateID) {
      if(stateID == 1) return "primary"; // Encargado
      if(stateID == 2) return "success"; // Recibido
      if(stateID == 3) return "danger"; // Cancelado
      if(stateID == 4) return "warning"; // Sin terminar
      return 'dark'; // Indefinido
    },
    getPaymentIcon(paymentTypeID) {
      switch (paymentTypeID) {
        case 1: // Efectivo
          return 'money-bill';
        case 2: // Tarjeta
          return ['far', 'credit-card'];
        default: // Alerta
          return 'exclamation-circle';
      }
    },
    getPaymentIconColor(paymentTypeID) {
      switch (paymentTypeID) {
        case 0: // Efectivo
          return 'fa-money-bill-wave-alt';
        case 1: // Tarjeta
          return ['far', 'credit-card'];
        default: // Alerta
          return 'exclamation-circle';
      }
    },
    modifyReadyProduct(purchaseProdID, isReady, productName) {
      // this.conectToDB({
      //   file: 'Purchases',
      //   action: 'modifyPurchaseUProduct',
      //   params: { purchaseProdID: purchaseProdID, isReady: isReady },
      //   success: function(res){
      //     if (res.data.error) { console.log(res.data.data); return; }
      //     console.log(`Producto "${productName}" ${isReady ? '' : 'no ' }listo (ID: ${purchaseProdID})`);
      //   },
      // });
    },
    loadPurchaseProducts(purchaseID, position) {
      const vm = this;
      this.conectToDB({
        file: 'Purchases', action: 'getPurchaseProducts', params: { purchaseID: purchaseID, isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.$set(vm.Purchases[position], 'Products', res.data.data)
          console.log('Pur_products:');
          console.log(vm.Purchases[position].Products);
        },
      });
    },
    loadPurchases() {
      const vm = this;
      this.conectToDB({
        file: 'Purchases', action: 'getPurchase', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.Purchases = res.data.data;
          console.log('PURCHASES:');
          console.log(res.data.data);
          for (let i in vm.Purchases) {
            vm.loadPurchaseProducts(vm.Purchases[i].id, i);
          }
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    modifyPurchaseProduct(params) {
      // const vm = this;
      // this.conectToDB({
      //   file: 'Purchases',
      //   action: 'modifyPurchaseProducts',
      //   params: params,
      //   success: function(res){
      //     if (res.data.error) { console.log(res.data.data); return; }
      //     console.log('Producto modificado');
      //   },
      // });
    }, // modifyPurchaseProduct()
    reportIssueProduct(Product) {
      console.log(Product);
    },
    reportIssuePurchase(Purchase) {
      console.log(Purchase);
    },
    startNewPurchase() {
      console.log('nueva venta');
    },
  }, // METHODS
}
</script>















<style lang="scss">
  .payment0{ color:rgb(255, 159, 67); } // Error
  .payment1 { color: #209353 } // Efectivo
  .payment2 { color: #1F1590 } // Tarjeta

  .productAmount {
    font-weight: bold;
  }
</style>
