<template>
  <div>
    <!--
    load sales where Date > fechaHaceUnMes
    get lista de productos comprados en esas Ventas
    filtrar esos productos según categoría
    sumarlos
    -->

    <vx-card title="Ventas por categoría">
      <div class="mb-3" style="width: 250px;">
        <v-select v-model="SelectedCategory"
        :options="allCategories" label="name"></v-select>
      </div>
      <h5>$ {{ addPoints(total) }} en el último mes</h5>
    </vx-card>
  </div>
</template>

<script>
import vSelect from 'vue-select';
export default {
  components: {
    'v-select': vSelect,
  },

  data() {
    return {
      total: 0,
      SelectedCategory: {
        id: 0,
        name: 'Nada'
      },
      allCategories: [],
      productsOfCategory: [],
    } // return  DATA
  }, // DATA

  watch: {
    'SelectedCategory.id': function() {
      this.loadProductsOfCategory();
    },
  }, // WATCH

  created() {
    this.loadProductsOfCategory();
    this.loadSalesTotal();
    this.loadAllCategories();
  }, // CREATED

  methods: {
    // loadAllCategories
    // loadProductsOfCategory
    // loadSalesTotal
    loadAllCategories() {
      let Params = { isActive: 1, }
      const vm = this;
      this.conectToDB({
        file: 'Categories', action: 'getCategory', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allCategories = res.data.data;
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    loadProductsOfCategory() {
      let Params = {
        isActive: 1,
        categoryID: this.SelectedCategory.id,
      }
      const vm = this;
      this.conectToDB({
        file: 'Categories', action: 'getProductsOfCategory', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.productsOfCategory = res.data.data;
          console.log(res.data.data);
          vm.loadSalesTotal();
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    loadSalesTotal() {
      let Params = {
        // isActive: 1,
        receptionDateMax: '02-02-2020',
      }
      const vm = this;
      this.conectToDB({
        file: 'Sales', action: 'getSaleTotal', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log(res.data.data[0].total);
          vm.total = vm.showPrice(res.data.data[0].total);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
  }, // METHODS

} // export default
</script>

<style lang="css" scoped>
</style>
