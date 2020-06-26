<template>
  <div class="vx-row">
    <!-- LINE CHART -->
    <div class="vx-col w-full md:w-3/3 mb-base">
      <vx-card title="Facturación">
        <template slot="actions">
          <feather-icon icon="SettingsIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
        </template>
        <div slot="no-body" class="p-6 pb-0">
          <div class="flex">
            <div class="mr-6">
              <p class="mb-1 font-semibold">Este mes</p>
              <p class="text-3xl text-success"><sup class="text-base mr-1">$</sup>
                {{ addPoints(Invoicing.actualMonth) }}
              </p>
            </div>
            <div>
              <p class="mb-1 font-semibold">Mes anterior</p>
              <p class="text-3xl"><sup class="text-base mr-1">$</sup>
                {{ addPoints(Invoicing.lastMonth) }}
              </p>
            </div>
          </div>
          <vue-apex-charts ref="monthInvoicingChart" type=line height=266 :options="analyticsData.chartOptions" :series="analyticsData.series" />
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import analyticsData from './analyticsData/monthInvoicing.js';
import VueApexCharts from 'vue-apexcharts';
export default {
  components: {
    VueApexCharts,
  }, // COMPONENTS
  props: {
    allSales: { type: Array, required: true, },
  }, // PROPS
  data() {
    return {
      Invoicing: {
        total: 0,
        actualMonth: 0,
        lastMonth: 0,
      },
      DailySalesAverage: { invoicing: 0.0, sales: 0, },
      analyticsData: analyticsData,
    } // return DATA
  }, // DATA
  watch: {
    allSales() {
      let needsUpdate = true;
      this.calculateSales(needsUpdate);
    },
  },
  created() {
    if (this.allSales.length) {
      this.calculateSales()
    }
  },
  methods: {
    calculateSales(needsUpdate = false) {
      const vm = this;
      let Sales = this.allSales;
      let totalAmountPurchases = Sales.length;
      let totalInvoicing = 0;
      let actualMonthInvoicing = 0;
      let lastMonthInvoicing = 0;
      let actualMonth = vm.getActualMonth();
      let actualDayOfMonth = vm.getActualDayOfMonth();
      let lastMonth = vm.getActualMonth({ month: -1 });
      let DailyInvoicing = { actualMonth: [], lastMonth: [], }
      let DailySales = {
        Efectivo:    { invoicing: 0.0, sales: 0, },
        Tarjeta:     { invoicing: 0.0, sales: 0, },
        Mercadopago: { invoicing: 0.0, sales: 0, },
      }
      let paymentType = [
        0, // efectivo
        0, // tarjeta
        0, // mercadopago
        0, // Qr
      ];
      let daysOpened = 0;
      // set all to 0
      for (var i = 0; i <= 30; i++) {
        DailyInvoicing.actualMonth[i] = 0;
        DailyInvoicing.lastMonth[i] = 0;
      }
      let lastDate = '';
      for (let Sale of Sales) {
        let newDate = vm.getDayOfDB(Sale.date);
        if (newDate != lastDate) {
          daysOpened++;
          lastDate = newDate;
        }
        // paymentType
        paymentType[Sale.paymentTypeID-1]++;
        let dayOfMonth = vm.getDayOfDB(Sale.receptionDate);
        // vm.calculateProducts(Sale.id);
        // Actual month
        if (actualMonth == vm.getMonthOfDB(Sale.receptionDate)) {
          actualMonthInvoicing += Sale.totalTotal;
          // Day Invoicing
          DailyInvoicing.actualMonth[dayOfMonth-1] += +Sale.totalTotal;
          // DailySales
          if (actualDayOfMonth == vm.getDayOfDB(Sale.receptionDate)) {
            for (let paymentType in vm._localDB.SalePaymentTypeIDs) {
              let paymentTypeID = vm._localDB.SalePaymentTypeIDs[paymentType];
              if (Sale.paymentTypeID == paymentTypeID) {
                DailySales[paymentType].invoicing += Sale.totalTotal;
                DailySales[paymentType].sales++;
              }
            }
          } // actual day of month
        } // actual month
        // Last month
        if (lastMonth == vm.getMonthOfDB(Sale.receptionDate)) {
          // Day Invoicing
          lastMonthInvoicing += Sale.totalTotal;
          DailyInvoicing.lastMonth[dayOfMonth-1] += +Sale.totalTotal;
        }

      totalInvoicing += +Sale.totalTotal;
    } // for sales

      vm.DailySalesAverage.invoicing = (totalInvoicing / daysOpened);
      // diario * 100 / promedio
      // vm.analyticsData.averageInvoicing.series = [parseInt(vm.DailySalesTotal.invoicing * 100 / vm.DailySalesAverage.invoicing)];
      //
      vm.Invoicing.actualMonth = this.showPrice(actualMonthInvoicing);
      vm.Invoicing.lastMonth   = this.showPrice(lastMonthInvoicing);
      vm.Invoicing.total       = this.showPrice(totalInvoicing);
      // vm.analyticsData.paymentType.series = paymentType;
      // for (var i = 0; i < paymentType.length; i++) {
      //   vm.analyticsData.paymentType.analyticsData[i].counts = paymentType[i]+
      //   ` (${(paymentType[i] *100 / totalAmountPurchases).toFixed(1)}%)`;
      // }

      let chart1 = DailyInvoicing.actualMonth;
      let chart2 = DailyInvoicing.lastMonth;
      vm.analyticsData.series[0].data = chart1;
      vm.analyticsData.series[1].data = chart2;

      // UPDATE CHARTS
      if (!needsUpdate) return;
      vm.$refs.monthInvoicingChart.updateSeries([
        { name: "Este mes", data: chart1 },
        { name: "Mes anterior", data: chart2 }
      ])

      // vm.dailySales();
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
</style>
