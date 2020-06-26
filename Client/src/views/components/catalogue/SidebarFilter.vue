<style media="screen">
  #mySidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: white !important;
    width: 260px;
    z-index: 999;
    filter: drop-shadow(0 0 15px rgba(0,0,0,.05));
  }
  #mySidebar.mobile {
    position: fixed;
  }
</style>
<template>
  <!-- FILTROS -->
  <div>
    <div class="sidebarBackground" @click="toggleFilterSidebar()"
    v-if="isFilterSidebarActive && !clickNotClose"
    ></div>
    <div id="mySidebar" :class="{'mobile': !clickNotClose}"
    v-if="isFilterSidebarActive"
    >
    <VuePerfectScrollbar class="scrollArea" :settings="scrollbarSettings">




  <!-- <vs-sidebar
  class="items-no-padding vs-sidebar-rounded background-absolute"
    parent="#filterSidebar"
    :click-not-close="clickNotClose"
    v-model="isFilterSidebarActiveStatic"
  > -->
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
      <h6 v-if="localSelectedCategoryID == 0" class="font-bold mb-3">Categorías</h6>
      <!-- Breacrumbs -->
      <div v-else class="categoriesBreadCrumbs mb-3">
        <ul>
          <li @click="localSelectedCategoryID = 0" class="categoriesBreadCrumbs-item">Catálogo</li>
          <li v-for="Item in categoriesBreadCrumbsFilter" :key="`CatBreadcrumbs${Item.id}`">
            <font-awesome-icon icon="chevron-right" class="icon"/>
            <span @click="localSelectedCategoryID = Item.id" class="categoriesBreadCrumbs-item">
              {{ Item.name }}
            </span>
          </li>
        </ul>
      </div>
      <!-- Subcategories -->
      <div class="selectedCategory" v-if="Query.Category.name">
        {{ Query.Category.name }}
        <div class="selectedCategory-clear"
        @click="updateCategory(Query.Category.parentID)">
          <font-awesome-icon icon="times"/>
        </div>
      </div>
      <div v-if="allSubcategoriesFilter.length">
        <ul>
          <li v-for="Item in allSubcategoriesFilter" v-if="Item.amount" :key="`Subcategory${Item.id}`"
          @click="localSelectedCategoryID = Item.id;"
          class="flex items-center justify-between">
              <vs-radio v-model="localSelectedCategoryID" vs-name="category"
              :vs-value="Item.id" :disabled="Item.isDisabled">
                {{ Item.name }}
              </vs-radio>

            <!-- <span>({{ Item.amount }})</span> -->

          </li>
        </ul>
      </div>

      <!-- BRANDS -->
      <!-- <vs-divider v-if="totalProductsAmount"/>

      <h6 class="font-bold mb-3" v-if="totalProductsAmount">Marca</h6>
      <div v-if="totalProductsAmount">
        <ul>
          <li v-for="Item in allBrandsFilter" class="flex items-center justify-between" :key="`Cat${Item.id}`"
          @click="changeBrand(Item.id)"
          v-if="(Item.amount && localSelectedBrandID == 0) || localSelectedBrandID == Item.id">
            <vs-radio v-model="localSelectedBrandID" vs-name="brand" :vs-value="Item.id">
              {{ Item.name }}
            </vs-radio>
            <span>({{ Item.amount }})</span>
          </li>

          <li v-if="localSelectedBrandID != 0" class="flex items-center justify-between"
          @click="changeBrand(0)" key="Cat0">
            <vs-radio v-model="localSelectedBrandID" vs-name="brand" :vs-value="0">Todas las marcas</vs-radio>
            <span>({{ _allProductsOfBranch.length }})</span>
          </li>
        </ul>
      </div> -->

      <vs-divider v-if="isFilterUsed"/>

      <div v-if="isFilterUsed" class="flex justify-center">
        <vs-button @click="resetFilter()">
          LIMPIAR FILTROS
        </vs-button>
      </div>

    </div>
  </VuePerfectScrollbar>
  </div>
</div>
</template>

<script>
export default {
  components: {
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar'),
  },
  props: {
    clickNotClose: { type: Boolean, required: true, },
    totalProductsAmount: { type: Number, required: true, },
    isFilterSidebarActive: { type: Boolean, required: true, },
    allBrandsFilter: { type: Array, required: true, },
    CategoriesFilter: { type: Array, required: true, },
    categoriesBreadCrumbsFilter: { type: Array, required: true, },
    allSubcategoriesFilter: { type: Array, required: true, },

  }, // PROPS
  data() {
    return {
      scrollbarSettings: { // perfectscrollbar settings
        // maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
    }; // return DATA
  }, // DATA
  created() {
  }, // CREATED
  computed: {
    localSelectedCategoryID: {
      get() {
        return this.Query.Category.id;
      },
      set(val) {
        if (val == this.localSelectedCategoryID) return;
        this.updateCategory(val);
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
    // changeBrand
    // changeCategory
    // clearCategory
    // toggleFilterSidebar
    changeBrand(brandID) {
      this.localSelectedBrandID = brandID;
    },
    updateCategory(categoryID) {
      this.$vs.loading();
      for (let Item of this.allSubcategoriesFilter) {
        this.$set(Item, 'isDisabled', true);
      }
      // return;
      // It needs time to open the modal and disable buttons
      setTimeout( ()=> {
        this.$store.dispatch('products/updateQueryCategory', categoryID);
      }, 200);
      // this.$nextTick(() => {
      // });
    },
    toggleFilterSidebar() {
      this.$emit('toggleFilterSidebar')
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

li {
  letter-spacing: 0.05rem !important;
  margin-bottom: 12px;
}

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
.categoriesBreadCrumbs {
  margin-right: 30px; // Avoid be over X
}
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
.scrollArea {
  height: 100%;
}

</style>
