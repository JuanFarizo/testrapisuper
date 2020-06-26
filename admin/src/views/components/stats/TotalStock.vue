<template>
  <div class="vx-col w-full lg:w-1/3 lg:mt-0 mt-base">
    <vx-card title="Capital total en Stock">

        <h3 class="text-center py-5">${{ addPoints(totalStockPrice) }}</h3>

    </vx-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalStockPrice: 0,
    } // return DATA
  }, // DATA
  created() {
    this.calcultateTotalStock();
  }, // CREATED
  methods: {
    calcultateTotalStock() {
      const vm = this;
      let Params = {
        branchID: this.getBranchID(),
      }
      this.conectToDB({
        file: 'Stats', action: 'getTotalStockPrice', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.totalStockPrice = res.data.data[0].absoluteTotal;
        },
      });
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
</style>
