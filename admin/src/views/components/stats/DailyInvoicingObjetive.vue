<template>
  <!-- Objetivo facturación diaria -->
  <div class="vx-col w-full md:w-1/2 mb-base">
    <vx-card title="Objetivo facturación diaria">
      <template slot="actions">
        <change-time-day-dropdown />
      </template>
      <!-- CHART -->
      <template slot="no-body">
        <div class="mt-10">
          <vue-apex-charts type=radialBar height=240
          :options="analyticsData.averageInvoicing.chartOptions"
          :series="analyticsData.averageInvoicing.series"
          />
        </div>
      </template>
      <!-- DATA -->
      <div class="flex justify-between text-center" slot="no-body-bottom">
        <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
          <p class="mt-4">Facturacion del día</p>
          <p class="mb-4 text-3xl font-semibold">{{ statsData.DailySalesTotal.invoicing | pricing }}</p>
        </div>
        <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
          <p class="mt-4">Facturación diaria promedio</p>
          <p class="mb-4 text-3xl font-semibold">{{ statsData.DailySalesAverage.invoicing | pricing }}</p>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
