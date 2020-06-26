<template>
  <div ref="mainCatalogue">

    <div class="algolia-header mb-2">
      <div class="flex md:items-end items-center justify-between flex-wrap my-1" :style="windowWidth < 600 ? 'flex-direction: column': ''">
        <!-- TOGGLE SIDEBAR BUTTON -->
        <div class="toggleFilterSidebarBtn mx-0" @click.stop="toggleFilterSidebar()">
          <feather-icon style="margin-left: 15px; margin-top: -3px;"
          class="inline-flex lg:hidden cursor-pointer mr-4"
          icon="FilterIcon"
          />
          <div>
            Categorías
          </div>
        </div>
        <p class="lg:inline-flex hidden font-semibold algolia-filters-label my-auto" style="margin-left: 25px;">Filtros</p>
        <div class="flex justify-between items-end flex-grow">
          <!-- Stats -->
          <p class="font-semibold md:block hidden my-auto">
            {{ totalProductsAmount }} resultados
            <span v-if="Query.search"> para "{{ Query.search }}"</span>
          </p>
          <div class="flex flex-wrap">
            <!-- SORTING -->
            <p style="margin-top: 10px; margin-right: 5px;">Orden:</p>
            <vs-select
              v-model="selectedSortBy"
              class="mr-2 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg w-48 mx-0">
              <vs-select-item v-for="item in sortByOptionsList" :key="item.value" :value="item.value" :text="item.label"/>
            </vs-select>

            <!-- ITEM VIEW - GRID/LIST -->
            <!-- <div>
              <feather-icon
              icon="GridIcon"
              @click="currentItemView='item-grid-view'"
              class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
              :svgClasses="{'text-primary stroke-current': currentItemView == 'item-grid-view'}" />
              <feather-icon
              icon="ListIcon"
              @click="currentItemView='item-list-view'"
              class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
              :svgClasses="{'text-primary stroke-current': currentItemView == 'item-list-view'}" />
            </div> -->
          </div>
        </div>
      </div>
    </div>


    <div id="filterSidebar" class="relative" style="min-height: 1000px;">
      <sidebar-filter
      :totalProductsAmount="totalProductsAmount"
      :clickNotClose="clickNotClose"
      :allBrandsFilter="allBrands"
      :isFilterSidebarActive="isFilterSidebarActive"
      :CategoriesFilter="_Categories"
      :categoriesBreadCrumbsFilter="categoriesBreadCrumbs"
      :allSubcategoriesFilter="allSubcategories"
      @toggleFilterSidebar="toggleFilterSidebar"
      />
      <div v-if = "!_Branch.isActive">
        <div class="text-nb">
          <h1 class="tittle-nb"> Proximamente estaremos con vos!</h1>
        </div>
      </div>
      <!-- RIGHT COL -->
      <div v-else :class="{'sidebar-spacer-with-margin': clickNotClose}">

        <!-- PRODUCT ITEM -->
        <div style="min-height: 1000px;">
          <!-- Grid view -->
          <div class="items-grid-view vx-row match-height" v-if="currentItemView == 'item-grid-view'">
            <div v-if="!item.isHidden && item.isInPage"
            class="vx-col xl:w-1/4 lg:w-1/3 sm:w-1/3 xs:1/2 w-full" v-for="(item,index) in _sortedProducts" :key="index">

              <!-- <vs-row v-if="currentItemView == 'item-grid-view'">
                <vs-col v-for="item in _allProductsOfBranch" :key="item.id" v-if="!item.isHidden && item.isInPage"
                vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="4" vs-xs="6"> -->
                  <item-grid-view :item="item" :isIphone="isIphone"></item-grid-view>
                <!-- </vs-col>
              </vs-row> -->
            </div>
          </div>
          <!-- List view -->
          <div v-else class="items-list-view" v-for="(item,index) in _sortedProducts" :key="index">
            <ItemListView :Item="item" v-if="!item.isHidden && item.isInPage"
            :buttonSizeInner="buttonSize" :inputSizeInner="inputSize"></ItemListView>
          </div>
        </div>




        <div class="vx-card" v-if="!totalProductsAmount" style="padding: 100px;">
          <div v-if="Cart.cartHasBeenLoaded">
            <h6>No hay productos que cumplan con los criterios de búsqueda :(</h6>
            <vs-button @click="resetFilter()" v-if="isFilterUsed" class="mt-5">LIMPIAR FILTROS</vs-button>
          </div>
          <div v-else>
            <h6>Cargando productos...</h6>
            <vs-button @click="$route.push({name: 'catalogue'})" class="mt-5">RECARGAR PÁGINA</vs-button>
          </div>
        </div>

        <!-- PAGINATION -->
        <div>
          <vs-pagination :total="totalPages" :value="currentPage" :max="7"
          @input="(val) => { paginationPageChange(val) }" />
        </div>

      </div> <!-- Right col -->
    </div>
  </div>

</template>

<script>

export default {
  components: {
    ItemGridView: () => import('./components/ItemGridView.vue'),
    ItemListView: () => import('./components/ItemListView.vue'),
    SidebarFilter: () => import('./components/catalogue/SidebarFilter.vue'),
  },
  data() {
    return {
      buttonSize: '',
      inputSize: 'small',
      isLoading: false,
      selectedSortBy: 0,
      categoriesBreadCrumbs: [],
      allSubcategories: [],
      sortByOptionsList: [
        { value: 0, label: 'Alfabético' },
        { value: 1, label: 'Novedades' },
        { value: 2, label: 'Precio más bajo' },
        { value: 3, label: 'Precio más alto' },
        // { value: 3, label: 'Destacados' },
      ],
      // static
      itemsPerPage: 36,
      // Filter Sidebar
      clickNotClose: true,
      windowWidth: window.innerWidth,
      isFilterSidebarActive: true,
    } // return DATA
  }, // DATA
  created() {
    this.getQueryMain();
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleWindowResize);
    });
    this.setSidebarWidth();
    // this.loadProducts();
    this.loadCategories();
    this.loadBrands();
  },
  watch: {
    'Query.search': function(val) {
      this.checkSearchTimer(val);
    },
    'Query.Category': function() {
      this.finishUpdateURL()
      this.updateCategoryBreadcrumbs();
      this.updateSubcategories();
      this.filterCategory();
    },
    'Query.Brand.id': function() {
      this.finishUpdateURL();
      // this.filterProducts();
    },
    // 'Query.minPrice': function() {
    //   this.filterProducts();
    // },
    // 'Query.maxPrice': function() {
    //   this.filterProducts();
    // },
    selectedSortBy: function(selected) {
      this.orderProductsBy(selected);
    },
    windowWidth: function() {
      this.buttonSize = this.windowWidth < 500 ? 'small' : 'default';
      this.inputSize = this.windowSize < 400 ? 'small' : 'default';
    },
  }, // WATCH
  computed: {
    currentItemView() {
      return this.windowWidth < 600 ? 'item-list-view' : 'item-grid-view';
    },
    totalPages() {
      let integer = Math.floor(this.totalProductsAmount/this.itemsPerPage);
      let remainder = this.totalProductsAmount%this.itemsPerPage;
      return integer + (remainder ? 1 : 0);
    },
    currentPage() {
      return this.$store.state.products.currentPage;
    },
    totalProductsAmount() {
      return this._sortedProducts.length;
    },
  }, // COMPUTED
  methods: {

    toggleFilterSidebar(val = null) {
      if(this.clickNotClose) return
      if (val == null) val = !this.isFilterSidebarActive;
      this.isFilterSidebarActive = val;
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth
      this.setSidebarWidth()
    },
    setSidebarWidth() {
      if (this.windowWidth < 992) {
        this.isFilterSidebarActive = this.clickNotClose = false
      } else {
        this.isFilterSidebarActive = this.clickNotClose = true
      }
    },
    paginationPageChange(value) {
      let position = this.$refs.mainCatalogue.offsetTop;
      this.myScrollTo(position-80);
      this.$store.dispatch("products/updateCurrentPage", value);
      this.managePagination();
      this.finishUpdateURL();
    },
  }, // METHODS
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
} // export default
</script>











