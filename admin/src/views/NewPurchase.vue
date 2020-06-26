<template>
  <div class="data-list-container">



    <!-- PROMPTS -->
    <!-- New supplier to product -->
    <vs-prompt
      title='Nuevo proveedor para el producto'
      :active.sync="IsPromptActive.newSupplier"
      @accept="newSupplierEnd"
      accept-text="Agregar"
      cancel-text="Cancelar"
    >
      <div class="con-exemple-prompt">
        <div class="w-full">
          <vs-select label="Proveedor" v-model="NewSupplier.supplierID" class="w-full">
            <vs-select-item :value="Supplier.id" :text="Supplier.name" v-for="Supplier,index in NewSupplier.AllShowedSuppliers" />
          </vs-select>
          <div class="helpMessage">
            * Si no aparece en la lista, ya tiene precio *
          </div>
        </div>
      </div>
    </vs-prompt>

    <!-- summary -->
    <vs-prompt
      title='Resumen de la compra'
      :active.sync="IsPromptActive.summary"
      accept-text="Terminar compra"
      cancel-text="Cancelar"
      @accept="finishPurchase"
    >
      <div class="con-exemple-prompt">
        <div class="w-full">
          <div v-if="totalTotal" class="summary">
            <!-- <h4 class="totalBySuppliers-title"><b>Total</b> por proveedor</h4> -->
            <ul>
              <li class="totalBySuppliers-item" v-for="Total, index in TotalBySupplier">
                <vs-button color="primary" type="filled" text-color="primary" class="copyBtn" @click="copySupplier(Total, index)">
                  <font-awesome-icon :icon="['far', 'copy']" class="copyIcon"/>
                </vs-button>
                <span class="supplier">{{ ` ${Total.supplier}:` }}</span>
                <div class="nowrap" style="display: inline-block">
                  {{` $ ${Total.price}` }}
                  <font-awesome-icon icon="check-circle" class="checkSupplierIcon" v-if="Total.isCopied"/>
                </div>
              </li>
            </ul>
            <div class="totalTotal">
              <span class="title">TOTAL: </span> $ {{ totalTotal }}
              <font-awesome-icon icon="check-circle" class="checkSupplierIcon" v-if="allDetailsCopied"/>
            </div>
          </div>
        </div>
      </div>
    </vs-prompt>

    <!-- add some suppliers -->
    <vs-prompt
      title='Agregar por proveedor'
      :active.sync="isAddSomeSuppliersPromptActive"
      @accept="addSomeSuppliersStartReal"
      @cancel="addSomeSuppliersEnd"
      accept-text="Aceptar"
      cancel-text="Cancelar"
    >
      <div class="con-exemple-prompt">
        <div class="w-full">
          <vs-select label="Proveedor" v-model="addSomeSuppliers.tempSupplierID" class="w-full">
            <vs-select-item :value="Supplier.id" :text="Supplier.name" v-for="Supplier in AllSuppliers"/>
          </vs-select>
        </div>
      </div>
    </vs-prompt>

    <!-- columns -->
    <columns-manager
      :isPromptActive="IsPromptActive.columnsManager"
      :HideableColumns="HideableColumns"
      :isHidden="isHidden"
      @updatePromptColumns="isHidden = $event;"
      @closePromptColumns="IsPromptActive.columnsManager = false;"
    />

    <!-- END PROMPTS -->








    <!-- PRODUCTS WITHOUT SUPPLIERS -->
    <div v-show="ProductsWithoutSupplier.length" class="mb-5">
      <vs-collapse type="border">
       <vs-collapse-item>
          <div slot="header">
            <b>Productos sin proveedor asignado</b>
          </div>
          <!-- TABLE Product without suppliers -->
          <template>
            <vs-table ref="table2" :data="ProductsWithoutSupplier" pagination :max-items="itemsPerPage" noDataText="No hay ningún producto sin proveedor" search>
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between" style="padding-bottom: 14px;">
                <vs-button class="mr-3" color="primary" type="border" @click="addSomeSuppliersStart()" v-if="!addSomeSuppliers.supplierID">Agregar por proveedor</vs-button>
                <vs-button class="mr-3" color="primary" type="border" @click="addSomeSuppliersEnd()" v-if="addSomeSuppliers.supplierID">Dejar de agregar por proveedor</vs-button>

                <div v-if="addSomeSuppliers.supplierID">
                  Agregando productos al proveedor: <b>{{ addSomeSuppliers.supplier }}</b>
                </div>

                <items-per-page :itemsLength="ProductsWithoutSupplier.length" :currentPage ="currentPage2" :itemsPerPage ="itemsPerPage"/>
              </div> <!-- header -->

              <!-- Product without suppliers TITLES -->
              <template slot="thead">
                <vs-th v-if="!isHidden.productID" sort-key="productID" class="nowrap">Prod ID</vs-th>
                <vs-th v-if="addSomeSuppliers.supplierID">Agregar</vs-th>
                <vs-th v-if="!addSomeSuppliers.supplierID">Nuevo</vs-th>
                <vs-th>Img</vs-th>
                <vs-th sort-key="product">Producto</vs-th>
              </template>

              <!-- Product without suppliers ITEMS -->
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="`noSupplier-${tr.id}`" v-for="tr, indextr in data">
                  <!-- productID -->
                  <vs-td v-if="!isHidden.productID" :data="tr.id" class="autoWidth">
                    <vs-chip color="primary" style="margin-left: 20px;">{{ tr.id }}</vs-chip>
                  </vs-td>
                  <!-- add to supplier -->
                  <vs-td v-if="addSomeSuppliers.supplierID" class="autoWidth">
                    <vs-switch v-model="tr.added" @click="addProdToSupplier(tr, indextr)"/>
                  </vs-td>
                  <!-- new supplier -->
                  <vs-td v-if="!addSomeSuppliers.supplierID" class="autoWidth">
                    <vs-button color="primary" type="border" icon="add"
                    @click="newSupplierStart(tr.id, tr.fullName, true)"
                    ></vs-button>
                  </vs-td>
                  <!-- img -->
                  <vs-td class="smallPadding autoWidth">
                    <img class="itemImg" :src="getImgDual(`${tr.id}-1`)">
                  </vs-td>
                  <!-- product -->
                  <vs-td :data="tr.fullName" class="nowrap">
                    {{ tr.fullName }}
                  </vs-td>
                </vs-tr>

              </template> <!-- ProductsWithoutSupplier Items -->
            </vs-table>
          </template> <!-- ProductsWithoutSupplier table -->
        </vs-collapse-item>
      </vs-collapse>
    </div>
    <!-- END PRODUCTS WITHOUT SUPPLIERS -->








    <template>
      <vs-table ref="table" :data="Products" pagination :max-items="itemsPerPage" noDataText="No hay ningún producto" search class="text-center">

        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between" style="padding-bottom: 14px;">
          <div class="flex flex-wrap-reverse items-center">
            <vs-button color="primary" type="filled" class="columnsManagerBtn" @click="manageColumns()">
              <font-awesome-icon icon="columns"/>
            </vs-button>
            <vs-button class="mr-3" color="primary" type="border" @click="showSummary()">Ver resumen</vs-button>
            <!-- <vs-button class="mr-3" color="primary" type="border" @click="finishPurchase()">Terminar compra</vs-button> -->
            <vs-button class="mr-3" color="danger" type="border" @click="deletePurchase()">Eliminar compra</vs-button>
            <div class="squareTotalPrice">
              <h5 style="display: inline-block; margin-right: 15px;">TOTAL:</h5> <span>$ {{ totalTotal }}</span>
            </div>
          </div>
          <items-per-page :itemsLength="Products.length" :currentPage ="currentPage" :itemsPerPage ="itemsPerPage"/>
        </div> <!-- header -->

        <!-- PRODUCTS TITLES -->
        <template slot="thead">



          <vs-th v-if="!isHidden.id" sort-key="id">ID</vs-th>
          <vs-th v-if="!isHidden.productID" sort-key="productID" class="nowrap">Prod ID</vs-th>
          <vs-th v-if="!isHidden.img">Img</vs-th>
          <vs-th v-if="!isHidden.newItem">Nuevo</vs-th>
          <vs-th v-if="!isHidden.product" sort-key="product">Producto</vs-th>
          <vs-th v-if="!isHidden.iva" sort-key="iva">IVA</vs-th>
          <vs-th v-if="!isHidden.supplier" sort-key="supplier">Proveedor</vs-th>
          <vs-th v-if="!isHidden.percentageCharge" sort-key="percentageCharge">Comisión</vs-th>
          <vs-th v-if="!isHidden.minAmount">Bulto</vs-th>
          <vs-th v-if="!isHidden.noIvaPrice" sort-key="noIvaPrice">Precio sin IVA</vs-th>
          <vs-th v-if="!isHidden.price" sort-key="price">Precio con IVA</vs-th>
          <vs-th v-if="!isHidden.priceMultiplier">Multip.</vs-th>
          <vs-th v-if="!isHidden.salePrice" sort-key="salePrice">Precio venta</vs-th>
          <vs-th v-if="!isHidden.amount" sort-key="amount">Cant.</vs-th>
          <vs-th v-if="!isHidden.stock" sort-key="stock">Stock</vs-th>
          <vs-th v-if="!isHidden.total" sort-key="total">TOTAL</vs-th>
          <vs-th v-if="!isHidden.dateTime" sort-key="dateTime">Actualizado</vs-th>
          <vs-th v-if="!isHidden.deleteItem">Eliminar</vs-th>
        </template>

        <!-- PRODUCTS ITEMS -->
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-if="!tr.hide">
            <!-- id -->
            <vs-td v-if="!isHidden.id" :data="tr.id">
              <vs-chip color="primary">{{ tr.id }}</vs-chip>
            </vs-td>
            <!-- productID -->
            <vs-td v-if="!isHidden.productID" :data="tr.id">
              <vs-chip color="primary" v-if="!tr.hide && !isRepeated(data, indextr)" style="margin-left: 20px;">{{ tr.productID }}</vs-chip>
              <span v-else>{{ spaceChar }}</span>
            </vs-td>
            <!-- img -->
            <vs-td v-if="!isHidden.img" class="smallPadding">
              <div style="position: relative">
                <img v-if="!tr.hide && !isRepeated(data, indextr)" class="itemImg" :src="getImgDual(`${tr.productID}-1`)">
                <span v-else>{{ spaceChar }}</span>
                <div class="isNewLabel" v-if="tr.isNew">Nuevo</div>
              </div>
            </vs-td>
            <!-- new supplier -->
            <vs-td v-if="!isHidden.newItem">
              <vs-button color="primary" type="border" icon="add" v-if="!tr.hide && !isRepeated(data, indextr)"
              @click="newSupplierStart(tr.productID, tr.product)" title="Agregar proveedor para este producto"
              ></vs-button>
              <span v-else>{{ spaceChar }}</span>
            </vs-td>
            <!-- product -->
            <vs-td v-if="!isHidden.product" :data="tr.product" class="nowrap">
              {{ isRepeated(data, indextr) ? spaceChar : tr.product }}
            </vs-td>
            <!-- iva -->
            <vs-td v-if="!isHidden.iva" :data="tr.iva" class="nowrap">
              {{ isRepeated(data, indextr) ? spaceChar : tr.iva +'%' }}
            </vs-td>
            <!-- supplier -->
            <vs-td v-if="!isHidden.supplier" :data="tr.supplier" class="nowrap">
              {{ tr.supplier }}
            </vs-td>
            <!-- percentage charge -->
            <vs-td v-if="!isHidden.percentageCharge" :data="tr.percentageCharge" class="nowrap">
              {{ tr.percentageCharge }}%
            </vs-td>
            <!-- min amount -->
            <vs-td v-if="!isHidden.minAmount" class="autoWidth smallPadding">
              <vs-input v-model="tr.minAmount" class="inputAmount" title="Productos por bulto" @focus="$event.target.select()"
                @input="tr.minAmount = removeNoNumber(tr.minAmount, true)"
                @change="changeMinAmount(tr)"
              />
            </vs-td>
            <!-- no IVA price -->
            <vs-td v-if="!isHidden.noIvaPrice" :data="tr.noIvaPrice" class="autoWidth smallPadding">
              <vs-input icon-no-border icon="attach_money" v-model="tr.noIvaPrice" class="inputPrice" title="Precio sin IVA" @focus="$event.target.select()"
              @input="tr.noIvaPrice = removeNoNumber(tr.noIvaPrice, true)"
              @change="changeNoIvaPrice(tr)"
              />
            </vs-td>
            <!-- price -->
            <vs-td v-if="!isHidden.price" :data="tr.price" class="autoWidth smallPadding">
              <vs-input icon-no-border icon="attach_money" v-model="tr.price" class="inputPrice" title="Precio con IVA" @focus="$event.target.select()"
              @input="tr.price = removeNoNumber(tr.price, true)"
              @change="changePrice(tr, true)"
              />
            </vs-td>
            <!-- price multiplier -->
            <vs-td v-if="!isHidden.priceMultiplier" :data="tr.priceMultiplier" class="autoWidth smallPadding">
              <vs-input v-model="tr.priceMultiplier" class="inputAmount" title="Multiplicador de precio" @focus="$event.target.select()"
                @input="tr.priceMultiplier = removeNoNumber(tr.priceMultiplier, true)"
                @change="changePriceMultiplier(tr)"
              />
            </vs-td>
            <!-- sale price -->
            <vs-td v-if="!isHidden.salePrice" :data="tr.salePrice" class="autoWidth smallPadding">
              <vs-input icon-no-border icon="attach_money" v-model="tr.salePrice" title="Precio de venta" class="inputPrice" @focus="$event.target.select()"
              @input="tr.salePrice = removeNoNumber(tr.salePrice, true)"
              @change="changeSalePrice(tr)"
              />
            </vs-td>
            <!-- amount -->
            <vs-td v-if="!isHidden.amount" :data="tr.amount" class="autoWidth smallPadding">
              <vs-input v-model="tr.amount" class="inputAmount" title="Cantidad" @focus="$event.target.select()"
                @input="tr.amount = removeNoNumber(tr.amount);"
                @change="changeAmount(tr)"
              />
            </vs-td>
            <!-- stock -->
            <vs-td :data="tr.stock" class="autoWidth smallPadding" v-if="!isHidden.stock">
              <vs-chip :color="getStockColor(tr.stock, tr.stockAlert)" class="nowrap">
                <span class="stockOfStockAlert">{{ `${tr.stock} / ${tr.stockAlert}` }}</span>
              </vs-chip>
            </vs-td>
            <!-- total -->
            <vs-td v-if="!isHidden.total" :data="tr.total" class="nowrap">
              {{ !+tr.total ? '' : '$ '+ tr.total }}
            </vs-td>
            <!-- dateTime -->
            <vs-td v-if="!isHidden.dateTime" :data="tr.dateTime" :title="getTimeOfDB(tr.dateTime)">
              {{ getDateOfDB(tr.dateTime) }}
            </vs-td>
            <!-- delete -->
            <vs-td v-if="!isHidden.deleteItem">
              <vs-button color="danger" type="border" icon="clear" @click="deleteItemStart(tr)"></vs-button>
            </vs-td>
          </vs-tr>

        </template> <!-- Products Items -->
      </vs-table>
    </template> <!-- Products table -->
  </div>
