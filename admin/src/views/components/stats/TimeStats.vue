<template>
  <div class="vx-row" style="display: none;">
    <div class="vx-col w-full mb-base">
      <vx-card>
        <div class="vx-row flex-col-reverse lg:flex-row">

          <!-- LEFT COL -->
          <div class="vx-col w-full lg:w-1/3 xl:w-1/4 flex flex-col justify-between">
            <div>
              <h2 class="mb-1 font-bold">De 10 a 10:30</h2>
              <span class="font-medium">El horario más usado</span>
              <!-- <p class="mt-2 text-xl font-medium"><span class='text-success'>+5.2%</span> vs last 7 days</p> -->
            </div>
            <!-- <vs-button icon-pack="feather" icon="icon-chevrons-right" icon-after class="shadow-md w-full lg:mt-0 mt-4">
              View Details
            </vs-button> -->
          </div>

          <!-- RIGHT COL -->
          <div class="vx-col w-full lg:w-2/3 xl:w-3/4 flex flex-col lg:mb-0 mb-base">
            <!-- <change-time-duratioChangeTimeDurationDropdownn-dropdown class="self-end" /> -->
            <vue-apex-charts type=bar height=200
            :options="analyticsData.timePreferences.chartOptions"
            :series="analyticsData.timePreferences.series" />
          </div>

        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
