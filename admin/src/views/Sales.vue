<template>
  <div class="data-list-container">

    <!-- Prompts -->
    <columns-manager
      :isPromptActive="IsPromptActive.columnsManager"
      :HideableColumns="Columns"
      :isHidden="isHidden"
      @updatePromptColumns="isHidden = $event;"
      @closePromptColumns="IsPromptActive.columnsManager = false;"
      :multipleRows="{ Sales: 'Ventas', Products: 'Productos' }"
    />

    <PromptProductsList
      :isPromptActive="IsPromptActive.productsList"
      :productsList="productsList"
      :SelectedSale="SelectedSale"
      :Columns="Columns.Products"
      :isHidden="isHidden"
      :allSaleProductDeletedReasons="allSaleProductDeletedReasons"
      @modifySale="modifySaleDB($event)"
      @closePrompt="IsPromptActive.productsList = false;"
      @openPrompt="IsPromptActive.productsList = true"
      @modifySaleProductDB="modifySaleProductDB($event)"
    />

    <prompt-edit-sale
      :isPromptActive="IsPromptActive.editSale"
      :Sale="saleToEdit"
      @closePrompt="IsPromptActive.editSale = false"
      @modifySale="modifySaleDB($event)"
    />

    <TablePickUpProducts
    :Products="pickUpProducts"
    />

    <tableSales
      :vmMain="getThis()"
      :itemsPerPage="itemsPerPage"
      :Sales="filteredSales"
      :Columns="Columns.Sales"
      :isHidden="isHidden"
      :EmployeesSales="EmployeesSales"
      :showEmployeesSales="showEmployeesSales"
      :listLength="listLength"
      :showFutureSales="showFutureSales"
      @reloadSales="loadSales()"
      @newCurrentPage="updatePagination($event)"
      @controlStock="loadSaleProducts($event.Sale, controlStock, $event.Params)"
      @modifySaleDB="modifySaleDB($event)"
      @showProducts="showProducts($event)"
      @startEdit="startEdit($event)"
      @copyList="loadSaleProducts($event, copyList, $event);"
      @printList="loadSaleProducts($event, printList, $event)"
      @filterCities="selectedCities = $event"
      @manageColumns="manageColumns()"
      @modifyShowEmployeesSales="changeEmployeesSales($event);"
      @newItemsPerPage="newItemsPerPage($event)"
    />


    <!--IMPRIMIBLE-->
    <form method="post" action="#" id="boletaImprimible" v-if="print">
      <vs-row vs-w="6"> <!-- "vs-w" define el ancho-->
        <vs-col>

          <!-- <img :src="getImg('logo/clientHeader.png')" class="py-5 text-center" style="height: 80px"> -->
          <img src="https://rapisuper.com.ar/images/logo/clientHeader.png" alt="" class="py-5 text-center" style="height: 80px">
          <hr>
          <h3 class="pt-5">Informacion</h3>
          <vs-row>
            <vs-col>
              <vs-row>
                <vs-col>
                  Nombre:
                </vs-col>
                <vs-col>
                  {{SelectedSale.buyerFullName}}
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col>
                  Direccion:
                </vs-col>
                <vs-col>
                  {{getBuyerAddress(SelectedSale)}}
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col>
                  Telefono:
                </vs-col>
                <vs-col>
                  {{SelectedSale.buyerPhone}}
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col>
                  Forma de Pago:
                </vs-col>
                <vs-col>
                  {{SelectedSale.paymentType}}
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col>
                  Hora:
                </vs-col>
                <vs-col>
                  {{getFullReceptionTime(SelectedSale)}}
                </vs-col>
              </vs-row>


            </vs-col>
          </vs-row>

          <hr>
          <h3 class="pt-3">Lista</h3>
          <vs-row>
            <vs-col>
              <ul>
                <li v-for="(prod,index) of productsList" :key="index">
                  {{prod.amount}}u x {{prod.fullName}} = ${{prod.amount*prod.price}}
                </li>
                <hr>

                <p>Total: <b>${{showPrice(SelectedSale.totalTotal2)}}</b> </p>
                <p v-if="SelectedSale.paymentTypeID == 1 && SelectedSale.paymentPrediction">{{showPaymentPrediction(SelectedSale.paymentPrediction)}}</p>

              </ul>
            </vs-col>
          </vs-row>

        </vs-col>
      </vs-row>

    </form>

  </div>


