<template>
  <div class="productItem">

    <!-- IMG -->
    <div class="imgContainer prodImg">
      <img :src="getImgDual(`${Item.productID}-1`)" :alt="Item.fullName" @click="zoomIn(Item)">
    </div>

    <!-- NAME -->
    <div class="growPart flex">
      <div class="itemNameAndAmount">
        <h2 class="itemName pb-0">
          {{ Item.fullName }}
        </h2>
        <!-- Input number -->
        <div class="inputNumber" v-if="Item.amountInCart && inputSizeInner == 'default'">
          <vs-input-number min="0" :value="Item.amountInCart"
          @input="updateItemAmountByProd($event, Item.productID);"
          :max="getStock(Item)"
          />
        </div>
      </div>

      <!-- PRICE -->
      <div class="priceContainer">
        <h5 class="price">${{ showPrice(+getRealPrice(Item)) }}</h5>

        <!-- Input number -->
        <div class="inputNumber" v-if="Item.amountInCart && inputSizeInner == 'small'">
          <vs-input-number min="0" :value="Item.amountInCart"
          @input="updateItemAmountByProd($event, Item.productID);"
          :max="getStock(Item)"
          />
        </div>

        <!-- Add to cart -->
        <vs-button @click="addItemToCart(Item);" v-if="!Item.amountInCart"
        :size="buttonSizeInner" class="nowrap">
          <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />
          <span class="breakButton"><br></span>
          <span class="text-sm font-semibold ml-2">AGREGAR</span>
        </vs-button>
        <!-- Go to cart -->
        <vs-button @click="goToCart();" v-if="Item.amountInCart"
        :size="buttonSizeInner" class="nowrap">
          <span class="breakButton"><br></span>
          <span class="text-sm font-semibold ml-2">IR AL CARRO</span>
        </vs-button>
      </div>
    </div> <!-- .growPart -->


  </div>
</template>

<script>
export default{
  props: {
    // windowSize: { type: Number, required: true, },
    Item: { type: Object, required: true, },
    buttonSizeInner: { type: String, required: true, },
    inputSizeInner: { type: String, required: true, },
  }, // PROPS
  computed: {
  }, // COMPUTED
  methods: {
    goToCart() {
      this.$router.push({name: 'cart'});
    },
    zoomIn(item){
      return this.$store.dispatch('products/setZoomProductID',item.productID)
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

.breakButton {
  @media (min-width: 400px) {
    display: none;
  }
}

.productItem {
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 15px;
  // padding-right: 0;
  @media (max-width: 500px) {
    padding-left:  10px;
    padding-right: 10px;
  }
  @media (max-width: 400px) {
    padding-left:  5px;
    padding-right: 5px;
  }
}
.prodImg {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
}

.growPart {
  flex-grow: 1;
  width: 100%;
}

.itemNameAndAmount {
  flex-flow: 1;
  margin-left:  45px;
  width: 100%;
  @media (max-width: 700px) {
    margin-left:  15px;
    margin-right: 15px;
  }
}

.itemName {
  margin-top: 15px;
  font-size: 16px !important;
  font-weight: 600;
  line-height: 16px !important;
  @media (max-width: 500px) {
    font-size: 14px !important;
    margin-top: 5px;
  }
}

.amountText {
  text-align: left;
  @media (max-width: 400px) {
    display: none;
  }
}

.inputNumber {
  margin-top: 20px;
  display: block;
  margin-right: auto;
  margin-left: 0;
  width: 107px;
  @media (max-width: 700px) {
    text-align: center;
    margin-left: auto;
  }
  @media (max-width: 500px) {
    margin-top: 10px;
  }
}

.priceContainer {
  flex-shrink: 0;
  margin-left: auto;
}

.price {
  white-space: nowrap;
  padding-bottom: 0 !important;
  margin-bottom: 15px;
  margin-top: 30px;
  font-weight: 700 !important;
  font-size: 20px;
  text-align: center;
  @media (max-width: 1000px) {
    margin-top: 15px;
  }
  @media (max-width: 600px) {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 17px;
  }
}

.deleteBtn {
  padding: 0 15px;
  @media (max-width: 500px) {
    padding: 0px;
  }
}
</style>
