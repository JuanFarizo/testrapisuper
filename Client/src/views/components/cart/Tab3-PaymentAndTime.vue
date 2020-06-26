<template>
  <div class="cartTab">
    <div class="vx-row">
      <!-- LEFT COL: PAYMENT OPTIONS -->
      <div class="vx-col lg:w-2/3 w-full">
        <vx-card class="mb-base">

          <div>
            <!-- FORMA DE PAGO -->
            <h4 class="subtitle">Forma de pago</h4>
            <div class="vx-row">
              <div class="vx-col md:w-1/3 w-full">
                <div class="paymentMethodItem" v-for="PaymentType in allSalePaymentTypes">
                  <vs-radio vs-name="paymentMethod" v-model="paymentTypeID" :vs-value="PaymentType.id">
                    {{ PaymentType.name }}
                  </vs-radio>
                </div>
              </div>
              <!-- Payment prediction -->
              <div class="vx-col md:w-2/3 w-full">
                <div v-if="paymentTypeID == 1">
                  <div class="flex items-center flex-wrap paymentPrediction">
                    <span class="mr-2">¿Con cuánto vas a pagar?: </span>
                    <vs-input v-model="paymentPrediction" class="input"/>
                    <div class="total">
                      (TOTAL: ${{ Cart.totalTotal }})
                    </div>
                  </div>
                  <span v-show="errors.has('cvv-form.cvv')" class="text-danger ml-24">{{ errors.first('cvv-form.cvv') }}</span>
                </div>
              </div>
            </div>

            <div class="paymentInfoText">
              Se aceptan todas las tarjetas. El pago se hace siempre al recibir el pedido
            </div>
          </div>

          <vs-divider/>

          <div class="mt-3" v-if="Cart.shippingNeeded">
            <h4 class="pb-0">¿Cuándo querés recibir tu pedido?</h4>
            <div class="vx-row ml-3">

              <div class="vx-col sm:w-1/2 w-full" v-for="Day in DaysList">
                <h6 class="timeTitle mb-2">{{ Day.name }}</h6>

                <ul v-if="Day.timeList.length">
                  <li v-for="Time in Day.timeList" class="timeListItem">
                    <vs-radio v-model="ReceptionDatetime" vs-name="receptionDatetime"
                    :vs-value="{ date: Day.date, time: Time.time, timeRange: (Time.timeRange || Time.timeRangeDefault) }">
                    {{ showRange(Time.time, Time.timeRange || Time.timeRangeDefault) }}
                  </vs-radio>
                  </li>
                </ul>
              </div>

          </div>

        </div> <!-- if shippingNeeded -->

        <div v-else class="mt-3">
          <h4>Información de retiro</h4>
          <div class="pickingInfoText">
            <div>
              <font-awesome-icon icon="map-marker-alt"/>
              El retiro en el local es en {{ _Branch.address}}, {{_Branch.city}}
            </div>
            <div class="mt-3">
              <font-awesome-icon :icon="['fas', 'clock']"/>
              <span class=" ml-1">
                <router-link :to="{ name: 'shippingTime' }">
                  <font-awesome-icon icon="mouse-pointer"/>
                  Ver los horarios de envío
                </router-link>
              </span>
            </div>
          </div>
        </div>

        <div class="">
          <vs-button type="flat" @click.prevent="goPreviousTab()" class="mt-3" tabindex="-1">
            <font-awesome-icon icon="angle-left"/>
            Atras
          </vs-button>
        </div>

      </vx-card>
    </div>

    <!-- RIGHT COL: PRICE -->
      <div class="vx-col lg:w-1/3 w-full">
        <vx-card title="Resumen de compra">
          <div class="flex justify-between mb-2">
            <span class="purchaseSummarySubtitle">Total</span>
            <span class="font-semibold">${{ Cart.totalTotal }}</span>
          </div>

          <vs-divider />

          <div class="flex justify-between">
            <span class="purchaseSummarySubtitle">Recibe</span>
            <span class="font-semibold">{{ getFullName(Cart.Receiver) }}</span>
          </div>
          <div class="flex" style="justify-content: flex-end">
            <span class="font-semibold" v-if="Cart.Receiver.phone">({{ Cart.Receiver.phone }})</span>
          </div>

          <vs-divider v-if="Cart.shippingNeeded"/>

          <div class="flex justify-between" v-if="Cart.shippingNeeded">
            <span class="purchaseSummarySubtitle">Dirección</span>
            <span class="font-semibold">{{ getFullAddress(Cart.Address) }}</span>
          </div>

          <vs-button class="continueButton mt-4 w-full" @click.prevent="finishPurchase" :disabled="false">TERMINAR COMPRA</vs-button>

        </vx-card>
      </div>
    </div> <!-- .vx-row -->
  </div>
