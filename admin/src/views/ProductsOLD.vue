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

    <modifyStock
      :isPromptActive="IsPromptActive.modifyStock"
      :Product="ModifyStockProduct"
      @closePrompt="IsPromptActive.modifyStock = false"
      @updateStock="updateStockPrompt($event)"
      @modifyProductDB="modifyProductDB($event)"
      @restartPrompt="IsPromptActive.modifyStock = false; myAlert('Alerta', $event, 'warning', ()=>{ IsPromptActive.modifyStock = true; })"
    />

    <vs-table ref="table" :data="filteredProducts" pagination :max-items="itemsPerPage" noDataText="No se encontraron productos">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">

          <!-- New product -->
          <vs-button class="tableHeaderItem" color="primary" type="border"
          @click="openSidebar('new')" v-if="checkUser('subAdmin') || checkUser('cargaProductos', true)">
            <font-awesome-icon icon="plus"/>
            Nuevo producto
          </vs-button>

          <template v-if="checkUser('subAdmin')">


            <!-- Modify price -->
            <vs-button @click="editingPrice = !editingPrice;" type="border" class="tableHeaderItem"
            :color="!editingPrice ?  'primary' : 'danger'">
              <font-awesome-icon icon="edit"/>
              {{ !editingPrice ? 'Modificar precios' : 'Dejar de modificar precios' }}
            </vs-button>

            <!-- Modify stock -->
            <!-- <vs-button @click="editingStock = !editingStock;" type="border" class="tableHeaderItem"
            :color="!editingStock ?  'primary' : 'danger'">
              <font-awesome-icon icon="edit"/>
              {{ !editingStock ? 'Modificar stock' : 'Dejar de modificar stock' }}
            </vs-button> -->

          </template> <!-- v-if is subAdmin -->

          <!-- Copy list -->
          <vs-button @click="copyProductsList()" type="border" class="tableHeaderItem"
          v-if="checkUser('gestion')" color="primary">
            <font-awesome-icon :icon="['far', 'copy']"/>
            Copiar lista
          </vs-button>

          <!-- Filter -->
          <v-select class="tableHeaderItem" v-model="selectedFilteredBy"
          :options="filteredByOptions" :reduce="name => name.id" label="name"
          style="display: inline-block; min-width: 180px" :clearable="false"></v-select>


          <!-- Order by -->
          <v-select class="tableHeaderItem" v-model="selectedOrderByOptionID"
          :options="orderByOptions" :reduce="Option => Option.id"
          style="display: inline-block; min-width: 180px"></v-select>

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
          <vs-td v-if="!isHidden.id" :data="tr.id" class="autoWidth">
            <vs-chip color="primary">{{ tr.id }}</vs-chip>
          </vs-td>
          <!-- Functions -->
          <vs-td v-if="!isHidden.functions" class="nowrap autoWidth">
            <template v-if="isMainHouse()">
              <div v-if="checkUser('subAdmin') || checkUser('cargaProductos', true)">
                <button type="button" class="functionBTN" @click="openSidebar('edit', tr)">
                  <font-awesome-icon icon="edit"/>
                </button>
                <button type="button" class="functionBTN" @click="startEditStock(tr)">
                  <font-awesome-icon icon="edit"/>
                  Stock
                </button>
                <button type="button" class="functionBTN" @click="openSidebar('newVariant', tr.detailsID)">
                  <font-awesome-icon icon="plus"/>
                  Variante
                </button>
              </div> <!-- v-if is admin -->

              <vs-button v-else type="border" @click="startEditStock(tr)">
                <font-awesome-icon icon="edit"/>
                Stock
              </vs-button>
            </template> <!-- isMainHouse -->

            <template v-else>
              <template v-if="Branch.usesStock">
                Manejo el stock
              </template>
            </template> <!-- else isMainHouse -->
          </vs-td>
          <!-- isOkUploaded -->
          <vs-td v-if="!isHidden.isOkUploaded">
            <label class="mr-2">Está OK</label>
            <vs-switch v-model="tr.isOkUploaded" @change="modifyIsOk(tr)"/>
          </vs-td>
          <!-- Img -->
          <vs-td v-if="!isHidden.img" class="autoWidth">
            <div class="imgContainer" style="position: relative;">
              <img :src="getImgDual(`${tr.id}-1`)">
              <!-- <img :src="getImgDualCustom(tr.id)"> -->
              <div class="isNewLabel" v-if="tr.isNew">Nuevo</div>
            </div>
          </vs-td>
          <!-- name -->
          <vs-td v-if="!isHidden.name" :data="tr.fullName">{{ tr.fullName }}</vs-td>
          <!-- creatorEmployee -->
          <vs-td v-if="!isHidden.creatorEmployee" class="nowrap">{{ tr.creatorEmployee }}</vs-td>
          <!-- dateCreated -->
          <vs-td v-if="!isHidden.dateCreated" class="nowrap">
            <vx-tooltip :text="getTimeOfDB(tr.dateCreated)">
              {{ getDateOfDB(tr.dateCreated) }}
            </vx-tooltip>
          </vs-td>
          <!-- price -->
          <vs-td v-if="!isHidden.price" :data="getRealPrice(tr)" :class="getRealPriceType(tr)" class="nowrap">

            <div v-if="editingPrice">
              <vs-input class="newPriceInput price"  v-model="tr.price"  @change="updatePrice(tr)" icon-no-border icon="attach_money" type="number" @focus="$event.target.select()"/>
              <vs-input class="newPriceInput offert" v-model="tr.offert" @change="updatePrice(tr)" icon-no-border icon="attach_money" type="number" @focus="$event.target.select()"/>
            </div>
            <span v-else>$ {{ getRealPrice(tr) }}</span>

          </vs-td>
          <!-- Stock -->
          <vs-td v-if="!isHidden.stock" :data="tr.stock" class="centered">

            <div v-if="editingStock">
              <vs-input class="newPriceInput price"  v-model="tr.stock"      @change="updateStock(tr)" icon-no-border type="number" @focus="$event.target.select()"/>
              <vs-input class="newPriceInput offert" v-model="tr.stockAlert" @change="updateStock(tr)" icon-no-border type="number" @focus="$event.target.select()"/>
            </div>
            <!-- hasInfiniteStock -->
            <vs-chip v-if="tr.hasInfiniteStock" :color="getStockColor(null, tr.pickUpPlaceHasStock)">
              <font-awesome-icon icon="infinity"/>
            </vs-chip>
            <!-- productParentID -->
            <vs-chip v-else-if="tr.productParentID" :color="getStockColor(tr.stock, tr.stockAlert)" class="nowrap">
              <span class="stockOfStockAlert">
                {{ `${tr.stockInherited} /  ${tr.stockAlert}` }}
              </span>
              <vx-tooltip :text='`Hereda stock de "${tr.productParentName}" x${tr.productParentMultiplier}`'>
                <span v-if="tr.productParentID" class="hasParentIcon">
                  <font-awesome-icon icon="arrow-up"/>
                </span>
              </vx-tooltip>
            </vs-chip>
            <vs-chip v-else :color="getStockColor(tr.stock, tr.stockAlert)" class="nowrap">
              <span v-if="!isHidden.stock" class="stockOfStockAlert">
                {{ `${tr.stock} /  ${tr.stockAlert}` }}
              </span>
            </vs-chip>

          </vs-td>

          <!-- brand -->
          <vs-td v-if="!isHidden.brand" class="centered">{{ tr.brand }}</vs-td>


          <!-- archive -->
          <vs-td v-if="!isHidden.archived" class="autoWidth">
            <vs-button type="border" :color="isShowingArchived ? 'success' : 'danger'"
            class="narrowBtn" @click="archiveProduct(tr, indextr, !isShowingArchived)">
              <font-awesome-icon :icon="['far', 'folder-open']"/>
            </vs-button>
          </vs-td>

          <!-- delete -->
          <vs-td v-if="!isHidden.delete" class="autoWidth">
            <vs-button type="border" color="danger" class="narrowBtn"
            @click="deleteProduct(tr, indextr)">
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
    addNewProductSidebar: () => import('./components/products/AddNewProduct.vue'),
    modifyStock: () => import('./components/products/ModifyStock.vue'),
  },
  data() {
    return {
      orderByOptions: [
        { id: 0, label: 'Alfabético', },
        { id: 1, label: 'Más nuevo', },
      ],
      selectedOrderByOptionID: 0,
      avoidDuplicates: 0,
      search: '',
      Products: [],
      IsPromptActive: { addNewProduct: false, modifyStock: false, },
      NewProductDetailsID: 0,
      ModifyStockProduct: { id: 0, name: '', stock: 0, },
      editingPrice: false,
      editingStock: false,
      selectedFilteredBy: 1,
      filteredProducts: [],
      filteredByOptions: [
        { id: 1, name: 'Normal' },
        { id: 2, name: 'Archivados' },
        { id: 3, name: 'Sin stock' },
        { id: 4, name: 'Stock < 0' },
        { id: 5, name: 'Stock infinito' },
      ],
      // static
      itemsPerPage: 50,
      Columns: [
        { name: 'id'              , title: 'ID', },
        { name: 'functions'       , title: 'Funciones', },
        { name: 'isOkUploaded'    , title: 'Está bien cargado', },
        { name: 'img'             , title: 'Img', },
        { name: 'name'            , title: 'Nombre', },
        { name: 'creatorEmployee' , title: 'Creador', },
        { name: 'dateCreated'     , title: 'Fecha creación', nowrap: false, },
        { name: 'price'           , title: 'Precio', },
        { name: 'stock'           , title: 'Stock', },
        { name: 'brand'           , title: 'Marca', },
        { name: 'archived'        , title: 'Archivar', },
        { name: 'delete'          , title: 'Eliminar', },
      ],
      selectedProfile: 1,
      Profiles: [
        /* 00 - Testing */ [],
        /* 01 - Admin */    ['id', 'isOkUploaded', 'creatorEmployee', 'dateCreated', 'brand', ],
        /* 02 - SubAdmin */ ['id', 'isOkUploaded', 'creatorEmployee', 'dateCreated', 'brand', 'archived', 'delete', ],
        [],
        [],
        [],
        /* 06 - Carga */    ['id', 'isOkUploaded', 'creatorEmployee', 'dateCreated', 'brand', 'archived', 'delete', ],
      ],
    };
  }, // DATA
  computed: {
    isShowingArchived() {
      return this.selectedFilteredBy == 2;
    },
    Branch() {
      return this._Branch;
    },
  },
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
    // onlyNoStock: function() {
    //   this.checkShowProduct();
    // },
    // onlyArchived: function() {
    //   this.checkShowProduct();
    // },
    selectedFilteredBy(val) {
      if (val == null) {
        this.$nextTick(() => {
          this.selectedFilteredBy = 1;
        });
      }
      this.filterSearchLocal();
    },
    currentPage(val) {
      this.paginationPageChange(val);
    },
  }, // WATCH
  created() {
    // this.currentPage = 1;
    this.loadProducts();
    this.updateUserProfile();
  }, // CREATED
  methods: {
    filterColumnSearch() {

    },
    getImgDualCustom(prodID) {
      let isIphone = this.$route.name == 'img-iphone';
      if (isIphone) {
        return this.getImg(`catalogue/jpg/${prodID}-1.jpg`)
      }
      return this.getImg(`catalogue/${prodID}-1.webp`);
    },
    // addedProduct
    // archiveProduct
    // checkShowProduct
    // copyProductsList
    // deleteProduct
    // filterProducts
    // filterSearchLocal
    // loadProducts
    // modifiedProduct
    // modifyIsOk
    // modifyProductDB
    // modifyProductDetailsDB
    // updateStock
    // openSidebar
    // paginationPageChange
    // startEditStock
    // updatePrice
    // updateSiblings
    // updateUserProfile

    addedProduct(prodID) {
      let Params = {
        productID: prodID,
      }
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProduct', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let Product = res.data.data[0];
          console.log(Product);
          Product.isNew = true;
          vm.Products.unshift(Product);
          vm.filteredProducts.unshift(Product);
          let notifyMsg = `Producto <b>${Product.fullName}</b> creado correctamente`;
          console.log(notifyMsg);
          vm.myNotify('success', 'Éxito', notifyMsg);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },

    copyProductsList() {
      let msg = 'Lista copiada correctamente';
      let showPrice = confirm('Querés mostrar el precio?');
      let showIcon = confirm('Querés mostrar un ícono de lista?');
      let text = '';
      for (let Prod of this.filteredProducts) {
        let item = Prod.fullName;
        if (showPrice) {
          item = `${item}: $${this.showPrice(Prod.price)}`;
        }
        if (showIcon) {
          item = `• ${item}`;
        }
        text += `${item}\r\n`;
      }
      this.copyToClipboard(text, msg);
    },
    archiveProduct(Prod, index, newValue) {
      if (newValue && Prod.stock) {
        alert('No podés archivar un producto con stock');
        return;
      }
      if (!confirm(`¿Seguro que querés ${newValue ? '': 'des'}archivar "${Prod.fullName}"?`)) return;
      let Params = { productID : Prod.id, isArchived: newValue };
      this.modifyProductDB(Params);
      Prod.isArchived = newValue;
      this.filteredProducts.splice(index, 1); // Delete the item from array
    },

    deleteProduct(Prod, index) {
      if (Prod.stock) {
        alert('No podés eliminar un producto con stock');
        return;
      }
      if (!confirm(`¿Seguro que querés eliminar "${Prod.fullName}"?`)) return;
      let Params = { productID : Prod.id, isActive: 0 };
      this.modifyProductDB(Params);
      this.filteredProducts.splice(index, 1); // Delete the item from array
    },
    filterProducts() {
      switch (this.selectedFilteredBy) {
        // Normal
        case 1:
          // Prod.stock != 0 || Prod.price == 0
          this.filteredProducts = this.Products.filter(i => !i.isArchived);
          break;
        // Archived
        case 2:
          this.filteredProducts = this.Products.filter(i => (i.isArchived))
          break;
        // No stock or no price
        case 3:
          this.filteredProducts = this.Products.filter(i => (!i.isArchived && !i.hasInfiniteStock && (i.stock <= 0 || !i.price)))
          break;
        // Stock < 0
        case 4:
          this.filteredProducts = this.Products.filter(i => (this.getStock(i) < 0))
          break;
        // Infinite stock
        case 5:
          this.filteredProducts = this.Products.filter(i => (i.hasInfiniteStock))
          break;
      }
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
    loadProducts() {
      let Params = {
        isActive: 1,
      }
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProduct', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let Products = res.data.data;
          console.log('Products', Products);
          for (let Prod of Products) {
            Prod.price = vm.showPrice(Prod.price);
            Prod.offert = vm.showPrice(Prod.offert);
            Prod.newStock = Prod.stock;
            Prod.newStockAlert = Prod.stockAlert;
          }
          vm.filteredProducts = Products;
          vm.Products = Products;
          vm.filterProducts();
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },

    modifiedProduct(productID) {
      let Params = {
        productID: productID,
      }
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProduct', params:  Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let Product = res.data.data[0];
          console.log(Product);
          Product.isModified = true;
          // replace of Products
          const index1 = vm.Products.findIndex(i => i.id == productID);
          vm.Products.splice(index1, 1, Product);
          // replace of filteredProducts
          const index2 = vm.filteredProducts.findIndex(i => i.id == productID);
          vm.filteredProducts.splice(index2, 1, Product);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },

    modifyIsOk(Product) {
      if (this.avoidDuplicates++ % 2) return;
      let Params = {
        productID: Product.id,
        isOkUploaded: Product.isOkUploaded,
      }
      console.log(Params);
      this.modifyProductDB(Params);
    },

    modifyProductDB(Params){
      this.conectToDB({
        file: 'NewProduct', action: 'modifyProduct', params:  Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: function(error) { this.myNotify('danger', 'Error', error); },
      });
    },
    modifyProductDetailsDB(Params){
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'modifyProductDetails', params:  Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    updateStock(Params) {
      for (let i in this.Products) {
        if (this.Products[i].id == Params.productID) {
          this.Products[i].stock = Params.stock;
          return;
        }
      }
    },
    updateStockPrompt(Params) {
      let index = this.Products.findIndex((i) => i.id == Params.productID);
      this.Products[index].stock = Params.newStock;
    },
    paginationPageChange(value) {
      let position = this.$refs.mainProductsTable.offsetTop;
      this.myScrollTo(position-80);
    },
    openSidebar(action = '', params = '') {
      this.$refs.NewProduct.openSidebar(action, params);
      this.IsPromptActive.addNewProduct = true;
    },
    startEditStock(Product) {
      this.ModifyStockProduct = Product;
      // this.ModifyStockProduct.name = Product.fullName;
      // this.ModifyStockProduct.stock = Product.stock;
      // this.ModifyStockProduct.id = Product.id;
      this.IsPromptActive.modifyStock = true
    },
    updatePrice(Product) {
      Product.price = this.showPrice(Product.price);
      Product.offert = this.showPrice(Product.offert);
      this.updateSiblings(Product);
      let Params = {
        detailsID: Product.detailsID,
        price: Product.price,
        offert: Product.offert,
      }
      this.modifyProductDetailsDB(Params);
    },
    updateStock(Prod) {
      Prod.newStock = this.parseInt(Prod.newStock);
      let stockDiference = Prod.newStock - Prod.stock;
      let stockAlertDiference = Prod.newStockAlert - Prod.stockAlert;
      if (!stockDiference) {
        // Modify stock
        let Params = {
          product: Prod.id,
          amount: stockDiference,
          websiteZoneID: this.localDB.StockChangesWebsiteZoneIDs.masiveStockChanger,
        }
        // Modify old value, for the next change
        Prod.stock = Prod.newStock;
        // updateDB
        this.updateProductStock(Params);
      } else if (stockAlertDiference) {
        // Modify stock
        // Product.stock = this.parseInt(Product.stock);
        // let Params = {
        //   product: Product.id,
        //   amount: Product.price,
        //   offert: Product.offert,
        //   websiteZoneID: this.localDB.StockChangesWebsiteZoneIDs.masiveStockChanger,
        // }
        // this.updateProductStock(Params);
      }
    },
    updateSiblings(UpdatedProd) {
      for (let Prod of this.Products) {
        if (Prod.detailsID == UpdatedProd.detailsID) {
          Prod.price = UpdatedProd.price;
          Prod.offert = UpdatedProd.offert;
        }
      }
    },
    updateUserProfile() {
      this.selectedProfile = this.getUser().roleID;
    },
  }, // METHODS
} // export default
</script>


<style lang="css" scoped>
.newPriceInput {
  width: 110px;
  display: inline-block;
}
.newPriceInput:last-of-type {
  margin-left: 10px;
}
.price {
  color: STEELBLUE;
}
.offert {
  color: INDIANRED;
  font-weight: 600;
}
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

.hasParentIcon {
  margin-left: 5px;
}



</style>
