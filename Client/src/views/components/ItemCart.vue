<template>
  <div class="cartItem">


    <!-- IMG -->
    <div class="imgContainer">
      <img
      :src="getImgDual(`${item.productID}-1`)"
      :alt="item.fullName">
    </div>

    <!-- NAME -->
    <div class="itemNameAndAmount">
      <h2 class="itemName pb-0">
        {{ item.fullName }}
      </h2>

      <div class="inputNumber">
        <p class="amountText font-bold text-sm text-cantidad">Cantidad</p>
        <vs-input-number min="0" :value="item.amount"
        :max="getStock(item)"
        @input="updateItemAmount($event, item)" class="inline-flex" />
      </div>
    </div>

    <!-- PRICE -->
    <div class="priceContainer">
      <h5 class="price">${{ showPrice(+getRealPrice(item) * item.amount) }}</h5>

      <div class="deleteBtn item-view-primary-action-btn rounded-lg flex flex-grow items-center justify-center cursor-pointer"
        @click="removeItemFromCart(item)">
        <feather-icon icon="XIcon" svgClasses="h-4 w-4" />
        <span class="text-sm font-semibold ml-2">ELIMINAR</span>
      </div>

    </div>


  </div>
</template>

<script>
export default{
  props: {
    item: {
      type: Object,
      required: true
    }
  }, // PROPS
  methods: {
    // checkStock(Item) {
    //   console.log(Item);
    // },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

.cartItem {
  display: flex;
  flex-wrap: nowrap;
  box-shadow: 0px 20px 0px -19px rgba(0, 0, 0, .1) !important;
  padding: 15px;
  // padding-right: 0;
}

.itemNameAndAmount {
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
  }
}


.imgContainer {
  flex: none;
  display: flex;
  border-radius: 10px;
  border: 1px solid #EEEEEE;
  overflow: hidden;
  width:  150px;
  height: 150px;
  @media (max-width: 700px) {
    width:  100px;
    height: 100px;
  }
  @media (max-width: 500px) {
    width: 70px;
    height: 70px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
}

.amountText {
  text-align: left;
  @media (max-width: 400px) {
    display: none;
  }
}

.inputNumber {
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
  margin-left: auto;
}

.price {
  white-space: nowrap;
  padding-bottom: 0 !important;
  margin-bottom: 30px;
  margin-top: 30px;
  font-weight: 700 !important;
  font-size: 22px;
  text-align: center;
  @media (max-width: 1000px) {
    margin-top: 15px;
  }
  @media (max-width: 600px) {
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
