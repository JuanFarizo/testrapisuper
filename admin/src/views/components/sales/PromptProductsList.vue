<template>
  <div>

    <PromptShowStock
    :ProductOfBranch="ProductToShowStock"
    :isPromptActive="IsPromptActiveInner.productToShowStock"
    @closePrompt="IsPromptActiveInner.productToShowStock = false; isPromptActiveLocal = true;"
    />

    <vs-popup title="Eliminar de la compra"
    :active.sync="IsPromptActiveInner.removeProductReasonSelector">
      <div class="my-3" tabindex="0" @keyup.esc="IsPromptActiveInner.removeProductReasonSelector = false">
        <h5 class="text-center">
          ¿ Por qué querés eliminarlo ?
        </h5>
        <div v-for="Option of removeProductReasons">
          <vs-button type="border" @click="removeProductFinish(Option)"
          style="width: 210px;
          margin-left: auto;
          margin-right: auto;
          display: block;
          margin-top: 15px;
          ">
            {{ Option.name }}
          </vs-button>
        </div>
      </div>
    </vs-popup>

    <!-- MAIN PROMPT -->
    <!-- products list -->
    <vs-popup class="miclasesita" title="Detalle de compra" :active.sync="isPromptActiveLocal">

      <div v-if="hasError" class="totalErrorAlert">
        Hay un error en la venta. Algunos productos no se guardaron...
        <br>Total real: <b>${{ realTotal }}</b>

        <div>
          <vs-button @click="fixError()" size="small" color="success" class="my-1">
            <font-awesome-icon icon="check"/>
            Corregir los errores
          </vs-button>
        </div>

      </div>
      <div class="saleInfo">
        <span class="mr-5"><b>Comprador:</b> {{ SelectedSale.buyerFullName }}</span>
        <span class="mr-5"><b>Total:</b> ${{ SelectedSale.totalTotal }}</span>
        <span class="mr-5"><b>Hora:</b> {{ getFullReceptionTime(SelectedSale) }}</span>
        <div style="white-space: no-wrap; display: inline-block;">
          <span><b>Pago:</b></span>
          <font-awesome-icon :icon="getPaymentIcon(SelectedSale.paymentTypeID)"
          :title="SelectedSale.paymentType" class="ml-2 mr-5"/>
        </div>
        <div style="white-space: no-wrap; display: inline-block;">
          <span><b>Envío:</b></span>
          <font-awesome-icon :icon="getShippingIcon(SelectedSale.shippingNeeded)" class="shippingIcon ml-2 mr-5"
          :title="SelectedSale.shippingNeeded ? 'Envío a domicilio' : 'Retiro en local'"/>
        </div>

        <div v-if="appliedDiscount" style="white-space: no-wrap; display: inline-block;">
          <span><b>Descuento: </b></span>
          <span>$ {{ appliedDiscount }}</span>
        </div>


        <div class="stateIcon" :class="hasError ? 'errorIcon' : 'okayIcon'" :title="hasError ? 'Hay un error en la compra' : 'La compra fue hecha correctamente'">
          <font-awesome-icon :icon="hasError ? 'times' : 'check'"/>
        </div>


          <vs-button type="border" size="small" class="float-right" @click="uncheckAllProducts()">
            <font-awesome-icon :icon="['far', 'check-square']"/>
            Desmarcar todos los productos
          </vs-button>

       </div>
      <vs-table :data="productsList" noDataText="No se encuentra ningún producto">
        <!-- TITLES -->
        <template slot="thead">
          <vs-th v-for="Col in Columns" v-if="!isHidden.Products[Col.name]"
          :class="{nowrap: Col.nowrap == false}">
            {{ Col.title }}
          </vs-th>
        </template>

        <!-- ITEMS -->
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">

            <!-- id -->
            <vs-td v-if="!isHidden.Products.id" class="autoWidth">
              <vs-chip color="primary">{{ tr.id }}</vs-chip>
            </vs-td>
            <!-- state -->
            <vs-td v-if="!isHidden.Products.state" class="autoWidth centered">
              <div class="stepsGroup unselectable" style="width: 128px; padding-right: 15px;">
                <div @click="changeStep(tr)" class="step w-full"
                :class="{filled: tr.controlStateID >= 1, success: tr.controlStateID == 2}">
                  <span v-if="tr.controlStateID == 0">Pedido</span>
                  <span v-else-if="tr.controlStateID == 1">Armado</span>
                  <span v-else>Controlado</span>
                </div>
              </div>
              <!-- <vs-switch v-model="tr.isReady"/> -->
            </vs-td>
            <!-- img -->
            <vs-td v-if="!isHidden.Products.img" :data="tr.id" class="autoWidth centered">
              <div class="imgContainer">
                <img :src="getImgDual(`${tr.productID}-1`)">
              </div>
            </vs-td>
            <!-- amount & name -->
            <vs-td :data="tr.fullName">
              <div class="amountAndName">
                <b>{{ tr.amount }}x</b>
                {{ tr.fullName }}
                <span class="noStockText">
                  {{ tr.isDeleted ? `(${tr.deletedReasonTitle})` : '' }}
                </span>
                <span class="addedText" v-if="tr.isAdded">
                  <span v-if="tr.isAddedByProductID == 0">(Agregado)</span>
                  <span v-else>(Agregado x {{ tr.isAddedByProductName }})</span>
                </span>
              </div>
              <span class="getStockIcon" @click="showStock(tr)">
                <font-awesome-icon icon="question"/>
              </span>
            </vs-td>
            <!-- totalPrice -->
            <vs-td v-if="!isHidden.Products.totalPrice" class="autoWidth">
              <span>${{ showPrice(getRealPriceFloat(tr) * tr.amount) }}</span>
            </vs-td>

            <!-- change -->
            <!-- <vs-td v-if="!isHidden.Products.reportIssue" class="autoWidth centered">
              <vs-button color="danger" type="border"
                @click="changeProduct(tr)">
                <font-awesome-icon :icon="['fas', 'exchange-alt']"/>
              </vs-button>
            </vs-td> -->

            <!-- modifyProduct -->
            <vs-td v-if="!isHidden.Products.reportIssue" class="autoWidth centered">
              <vs-button color="danger" type="border" @click="modifyProduct(tr)" title="Editar cantidad">
                <font-awesome-icon :icon="['fas', 'edit']"/>
              </vs-button>
            </vs-td>

            <!-- Eliminar -->
            <vs-td v-if="!isHidden.Products.removeProduct" class="autoWidth centered">
              <vs-button :color="!tr.isDeleted ? 'danger' : 'success'" type="border" :title="!tr.isDeleted ? 'Eliminar producto' : 'Volver a dar de alta'"
              @click="removeProductStart(tr)">
                <font-awesome-icon :icon="!tr.isDeleted ? ['fas', 'trash'] : ['fas', 'arrow-up']"/>
              </vs-button>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>

      <!-- <vs-divider/> -->

      <vs-button class="addProductBtn mt-4 ml-4" type="border" icon="add"
      @click="IsPromptActiveInner.addProduct = true; isPromptActiveLocal = false">
        Agregar Producto
      </vs-button>

      <div class="controlInfo">
        <h5>Informació de control</h5>
        <vs-divider/>
        <vs-row>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Cajas</div>
            <vs-input-number class="controlInput" v-model="ControlData.boxes" @input="modifyControlSale('boxes')"/>
          </vs-col>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Bolsas</div>
            <vs-input-number class="controlInput" v-model="ControlData.bags" @input="modifyControlSale('bags')"/>
          </vs-col>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Heladera</div>
            <vs-input-number class="controlInput" v-model="ControlData.refrigerator" @input="modifyControlSale('refrigerator')"/>
          </vs-col>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Freezer</div>
            <vs-input-number class="controlInput" v-model="ControlData.freezer" @input="modifyControlSale('freezer')"/>
          </vs-col>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Huevos (6)</div>
            <vs-input-number class="controlInput" v-model="ControlData.eggs6" @input="modifyControlSale('eggs6')"/>
          </vs-col>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Huevos (maple)</div>
            <vs-input-number class="controlInput" v-model="ControlData.eggs30" @input="modifyControlSale('eggs30')"/>
          </vs-col>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Carbón (3kg)</div>
            <vs-input-number class="controlInput" v-model="ControlData.coal3" @input="modifyControlSale('coal3')"/>
          </vs-col>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Carbón (5kg)</div>
            <vs-input-number class="controlInput" v-model="ControlData.coal5" @input="modifyControlSale('coal5')"/>
          </vs-col>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Envase cerveza</div>
            <vs-input-number class="controlInput" v-model="ControlData.containerBeer" @input="modifyControlSale('containerBeer')"/>
          </vs-col>
          <vs-col vs-justify="center" vs-align="center" vs-w="2" vs-sm="6" vs-xs="12">
            <div class="labelInput">Envase gaseosa</div>
            <vs-input-number class="controlInput" v-model="ControlData.containerSodaPop" @input="modifyControlSale('containerSodaPop')"/>
          </vs-col>

            <!-- <textarea name="name" rows="8" cols="80"
            @change="modifyControlSale(SelectedSale, 'controlNotes')"></textarea> -->

          <vs-col vs-justify="center" vs-align="center" vs-w="12" >
            <div class="labelInput mt-3">Notas</div>
            <vs-textarea class="controlInput" type="number" min-height="100px" v-model="ControlData.controlNotes" @change="modifyControlSale('controlNotes')"/>
          </vs-col>
        </vs-row>

      </div>

      <!-- OTHER PROMPTS -->
      <PromptAddProduct
        :isPromptActive="IsPromptActiveInner.addProduct"
        :SelectedSale="SelectedSale"
        :SaleProductsList="productsList"
        @closePrompt="IsPromptActiveInner.addProduct = false; isPromptActiveLocal = true;"
        @addSaleItemDB="addSaleItemDB($event)"
      />
      <PromptEditPriceAndAmount
        :isPromptActive="IsPromptActiveInner.editPriceAndAmount"
        :SaleProd="SaleProductToEdit"
        @modifySaleProductDB="$emit('modifySaleProductDB', $event)"
        @calculateNewTotal="calculateNewTotal($event)"
        @closePrompt="IsPromptActiveInner.editPriceAndAmount = false; isPromptActiveLocal = true;"
      />

      <PromptChangeProduct
      :isPromptActive="IsPromptActiveInner.changeProduct"
      :SelectedSale="SelectedSale"
      :SaleProductsList="productsList"
      :OriginalProduct="SelectedChangeProduct"
      @closePrompt="IsPromptActiveInner.changeProduct = false; isPromptActiveLocal = true;"
      @addSaleItemDB="addSaleItemDB($event)"
      @calculateNewTotal="calculateNewTotal($event)"
      />

    </vs-popup>
  </div>
