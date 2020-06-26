<template>
  <div class="mb-5">

    <PromptAssignCategoryToProduct
    :Product="ProductToAssignCategory"
    :allCategories="allCategories"
    :allProductsCategories="allProductsCategories"
    :isPromptActive="IsPromptActive.assignCategory"
    @closePrompt="IsPromptActive.assignCategory = false"
    />

    <PromptSelectCategory
    :categories="allCategories"
    :isPromptActive="IsPromptActive.selectCategory"
    @closePrompt="IsPromptActive.selectCategory = false; addByCategory = false;"
    @selectCategory="CategoryToAddProduct = $event; addByCategory = true"
    />

  <!-- <div v-show="filteredProducts.length" class="mb-5"> -->
    <vs-collapse type="border">
     <vs-collapse-item>
        <div slot="header">
          <span>({{ filteredProducts.length }}) </span>
          <b>Agregar por: </b>
          <span v-if="onlyNoSons">productos sin categoría asignada</span>
          <span v-else>productos</span>
        </div>
        <!-- TABLE Product without categories -->
        <vs-table ref="table2" :data="filteredProducts" pagination :max-items="itemsPerPage" noDataText="No hay ningún producto sin categoría">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between" style="padding-bottom: 14px;">

            <!-- change filteredProducts -->
            <!-- ref="loadableButton" -->
            <vs-button @click="onlyNoSons = !onlyNoSons"
            type="border"
            class="vs-con-loading__container"
            id="changeOnlyNoSons">
              <font-awesome-icon icon="exchange-alt"/>
              {{ onlyNoSons ? 'Todos los productos' : 'Productos sin categoría' }}
            </vs-button>
            <!-- change add by method -->
            <!-- <vs-button class="mr-3" color="primary" type="border"
              @click="addByCategory = !addByCategory">
              <font-awesome-icon icon="exchange-alt"/>
              {{ !addByCategory ? 'Agregar por categoría' : 'Agregar por producto' }}
            </vs-button> -->

            <div v-if="addByCategory">
              Agregando productos a la categoría: <b>{{ CategoryToAddProduct.name }}</b>
            </div>

            <!-- right side -->
            <div style="display: inline-block;">

              <div style="display: inline-block;">
                <items-per-page :itemsLength="filteredProducts.length" :currentPage ="currentPage2" :itemsPerPage ="itemsPerPage"/>
              </div>

              <div style="display: inline-block;">
                <vs-input v-model="search" @input="checkSearchTimer()" placeholder="Buscar..."/>
              </div>

            </div>
          </div> <!-- header -->

          <!-- TITLES -->
          <template slot="thead">
            <vs-th v-if="!isHidden.productID" class="nowrap">Prod ID</vs-th>
            <vs-th v-if="addByCategory">Agregar</vs-th>
            <vs-th v-if="!addByCategory">Asignar categoría</vs-th>
            <vs-th>Img</vs-th>
            <vs-th sort-key="product">Producto</vs-th>
          </template>

          <!-- ITEMS -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="`noCategories-${tr.id}`"
            v-if="tr.isVisible" v-for="tr, indextr in data">
              <!-- productID -->
              <vs-td v-if="!isHidden.productID" :data="tr.id" class="autoWidth">
                <vs-chip color="primary" style="margin-left: 20px;">{{ tr.id }}</vs-chip>
              </vs-td>
              <!-- add to category -->
              <!-- <vs-td v-if="addByCategory" class="autoWidth">
                <vs-switch v-model="tr.added" @click="addProdToCategory(tr)"/>
              </vs-td> -->
              <!-- new supplier -->
              <vs-td v-else class="autoWidth">
                <vx-tooltip text="Asignar categoría">
                  <vs-button color="primary" type="border" icon="add" @click="assignCategoryStart(tr)"></vs-button>
                </vx-tooltip>
              </vs-td>
              <!-- img -->
              <vs-td class="smallPadding autoWidth">
                <div class="imgContainer">
                  <img :src="getImgDual(`${tr.id}-1`)">
                </div>
              </vs-td>
              <!-- product -->
              <vs-td class="nowrap">
                {{ tr.fullName }}
              </vs-td>
            </vs-tr>

          </template> <!-- filteredProducts Items -->
        </vs-table>
      </vs-collapse-item>
    </vs-collapse>
  </div>
