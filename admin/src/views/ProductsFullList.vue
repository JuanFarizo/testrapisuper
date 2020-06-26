<template>
  <div class="data-list-container" ref="mainProductsTable">
    <columns-manager
    :isPromptActive="IsPromptActive.columnsManager"
    :HideableColumns="Columns"
    :isHidden="isHidden"
    @updatePromptColumns="isHidden = $event;"
    @closePromptColumns="IsPromptActive.columnsManager = false;"
    />

    <addNewProductSidebar
      :isSidebarActive="IsPromptActive.addNewProduct"
      :allProducts="Products"
      @modifySidebar="IsPromptActive.addNewProduct = $event"
      @modifiedProduct="modifiedProduct($event)"
      @addedProduct="addedProduct($event)"
      ref='NewProduct'
    />

    <vs-table ref="table" :data="filteredProducts" pagination :max-items="itemsPerPage" noDataText="No se encontraron productos">

      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">

          <vs-button class="tableHeaderItem" color="primary" type="border"
          @click="$router.push({name: 'products'})">
            <font-awesome-icon :icon="['fas', 'arrow-left']"/>
            Mis productos
          </vs-button>

          <!-- New product -->
          <vs-button class="tableHeaderItem" color="primary" type="border"
          @click="openSidebar('new')" v-if="checkUser('subAdmin') || checkUser('cargaProductos', true)">
            <font-awesome-icon icon="plus"/>
            Crear producto
          </vs-button>

          <template v-if="checkUser('subAdmin')">
          </template> <!-- v-if is subAdmin -->

          <!-- Order by -->
          <v-select class="tableHeaderItem" v-model="selectedOrderByOptionID"
          :options="orderByOptions" :reduce="Option => Option.id"
          style="display: inline-block; min-width: 180px"></v-select>

          <vs-checkbox v-model="showFullList" class="tableHeaderItem"
          :disabled="showFullListIsDisabled"
          v-if="isMainHouse()" @change="generateProductsList()">
            Mostrar lista completa
          </vs-checkbox>

        </div> <!-- .tableHeader -->

        <TableHeaderActions
        :vmMain="getThis()"
        :itemsLength="filteredProducts.length"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @newItemsPerPage="itemsPerPage = $event"
        @searchInput="search = $event; filterSearchLocal()"
        />

      </div> <!-- header -->

      <template slot="thead">
        <vs-th v-for="Col in Columns" v-if="!isHidden[Col.name] && (!Col.onlyMainHouse ? true : isMainHouse())" :class="Col.nowrap == false ? '' : 'nowrap'">
          {{ Col.title }}
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <!-- Filtros por columna -->
        <!-- <vs-tr>
          <vs-td v-for="Col in Columns" v-if="!isHidden[Col.name]">
            <div class="inputContainer" style="position: relative">
              <vs-button type="border" size="small" class="tableFilterBtn narrowBtn">
                <font-awesome-icon icon="filter"/>
              </vs-button>
              <vs-input type="text" class="tableFilterInput"/>
            </div>
          </vs-td>
        </vs-tr> -->

        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
        <!-- id -->
        <vs-td v-if="!isHidden.id" class="autoWidth">
          <vs-chip color="primary">{{ tr.id }}</vs-chip>
        </vs-td>
        <!-- Functions -->
        <vs-td v-if="!isHidden.functions && isMainHouse()" class="nowrap autoWidth">
          <template v-if=" (checkUser('subAdmin') || checkUser('cargaProductos', true))">
            <button type="button" class="functionBTN" @click="openSidebar('edit', tr)">
              <font-awesome-icon icon="edit"/>
            </button>
            <button type="button" class="functionBTN" @click="openSidebar('newVariant', tr.detailsID)">
              <font-awesome-icon icon="plus"/>
              Variante
            </button>
          </template>
          <span v-else class="helpText">Función no disponible</span>
        </vs-td>
        <vs-td v-if="!isHidden.addToBranch" class="autoWidth">
          <vs-button type="border" v-if="!tr.isAdded"
          @click="tr.isAdded = true; addProductToBranch(tr);" class="nowrap">
            <font-awesome-icon icon="plus"/>
            Agregar a mis productos
          </vs-button>
          <span v-else class="nowrap" style="color: darkgreen;">
            ¡Ya está en tu lista!
          </span>
        </vs-td>
        <!-- isOkUploaded -->
        <vs-td v-if="!isHidden.isOkUploaded">
          <label class="mr-2 nowrap">Está OK</label>
          <vs-switch v-model="tr.isOkUploaded" @change="modifyIsOk(tr)"/>
        </vs-td>
        <!-- Img -->
        <vs-td v-if="!isHidden.img" class="autoWidth">
          <div class="imgContainer" style="position: relative;">
            <img :src="getImgDual(`${tr.id}-1`)">
            <div class="isNewLabel" v-if="tr.isNew">Nuevo</div>
          </div>
        </vs-td>
        <!-- name -->
        <vs-td v-if="!isHidden.name">{{ tr.fullName }}</vs-td>
        <!-- creatorEmployee -->
        <vs-td v-if="!isHidden.creatorEmployee" class="nowrap">{{ tr.creatorEmployee }}</vs-td>
        <!-- dateCreated -->
        <vs-td v-if="!isHidden.dateCreated" class="nowrap">
          <vx-tooltip :text="getTimeOfDB(tr.dateCreated)">
            {{ getDateOfDB(tr.dateCreated) }}
          </vx-tooltip>
        </vs-td>
        <!-- suggestedPrice -->
        <vs-td v-if="!isHidden.suggestedPrice" class="centered nowrap">
          <span v-if="tr.suggestedPrice">$ {{ tr.suggestedPrice }}</span>
          <span v-else class="helpText">Sin definir</span>
        </vs-td>
        <!-- delete -->
        <vs-td v-if="!isHidden.delete && isMainHouse()" class="autoWidth">
          <vs-button type="flat" color="danger" class="narrowBtn"
          @click="deleteProduct(tr)">
            <font-awesome-icon :icon="['far', 'trash-alt']"/>
          </vs-button>
        </vs-td>
        </vs-tr>

      </template>
    </vs-table>

  </div>
