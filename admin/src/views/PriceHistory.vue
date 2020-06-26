<template>
  <div>

    <columns-manager
    :isPromptActive="IsPromptActive.columnsManager"
    :HideableColumns="Columns"
    :isHidden="isHidden"
    @updatePromptColumns="isHidden = $event;"
    @closePromptColumns="IsPromptActive.columnsManager = false;"
    />

    <vs-table ref="table" :data="allPriceHistory" pagination :max-items="itemsPerPage" noDataText="No hay cambios de precios">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">

          <!-- Filter -->
          <div class="">
            <label class="vSelectLabel" style="display: block; margin-left: 10px;">Producto</label>
            <v-select class="tableHeaderItem" v-model="filterProductID"
            :options="allProducts" :reduce="ProdOfBranch => ProdOfBranch.productID" label="fullName"
            style="display: inline-block; min-width: 180px"></v-select>
          </div>

        </div> <!-- .tableHeader -->

        <TableHeaderActions
        :vmMain="getThis()"
        :itemsLength="allPriceHistory.length"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @newItemsPerPage="itemsPerPage = $event"
        @searchInput="search = $event; loadPriceHistory()"
        />

      </div> <!-- header -->


      <template slot="thead">
        <vs-th v-for="Col in Columns" v-if="!isHidden[Col.name] && (!Col.onlyMainHouse ? true : isMainHouse())" :class="Col.nowrap == false ? '' : 'nowrap'">
          {{ Col.title }}
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <!-- id -->
          <vs-td v-if="!isHidden.id" class="autoWidth">
            <vs-chip color="primary">{{ tr.id }}</vs-chip>
          </vs-td>
          <!-- img -->
          <vs-td v-if="!isHidden.img" class="autoWidth">
            <div class="imgContainer imgContainer-s">
              <img :src="getImgDual(`${tr.realProductID}-1`)">
            </div>
          </vs-td>
          <!-- price -->
          <vs-td v-if="!isHidden.price" class="autoWidth">
            <!-- <vs-chip :color="tr.price >= 0 ? 'success' : 'danger'"> -->
            ${{ showPrice(tr.price) }}
            <!-- </vs-chip> -->
          </vs-td>
          <!-- product -->
          <vs-td v-if="!isHidden.product">
            {{ tr.product }}
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>

  </div>
</template>

<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
export default {
  mixins: [vsTableConfig],
  data() {
    return {
      allPriceHistory: [],
      allProducts: [],
      search: '',
      filterProductID: null,

      // static
      itemsPerPage: 50,
      Columns: [
        { name: 'id'      , title: 'ID', },
        { name: 'img'     , title: 'Img', },
        { name: 'price'   , title: 'Precio', },
        { name: 'product' , title: 'Producto', },
      ],
      selectedProfile: 0,
      Profiles: [
        [ 'id', ],
      ],
    };
  }, // DATA

  watch: {
    filterProductID(val) {
      if (val == null) {
        this.$nextTick(() => {
          this.filterProductID = 0;
        });
      }
      this.loadPriceHistory();
    }
  },

  created() {
    this.loadPriceHistory();
    this.loadProducts();
  }, // CREATED
  methods: {
    // loadPriceHistory
    // loadProducts
    loadPriceHistory() {
      let Params = {
        branchID: this.getBranchID(),
        search: this.search,
      }
      if (this.filterProductID) {
        Params.productID = this.filterProductID;
      }
      this.conectToDB({
        file: 'PriceHistory', action: 'getPriceHistory', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.allPriceHistory = res.data.data;
          console.log('allPriceHistory', this.allPriceHistory);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    loadProducts() {
      let Params = {
        branchID: this.getBranchID(),
        isActive: 1,
      }
      this.conectToDB({
        file: 'Products', action: 'getProductOfBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allProducts = res.data.data;
          let showAll = {
            id: 0,
            fullName: 'Todos'
          }
          allProducts.unshift(showAll);
          this.allProducts = allProducts;
          this.filterProductID = 0;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
</style>
