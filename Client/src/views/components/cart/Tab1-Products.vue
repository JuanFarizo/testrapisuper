<template>
  <div class="cartTab">

    <!-- <div class="tabTitle">Resumen de productos</div> -->
    <!-- IF CART HAVE ITEMS -->
    <div class="vx-row" v-if="_cartItems.length">
      <!-- LEFT COL -->
      <div class="vx-col lg:w-2/3 w-full relative">

        <!-- Empty Cart -->
        <div class="vx-row flex" v-if="_cartItems.length" style="justify-content: flex-end">
          <vs-button type="flat" size="small" @click="emptyCart()">
            <font-awesome-icon :icon="['far', 'trash-alt']"/>
            Vaciar carro
          </vs-button>
        </div>

        <div class="items-list-view" v-for="(item, index) in _cartItems" :key="item.id">

          <item-cart :item="item"></item-cart>

      </div>
    </div>


    <!-- RIGHT COL -->
    <div class="vx-col lg:w-1/3 w-full">
      <vx-card title="Resumen de productos">
        <!-- <p class="text-grey mb-3">Opciones</p>
        <div class="flex justify-between">
          <span class="font-semibold">Cupones</span>
          <span class="font-medium text-primary cursor-pointer">Usar</span>
        </div>

        <vs-divider /> -->

        <!-- <p class="font-semibold mb-3">Detalles</p> -->
        <div class="flex justify-between mb-2">
          <span class="text-grey">Productos</span>
          <span>${{ Cart.totalProducts }}</span>
        </div>
        <!-- <div class="flex justify-between mb-2">
          <span class="text-grey">Descuento</span>
          <span class="text-success">-{{ Cart.discountCode }}$</span>
        </div> -->
        <div class="flex justify-between mb-2" v-if="Cart.appliedDiscount != 0">
          <span class="text-grey">Descuento</span>
          <span class="text-danger">- ${{ Cart.appliedDiscount }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="text-grey">Envío</span>
          <span class="text-success" v-if="!Cart.totalShipping">Gratis!</span>
          <span class="text-grey" v-if="Cart.totalShipping">{{ Cart.totalShipping }}</span>
          <!-- <span class="text-grey" v-if="Cart.totalShipping">
            Descuento
          </span> -->
        </div>
        <div class="flex mb-2" v-if="Cart.appliedDiscount == 0">
          <vs-input label-placeholder="Descuento" v-model="discountCode"/>
          <vs-button @click="checkDiscount()" class="checkDiscountBtn">
            <font-awesome-icon icon="check"/>
          </vs-button>
        </div>
        <span v-if="discountCode != ''">
          Apretá
          <font-awesome-icon icon="check"/>
          para usar el cupon
        </span>
        <div v-if="Cart.appliedDiscount != 0" class="mt-2">
          Descuento aplicado de
          <span v-if="Cart.Discount.discountAmount != 0">
            <b>${{ Cart.Discount.discountAmount }}</b>
          </span>
          <span v-if="Cart.Discount.discountPercentaje != 0">
            <b>{{ Cart.Discount.discountPercentaje }}%</b>
            <span v-if="Cart.Discount.discountPercentajeMax != 0">
              (Max $  {{ Cart.Discount.discountPercentajeMax }})
            </span>
          </span>
        </div>

            <vs-divider />

            <div class="flex justify-between font-semibold mb-3">
                <span>Total</span>
                <span>${{ Cart.totalTotal }}</span>
            </div>

            <vs-button class="continueButton w-full" @click="checkNextTab(1)">ACEPTAR</vs-button>
            <vs-button :color="Testing.colorx" :gradient-color-secondary="Testing.colorx2" type="gradient"
            v-if="Buyer.isTester" @click.prevent="checkNextTab(); checkNextTab()" class="w-full mt-3">
              CONTINUAR x2
            </vs-button>


        </vx-card>
      </div> <!-- right col -->

    </div> <!-- vx-row -->

    <!-- IF NO ITEMS IN CART -->
    <vx-card v-else class="emptyCartContainer">
      <h2 class="text-center">El carro está vacío</h2>
      <div class="w-full">
        <img :src="getImg('cart/empty_cart.svg')" class="mx-auto emptyCartImg">
      </div>
      <div class="text-center">
        <vs-button @click="$router.push({ name: 'catalogue' })" class="mx-auto">Ir al catálogo</vs-button>
      </div>
    </vx-card>

  </div>
</template>

<script>
export default {
  components: {
    ItemCart: () => import('../ItemCart.vue'),
  },
  data() {
    return {
      discountCode: '',
    } // return DATA
  }, // DATA
  mounted() {
    // this.loadDiscount();
  },
  methods: {
    // applyDiscount
    // checkDiscount
    // loadDiscount
    // validateDiscount
    // checkNextTab

    checkDiscount() {
      let Params =  {
        isActive: 1,
        branchID: this.getBranchID(),
        code: this.removeWhiteSpaces(this.discountCode),
      }
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'getDiscountCode', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          if (res.data.data.length == 0) {
            vm.myNotify('danger', 'Error', 'Cupón no válido');
          } else {
            let Discount = res.data.data[0];
            vm.validateDiscount(Discount)
          }
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },

    // loadDiscount() {
    //   console.log(this.Cart);
    //   if (this.Cart.Discount.id != 0) {
    //     this.discountCode =
    //   }
    //
    //   console.log('Controlo que ondix');
    // },

    validateDiscount(Discount, buyerID = 0) {
      // branchID and isActive se controla al traerlo de DB
      let msg = '';
      let today = this.getActualDatetimeToDB();
      if (Discount.datetimeStart != this.emptyDatetime) {
        if (today < Discount.datetimeStart) msg = 'no es válido aún';
      }
      if (Discount.datetimeEnd != this.emptyDatetime) {
        if (today > Discount.datetimeEnd) msg = 'está vencido';
      }
      if (Discount.avaibleUses <= 0) msg = 'ya fue usado';
      if (Discount.buyerID != 0) {
        if (Discount.buyerID != buyerID) msg = 'es para otro cliente';
      }
      if (msg != '') {
        // fail
        this.myNotify('danger', 'Error', 'Este cupón '+ msg);
        return;
      }
      // success
      this.myNotify('success', 'Éxito', 'Cupón aplicado');
      // Add it to Vuex
      this.$store.dispatch('cart/addDiscount', Discount);
    },

    checkNextTab() {
      let minPurchase = this._Branch.minimumPurchase;
      // Time
      // if (this.Cart.ReceptionDatetime.time == '') {
      //   alert('No hay horarios disponibles para hoy ni para mañana');
      //   return;
      // }
      // Minimum
      if (+this.Cart.totalProducts >= +minPurchase){
        this.$emit('goNextTab');
      } else {
        if (this.checkUser('')) {
          this.myNotify('warning', 'Atención', 'La compra no llega a los $'+ minPurchase);
          this.$emit('goNextTab');
        } else {
          alert('Error. La compra mínima es de $'+ minPurchase);
        }
      }
    }
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

.emptyCartImg {
  max-width: 50%;
  width: 350px;
}
.emptyCartContainer {
  padding-top: 100px;
  padding-bottom: 100px;
  @media (max-width: 575px) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

.checkDiscountBtn {
  margin-top: 16px;
  margin-left: 5px;
}

</style>
