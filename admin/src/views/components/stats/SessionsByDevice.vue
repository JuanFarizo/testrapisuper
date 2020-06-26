<template>
  <!-- Sessions By Device -->
  <div class="vx-col w-full lg:w-1/3 lg:mt-0 mt-base" style="display: none">
    <vx-card title="Usos por dispositivo">
      <!-- SLOT = ACTIONS -->
      <template slot="actions">
        <change-time-duration-dropdown />
      </template>

      <div slot="no-body">
        <vue-apex-charts class="mt-6 mb-8" type=donut height=325 :options="analyticsData.sessionsByDeviceDonut.chartOptions" :series="analyticsData.sessionsByDeviceDonut.series" />
      </div>

      <ul class="mt-6">
        <li v-for="deviceData in analyticsData.sessionsByDeviceDonut.analyticsData" :key="deviceData.device" class="flex mb-3">
          <feather-icon :icon="deviceData.icon" :svgClasses="[`h-5 w-5 stroke-current text-${deviceData.color}`]"></feather-icon>
          <span class="ml-2 inline-block font-semibold">{{ deviceData.device }}</span>
          <span class="mx-2">-</span>
          <span class="mr-4">{{ deviceData.sessionsPercentgae }}%</span>
          <div class="ml-auto flex -mr-1">
            <span class="mr-1">{{ deviceData.comparedResultPercentage }}%</span>
            <feather-icon :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>
          </div>
        </li>
      </ul>
    </vx-card>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