</template>










<!-- - - - - - - - - - - - - - - - SCRIPT - - - - - - - - - - - - - - - -->
<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
// components
export default {
  mixins: [vsTableConfig],
  components: {
    addNewProductSidebar: () => import('./components/productsFullList/AddNewProduct.vue'),
  },
  data() {
    return {
      orderByOptions: [
        { id: 0, label: 'Alfabético', },
        { id: 1, label: 'Novedades', },
      ],
      showFullList: false,
      showFullListIsDisabled: false,
      myProducts: [],
      selectedOrderByOptionID: 0,
      avoidDuplicates: 0,
      search: '',
      allProductsOfBranch: [],
      Products: [],
      IsPromptActive: { addNewProduct: false, },
      NewProductDetailsID: 0,
      selectedFilteredBy: 1,
      filteredProducts: [],
      // static
      itemsPerPage: 50,
      Columns: [
        { name: 'id'              , title: 'ID', },
        { name: 'functions'       , title: 'Funciones', onlyMainHouse: true, },
        { name: 'addToBranch'     , title: 'Agregar', },
        { name: 'isOkUploaded'    , title: 'Está bien cargado', onlyMainHouse: true, nowrap: false, },
        { name: 'img'             , title: 'Img', },
        { name: 'name'            , title: 'Nombre', },
        { name: 'creatorEmployee' , title: 'Creador', onlyMainHouse: true, },
        { name: 'dateCreated'     , title: 'Fecha creación', onlyMainHouse: true, nowrap: false, },
        { name: 'suggestedPrice'  , title: 'Precio sugerido', nowrap: false, },
        { name: 'delete'          , title: 'Eliminar', onlyMainHouse: true, },
      ],
      selectedProfile: 1,
      Profiles: [
        /* 00 - Testing */  [],
        /* 01 - Admin */    ['id', 'isOkUploaded', 'creatorEmployee', 'dateCreated', ],
        /* 02 - SubAdmin */ ['id', 'isOkUploaded', 'creatorEmployee', 'dateCreated', ],
        /* 03 - Gestión */  ['id', 'isOkUploaded', 'functions', 'addToBranch', 'creatorEmployee', 'dateCreated', 'delete' ],
        /* 03 - Ventas */   ['id', 'isOkUploaded', 'functions', 'addToBranch', 'creatorEmployee', 'dateCreated', 'delete' ],
        /* 02 - Empleado */ [], // sin acceso
        /* 06 - Carga */    ['id', 'isOkUploaded', 'suggestedPrice', 'creatorEmployee', 'dateCreated', 'delete', ],
      ],
    };
  }, // DATA
  watch: {
    selectedOrderByOptionID(val) {
      if (val == null) {
        this.$nextTick(() => {
          this.selectedOrderByOptionID = 0;
        })
        return;
      }
      let list = [];
      switch (val) {
        case 0: // alphabetic
          list = this.Products.concat()
          break;
        case 1: // newer
          list = this.Products.concat().sort((a,b)=>(a.dateCreated > b.dateCreated ? -1 : 1));
          break;
      }
      this.filteredProducts = list;
    },
    currentPage(val) {
      this.paginationPageChange(val);
    },
  }, // WATCH
  created() {
    this.loadAllProductsOfBranch();
    this.selectedProfile = this.getUser().roleID;
  }, // CREATED
  methods: {
    // addedProduct
    // addProductToBranch
    // deleteProduct
    // filterProducts
    // filterSearchLocal
    // generateProductsList
    // loadProducts
    // modifiedProduct
    // modifyIsOk
    // modifyProductDB
    // modifyProductDetailsDB
    // openSidebar
    // paginationPageChange

    addedProduct(NewProd) {
      console.log('agregueti');
      let Params = {
        productID: NewProd.id,
      }
      this.conectToDB({
        file: 'Products', action: 'getProduct', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let Product = res.data.data[0];
          console.log(Product);
          Product.isNew = true;
          Product.isAdded = false;
          this.Products.unshift(Product);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    addProductToBranch(Prod) {
      let Params = {
        productID: Prod.id,
        branchID: this.getBranchID(),
        datetimeCreated: this.getActualDatetimeToDB(),
      }
      this.conectToDB({
        file: 'Products', action: 'addProductToBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let msg = `El producto <b> ${Prod.fullName}</b> se agregó a tu lista`;
          console.log(msg);
          this.myNotify('success', 'Éxito', msg);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    deleteProduct(Prod) {
      if (!confirm(`¿Seguro que querés eliminar completamente "${Prod.fullName}"?`)) return;
      // DB
      let Params = { productID : Prod.id, isActive: 0 };
      this.modifyProductDB(Params);
      // DOM
      let index = this.Products.findIndex(i=>i.id == Prod.id);
      this.Products.splice(index, 1); // Delete the item from array
      this.filterProducts();
    },
    filterProducts() {
      this.filteredProducts = this.Products;
    },
    filterSearchLocal() {
      this.filterProducts();
      this.filteredProductsOfSearch = [];
      let Params = {
        search: this.search,
        productsArray: this.filteredProducts,
        action: this.filterIndividualProduct,
        finalCallback: this.finishFilterSearch,
      }
      this.filterSearch(Params);
    },
    filterIndividualProduct(Product, value) {
      if (!value) return;
      this.filteredProductsOfSearch.push(Product);
    },
    finishFilterSearch() {
      if (this.search == '') return;
      this.filteredProducts = this.filteredProductsOfSearch;
    },
    loadAllProductsOfBranch() {
      let Params = {
        branchID: this.getBranchID(),
        isActive: 1,
      }
      this.conectToDB({
        file: 'Products', action: 'getProductOfBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allProductsOfBranch = res.data.data;
          console.log('allProductsOfBranch', allProductsOfBranch);
          for (let Prod of allProductsOfBranch) {
            Prod.price = this.showPrice(Prod.price);
            Prod.offert = this.showPrice(Prod.offert);
            Prod.realPrice = this.getRealPrice(Prod);
          }
          this.allProductsOfBranch = allProductsOfBranch;
          this.loadProducts();
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    generateProductsList() {
      let finalList = [];
      this.showFullListIsDisabled = true;
      this.$nextTick(() => {
        if (this.showFullList) {
          finalList = this.allProducts;
        } else {
          for (let Prod of this.allProducts) {
            let index = this.allProductsOfBranch.findIndex(i=>i.productID == Prod.id);
            if (index == -1) {
              Prod.isAdded = false;
              finalList.push(Prod);
            } else {
              Prod.isAdded = true;
            }
          }
        }
        this.Products = finalList;
        this.showFullListIsDisabled = false;
        this.filterProducts();
      })
    },

    loadProducts() {
      let Params = {
        isActive: 1,
      }
      this.conectToDB({
        file: 'Products', action: 'getProduct', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allProducts = res.data.data;
          this.allProducts = allProducts;
          console.log('allProducts', allProducts);
          this.filterProducts();
          this.generateProductsList();
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    modifiedProduct(productID) {
      let Params = {
        productID: productID,
      }
      this.conectToDB({
        file: 'Products', action: 'getProduct', params:  Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let Product = res.data.data[0];
          // replace of Products
          const index = this.Products.findIndex(i => i.id == productID);
          this.Products.splice(index, 1, Product);
          this.filterProducts();
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    modifyIsOk(Product) {
      if (this.avoidDuplicates++ % 2) return;
      let Params = {
        productID: Product.id,
        isOkUploaded: Product.isOkUploaded,
      }
      this.modifyProductDB(Params);
    },

    modifyProductDB(Params){
      this.conectToDB({
        file: 'NewProduct', action: 'modifyProduct', params:  Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    modifyProductDetailsDB(Params){
      this.conectToDB({
        file: 'NewProduct', action: 'modifyProductDetails', params:  Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    paginationPageChange(value) {
      let position = this.$refs.mainProductsTable.offsetTop;
      this.myScrollTo(position-80);
    },
    openSidebar(action = '', params = '') {
      this.$refs.NewProduct.openSidebar(action, params);
      this.IsPromptActive.addNewProduct = true;
    },
  }, // METHODS
} // export default
</script>


<style lang="css" scoped>
.functionBTN {
  border-left: 0;
  border-radius: 0;
}
.functionBTN:first-of-type  {
  border-left: solid 1px;
  border-radius: 5px 0 0 5px;
}
.functionBTN:last-of-type {
  border-radius: 0 5px 5px 0;
}
.inputContainer {
  width: 100%;
  /* padding-left: 40px; */
}
.tableFilterBtn {
  position: absolute;
  left: 0;
  height: 37px;
  z-index: 10;
}
/* /deep/ .tableFilterInput div input { */
.tableFilterInput {
  padding-left: 50px;
  width: 100%;
}



</style>
