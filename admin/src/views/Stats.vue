<template>
  <div>

    <!-- <SalesByCategory/> -->
    <!-- <TimeStats/> -->
    <div class="vx-row mt-base">
      <DailySales/>
      <!-- <DailyInvoicingObjetive/> -->
      <!-- <GeneralSummary/> -->
    </div>

    <MonthInvoicing :allSales="Sales"/>

    <div class="vx-row">
      <!-- <MetaDeSucursales/> -->
      <!-- <PaymentType/> -->
    </div> <!-- vx-row -->

    <TotalStock v-if="_Branch.usesStock"/>
    <!-- <SessionsByDevice/> -->

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
// import statsItems from "./components/statsItems.js";
import analyticsData from './components/stats/analyticsData.js';

export default{
  components: {
    // page parts
    SalesByCategory: () => import('./components/stats/SalesByCategory.vue'), /* Sin terminar */
    TimeStats: () => import('./components/stats/TimeStats.vue'), /* Sin terminar */
    DailySales: () => import('./components/stats/DailySales.vue'),
    DailyInvoicingObjetive: () => import('./components/stats/DailyInvoicingObjetive.vue'), /* FALTA CORREGIR */
    GeneralSummary: () => import('./components/stats/GeneralSummary.vue'), /* FALTA CORREGIR */
    MonthInvoicing: () => import('./components/stats/MonthInvoicing.vue'), /* FALTA CORREGIR */
    MetaDeSucursales: () => import('./components/stats/MetaDeSucursales.vue'), /* FALTA CORREGIR */
    PaymentType: () => import('./components/stats/PaymentType.vue'), /* FALTA CORREGIR */
    TotalStock: () => import('./components/stats/TotalStock.vue'),
    SessionsByDevice: () => import('./components/stats/SessionsByDevice.vue'), /* FALTA CORREGIR */
    // components
    StatisticsCardLine: () => import('@/../../Dual/components/statistics-cards/StatisticsCardLine.vue'),
    ChangeTimeDurationDropdown: () => import('@/../../Dual/components/ChangeTimeDurationDropdown.vue'),
    ChangeTimeDayDropdown: () => import('@/../../Dual/components/ChangeTimeDayDropdown.vue'),
    VueApexCharts,
  },
  data() {
    return {
      // staticsItems: sidebarItems,
      statsData: {
        totalBuyers: 0,
        totalProductsPurchased: 0,
      },
      Sales: [],
      analyticsData: analyticsData,
    }; // return DATA
  }, // DATA
  filters: {

  },
  created() {
    // this.calculateBuyers();
    this.loadSales();
  }, // CREATED
  methods: {
    // calculateBuyers
    // calculateProducts
    // loadSales
    calculateBuyers() {
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'getBuyer', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.statsData.totalBuyers = res.data.data.length;
        },
      });
    },
    calculateProducts(saleID) {
      const vm = this;
      this.conectToDB({
        file: 'Sales', action: 'getSaleProducts', params: { saleID: saleID },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let Products = res.data.data;
          let totalProductsOfSale = 0;
          for (let Prod of Products) {
            totalProductsOfSale += +Prod.amount;
          }
          vm.statsData.totalProductsPurchased += +totalProductsOfSale;
        },
      });
    },
    loadSales() {
      let Params = {
        noStateID: this._localDB.SaleStateIDs.Cancelado,
        branchID: this.getBranchID(),
        hasBuyerEmployeeID: false,
      }
      const vm = this;
      this.conectToDB({
        file: 'Sales', action: 'getSale', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.Sales = res.data.data;
          // this.calculateSales();
        },
      });
    },
  }, // METHODS
} // export default
</script>

<style lang="scss">
  .noChartMsg {
    height: 157px;
    line-height: 157px;
    text-align: center;
    opacity: 0.6;
    font-style: italic;
    font-size: 16px;
    margin: 35px 0;
  }
</style>
