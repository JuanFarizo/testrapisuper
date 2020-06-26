<template>
  <!-- PAYMENT TYPE -->
  <div class="vx-col w-full lg:w-1/3 lg:mt-0 mt-base">
    <vx-card title="Pagos">
      <!-- SLOT = ACTIONS -->
      <template slot="actions">
        <change-time-duration-dropdown />
      </template>

      <div slot="no-body">
        <!-- CHART -->
        <vue-apex-charts type=pie height=345 class="mt-10 mb-10"
        :options="analyticsData.chartOptions"
        :series="analyticsData.series"
        />
        <!-- CHART DATA -->
        <ul class="mb-1">
          <li v-for="paymentType in analyticsData.analyticsData"
          :key="paymentType.customerType"
          class="flex justify-between py-3 px-6 border d-theme-border-grey-light border-solid border-r-0 border-l-0 border-b-0">
            <span class="flex items-center">
              <span class="inline-block h-3 w-3 rounded-full mr-2" :class="`bg-${paymentType.color}`"></span>
              <span class="font-semibold">{{ paymentType.customerType }}</span>
            </span>
            <span>{{ paymentType.counts }}</span>
          </li>
        </ul>
      </div>
    </vx-card>
  </div>
</template>

<script>
import analyticsData from './analyticsData/paymentType.js';
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    ChangeTimeDurationDropdown: () => import('@/../../Dual/components/ChangeTimeDurationDropdown.vue'),
    VueApexCharts,
  }, // components
  data() {
    return {
      analyticsData: analyticsData,
    } // return DATA
  }, // DATA
} // export default
</script>

<style lang="scss" scoped>
</style>