</template>











<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';

export default {
  mixins: [vsTableConfig],
  data: ()=>({
    selected: [],
    AllSuppliers: [],
    allDetailsCopied: false,
    IsPromptActive: {
      newSupplier: false,
      summary: false,
      columnsManager: false,
    },
    redirectWaiting: 0,
    isAddSomeSuppliersPromptActive: false,
    addSomeSuppliers: { supplierID: 0, tempSupplierID: 0, supplier: '' },
    NewSupplier: { supplierID: 0, productID: 0, productName: '', AllShowedSuppliers: [], hasNotSupplier: false },
    // selectedProfile: 0, // Lisandro
    selectedProfile: 1, // Lautaro
    // selectedProfile: 2, // Testing
    Products: [],
    itemsPerPage: 15,
    ProductsWithoutSupplier: [],
    totalTotal: 0,
    TotalBySupplier: [],
    newPurchase: [],
    Purchases: [],

    // static
    spaceChar: '', // '-', '´', '|'
    HideableColumns: [
      { name: 'id'              , title: 'ID', },
      { name: 'productID'       , title: 'Producto ID', },
      { name: 'img'             , title: 'Imagen', },
      { name: 'newItem'         , title: 'Nuevo proveedor', },
      { name: 'product'         , title: 'Producto', },
      { name: 'iva'             , title: 'IVA', },
      { name: 'supplier'        , title: 'Proveedor', },
      { name: 'percentageCharge', title: 'Comisión', },
      { name: 'minAmount'       , title: 'Bulto', },
      { name: 'noIvaPrice'      , title: 'Precio sin IVA', },
      { name: 'price'           , title: 'Precio con IVA', },
      { name: 'priceMultiplier' , title: 'Multiplicador precio', },
      { name: 'salePrice'       , title: 'Precio venta', },
      { name: 'amount'          , title: 'Cantidad', },
      { name: 'stock'           , title: 'Stock', },
      { name: 'total'           , title: 'TOTAL', },
      { name: 'dateTime'        , title: 'Actualizado', },
      { name: 'deleteItem'      , title: 'Eliminar proveedor', },
    ],
    Profiles: [
      /* 00 - Lisandro */ [],
      /* 01 - Lautaro */ [ 'id', 'productID', 'iva', 'percentageCharge'],
      /* 02 - Testing */ [ 'productID', 'noIvaPrice', 'img', 'iva', 'percentageCharge', 'multiplier', 'stock', 'dateTime', 'deleteItem'  ],
    ],
  }), // DATA
  created() {
    this.loadSuppliersProducts();
    this.loadAllSuppliers();
  }, // CREATED
  methods: {

    // addProdToSupplier
    // addProductDetailsPriceHistoryDB
    // addPurchaseDB
    // addPurchaseProductDB
    // addPurchaseToPurchasesArray
    // addSomeSuppliersEnd
    // addSomeSuppliersStart
    // addSomeSuppliersStartReal
    // addSuppliersProductsDB
    // addSupplierProductHistory
    // addSuppliersProductToArray
    // calculateTotal
    // changeAmount
    // changeMinAmount
    // changeNoIvaPrice
    // changePrice
    // changePriceMultiplier
    // checkProductIsInPurchase
    // changeSalePrice
    // checkAmount
    // checkSupplierIsInPurchase
    // copySupplier
    // deleteItemStart
    // deletePurchase
    // finishPurchase
    // getTotalOfItem
    // hideOtherSuppliers
    // isRepeated
    // loadAllProducts
    // loadAllSuppliers
    // loadPurchases
    // loadPurchasesProducts
    // loadSuppliersProducts
    // modifyProductDetailsDB
    // modifyPurchaseDB
    // modifyPurchaseProductDB
    // modifySupplierProductDB
    // newSupplierEnd
    // newSupplierStart
    // prepareToShow
    // showOtherSuppliers
    // showSummary

    addProdToSupplier(Item, index) {
      this.ProductsWithoutSupplier.splice(index, 1);
      let params = {
        productID: Item.id,
        supplierID: this.addSomeSuppliers.supplierID
      }
      this.addSuppliersProductsDB(params);
      this.myNotify('success', '¡Éxito!', `<b>${Item.fullName}</b> agregado al proveedor <b>${this.addSomeSuppliers.supplier}</b>`);
    },
    addProductDetailsPriceHistoryDB(Item) {
      // !! ESTA FUNCIÓN LA CAMBIÉ A PriceHistory.php y le cambié el nombre
      // const vm = this;
      // this.conectToDB({
      //   file: 'NewProduct', action: 'createProductPriceHistory', params: { detailsID: Item.productDetailsID, price: Item.salePrice, offert: 0 },
      //   success: function(res){
      //     if (res.data.error) { console.log(res.data.data); return; }
      //   },
      // });
    },
    addPurchaseDB(ItemOriginal) {
      let Item = this.copyObj(ItemOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Purchases', action: 'addPurchase', params: { supplierID: Item.supplierID },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.addPurchaseToPurchasesArray(Item, res.data.data);
        },
      });
    },
    addPurchaseProductDB(ItemOriginal) {
      let Item = this.copyObj(ItemOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Purchases', action: 'addPurchaseProduct', params: Item,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Producto agregado a la compra');
          Item.purProdID = res.data.data;
          console.log(Item);
          // Add to list
          for (let i in vm.Purchases) {
            if (vm.Purchases[i].supplierID == Item.supplierID) {
              vm.Purchases[i].Products.push(Item);
            }
          }
          // Add purProd to Products array
          for (let i in vm.Products) {
            let Prod = vm.Products[i];
            if (Prod.supplierID == Item.supplierID && Prod.id == Item.productID) {
              Prod.purProdID = Item.purProdID;
            }
          }
          vm.calculateTotal();
        },
      });
    },
    addPurchaseToPurchasesArray(ItemOriginal, purchaseID) {
      let Item = this.copyObj(ItemOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Purchases', action: 'getPurchase', params: { purchaseID: purchaseID },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let newPurchase = res.data.data[0];
          Item.purchaseID = purchaseID;
          newPurchase.Products = [];
          vm.Purchases.push(newPurchase);
          vm.addPurchaseProductDB(Item);
        },
      });
    },
    addSomeSuppliersEnd() {
      this.addSomeSuppliers.supplierID = 0;
    },
    addSomeSuppliersStart() {
      this.isAddSomeSuppliersPromptActive = true;
    },
    addSomeSuppliersStartReal() {
      console.log(this.addSomeSuppliers);
      this.$set(this.addSomeSuppliers, 'supplierID', this.addSomeSuppliers.tempSupplierID);
      this.$set(this.addSomeSuppliers, 'tempSupplierID', 0);
      this.addSomeSuppliers.tempSupplierID = 0;
      for (let i in this.AllSuppliers) {
        if (this.AllSuppliers[i].id == this.addSomeSuppliers.supplierID) {
          this.$set(this.addSomeSuppliers, 'supplier', this.AllSuppliers[i].name);
        }
      }
    },
    addSuppliersProductsDB(ItemOriginal) {
      let Item = this.copyObj(ItemOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'addSuppliersProducts', params: Item,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.addSuppliersProductToArray(res.data.data);
          let params = {
            productID: Item.productID,
            supplierID: Item.supplierID
          }
          vm.addSupplierProductHistory(params);
        },
      });
    },
    addSupplierProductHistory(params) {
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'addSuppliersProductsHistory', params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        },
      });
    },
    addSuppliersProductToArray(id) {
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'getSuppliersProducts', params: { id: id },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let newItem = vm.prepareToShow(res.data.data)[0];
          newItem.isNew = true;
          let isItemAdded = false;
          let prodID = newItem.productID;
          let totalProducts = vm.Products.length;
          for (var i = 1; i < totalProducts; i++) {
            if (vm.Products[i-1].productID == prodID && prodID != vm.Products[i].productID) {
              // add item to list
              vm.Products.splice(i, 0, newItem);
              isItemAdded = true;
              break;
            }
          }
          if (!isItemAdded) {
            vm.Products.push(newItem);
          }
        },
      });
    },
    calculateTotal() {
      this.totalTotal = 0;
      this.TotalBySupplier.length = 0;
      this.allDetailsCopied = false;
      for (let i in this.Purchases) {
        let pur = this.Purchases[i];
        let newTotal = {
          supplierID: pur.supplierID,
          supplier: pur.supplier,
          price: 0.0,
          isCopied: false,
        }
        this.$set(this.TotalBySupplier, i, newTotal);
        // totales
        pur.totalProducts = 0;
        pur.totalCharged = pur.fixedCharge;
        pur.totalTotal = pur.fixedCharge;
        for (let j in pur.Products) {
          // totales purchase
          let prod = pur.Products[j];
          let itemProducts = +prod.price * (+prod.amount);
          let itemCharge = itemProducts * (+pur.percentageCharge /100);
          let itemTotal = itemProducts + itemCharge;
          pur.totalProducts = this.showPrice(+pur.totalProducts + itemProducts);
          pur.totalCharged = this.showPrice(+pur.totalCharged + itemCharge);
          pur.totalTotal = this.showPrice(+pur.totalTotal + itemTotal);
          this.TotalBySupplier[i].price = this.showPrice(pur.totalTotal);
        }
        this.totalTotal = this.showPrice(+this.totalTotal + (+this.TotalBySupplier[i].price));
        let params = {
          purchaseID: pur.id,
          totalProducts: pur.totalProducts,
          totalCharged: pur.totalCharged,
          totalTotal: pur.totalTotal,
        }
        let notifications = false;
        this.modifyPurchaseDB(params, notifications);
      }
    },

    changeAmount: function(Item){
      // Check amount is right
      if (!this.checkAmount(Item)) {
        return;
      }
      this.$set(Item, 'total', this.getTotalOfItem(Item));
      this.hideOtherSuppliers(Item.productID, Item.supplierID);
      this.checkProductIsInPurchase(Item);
      // check the product and the supplier is in the purchase
      this.checkSupplierIsInPurchase(Item);
      Item.isActive = Item.amount == 0 ? 0 : 1;
      let isSupplierAdded = false;
      let isProductAdded = false;
      for (let i in this.Purchases) {
        if (this.Purchases[i].supplierID == Item.supplierID) {
          // the supplier is in the purchase
          isSupplierAdded = true;
          Item.purchaseID = this.Purchases[i].id;
          for (let j in this.Purchases[i].Products) {
            if (Item.productID == this.Purchases[i].Products[j].productID) {
              // Supplier = yes || Product = yes //
              console.log('Supplier = yes || Product = yes');
              console.log(Item);
              this.Purchases[i].Products[j] = Item;
              this.modifyPurchaseProductDB(Item);
              isProductAdded = true;
              // Delete the item
              if (!Item.isActive) {
                let params = { isActive: 0, }
                // remove from array
                this.Purchases[i].Products.splice(j, 1);
                this.calculateTotal()
                // check the purchase has other products
                if (!this.Purchases[i].Products.length) {
                  this.modifyPurchaseDB(Item);
                  // remove from array
                  this.Purchases.splice(i, 1);
                  return;
                }
              }
            }
          }
          if (!isProductAdded) {
            // Supplier = si || Product = no //
            if (!Item.isActive) return;
            console.log('Supplier = si || Product = no');
            this.addPurchaseProductDB(Item);
          }
        }
      }
      if (!isSupplierAdded) {
        // Supplier = no || Product = no //
        if (!Item.isActive) return;
        console.log('Supplier = no || Product = no');
        this.addPurchaseDB(Item); // Esa funcion crea la compra y después la agrega a la lista de Purchases, y agrega el Item
      }
      console.log(this.Purchases);
    }, // changeAmount()
    changeMinAmount(Item) {
      this.modifySupplierProductDB(Item);
      if (Item.amount % Item.minAmount) {
        this.myAlert('Alerta!' `Con el mínimo ${Item.minAmount}, la cantidad no puede ser ${Item.amount}. (Cantidad cambiada a 0)`, 'warning');
        this.$set(Item, 'amount', 0);
        this.changeAmount(Item);
      }
    },
    changeNoIvaPrice(Item) {
      Item.noIvaPrice = this.showPrice(Item.noIvaPrice);
      this.$set(Item, 'price', this.showPrice(Item.noIvaPrice * (1+Item.iva/100)));
      this.changePrice(Item)
    },
    changePrice(Item, calledByUser = false) {
      console.log(Item);
      if (calledByUser) {
        this.$set(Item, 'price', this.showPrice(Item.price));
        this.$set(Item, 'noIvaPrice', this.showPrice(Item.price / (Item.iva/100 + 1)));
      }
      this.$set(Item, 'salePrice', this.showPrice(Item.priceMultiplier * Item.price));
      this.changeSalePrice(Item);
      // Change value in Purchase
      for (let i in this.Purchases) {
        if (Item.supplierID != this.Purchases[i].supplierID) continue;
        for (let j in this.Purchases[i].Products) {
          let prod = this.Purchases[i].Products[j];
          if (Item.productID == prod.productID) {
            this.$set(this.Purchases[i].Products[j], 'price', Item.price);
            this.$set(Item, 'total', this.getTotalOfItem(Item));
          }
        }
      }
      this.modifySupplierProductDB(Item);
      if (this.checkProductIsInPurchase(Item)) {
        this.modifyPurchaseProductDB(Item);
      }
    },
    changePriceMultiplier(Item) {
      this.$set(Item, 'salePrice', this.showPrice(Item.priceMultiplier * Item.price));
      this.modifySupplierProductDB(Item);
      this.changeSalePrice(Item);
    },
    checkProductIsInPurchase(Item) {
      for (let i in this.Purchases) {
        if (this.Purchases[i].supplierID == Item.supplierID) {
          for (let j in this.Purchases[i].Products) {
            if (Item.productID == this.Purchases[i].Products[j].productID) {
              return true;
            }
          }
        }
      }
    },
    changeSalePrice(Item) {
      Item.salePrice = this.showPrice(Item.salePrice);
      // Cambia el precio del producto
      this.modifyProductDetailsDB(Item);
      // Cambia los precios en el DOM de los prods con el mismo detailID
      for (let i in this.Products) {
        if (this.Products[i].productDetailsID == Item.productDetailsID) {
          this.$set(this.Products[i], 'salePrice', Item.salePrice);
        }
      }
    },
    checkAmount(Item) {
      let isError = false; let message = '';
      if (Item.amount == '') { Item.amount = 0 }
      // if (Item.amount % Item.minAmount) {
      //   isError = true; message = 'Cantidad no permitida por el proveedor';
      // }
      if (Item.amount < 0) {
        isError = true; message = 'La cantidad no puede ser menor que 0';
      }
      if (isError) {
        this.myAlert('Error!', message, 'danger');
        Item.amount = 0;
        return false;
      }
      if (Item.amount == 0) {
        this.showOtherSuppliers(Item.productID);
      }
      return true;
    },
    checkSupplierIsInPurchase(Item) {
      for (let i in this.Purchases) {
        if (this.Purchases[i].supplierID == Item.supplierID) {
          return true;
        }
      }
    },
    copySupplier(Total) {
      // show check icon in item
      this.$set(Total, 'isCopied', true);
      // show check icon in total
      this.allDetailsCopied = true;
      for (let i in this.TotalBySupplier) {
        if (!this.TotalBySupplier[i].isCopied) {
          this.allDetailsCopied = false;
        }
      }
      // get purchase info
      for (let i in this.Purchases) {
        if (this.Purchases[i].supplierID == Total.supplierID) {
          var Purchase = this.Purchases[i];
          console.log(Purchase);
        }
      }
      // copy
      let text = ''
      let totalTotal = 0;
      for (let Prod of Purchase.Products) {
        totalTotal += Prod.amount * Prod.price;
        text += `${Prod.amount}u x ${Prod.product}\r\n`;
      }
      text += `\r\nTOTAL: $${this.showPrice(totalTotal)}\r\n`;
      let totalPlus = totalTotal * ((Purchase.percentageCharge /100)+1) + Purchase.fixedCharge;
      text += `TOTAL + comisión: $${this.showPrice(totalPlus)}`;
      let msg = `Lista copiada para el proveedor <b>${Total.supplier}</b>`;
      this.copyToClipboard(text, msg);
    },
    deleteItemStart(Item) {
      Item.isActive = 0;
      this.modifySupplierProductDB(Item);
    },
    deletePurchase() {
      let isSure = confirm('Estás seguro que querés eliminar la compra?');
      if (!isSure) return;
      for (let i in this.Purchases) {
        let params = {
          isActive: 0,
          purchaseID: this.Purchases[i].id,
        }
        this.modifyPurchaseDB(params);
        this.modifyPurchaseProductDB(params);
      }
      this.Purchases = [];
      // Elimina todos los totales
      this.TotalBySupplier.length = 0;
      // Elimina todos los amount del DOM
      for (let i in this.Products) {
        this.$set(this.Products[i], 'amount', 0);
      }
    },
    finishPurchase() {
      for (let i in this.Purchases) {
        let params = {
          stateID: 1, // "Encargado"
          isOrdered: 1,
          purchaseID: this.Purchases[i].id,
        }
        let redirect = true;
        let notifications = true;
        this.redirectWaiting = this.Purchases.length-1;
        this.modifyPurchaseDB(params, notifications, redirect);
      }
    },
    getTotalOfItem(Item) {
      let realPrice = +Item.price * ((100+(+Item.percentageCharge)) /100)
      return this.showPrice(+Item.amount * +realPrice);
    },
    hideOtherSuppliers(prodID, supplierID) {
      // for (let i in this.Products) {
      //   if (prodID == this.Products[i].productID) {
      //     if (supplierID == this.Products[i].supplierID) continue;
      //     this.$set(this.Products[i], 'hide', true);
      //   }
      // }
    },


    isRepeated(data, i) {
      if (i == 0) return false;
      if (data[i].productID == data[i-1].productID) {
        return true;
      }
      return false;
    },
    loadAllProducts() {
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProduct', params: { isNormal: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let extraProducts = res.data.data;
          for (let i in extraProducts) {
            let isAdded = false;
            for (let j in vm.Products) {
              if (extraProducts[i].id == vm.Products[j].productID) {
                isAdded = true;
              }
            }
            if (!isAdded) {
              vm.ProductsWithoutSupplier.push(extraProducts[i]);
            }
          }
          if (vm.ProductsWithoutSupplier.length) {
            console.log('Products without suppliers:');
            console.log(vm.ProductsWithoutSupplier);
          }
        },
      });
    },
    loadAllSuppliers() {
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'getSupplier', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let AllSuppliers = res.data.data
          AllSuppliers.unshift({id: 0, name: '* seleccionar proveedor *'});
          vm.AllSuppliers = AllSuppliers;
        },
      });
    },
    loadPurchases() {
      const vm = this;
      this.conectToDB({
        file: 'Purchases', action: 'getPurchase', params: { isActive: 1, isOrdered: 0 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let Purchases = res.data.data;
          for (let i in Purchases) {
            Purchases[i].Products = [];
          }
          vm.Purchases = Purchases;
          if (Purchases.length) {
            console.log('Purchases:');
            console.log(Purchases);
          }
          vm.loadPurchasesProducts();
        },
      });
    },
    loadPurchasesProducts() {
      const vm = this;
      this.conectToDB({
        file: 'Purchases', action: 'getPurchaseProducts', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let purProducts = vm.prepareToShow(res.data.data);
          if (purProducts.length) {
            console.log('Pur_products:');
            console.log(purProducts);
          }
          // Add products to purchase array
          for (let i in vm.Purchases) {
            for (let j in purProducts) {
              if (vm.Purchases[i].id == purProducts[j].purchaseID) {
                console.log('');
                purProducts[j].supplierID = vm.Purchases[i].supplierID;
                vm.Purchases[i].Products.push(purProducts[j]);
              }
            }
          }
          // Muestra la información de compra en cada item de producto
          for (let i in vm.Products) {
            let Prod = vm.Products[i]
            for (let j in purProducts) {
              // si tienen mismo productID and supplierID
              if (Prod.productID == purProducts[j].productID && Prod.supplierID == purProducts[j].supplierID) {
                console.log(Prod.product);
                console.log(purProducts[j].product);
                vm.$set(Prod, 'amount', purProducts[j].amount);
                vm.$set(Prod, 'purProdID', purProducts[j].purProdID);
                vm.$set(Prod, 'total', vm.getTotalOfItem(purProducts[j]));
                // Checkea que el precio sea el mismo, sino lo actualiza
                if (Prod.price != purProducts[j].price) {
                  purProducts[j].price = Prod.price;
                  let Params = {
                    price: purProducts[j].price,
                    purProdID: purProducts[j].purProdID,
                  }
                  vm.modifyPurchaseProductDB(Params)
                }
              }
            }
          }
          vm.calculateTotal();
        },
      });
    },
    loadSuppliersProducts() {
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'getSuppliersProducts', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.Products = vm.prepareToShow(res.data.data);
          if (vm.Products.length) {
            console.log('Products:');
            console.log(vm.Products);
          }
          vm.loadPurchases();
          vm.loadAllProducts();
        },
      });
    },
    modifyProductDetailsDB(Item) {
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'modifyProductDetails', params: { detailsID: Item.productDetailsID, price: Item.salePrice },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          // Lo agrega al historial de precios
          vm.addProductDetailsPriceHistoryDB(Item);
        },
      });
    },
    modifyPurchaseDB(paramsOriginal, notifications = true, redirect = false) {
      let params = this.copyObj(paramsOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Purchases', action: 'modifyPurchase', params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          if (notifications) {
            console.log('Compra modificada en DB');
          }
          if (redirect) {
            if (vm.redirectWaiting) {
              vm.redirectWaiting--;
            } else {
              vm.$router.push('purchases');
            }
          }
        },
      });
    },
    modifyPurchaseProductDB(paramsOriginal) {
      let params = this.copyObj(paramsOriginal);
      params.dateTime = this.getActualDatetimeToDB();
      const vm = this;
      this.conectToDB({
        file: 'Purchases', action: 'modifyPurchaseProduct', params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Producto modificado en DB');
          vm.calculateTotal();
        },
      });
    },
    modifySupplierProductDB(ItemOriginal) {
      this.$set(ItemOriginal, 'dateTime', this.getActualDatetimeToDB());
      let Item = this.copyObj(ItemOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'modifySuppliersProducts', params: Item,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Item modificado');
          vm.addSupplierProductHistory(Item);
          vm.calculateTotal();
        },
      });
    },
    newSupplierEnd() {
      if (this.NewSupplier.hasNotSupplier) {
        // remove from not suppliers array
        for (let i in this.ProductsWithoutSupplier) {
          if (this.NewSupplier.productID == this.ProductsWithoutSupplier[i].id) {
            this.ProductsWithoutSupplier.splice(i, 1);
          }
        }
      }
      // hide prompt
      if (this.NewSupplier.supplierID == 0) {
        this.IsPromptActive.newSupplier = true;
        return;
      }
      // modifyDB
      this.addSuppliersProductsDB(this.NewSupplier);
      this.NewSupplier.supplierID = 0;
      this.NewSupplier.productID = 0;
    }, // newItem()
    newSupplierStart(productID, productName, hasNotSupplier = false) {
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'getSuppliersProducts', params: { isActive: 1, productID: productID },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let allUsed = res.data.data;
          vm.NewSupplier.productID = productID;
          vm.NewSupplier.productName = productName;
          vm.NewSupplier.hasNotSupplier = hasNotSupplier;
          // Check suppliers not used
          vm.NewSupplier.AllShowedSuppliers = [];
          vm.NewSupplier.AllShowedSuppliers[0] = vm.AllSuppliers[0];
          for (var i = 1; i < vm.AllSuppliers.length; i++) {
            let isUsed = false;
            for (let j in allUsed) {
              if (vm.AllSuppliers[i].id == allUsed[j].supplierID) {
                isUsed = true;
              }
            }
            if (!isUsed) {
              vm.NewSupplier.AllShowedSuppliers.push(vm.AllSuppliers[i]);
            }
          }
          if (vm.NewSupplier.AllShowedSuppliers.length > 1) {
            vm.IsPromptActive.newSupplier = true;
          } else {
            vm.myAlert('Alerta', 'El producto ya tiene precio para todos los proveedores', 'warning');
          }
        },
      });
    }, // newSupplierStart()
    prepareToShow(list) {
      for (let i in list) {
        // list[i].amount = typeof list[i].amount == 'undefined' ? 0 : list[i].amount;
        // list[i].noIvaPrice = this.showPrice(list[i].price / (list[i].iva/100 + 1));
        // list[i].price = this.showPrice(list[i].price);
        // list[i].salePrice = this.showPrice(list[i].salePrice);
        // list[i].total = this.getTotalOfItem(list[i]);
        // list[i].hide = false;

        this.$set(list[i], 'amount', typeof list[i].amount == 'undefined' ? 0 : list[i].amount);
        this.$set(list[i], 'noIvaPrice', this.showPrice(list[i].price / (list[i].iva/100 + 1)));
        this.$set(list[i], 'price', this.showPrice(list[i].price));
        this.$set(list[i], 'salePrice', this.showPrice(list[i].salePrice));
        this.$set(list[i], 'total', this.getTotalOfItem(list[i]));
        this.$set(list[i], 'hide', false);
      }
      return list;
    },
    showOtherSuppliers(prodID) {
      // for (let i in this.Products) {
      //   if (prodID == this.Products[i].productID) {
      //     console.log(this.Products[i].productID);
      //     this.$set(this.Products[i], 'hide', false);
      //   }
      // }
    },
    showSummary() {
      this.IsPromptActive.summary = true;
    },
  }, // METHODS
}
</script>