</template>

<script>
export default {
  components: {
    PromptShowStock: () => import('./PromptShowStock.vue'),
    PromptAddProduct: () => import('./PromptAddProduct.vue'),
    PromptChangeProduct: () => import('./PromptChangeProduct.vue'),
    PromptEditPriceAndAmount: () => import('./PromptEditPriceAndAmount.vue'),
  },
  props: {
    isPromptActive: { type: Boolean, required: true, },
    productsList: { type: Array, required: true, },
    Columns: { type: Array, required: true, },
    isHidden: { type: Object, required: true, },
    SelectedSale: { type: Object, required: true, },
    allSaleProductDeletedReasons: { type: Array, required: true, },
  }, // PROPS
  data() {
    return {
      SaleProductToDelete: null,
      removeProductReasons: [
        { id: 1, name: 'No hay stock', },
        { id: 2, name: 'El cliente no lo quiere', },
        { id: 3, name: 'Se agregó por error', },
      ],
      ProductToShowStock: {},
      ControlData: {
        boxes: 0,
        bags: 0,
        refrigerator: 0,
        freezer: 0,
        eggs6: 0,
        eggs30: 0,
        coal3: 0,
        coal5: 0,
        containerBeer: 0,
        containerSodaPop: 0,
        controlNotes: '',
      },
      Discount: { id: 0, },
      numberTest: 0,
      IsPromptActiveInner: {
        addProduct: false,
        changeProduct: false,
        editPriceAndAmount: false,
        removeProductReasonSelector: false,
        productToShowStock: false,
      },
      SaleProductToEdit: {
        id: 5, price: 100, amount: 7, fullName: 'Espoja de acero Mortimer'
      },
      SelectedChangeProduct: {},
      realTotal: 0,
      appliedDiscount: 0,
    } // return DATA
  }, //DATA
  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        if (!val) { this.$emit('closePrompt'); }
        else { this.$emit('openPrompt') }
      }
    },
    hasError() {
      if (this.realTotal == 0) return false;
      return this.realTotal != this.SelectedSale.totalTotal;
    }
  }, // COMPUTED
  watch: {
    isPromptActiveLocal: function(val) {
      // Assign control data
      if (!val) return;
      for (let prop in this.ControlData) {
        this.ControlData[prop] = this.SelectedSale[prop];
      }
      this.calculateRealTotal();
    },
  }, // WATCH
  methods: {
    // FALTAN UN MONTÓN DE FUNCIONES
    // calculateRealTotal
    // checkHasDelete
    // getCurrentUserID
    // calculateNewTotal
    // changeStep
    // checkStateChange
    // fixError
    // loadDiscount
    // showStock
    calculateRealTotal() {
      let totalReal = 0;
      for (let SaleProd of this.productsList) {
        if (SaleProd.isDeleted) continue;
        this.appliedDiscount = 0;
        totalReal += SaleProd.price * SaleProd.amount;
      }
      if (this.SelectedSale.discountCodeID != 0) {
        if (this.Discount.id == this.SelectedSale.discountCodeID) {
          let appliedDiscount = this.applyDiscount(totalReal, this.Discount);
          totalReal = this.showPrice(totalReal - appliedDiscount);
          this.appliedDiscount = appliedDiscount;
        } else {
          this.loadDiscount();
        }
      }
      this.totalReal = this.showPrice(totalReal);
    },
    getPaymentIcon(paymentTypeID) {
      switch (paymentTypeID) {
        case 1: // Efectivo
          return 'money-bill';
        case 2: // Argentino / Central
          return ['far', 'credit-card'];
        case 3: // Otras tarjetas
          return ['fab', 'cc-visa'];
        default: // Alerta
          return 'exclamation-circle';
      }
    },
    getShippingIcon(shippingNeeded) {
      if (shippingNeeded) {
        return 'shipping-fast';
      } else {
        return 'store-alt';
      }
    },

    getCurrentUserID() {
      return localStorage.userID;
    },
    addSaleItemDB(ParamsOriginal) { // Parecida a la de Tab3-PaymentAndTime en Client
      let Params = this.copyObj(ParamsOriginal);
      Params.saleID = this.SelectedSale.id;
      this.conectToDB({
        file: 'Cart', action: 'addSaleItem', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.addProductToList(res.data.data, Params.websiteZoneID);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    modifyControlSale(prop) {
      let value = this.ControlData[prop];
      if (value == +value && value != '') {
        this.ControlData[prop] = +value;
      }
      this.SelectedSale[prop] = this.ControlData[prop];
      let Params = {
        saleID: this.SelectedSale.id,
      }
      Params[prop] = this.ControlData[prop];
      this.$nextTick(() => { // un intento de que no se tilde
        this.$emit('modifySale', Params);
      });
    },
    addProductToList(saleProdID, websiteZoneID) {
      let Params = { saleProdID }
      this.conectToDB({
        file: 'Sales', action: 'getSaleProducts', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let NewSaleProd = res.data.data[0];
          this.productsList.push(NewSaleProd);
          let NewParams = {
            productID: NewSaleProd.productID,
            amount:    NewSaleProd.amount,
            price:     NewSaleProd.price,
            websiteZoneID: websiteZoneID,
          }
          this.calculateNewTotal(NewParams);
          this.myNotify('success', 'Exíto', 'Producto agregado!');
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    calculateNewTotal(Change, updateStock = true) {
      let Sale = this.SelectedSale;
      let diference = Change.amount * Change.price;
      let NewParams = {
        totalProducts:  this.showPrice(+Sale.totalProducts + +diference),
        totalTotal:     this.showPrice(+Sale.totalTotal + +diference),
        productsAmount: +Sale.productsAmount + +Change.amount,
        saleID: this.SelectedSale.id,
      }
      Sale.totalProducts = NewParams.totalProducts;
      Sale.totalTotal = NewParams.totalTotal;
      Sale.productsAmount = NewParams.productsAmount;
      this.$emit('modifySale', NewParams);
        let Params = {
        productID: Change.productID,
        amount: Change.amount*(-1),
        reasonID: 0,
        websiteZoneID: Change.websiteZoneID,
      }
      if (updateStock) {
        this.updateProductStock(Params);
      }

      this.calculateRealTotal();
    },
    changeStep(tr) {
      let num = tr.controlStateID == 2 ? 0 : tr.controlStateID+1;
      tr.controlStateID = num;
      let Params = {
        saleProdID: tr.id,
        controlStateID: num,
      }
      this.checkStateChange(tr);
      this.$emit('modifySaleProductDB', Params);
    },
    checkStateChange(SaleProd) {
      console.log(SaleProd);
      console.log(SaleProd.controlStateID);
      let ProductStateIDs = this._localDB.SaleProductsControlStateIDs;
      let SaleStateIDs =  this._localDB.SaleStateIDs;
      let currentUserID = this.getCurrentUserID();
      // EL SISTEMA ESTE NO CAMBIA BIEN SE LA COMPRA TIENE SOLO UN PRODUCTO


      switch (SaleProd.controlStateID) {
        // Pedido
        case ProductStateIDs.pedido:
        // Las vuelta atrás no funcionan (en ninguno de todos los casos)
          console.log('hay que hacerlo - faltan todas las vueltas atras');
          break;

        // Armado
        case ProductStateIDs.armado:
          if (this.SelectedSale.stateID == SaleStateIDs.Pedido) {
            // PASO DE "PEDIDO" A "EN ARMADO"
            var NewParams = {
              stateID: SaleStateIDs.EnArmado,
              makingEmployeeID: currentUserID,
            }
            this.SelectedSale.makingEmployeeID = currentUserID;
            this.SelectedSale.makingEmployeeFullName = this.getEmployeeName(currentUserID);
          } else if (this.SelectedSale.stateID == SaleStateIDs.EnArmado) {
            // PASO DE "EN ARMADO" A "ARMADO"
            for (let Prod of this.productsList) {
              if (Prod.controlStateID != ProductStateIDs.armado) return;
            }
            var NewParams = {
              stateID: SaleStateIDs.Armado,
            }
          }
          break;

        // Controlado
        case ProductStateIDs.controlado:
          if (this.SelectedSale.stateID == SaleStateIDs.Armado) {
            // PASO DE "ARMADO" A "EN CONTROL"
            var NewParams = {
              stateID: SaleStateIDs.EnControl,
              controlEmployeeID: currentUserID,
            }
            this.SelectedSale.controlEmployeeID = currentUserID;
            this.SelectedSale.controlEmployeeFullName = this.getEmployeeName(currentUserID);
        } else if (this.SelectedSale.stateID == SaleStateIDs.EnControl) {
            // PASO DE "EN CONTROL" A "CONTROLADO"
            for (let Prod of this.productsList) {
              if (Prod.controlStateID != ProductStateIDs.controlado) return;
            }
            var NewParams = {
              stateID: SaleStateIDs.Controlado,
            }
          }
          break;

      }

      if (typeof NewParams != 'undefined') {
        this.SelectedSale.stateID = NewParams.stateID;
        NewParams.saleID = this.SelectedSale.id;
        this.$emit('modifySale', NewParams);
      }
    },
    fixError() {
      this.SelectedSale.totalTotal = this.realTotal;
      let Params = {
        saleID: this.SelectedSale.id,
        totalTotal: this.realTotal,
      }
      this.$emit('modifySale', Params);
      this.myNotify('success', 'Éxito', 'Se corrigió el total')
    },
    loadDiscount() {
      let Params = {
        codeID: this.SelectedSale.discountCodeID,
      }
      this.conectToDB({
        file: 'Discounts', action: 'getDiscountCode', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          if (!res.data.data.length || res.data.data[0].id != this.SelectedSale.discountCodeID) {
            this.myNotify('danger', 'Error', 'Error al cargar el descuento');
            return;
          }
          this.Discount = res.data.data[0];
          this.calculateRealTotal();
          }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    showStock(SaleProd) {
      let Params = {
        productID: SaleProd.productID,
        branchID: this.getBranchID(),
        isActive: 1,
      }
      this.conectToDB({
        file: 'Products', action: 'getProductOfBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.ProductToShowStock = res.data.data[0];
          this.IsPromptActiveInner.productToShowStock = true;
          this.isPromptActiveLocal = false;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    uncheckAllProducts() {
      for (let SaleProd of this.productsList) {
        SaleProd.controlStateID = this._localDB.SaleProductsControlStateIDs.pedido;
        let Params = {
          saleProdID: SaleProd.id,
          controlStateID: this._localDB.SaleProductsControlStateIDs.pedido,
        }
        this.$emit('modifySaleProductDB', Params);
      }
    },
    changeProduct(Product) {
      this.SelectedChangeProduct = Product;
      this.isPromptActiveLocal = false;
      this.IsPromptActiveInner.changeProduct = true;
    },
    modifyProduct(SaleProd) {
      this.SaleProductToEdit = SaleProd;
      this.isPromptActiveLocal = false;
      this.IsPromptActiveInner.editPriceAndAmount = true;
    },
    removeProductStart(SaleProd) {
      this.SaleProductToDelete = SaleProd;
      if (!SaleProd.isDeleted) {
        this.IsPromptActiveInner.removeProductReasonSelector = true;
      } else {
        this.removeProductFinish();
      }
    },
    removeProductFinish(Reason) {
      let SaleProd = this.SaleProductToDelete;
      console.log(SaleProd);
      this.IsPromptActiveInner.removeProductReasonSelector = false;
      let SaleProdParams = {
        saleProdID: SaleProd.id,
      };
      let ChangeParams = {
        productID    : SaleProd.productID,
        amount       : SaleProd.amount*(SaleProd.isDeleted ? 1 : -1),
        price        : SaleProd.price,
        websiteZoneID: this._localDB.StockChangesWebsiteZoneIDs.deleteProduct,
      }
      let updateStock = true;


      if (SaleProd.isDeleted) { // Vuelve el pedido a la compra
        if (!confirm('¿Seguro que querés volver el producto a la compra?')) return;
        SaleProdParams.isDeleted = 0;
        SaleProdParams.deletedReasonID = 0;
      } else { // Lo elimina de la compra
        // if (!confirm('¿Seguro que querés eliminar el producto de la compra?')) return;
        let reasonIDs = this._localDB.SaleProductDeletedReasonIDs;
        SaleProdParams.isDeleted = 1;
        SaleProdParams.deletedReasonID = Reason.id;
        if (Reason.id == reasonIDs.NoStock) { // No hay stock
          this.setStockToZero(SaleProd.productID);
          updateStock = false; // not update stock now. Go back to zero instead
        }
      }

      // updateDB
      this.calculateNewTotal(ChangeParams, updateStock);
      this.$emit('modifySaleProductDB', SaleProdParams);  // Elimina de DB
      let msg  = `<b>${SaleProd.amount}x ${SaleProd.fullName}</b> ${SaleProdParams.isDeleted ? 'eliminado de' : 'agregado a'} la compra`;
      console.log(msg);
      this.myNotify('success', 'Exíto', msg);
      // Update DOM
      SaleProd.isDeleted = SaleProdParams.isDeleted;
      SaleProd.deletedReasonID  = SaleProdParams.deletedReasonID;
      let index = this.allSaleProductDeletedReasons.findIndex(i => i.id == SaleProdParams.deletedReasonID);
      let FullReason = index == -1 ? null : this.allSaleProductDeletedReasons[index];
      console.log(FullReason);
      SaleProd.deletedReasonTitle = index == -1 ? 'Eliminado' : FullReason.reason;
      SaleProd.deletedReasonText = index == -1 ? '' : FullReason.text;
      this.SaleProductToDelete = null;
    },

    setStockToZero(productID) {
      console.log('SI TENGO STOCK INFINITO ACTUO DISTINTO');
      let Params = {
        productID: productID,
        branchID: this.getBranchID(),
        isActive: 1,
      }
      this.conectToDB({
        file: 'Products', action: 'getProductOfBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
            let realStock = res.data.data[0].stock;
            let ParamsToChange = {
              productID: Params.productID,
              amount: -realStock,
              websiteZoneID: this._localDB.StockChangesWebsiteZoneIDs.deleteProductNoStock,
            }
            this.updateProductStock(ParamsToChange);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
  /deep/ .vs-popup--content {
    margin-left: 2px; // Para centrarlo bien, porque sale chueco
    @media (max-width: 800px) {
      padding: 0px;
      margin: 0px;
    }
  }
  .saleInfo {
    margin-left: 15px;
    margin-bottom: 15px;
    @media (max-width: 800px) {
      margin-top: 15px;
    }
  }
  .amountAndName {
    width: 100%;
    @media (max-width: 800px) {
      max-width: 300px;
    }
    @media (max-width: 500px) {
      max-width: 130px;
    }
  }
  .getStockIcon {
    background-color: #DDD;
    padding: 6px 8px;
    border-radius: 15px;
    font-size: 12px;
    margin-bottom: 2px;
    cursor: pointer;
  }

  .miclasesita /deep/ .vs-popup {
    width: 1000px !important;
  }
  .vs-table--tbody-table .tr-values /deep/ td {
    padding-left:  3px;
    padding-right: 3px;
  }
  .noStockText {
    color: red;
  }
  .addedText {
    color: #2ECC40;
  }
  .addProductBtn {
    margin-bottom: 50px;
  }
  .labelInput {
    text-align: center;
    width: 100%;
  }
  // /deep/ .controlInput {
  //   width: 100%;
  //   div {
  //     width: 100%;
  //   }
  // }
  // /deep/ .controlInput div input{
  //   width: 100%;
  //   text-align: center;
  // }
  .controlInfo {
    padding-bottom: 50px;
  }
  .totalErrorAlert {
    text-align: center;
    padding: 5px 15px;
    margin-bottom: 15px;
    color: white;
    border-radius: 15px;
    background-color: #FF4136;
  }
  .stateIcon {
    display: inline-block;
    margin-left: 15px;
    float: right;
    padding: 4px 7px;
    color: white;
    border-radius: 50px;
  }
  .errorIcon { background-color: #FF4136; }
  .okayIcon { background-color: #2ECC40; }
</style>
