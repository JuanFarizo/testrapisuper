<template>
  <div class="data-list-container" ref="mainProductsTable">
    <columns-manager
    :isPromptActive="IsPromptActive.columnsManager"
    :HideableColumns="Columns"
    :isHidden="isHidden"
    @updatePromptColumns="isHidden = $event;"
    @closePromptColumns="IsPromptActive.columnsManager = false;"
    />

    <modifyStock
      :isPromptActive="IsPromptActive.modifyStock"
      :productOfBranchID="modifyStockProductOfBranchID"
      @closePrompt="IsPromptActive.modifyStock = false"
      @updateStock="updateStockPrompt($event)"
      @modifyProductDB="modifyProductDB($event)"
    />

    <vs-table ref="table" pagination :max-items="itemsPerPage"
    noDataText="No se encontraron productos" :data="filteredProductsOfBranch">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">

          <!-- Add product -->
          <vs-button @click="$router.push({name: 'productsFullList'})" type="border" class="tableHeaderItem"
          v-if="checkUser('gestion') || checkUser('cargaProductos', true)" color="primary">
            <font-awesome-icon :icon="['fas', 'plus']"/>
            Agregar productos
          </vs-button>

          <!-- Modify price -->
          <vs-button @click="editingPrice = !editingPrice;" type="border" class="tableHeaderItem"
          :color="!editingPrice ?  'primary' : 'danger'">
            <font-awesome-icon icon="edit"/>
            {{ !editingPrice ? 'Modificar precios' : 'Dejar de modificar precios' }}
          </vs-button>

          <!-- Copy list -->
          <vs-button @click="copyProductsList()" type="border" class="tableHeaderItem"
          v-if="checkUser('gestion')" color="primary">
            <font-awesome-icon :icon="['far', 'copy']"/>
            Copiar lista
          </vs-button>



          <!-- Filter -->
          <v-select v-if="isMainHouse()" class="tableHeaderItem" v-model="selectedFilteredBy"
          :options="filteredByOptions" :reduce="name => name.id" label="name"
          style="display: inline-block; min-width: 180px" :clearable="false"></v-select>


          <!-- Order by -->
          <v-select class="tableHeaderItem" v-model="selectedOrderByOptionID"
          :options="orderByOptions" :reduce="Option => Option.id"
          style="display: inline-block; min-width: 180px"></v-select>

        </div> <!-- .tableHeader -->

        <TableHeaderActions
        :vmMain="getThis()"
        :itemsLength="filteredProductsOfBranch.length"
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
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <!-- id -->
          <vs-td v-if="!isHidden.id" class="autoWidth">
            <vs-chip color="primary">{{ tr.id }}</vs-chip>
          </vs-td>
          <!-- Img -->
          <vs-td v-if="!isHidden.img" class="autoWidth">
            <div class="imgContainer" style="position: relative;">
              <img :src="getImgDual(`${tr.productID}-1`)">
            </div>
          </vs-td>
          <!-- name -->
          <vs-td v-if="!isHidden.name" class="nowrap">{{ tr.fullName }}</vs-td>
          <!-- datetimeCreated -->
          <vs-td v-if="!isHidden.datetimeCreated" class="nowrap">
            <vx-tooltip :text="getTimeOfDB(tr.datetimeCreated)">
              {{ getDateOfDB(tr.datetimeCreated) }}
            </vx-tooltip>
          </vs-td>
          <!-- price -->
          <vs-td v-if="!isHidden.price" :class="getRealPriceType(tr)" class="nowrap">
            <div v-if="editingPrice">
              <vs-input class="newPriceInput price"  v-model="tr.price"  @change="updatePrice(tr)" icon-no-border icon="attach_money" type="number" @focus="$event.target.select()"/>
              <vs-input class="newPriceInput offert" v-model="tr.offert" @change="updatePrice(tr)" icon-no-border icon="attach_money" type="number" @focus="$event.target.select()"/>
            </div>
            <span v-else>$ {{ tr.realPrice }}</span>
          </vs-td>
          <vs-td v-if="!isHidden.stock" class="nowrap">
            <template v-if="_Branch.usesStock">
              <vs-button type="flat"
              @click="modifyStockProductOfBranchID = tr.id; IsPromptActive.modifyStock = true;">
                <font-awesome-icon icon="edit"/>
              </vs-button>

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
            </template> <!-- Branch.usesStock -->
            <template v-else>
              <vs-switch v-model="tr.isAvaible" @change="modifyIsAvaible(tr)"/>
            </template>
          </vs-td>
          <!-- delete -->
          <vs-td v-if="!isHidden.delete" class="autoWidth">
            <vs-button type="flat" color="danger" class="narrowBtn"
            @click="deleteProduct(tr)">
              <font-awesome-icon :icon="['far', 'trash-alt']"/>
            </vs-button>
          </vs-td>
        </vs-tr>
      </template>

    </vs-table>
  </div> <!-- .mainProductsTable -->