<style lang="scss">
.inputPrice {
  width: 120px;
}
.inputAmount {
  width: 55px;
  text-align: center;
}
.smallPadding {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
.helpMessage {
  opacity: 0.5;
  text-align: center;
  margin-top: 15px;
  font-size: 13px;
}
.itemImg {
  max-height: 50px;
  max-width: 50px;
}
.squareTotalPrice {
  border-radius: 5px;
  border: 1px solid #2C2C2C;
  padding: .65rem 2rem;
}
.summary {
  padding: 0 15px;
}
.summary .totalBySuppliers-title {
  display: inline-block;
  border-bottom: 1px dashed;
}
.summary .totalBySuppliers-item {
  margin-top: 10px;
  font-size: 16px;
}
.summary .totalTotal .title,
.summary .totalBySuppliers-item .supplier {
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
}
.summary .totalTotal {
  font-size: 16px;
  margin-top: 10px;
  padding-top: 10px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: right;
}
.copyBtn {
  padding: 10px 20px !important;
  // font-size: 16px;
}
.checkSupplierIcon {
  color: #28C76F;
}
td {
  padding: 5px !important;
}


.inputPrice div input,
.inputAmount div input {
  // v1
  border: none !important;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.1) !important;
  // v5
  // border: none !important;
  // background-color: rgba(21, 176, 206, 0.5) !important;
}

</style>
