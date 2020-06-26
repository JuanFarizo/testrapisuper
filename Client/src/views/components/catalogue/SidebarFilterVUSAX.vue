<template>
  <!-- FILTROS -->
  <vs-sidebar
    v-if="isFilterSidebarActive"
    class="items-no-padding vs-sidebar-rounded background-absolute"
    parent="#filterSidebar"
    :click-not-close="clickNotClose"
    :hidden-background="clickNotClose"
    v-model="isFilterSidebarActiveStatic"
  >
  <div class="closeSidebarClear" @click="toggleFilterSidebar()">
    <font-awesome-icon icon="times" class="secondaryColor"/>
  </div>
  <div class="p-6 filter-container">
      <!-- MIN AND MAX PRICE -->
      <!-- <h6 class="font-bold mb-0">Precio</h6>
        <div>
          <vs-slider
            class="algolia-price-slider"
            text-fixed="$"
            :min="0"
            :max="1000"
            v-model="Query.rangePrice"
          />
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full">
              <vs-input label="Mínimo" v-model="localMinPrice" icon-no-border icon="attach_money" type="number" class="w-full"/>
            </div>
            <div class="vx-col sm:w-1/2 w-full">
              <vs-input label="Máximo" v-model="localMaxPrice" icon-no-border icon="attach_money" type="number" class="w-full"/>
            </div>
          </div>
        </div>

      <vs-divider/> -->

      <!-- CATEGORIES -->
      <!-- <h6 v-if="selectedCategoryLocalID == 0" class="font-bold">Categoría</h6> -->
      <!-- Breacrumbs -->
      <!-- <div v-else class="categoriesBreadCrumbs mb-3">
        <ul>
          <li @click="selectedCategoryLocalID = 0" class="categoriesBreadCrumbs-item">Catálogo</li>
          <li v-for="Item in categoriesBreadCrumbs">
            <font-awesome-icon icon="chevron-right" class="icon"/>
            <span @click="selectedCategoryLocalID = Item.id" class="categoriesBreadCrumbs-item">
              {{ Item.name }}
            </span>
          </li>
        </ul>
      </div> -->
      <!-- Subcategories -->
      <!-- <div class="selectedCategory" v-if="Query.Category.name">
        {{ Query.Category.name }}
        <div class="selectedCategory-clear" @click="clearCategory()">
          <font-awesome-icon icon="times"/>
        </div>
      </div>
      <div v-if="allSubcategories.length">
        <ul>
          <li v-for="Item in allSubcategories" v-if="Item.amount" class="mb-2 flex items-center justify-between">
              <vs-radio v-model="selectedCategoryLocalID" vs-name="category" :vs-value="Item.id">{{ Item.name }}</vs-radio>

            <span>({{ Item.amount }})</span>

          </li>
        </ul>
      </div> -->

      <!-- <vs-divider/> -->

      <!-- BRANDS -->
      <h6 class="font-bold" v-if="totalProductsAmount">Marca</h6>
      <div>
        <ul>
          <li v-for="Item in allBrandsFilter"class="mb-2 flex items-center justify-between"
          v-if="(Item.amount && localSelectedBrandID == 0) || localSelectedBrandID == Item.id">
            <vs-radio v-model="localSelectedBrandID" vs-name="brand" :vs-value="Item.id">
              {{ Item.name }}
            </vs-radio>
            <!-- <vs-checkbox v-model="item.isSelected" class="ml-0" @click="clickOnBrandCheckbox(item)">
              {{ item.name }}
            </vs-checkbox> -->
            <span>({{ Item.amount }})</span>
          </li>

          <li v-if="localSelectedBrandID != 0" class="mb-2 flex items-center justify-between">
            <vs-radio v-model="localSelectedBrandID" vs-name="brand" :vs-value="0">Todas las marcas</vs-radio>
            <span>({{ _allProductsOfBranch.length }})</span>
          </li>
        </ul>
      </div>

      <vs-divider/> <!-- ========== ========== ========== ========== ==========  -->

      <div v-if="isFilterUsed" class="flex justify-center">
        <vs-button @click="resetFilter()" v-if="isFilterUsed">
          LIMPIAR FILTROS
        </vs-button>
      </div>
    </div>
  </vs-sidebar v-if="totalProductsAmount">
</template>

<script>
export default {
  props: {
    clickNotClose: { type: Boolean, required: true, },
    totalProductsAmount: { type: Number, required: true, },
    isFilterSidebarActive: { type: Boolean, required: true, },
    allBrandsFilter: { type: Array, required: true, },
    CategoriesFilter: { type: Array, required: true, },
  }, // PROPS
  data() {
    return {
      categoriesBreadCrumbs: [],
      allSubcategories: [],
      isFilterSidebarActiveStatic: true,
    }; // return DATA
  }, // DATA
  created() {
  }, // CREATED
  computed: {
    selectedCategoryLocalID: {
      get() {
        return this.Query.Category.id;
      },
      set(val) {
        this.$store.dispatch('products/updateQueryCategory', val);
      },
    },
    localSelectedBrandID: {
      get() {
        return this.Query.Brand.id;
      },
      set(val) {
        this.$store.dispatch('products/updateQueryBrand', val);
      },
    },
  }, // COMPUTED
  watch: {
  }, // WATCH
  methods: {
    // clearCategory
    // toggleFilterSidebar
    clearCategory() {
      this.$store.dispatch('products/updateQueryCategory', this.Query.Category.parentID);
    },
    toggleFilterSidebar() {
      this.$emit('toggleFilterSidebar')
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

.closeSidebarClear {
  position: absolute;
  right: 0;
  padding: 10px 15px;
  font-size: 25px;
  margin-top: 5px;
  margin-right: 5px;
  z-index: 1;
  cursor: pointer;
  @media (min-width: 978px) {
    display: none;
  }
}

// Selected Category
.selectedCategory {
  box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
  background-color: lightblue;
  border-radius: 5px;
  padding: 5px 15px;
  color: #22223E;
  font-weight: bold;
  margin-bottom: 15px;
  padding-right: 30px;
  position: relative;
}
.selectedCategory-clear {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px 10px;
  cursor: pointer;
}

// Categories BreadCrumbs
.categoriesBreadCrumbs ul li {
  display: inline-block;
}
.categoriesBreadCrumbs-item:hover {
  color: #15B0CE;
  cursor: pointer;
}
.categoriesBreadCrumbs ul li .icon {
  font-size: 10px;
  margin: 0px 5px;
}

</style>