</template>

<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
export default {
  mixins: [vsTableConfig],
  components: {
    PromptAssignCategoryToProduct: () => import('./PromptAssignCategoryToProduct.vue'),
    PromptSelectCategory: () => import('./PromptSelectCategory.vue'),
  },
  props: {
    allCategories: { type: Array, required: true, },
    allProductsCategories: { type: Array, required: true, },
  },
  data() {
    return {
      search: '',
      IsPromptActive: { assignCategory: false, selectCategory: false, },
      ProductToAssignCategory: { },
      addByCategory: false,
      itemsPerPage: 100,
      CategoryToAddProduct: { },
      onlyNoSons: false,
      allProducts: [],
      // static
      Columns: [
        { name: 'id'           , title: 'ID', },
        { name: 'productID'    , title: 'Prod ID', },
        { name: 'addToCategory', title: 'Agregar', },
        { name: 'img'          , title: 'Img', },
        { name: 'addProduct'   , title: 'Asignar categoría', },
        { name: 'product'      , title: 'Producto', },
      ],
      // selectedProfile: 0, // Lisandro
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id', 'productID' ],
      ],
    }; // return DATA
  }, // DATA
  computed: {
    filteredProducts() {
      this.openLoadingOfContainer('#changeOnlyNoSons');
      let filteredProducts = this.allProducts;
      if (this.onlyNoSons) {
        filteredProducts = [];
        for (let Prod of this.allProducts) {
          // Check if product has any category assigned
          let index = this.allProductsCategories.findIndex(i => i.productDetailsID == Prod.detailsID);
          // // If has not, add it to array
          if (index == -1) filteredProducts.push(Prod);
        } // for
      }
      this.closeLoadingOfContainer('#changeOnlyNoSons');
      return filteredProducts;
    },
  }, // COMPUTED
  watch: {
    addByCategory: function(value) {
      this.isHidden.addToCategory = !this.isHidden.addToCategory;
      this.isHidden.addProduct    = !this.isHidden.addProduct;
      if (value) {
        // add by category
        this.IsPromptActive.selectCategory = true;
      } else {
        // add by product
        this.CategoryToAddProduct = { }
      }
    },
    allProductsCategories: function() {
      // console.log('Camino1');
      this.checkProductsWithoutCategory();
    },
  }, // WATCH
  created() {
    this.loadAllProducts();
    this.checkProductsWithoutCategory();
  },
  methods: {
    // assignCategoryStart
    // checkProductsWithoutCategory
    addProdToCategory(Prod) {
      console.log(`Agrego a la categoría ${this.CategoryToAddProduct.name} el producto ${Prod.fullName}`);
    },
    assignCategoryStart(Prod) {
      console.log(Prod);
      this.ProductToAssignCategory = Prod;
      this.IsPromptActive.assignCategory = true;
    },
    checkProductsWithoutCategory() {

    },
    checkSearchTimer() {
      const search = this.search;
      const vm = this;
      setTimeout(() => {
        if (search == vm.search) {
          vm.filterSearchLocal();
        }
      }, this.doneTypingInterval);
    },
    filterSearchLocal() {
      let Params = {
        search: this.search,
        productsArray: this.filteredProducts,
        action: this.modifyProductVisibility,
      }
      this.filterSearch(Params);
    },

    modifyProductVisibility(Product, value) {
      Product.isVisible = value;
    },

    loadAllProducts() {
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProduct', params: { isNormal: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let allProducts = res.data.data;
          for (let Prod of allProducts) {
            Prod.isVisible = true;
          }
          vm.allProducts = allProducts;
        },
      });
    },
  }, // METHODS
}
</script>

<style lang="css" scoped>
</style>