<style lang="scss">

.myTitle {
  position: absolute;
  right: 20px !important;
  margin-top: 2px;
  border: none;
  margin-right: 20px;
}

.toggleFilterSidebarBtn {
  cursor: pointer;
  box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
  padding: 10px 20px;
  border-radius: 10px;
  position: relative;
  margin-left: 10px;
  border: solid 1px lightgrey;
}
.toggleFilterSidebarBtn span { // icon
  position: absolute !important;
  left: 5px;
  top: 10px;
}
.toggleFilterSidebarBtn div { // text
  display: inline-block;
  padding-left: 40px;
}

@media (min-width: 992px) {
  .toggleFilterSidebarBtn {
    display: none;
  }
}



.algolia-header {
  .algolia-filters-label {
    width: calc(260px + 2.4rem);
  }
}

.vs-sidebar {
  position: relative;
  float: left;
}

.theme-dark {
  .vs-sidebar {
    background-color: #10163a;
  }
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar { border-radius: .5rem; }
    .vs-sidebar--items {border-radius: .5rem; }
  }
}

@media (max-width: 992px) {
  .vs-sidebar {
    position: absolute !important;
    float: none !important;
  }
}

.text-nb{
  position:relative;
  margin-top: 100px;
  right: center !important;
  text-align: center; 

}
.tittle-nb{
  font-weight: 600;
  font-size: 25px;
}

</style>
