<template>
  <div>
    <!-- Clientes totales -->
    <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
      <statistics-card-line
      :chartData="analyticsData.subscribersGained"
      statisticTitle="Clientes totales"
      :statistic="statsData.totalBuyers | k_formatter"
      icon="UserIcon"
      type="area">
      </statistics-card-line>
    </div>

    <!-- Facturación total -->
    <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
      <statistics-card-line
      :chartData="analyticsData.revenueGenerated"
      statisticTitle="Facturación total"
      :statistic="statsData.Invoicing.total | k_formatter"
      icon="DollarSignIcon"
      color="success"
      type="area">
      </statistics-card-line>
    </div>

    <!-- Ventas totales -->
    <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
      <statistics-card-line
      :chartData="analyticsData.quarterlySales"
      statisticTitle="Ventas totales"
      :statistic="statsData.totalPurchases | k_formatter"
      icon="ShoppingCartIcon"
      color="danger"
      type="area">
      </statistics-card-line>
    </div>

    <!-- Productos vendidos -->
    <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
      <statistics-card-line
      :chartData="analyticsData.ordersRecevied"
      statisticTitle="Productos vendidos"
      :statistic="statsData.totalProductsPurchased | k_formatter"
      icon="ShoppingBagIcon"
      color="warning"
      type="area">
      </statistics-card-line>
    </div>

    <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
      <statistics-card-line
      :chartData="analyticsData.revenueGenerated"
      statisticTitle="Promedio ventas"
      :statistic="statsData.averagePurchase"
      icon="DollarSignIcon"
      color="success"
      type="area">
      </statistics-card-line>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
