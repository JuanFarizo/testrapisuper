<template>
  <div class="vx-col w-full md:w-1/3 mb-base">
    <vx-card title="Resumen objetivos">
      <template slot="actions">
        <feather-icon icon="HelpCircleIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
      </template>
      <!-- CHART -->
      <template slot="no-body">
        <div class="mt-10">
          <vue-apex-charts type=radialBar height=240
          :options="analyticsData.chartOptions"
          :series="analyticsData.series"
          />
        </div>
      </template>
      <!-- DATA -->
      <div class="flex justify-between text-center" slot="no-body-bottom">
        <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
          <p class="mt-4">Sucursales hechas</p>
          <p class="mb-4 text-3xl font-semibold">1</p>
        </div>
        <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
          <p class="mt-4">Meta sucursales</p>
          <p class="mb-4 text-3xl font-semibold">10</p>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import analyticsData from './analyticsData/metaDeSucursales.js';
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    VueApexCharts,
  }, // COMPONENTS
  data() {
    return {
      analyticsData: analyticsData,
    } // return DATA
  }, // DATA
} // export default
</script>

<style lang="scss" scoped>
</style>