</template>











<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
import printJS from 'print-js'

export default {
  mixins: [
    vsTableConfig,
  ],
  components: {
    PromptProductsList: () => import('./components/sales/PromptProductsList.vue'),
    PromptEditSale: () => import('./components/sales/PromptEditSale.vue'),
    TableSales: () => import('./components/sales/TableSales.vue'),
    TablePickUpProducts: () => import('./components/sales/TablePickUpProducts.vue'),
  },
  data() {
    return {
      search: '',
      allSaleProductDeletedReasons: [],
      selectedFilteredByBuyerEmployeeID: 0,
      showFutureSales: false,
      listLength: 0,
      itemsPerPage: 40,
      print: false,
      active: true,
      currentPageOfTable: 1,
      // Promts
      EmployeesSales: [],
      showEmployeesSales: false,
      IsPromptActive: { productsList: false, editSale: false, },
      saleToEdit: {},
      productsList: [],
      SelectedSale: {},
      selectedCities: [],
      Sales: [],
      pickUpProducts: [],

      isHidden: { Sales: [ 'showProducts' ], Products: [], },
      // static
      Columns: {
        Sales: [
          { name: 'id'               , title: 'ID', },
          { name: 'date'             , title: 'Fecha de compra', nowrap: false, },
          { name: 'isPrinted'        , title: 'Imp.', },
          { name: 'productsAmount'   , title: 'Cant.', },
          { name: 'isStockControled' , title: 'Stock controlado', nowrap: false, },
          { name: 'controlStock'     , title: 'Controlar stock', nowrap: false, },
          { name: 'states'           , title: 'Estado', },
          { name: 'changeToBuyerSale', title: 'Cambiar es venta a empleado', nowrap: false, },
          { name: 'functions'        , title: 'Funciones', },
          { name: 'buyerID'          , title: 'ID Comprador' },
          { name: 'buyerEmployee'    , title: 'Empleado' },
          { name: 'buyer'            , title: 'Comprador', },
          { name: 'isPayed'          , title: 'Pagado', },
          { name: 'paymentType'      , title: 'Pago', },
          { name: 'paymentDatetime'  , title: 'Fecha de pago', nowrap: false, },
          { name: 'shippingNeeded'   , title: 'Envío', },
          { name: 'reception'        , title: 'Horario de entrega', },
          { name: 'total'            , title: 'Total', },
          { name: 'address'          , title: 'Dirección', },
          { name: 'phone'            , title: 'Teléfono', },
          { name: 'notes'            , title: 'Notas', },
          { name: 'reportIssue'      , title: 'Cancelar', },
        ],
        Products: [
          { name: 'id'              , title: 'ID' },
          { name: 'state'           , title: 'Estado' },
          { name: 'img'             , title: 'Img' },
          { name: 'amountAndName'   , title: 'Cantidad y nombre' },
          { name: 'totalPrice'      , title: 'Total' },
          // { name: 'change'          , title: 'Cambiar' },
          { name: 'modify'          , title: 'Modificar' },
          { name: 'delete'          , title: 'Eliminar' },
        ],
      },
      // selectedProfile: 0, // Lisandro
      selectedProfile: 1, // it's updated on created
      Profiles: [
        /* 00 - Testing  */ { Sales: [], Products: [] },
        /* 01 - Admin    */ { Sales: [            'id', 'buyerID', 'buyerEmployee', 'date', 'isStockControled', 'controlStock', 'state', 'changeToBuyerSale', 'changeToBuyerSale', 'paymentDatetime', 'notes', ], Products: [ 'id', ], },
        /* 02 - subAdmin */ { Sales: [            'id', 'buyerID', 'buyerEmployee', 'date', 'isStockControled', 'controlStock', 'state', 'changeToBuyerSale', 'changeToBuyerSale', 'paymentDatetime', 'notes', ], Products: [ 'id', ], },
        /* 03 - gestión  */ { Sales: [ 'isPayed', 'id', 'buyerID', 'buyerEmployee', 'date', 'isStockControled', 'controlStock', 'state', 'changeToBuyerSale', 'changeToBuyerSale', 'paymentDatetime', 'notes', ], Products: [ 'id', ], },
        /* 04 - ventas   */ { Sales: [ 'isPayed', 'id', 'buyerID', 'buyerEmployee', 'date', 'isStockControled', 'controlStock', 'state', 'changeToBuyerSale', 'changeToBuyerSale', 'paymentDatetime', 'notes', ], Products: [ 'id', ], },
      ],
    } // return DATA
  }, // DATA
  computed: {
    filteredSales: function() {
      if (!this.selectedCities.length) return this.Sales;
      // this.$vs.loading({
      //   container: `#filterCities`,
      //   scale: 0.6
      // });
      let filtered = this.Sales.filter( Sale => {
        for (let City of this.selectedCities) {
          if (Sale.buyerCityID == City.id) return true;
        }
      });
      // this.$vs.loading.close(`#filterCities`);
      return filtered;
    }
  }, // COMPUTED
  created() {
    this.loadSaleProductDeletedReasons();
    // this.loadSales();
    this.updateUserProfile();
  },
  watch: {
    selectedProfile: function(val) {
      this.loadProfile();
    },
  }, // WATCH
  methods: {
    // controlStock
    // checkPickUpProductsForToday
    // checkSaleIsFinished
    // copyList
    // modifySaleDB
    // loadSaleProducts
    // loadSaleProductDeletedReasons
    // loadSales
    // loadProfile
    // newItemsPerPage
    // reportIssueProduct
    // searchSales
    // startEdit
    // updatePagination
    // updateUserProfile
    changeEmployeesSales(val) {
      this.showEmployeesSales = val;
      this.loadSales();
      this.isHidden.Sales.buyerEmployee = !val;
      this.isHidden.Sales.buyer = val;
    },
    controlStock(Params) {
      Params.addStock = Params.addStock ? Params.addStock : false;
      for (let Prod of this.productsList) {
        let ParamsToDB = {
          productID: Prod.productID,
          amount:    Prod.amount*(Params.addStock ? +1 : -1),
          websiteZoneID: Params.websiteZoneID,
        }
        this.updateProductStock(ParamsToDB);
      }
    },
    checkPickUpProductsForToday(OriginalSale) {
      let Sale = this.copyObj(OriginalSale);
      this.conectToDB({
        file: 'Sales', action: 'getSaleProducts', params: { saleID: Sale.id, isActive: 1, },
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let SaleProducts = res.data.data;
          for (let SaleProd of SaleProducts) {
            if (!SaleProd.pickUpPlaceID) continue;
            if (SaleProd.pickUpPlaceStateID == this._localDB.ProductPickUpStateIDs.Recibido) continue;
            let newSaleProd = this.copyObj(SaleProd);
            newSaleProd.buyerFullName = Sale.buyerFullName;
            newSaleProd.receptionTimeFull = this.getFullReceptionTime(Sale);
            newSaleProd.receptionTime = Sale.receptionTime;
            for (var i = 0; i < this.pickUpProducts.length; i++) {
              let Prod = this.pickUpProducts[i];
              if (Prod.receptionTime <= newSaleProd.receptionTime) {
                this.pickUpProducts.splice(i, 0, newSaleProd);
                return;
              }
            }
            this.pickUpProducts.push(newSaleProd);
            return;
          }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    checkSaleIsFinished(stateID) {
      if (stateID == this._localDB.SaleStateIDs.Desconocido)  return true;
      if (stateID == this._localDB.SaleStateIDs.Cancelado)  return true;
      return false;
    },
    copyList(Sale) {
      let msg = `Lista copiada para la compra de <b>${Sale.buyerFullName}</b>`;
      // Get text
      let details = '';
      let totalTotal = 0;
      let changesDetails = '';
      let missingProductsDetails = '';
      for (let Prod of this.productsList) {
        let totalProduct = this.showPrice(Prod.amount * Prod.price);
        if (Prod.isDeleted || Prod.isAdded) {
          if (Prod.isDeleted) {
            missingProductsDetails += `${Prod.amount}u x ${Prod.fullName} = $0 (Descontado${Prod.deletedReasonText == '' ? '' : ' por '+ Prod.deletedReasonText })\r\n`;
          } else if (Prod.isAdded) {
            if (Prod.isAddedByProductID == 0) {
              changesDetails += `${Prod.amount}u x ${Prod.fullName} = $${totalProduct} (Agregado)\r\n`;
            } else {
              changesDetails += `${Prod.amount}u x ${Prod.fullName} = $${totalProduct} (Agregado en reemplazo de ${Prod.isAddedByProductName})\r\n`;
            }
            totalTotal += +totalProduct;
          }
        } else {
          details += `${Prod.amount}u x ${Prod.fullName} = $${totalProduct}\r\n`;
          totalTotal += +totalProduct;
        }
      }
      let text = '';
      text += Sale.buyerFullName == '' ? '' : `NOMBRE: ${Sale.buyerFullName}\r\n`
      text += Sale.buyerCityID == 0 ? '' : `DIRECCIÓN: ${this.getBuyerAddress(Sale)}\r\n`
      text += !Sale.buyerPhone ? '' : `TELÉFONO: ${Sale.buyerPhone}\r\n`
      text += `FORMA DE PAGO: ${Sale.paymentType}\r\n`
      if (Sale.shippingNeeded) {
        text += Sale.receptionTime == this.emptyDatetime ? '' : `HORA: ${this.getFullReceptionTime(Sale)} - ${this.getDateOfDB(Sale.receptionDate, true)}\r\n`
      } else {
        text += 'RETIRO EN LOCAL'
      }
      text += this.getControlDetailsOfSale(Sale)+'\r\n';
      if (details != '') {
        text += '\r\nPEDIDO\r\n';
        text += `${details}`;
      }
      if (missingProductsDetails) {
        text += '\r\nELIMINADOS\r\n';
        text += `${missingProductsDetails}`;
      }
      if (changesDetails != '') {
        text += '\r\nAGREGADOS\r\n';
        text += `${changesDetails}`;
      }
      text += '\r\n';
      if (Sale.discountCodeID != 0) {
        text += `\r\nTotal productos: $${this.showPrice(totalTotal)}`;
        let discount = this.applyDiscount(totalTotal, Sale, true);
        text += `\r\nDescuento: - $${this.showPrice(discount)}`;
        totalTotal = totalTotal - discount;
      }
      text += `\r\nEnvío: ¡Gratis!`;
      text += `\r\nTOTAL: $${this.showPrice(totalTotal)}\r\n`;
      if (Sale.paymentTypeID == 1 && Sale.paymentPrediction) {
        text += `${this.showPaymentPrediction(Sale.paymentPrediction)}\r\n`;
      }
      this.copyToClipboard(text, msg);
    },

    printList() {
      console.log("Printing")
      var totalTotal = 0
      for (let Prod of this.productsList) {
        let totalProduct = Prod.amount * Prod.price;
        totalTotal = totalTotal + totalProduct;
      }

      this.SelectedSale.totalTotal2 = totalTotal

      let vm = this
      this.print = true
      setTimeout( //Atado con alambre
        ()=> {
          printJS({
                  printable: 'boletaImprimible',
                  type: 'html',
                  targetStyles: ['*'],
                  //style: "#boletaImprimible {visibility: visible; height: auto; width: auto;}",
                  documentTitle: "RapiSuper",
                  onLoadingStart: function () {
                  },
                  onLoadingEnd: function () {
                    vm.print = false
                  }
                });

        }, 50
      )

    },

    modifySaleProductDB(Params) {
      this.conectToDB({
        file: 'Sales', action: 'modifySaleUProduct', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        //   let msg = `${!SaleProd.isReady ? '' : 'ya no ' }está listo`
        //   // vm.myNotify('success', 'Éxito', `<b>${SaleProd.fullName}</b> ${msg}`);
        //   console.log(`"${SaleProd.fullName}" ${msg} - (ID: ${SaleProd.id})`);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    modifySaleDB(Params) {
      this.conectToDB({
        file: 'Sales', action: 'modifySale', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    loadSaleProducts(Sale, callback = '', CallbackParams = {}) {
      this.SelectedSale = Sale;
      let Params = {
        saleID: Sale.id,
        isActive: 1,
      }
      this.conectToDB({
        file: 'Sales', action: 'getSaleProducts', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.productsList = res.data.data;
          if (callback != '') {
            callback(CallbackParams);
          }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    loadSaleProductDeletedReasons() {
      let Params = {
        isActive: 1,
      }
      this.conectToDB({
        file: 'Sales', action: 'getSaleProductDeletedReasons', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.allSaleProductDeletedReasons = res.data.data;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    loadSales() {
      let SaleStateIDs = this._localDB.SaleStateIDs;
      // let itemsPerPage = this.itemsPerPage* (this.currentPageOfTable == 1 ? 2 : 3);
      let Params = {
        branchID: this.getBranchID(),
        hasBuyerEmployeeID: this.showEmployeesSales,
        page: this.currentPageOfTable,
        itemsPerPage: this.itemsPerPage,
      };
      if (Params.hasBuyerEmployeeID && this.selectedFilteredByBuyerEmployeeID != 0) {
        Params.buyerEmployeeID = this.selectedFilteredByBuyerEmployeeID;
      }
      // search
      if (this.search != '') {
        if (this.showEmployeesSales) {
          Params.searchEmployee = this.search;
        } else {
          Params.search = this.search;
        }
      }
      if (!this.showFutureSales) {
        Params.maxDate = this.getActualDateToDB();
      }
      this.recalculateCount(Params);
      this.conectToDB({
        file: 'Sales', action: 'getSale', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let Sales = res.data.data;
          console.log('Sales', Sales);
          this.pickUpProducts = [];
          for (let Sale of Sales) {
            Sale.Cancelado = !!Sale.stateID == SaleStateIDs.Cancelado;
            Sale.isPayed = Sale.paymentDatetime != this.emptyDatetime;
            if (Sale.receptionDate != this.getActualDateToDB()) continue;
            if (Sale.stateID == SaleStateIDs.Cancelado) continue;
            this.checkPickUpProductsForToday(Sale);
          }
          if (this.showEmployeesSales) {
            this.EmployeesSales = Sales;
          } else {
            this.Sales = Sales;
          }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    newItemsPerPage(val) {
      this.itemsPerPage = val;
      this.loadSales();
    },

    showProducts(Sale) {
      this.loadSaleProducts(Sale);
      this.IsPromptActive.productsList = true;
    },

    startEdit(Sale) {
      this.saleToEdit = Sale;
      this.IsPromptActive.editSale = true;
    },

    recalculateCount(ParasOriginal) {
      let Params = this.copyObj(ParasOriginal);
      this.conectToDB({
        file: 'Sales', action: 'getSaleCount', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.listLength = res.data.data[0].totalCount;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    updatePagination(page) {
      this.currentPageOfTable = page;
      this.loadSales();
    },

    updateUserProfile() {
      this.selectedProfile = this.getUser().roleID;
    },

  }, // METHODS
}
</script>















<style lang="scss">
  .notOverflow {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .payment0{ color:rgb(255, 159, 67); } // Error
  .payment1 { color: #209353 } // Efectivo
  .payment2 { color: #1F1590 } // Argentino / Central
  .payment3 { color: #FF4136 } // Otras tarjetas
  .payment4 { color: #009EE3 } // QR Mercadopago

  .productAmount {
    font-weight: bold;
  }

  #boletaImprimible {
    //visibility: hidden;
    // height: 0;
    .vs-row {
      flex-flow: unset;
    }
  }

</style>




<!-- vm.$set(vm.Sales[position], 'Products', res.data.data)


for (let i in vm.Sales) {
  vm.loadSaleProducts(vm.Sales[i].id, i);
} -->