</template>

<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
export default {
  mixins: [vsTableConfig],
  components: {
    modifyStock: () => import('./components/products/ModifyStock.vue'),
  },
  data() {
    return {
      filteredProductsOfBranch: [],
      allProductsOfBranch: [],
      avoidDuplicates: 0,
      IsPromptActive: { modifyStock: false, },
      editingStock: false,
      editingPrice: false,
      search: '',
      modifyStockProductOfBranchID: 0,

      itemsPerPage: 50,
      Columns: [
        { name: 'id'              , title: 'ID', },
        { name: 'img'             , title: 'Img', },
        { name: 'name'            , title: 'Nombre', },
        { name: 'datetimeCreated' , title: 'Fecha creación', nowrap: false, },
        { name: 'price'           , title: 'Precio', },
        { name: 'stock'           , title: 'Stock', },
        { name: 'delete'          , title: 'Eliminar', },
      ],
      selectedProfile: 1,
      Profiles: [
        /* 00 - Testing */ [],
        /* 01 - Todes */ ['id', 'datetimeCreated', ],
      ],
      orderByOptions: [
        { id: 0, label: 'Alfabético', },
        { id: 1, label: 'Novedades', },
      ],
      selectedOrderByOptionID: 0,
      selectedFilteredBy: 1,
      filteredByOptions: [
        { id: 1, name: 'Todos' },
        { id: 3, name: 'Sin stock' },
        { id: 4, name: 'Stock < 0' },
        { id: 5, name: 'Stock infinito' },
      ],
    } // return DATA
  }, // DATA
  computed: {
  }, // COMPUTED
  watch: {
    selectedFilteredBy(val) {
      if (val == null) {
        this.$nextTick(() => {
          this.selectedFilteredBy = 1;
        });
      }
      this.filterSearchLocal();
    },

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
          list = this.allProductsOfBranch.concat()
          break;
        case 1: // newer
          list = this.allProductsOfBranch.concat().sort((a,b)=>(a.dateCreated > b.dateCreated ? -1 : 1));
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
  }, // CREATED
  methods: {
    // copyProductsList
    // deleteProduct
    // filterProducts
    // filterIndividualProduct
    // finishFilterSearch
    // filterSearchLocal
    // loadAllProductsOfBranch
    // modifyIsAvaible
    // modifyProductOfBranchDB
    // paginationPageChange
    // updatePrice
    // updateSiblings
    // updateStock
    // updateStockPrompt

    copyProductsList() {
      let showPrice = confirm('¿Querés mostrar el precio?');
      let showIcon = confirm('¿Querés mostrar un ícono de lista?');
      let text = '';
      for (let ProdOfBranch of this.filteredProductsOfBranch) {
        let item = ProdOfBranch.fullName;
        if (showPrice) {
          item = `${item}: $${this.showPrice(ProdOfBranch.realPrice)}`;
        }
        if (showIcon) {
          item = `• ${item}`;
        }
        text += `${item}\r\n`;
      }
      let msg = 'Lista copiada correctamente';
      this.copyToClipboard(text, msg);
    },

    deleteProduct(Prod) {
      // if (Prod.stock) {
      //   alert('No podés eliminar un producto con stock');
      //   return;
      // }
      if (!confirm(`¿Seguro que querés eliminar "${Prod.fullName}" de tu lista?`)) return;
      // DB
      let Params = { productOfBranchID : Prod.id, isActive: 0 };
      this.modifyProductOfBranchDB(Params);
      // DOM
      let index = this.allProductsOfBranch.findIndex(i=>i.id == Prod.id);
      this.allProductsOfBranch.splice(index, 1); // Delete the item from array
      this.filterProducts();
    },

    filterProducts() {
      switch (this.selectedFilteredBy) {
        // Normal
        case 1:
          // Prod.stock != 0 || Prod.price == 0
          this.filteredProductsOfBranch = this.allProductsOfBranch.filter(i => !i.isArchived);
          break;
        // Archived
        case 2:
          this.filteredProductsOfBranch = this.allProductsOfBranch.filter(i => (i.isArchived))
          break;
        // No stock or no price
        case 3:
          this.filteredProductsOfBranch = this.allProductsOfBranch.filter(i => (!i.isArchived && !i.hasInfiniteStock && (i.stock <= 0 || !i.price)))
          break;
        // Stock < 0
        case 4:
          this.filteredProductsOfBranch = this.allProductsOfBranch.filter(i => (this.getStock(i) < 0))
          break;
        // Infinite stock
        case 5:
          this.filteredProductsOfBranch = this.allProductsOfBranch.filter(i => (i.hasInfiniteStock))
          break;
      }
    },
    filterIndividualProduct(Product, value) {
      if (!value) return;
      this.filteredProductsOfBranchOfSearch.push(Product);
    },
    finishFilterSearch() {
      if (this.search == '') return;
      this.filteredProductsOfBranch = this.filteredProductsOfBranchOfSearch;
    },
    filterSearchLocal() {
      this.filterProducts();
      this.filteredProductsOfBranchOfSearch = [];
      let Params = {
        search: this.search,
        productsArray: this.filteredProductsOfBranch,
        action: this.filterIndividualProduct,
        finalCallback: this.finishFilterSearch,
      }
      this.filterSearch(Params);
    },

    loadAllProductsOfBranch() {
      let Params = {
        branchID: this.getBranchID(),
        isActive: 1,
        search: this.search,
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
            Prod.newStock = Prod.stock;
            Prod.newStockAlert = Prod.stockAlert;
            Prod.realPrice = this.getRealPrice(Prod);
          }
          this.allProductsOfBranch = allProductsOfBranch;
          this.filterProducts();
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    modifyIsAvaible(ProdOfBranch) {
      if (this.avoidDuplicates++ %2) return;
      let Params = {
        productOfBranchID: ProdOfBranch.id,
        isAvaible: ProdOfBranch.isAvaible,
      }
      this.modifyProductOfBranchDB(Params);
    },

    modifyProductOfBranchDB(Params){
      Params.datetimeLastUpdate = this.getActualDatetimeToDB();
      this.conectToDB({
        file: 'Products', action: 'modifyProductOfBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    paginationPageChange(value) {
      let position = this.$refs.mainProductsTable.offsetTop;
      this.myScrollTo(position-80);
    },

    updatePrice(Product, updateSiblings = true) {
      Product.price = this.showPrice(Product.price);
      Product.offert = this.showPrice(Product.offert);
      Product.realPrice = this.getRealPrice(Product);
      if (updateSiblings) {
        this.updateSiblings(Product);
      }
      let Params = {
        productOfBranchID: Product.id,
        price: Product.price,
        offert: Product.offert,
      }
      this.modifyProductOfBranchDB(Params);
    },

    updateSiblings(UpdatedProd) {
      for (let Prod of this.allProductsOfBranch) {
        if (Prod.detailsID == UpdatedProd.detailsID) {
          Prod.price = UpdatedProd.price;
          Prod.offert = UpdatedProd.offert;
          Prod.realPrice = UpdatedProd.realPrice;
          this.updatePrice(Prod, false);
        }
      }
    },

    updateStock(Prod) {
      Prod.newStock = this.parseInt(Prod.newStock);
      let stockDiference = Prod.newStock - Prod.stock;
      let stockAlertDiference = Prod.newStockAlert - Prod.stockAlert;
      if (!stockDiference) {
        // Modify stock
        let Params = {
          product: Prod.productID,
          amount: stockDiference,
          websiteZoneID: this._localDB.StockChangesWebsiteZoneIDs.masiveStockChanger,
        }
        // Modify old value, for the next change
        Prod.stock = Prod.newStock;
        // updateDB
        this.updateProductStock(Params);
      } else if (stockAlertDiference) {
        // hacer código
      }
    },

    updateStockPrompt(Params) {
      let index = this.allProductsOfBranch.findIndex((i) => i.id == Params.productOfBranchID);
      this.allProductsOfBranch[index].stock = Params.newStock;
      this.allProductsOfBranch[index].stockAlert = Params.newStockAlert;
    },



  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

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

.hasParentIcon {
  margin-left: 5px;
}

</style>
