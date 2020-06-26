<template>
  <div class="vx-col w-full md:w-1/2 lg:mt-0 mb-base">
    <vx-card title="Facturación diaria">
      <!-- SLOT = ACTIONS -->
      <template slot="actions">
        <change-day @changeDay="daysOfDiference = $event; loadSales()"/>
      </template>

      <div slot="no-body">
        <div class="mt-3" style="margin-left: 21px; font-size: 16px;">
        <b>Total:</b> {{ DailySalesTotal.invoicing | pricing }}
        - ({{ DailySalesTotal.sales }} ventas)
        </div>
        <!-- CHART -->
        <vue-apex-charts v-if="DailySalesTotal.sales" type="pie" height="196" class="mt-10 mb-10"
        :options="analyticsData.chartOptions"
        :series="analyticsData.series"
        />
        <div v-else class="noChartMsg">
          <div v-if="!analyticsData.selectedDate">
            Aun no hay ventas hoy
          </div>
          <div v-else>
            El día seleccionado no hubo ventas
          </div>
        </div>
        <div class="w-full pr-5 pb-2" style="display: flex; justify-content: flex-end">
          <vs-checkbox v-model="onlyEntregado" @change="calculateDailySales()">Solo los cobrados</vs-checkbox>
        </div>
        <!-- CHART DATA -->
        <ul class="mb-1">
          <li v-for="dailySales in analyticsData.analyticsData"
          :key="dailySales.paymentType"
          class="flex justify-between py-3 px-6 border d-theme-border-grey-light border-solid border-r-0 border-l-0 border-b-0">
            <span class="flex items-center">
              <span class="inline-block h-3 w-3 rounded-full mr-2" :class="`bg-${dailySales.color}`"></span>
              <span class="font-semibold">{{ dailySales.paymentType }}</span>
            </span>
            <span>{{ dailySales.counts }}</span>
          </li>
        </ul>
      </div>
    </vx-card>
  </div>
</template>

<script>
import analyticsData from './analyticsData/dailySales.js';
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    ChangeDay: () => import('@/../../Dual/components/ChangeDay.vue'),
    VueApexCharts,
  },
  props: {
    // allSales: { type: Array, required: true, },
  },
  data() {
    return {
      DailySalesTotal: { invoicing: 0.0, sales: 0, },
      daysOfDiference: 0,

      onlyEntregado: false,
      analyticsData: analyticsData,
    } // return DATA
  }, // DATA
  watch: {
    // allSales(val) {
    //   this.calculateDailySales();
    // },
  }, // WATCH
  created() {
    this.loadSales();
  }, // CREATED
  methods: {
    // dailySales
    // loadSales

    calculateDailySales() {
      console.log('recalculo ventas diarias');
      this.analyticsData.selectedDate = this.daysOfDiference;
      let Total = {
        Cash: { invoicing: 0.0, sales: 0 },
        Card: { invoicing: 0.0, sales: 0 },
        Mercadopago: { invoicing: 0.0, sales: 0 },
      }
      for (let Sale of this.allSales) {
        if (this.onlyEntregado && Sale.stateID != this._localDB.SaleStateIDs.Entregado) continue;
        console.log('paso');
        console.log(Sale);
        if (Sale.paymentTypeID == this._localDB.SalePaymentTypeIDs.Efectivo) {
          Total.Cash.invoicing += +Sale.totalTotal;
          Total.Cash.sales++;
        } else if (Sale.paymentTypeID == this._localDB.SalePaymentTypeIDs.Tarjeta) {
          Total.Card.invoicing += Sale.totalTotal;
          Total.Card.sales++;
        } else if (Sale.paymentTypeID == this._localDB.SalePaymentTypeIDs.Mercadopago) {
          Total.Mercadopago.invoicing += Sale.totalTotal;
          Total.Mercadopago.sales++;
        }
      }
      // Save data
      this.DailySalesTotal.invoicing = Total.Cash.invoicing + Total.Card.invoicing + Total.Mercadopago.invoicing;
      this.DailySalesTotal.sales = Total.Cash.sales + Total.Card.sales + Total.Mercadopago.sales;
      this.analyticsData.series = [
        Total.Cash.invoicing,
        Total.Card.invoicing,
        Total.Mercadopago.invoicing,
      ]
      console.log(Total);
      this.analyticsData.analyticsData[0].counts = `${this.pricing(Total.Cash.invoicing)} - (${Total.Cash.sales} venta${Total.Cash.sales != 1 ? 's' : ''})`;
      this.analyticsData.analyticsData[1].counts = `${this.pricing(Total.Card.invoicing)} - (${Total.Card.sales} venta${Total.Card.sales != 1 ? 's' : ''})`;
      this.analyticsData.analyticsData[2].counts = `${this.pricing(Total.Mercadopago.invoicing)} - (${Total.Mercadopago.sales} venta${Total.Mercadopago.sales != 1 ? 's' : ''})`;
    },

    loadSales() {
      let Params = {
        noStateID: this._localDB.SaleStateIDs.Cancelado,
        branchID: this.getBranchID(),
        hasBuyerEmployeeID: false,
        receptionDate: this.getActualDateToDB({day: this.daysOfDiference}),
      }
      const vm = this;
      this.conectToDB({
        file: 'Sales', action: 'getSale', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allSales = res.data.data;
          vm.calculateDailySales();
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
</style>