</template>

<script>
export default {
  props: {
    DaysList: { type: Array, required: true, },
  },
  data() {
    return {
      itemsInQueue: 0, // items waiting to be added to DB
      saveItemsAttempts: 0, // attempts to save cart to DB
      retiroEnLocalText: 'Retiro en local',
      paymentTypeID: '1', // Efectivo
      paymentPrediction: '',
      allSalePaymentTypes: [],
    }; // return DATA
  }, // DATA
  computed: {
    ReceptionDatetime: {
      get() {
        return this.Cart.ReceptionDatetime;
      },
      set(val) {
        this.$store.dispatch('cart/updateReceptionDatetime', val);
      },
    },
  }, // COMPUTED

  mounted() {
    this.itemsInQueue = 0;
    this.saveItemsAttempts = 0;
    // set allSalePaymentTypes
    let Params = { vm: this, val: 'allSalePaymentTypes', }
    this.$store.dispatch('globalMethods/loadAllSalePaymentTypes', Params);
  },

  methods: {
    // removeDiscount
    goPreviousTab() {
      this.$emit('goPreviousTab');
    },

    getBuyerEmployeeID() {
      if (!this.checkUser('')) return 0;
      if (this.checkUser('gestion')) return this.Cart.buyerEmployeeID || 0;
      if (this.Cart.isForMe) return this.Cart.Seller.id;
      return 0;
    },

    addSaleItemDB(ItemOriginal) {
      let Item = this.copyObj(ItemOriginal);
      let stockParams = {
        employeeID: 0,
        websiteZoneID: this._localDB.StockChangesWebsiteZoneIDs.sale,
        amount: (Item.amount*(-1)),
        productID: Item.productID,
      }
      this.updateProductStock(stockParams);
      const vm = this;
      this.conectToDB({
        file: 'Cart', action: 'addSaleItem', params: Item,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.checkPurchaseIsFinished(Item.saleID);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    finishPurchase() {
      if (this.Cart.shippingNeeded && this.ReceptionDatetime.time == '') {
        alert('Debe seleccionar un horario de entrega')
        return;
      }
      this.$vs.loading();
      let stateID = this.Cart.isReceived ? this._localDB.SaleStateIDs.Entregado : this._localDB.SaleStateIDs.Pedido;
      let Params = {
        branchID     : this.getBranchID(),
        buyerID      : this.Buyer.id,
        addressID    : this.Cart.selectedAddressID,
        totalProducts: this.Cart.totalProducts,
        totalShipping: this.Cart.totalShipping,
        totalTotal   : this.Cart.totalTotal,
        paymentPrediction: this.paymentPrediction,
        paymentTypeID: this.paymentTypeID,
        shippingNeeded: this.Cart.shippingNeeded,
        receptionDate: !this.Cart.shippingNeeded ? this.getActualDateToDB() : this.ReceptionDatetime.date,
        receptionTime: !this.Cart.shippingNeeded ? '0' : this.ReceptionDatetime.time,
        receptionTimeRange: !this.Cart.shippingNeeded ? '0' : this.ReceptionDatetime.timeRange,
        temporalAccountID: this.temporalAccountID,
        buyerIP: this.Buyer.buyerIP,
        receiverID: this.Cart.selectedReceiverID,
        sellerID: this.Cart.Seller.id,
        saleTypeID: this.Cart.saleTypeID,
        isStockControled: this._Branch.isStockWorking,
        productsAmount: this._cartItems.length,
        paymentStateID: 1, // Pago en espera
        stateID: stateID,
        buyerEmployeeID: this.getBuyerEmployeeID(),
        date: this.getActualDatetimeToDB(),
        appliedDiscount: this.Cart.appliedDiscount,
        discountCodeID: this.Cart.Discount.id,
      }
      // console.log(Params);
      const vm = this;
      this.conectToDB({
        file: 'Cart', action: 'addSale', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.removeDiscount()
          let saleID = res.data.data;
          vm.itemsInQueue = vm._cartItems.length;
          for (var i = 0; i < vm._cartItems.length; i++) {
            let Item = vm._cartItems[i];
            Item.saleID = saleID;
            Item.relevance = i+1;
            vm.addSaleItemDB(Item);
          }
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
    checkPurchaseIsFinished(saleID) {
      this.itemsInQueue--;
      if (this.itemsInQueue != 0) return;
      this.saveItemsAttempts++;
      if (this.saveItemsAttempts >= 10) this.emitPurchaseFinished(false);
      const vm = this;
      this.conectToDB({
        file: 'Sales', action: 'getSaleProducts', params: { saleID: saleID },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let newCartItems = res.data.data;
          let remainingItems = [];
          for (let CartItem of vm._cartItems) {
            let isFinded = false;
            for (let NewCartItem of newCartItems) {
              if (CartItem.productID == NewCartItem.productID) {
                isFinded = true;
              }
            } // for
            if (!isFinded) {
              remainingItems.push(CartItem)
            }
          } // for
          if (!remainingItems.length) {
            vm.emitPurchaseFinished(true);
            vm.emptyCart();
          } else {
            vm.itemsInQueue = remainingItems.length;
            for (let RemainingItem of remainingItems) {
              vm.addSaleItemDB(RemainingItem);
            }
          }
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
      // Si está todo ok
    },
    emitPurchaseFinished(val) {
      this.$vs.loading.close();
      this.$emit('purchaseFinished', val);
    },




    removeDiscount() {
      // delete one use of DB
      let Params = {
        codeID: this.Cart.Discount.id,
        subtractOneUse: true,
      }
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'modifyDiscountCode', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });

      // delete it of vuex
      let Discount = {
        id: 0,
        avaibleUses: 0,
        buyerID: 0,
        buyerName: '',
        buyerSurname: '',
        code: '',
        discountID: 0,
      }
      this.$store.dispatch('cart/addDiscount', Discount);
    },
  } // METHODS
} // export default
</script>

<style lang="scss" scoped>

.timeListItem {
  margin-bottom: 5px;
}
.subtitle {
  margin-bottom: 15px;
}

.paymentPrediction {
  margin-top: -11px;
  @media(max-width: 767px) {
    margin-top: 10px;
  }
  .input {
    width: 150px;
    margin-right: 10px;
  }
  .total {
    opacity: 0.5;
    @media(min-width: 991px) {
      display: none;
    }
  }
}

.timeTitle {
  margin-top: 15px;
  padding-bottom: 5px;
}

.paymentMethodItem {
  // margin-left: 15px;
  // padding-left: 15px;
  // border-left: 1px solid lightgrey;
  display: block;
  margin-top: 5px;
}
.purchaseSummarySubtitle {
  margin-right: 50px;
}
.receiverText {
  font-weight: 600;
  font-size: 16px;
}
.paymentInfoText {
  color: #B8C2CC;
  margin-top: 30px;
}
.pickingInfoText {
  margin-top: 30px;
}

</style>
