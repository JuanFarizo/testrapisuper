<template>
  <!-- <div class="item-grid-view vx-row match-height">
    <div class="vx-col" :class="gridColumnWidth" v-for="item in items" :key="item.objectID"> -->

      <vx-card class="grid-view-item mb-base overflow-hidden">

          <div class="imgContainer">
            <img :src="getImgDual(`${item.productID}-1`)" @click="zoomIn(item)">
          </div>
            <div v-if="Buyer.isAdmin" class="stockMessage" :class="getClass(item)">
              <span v-if="!getStock(item)">No hay stock</span>
              <span v-else>Hay <span style="margin: 0 3px; font-weight: bold;">
                {{ getStock(item) }}</span> en stock
              </span>
            </div>
            <div class="item-details px-4  mt-auto">
              <!-- TITLE & DESCRIPTION -->
              <div class="my-4">
                <h6 class="text-center font-semibold mb-1 productName">
                  {{ item.fullName }}
                </h6>
              </div>
              <!-- PRICE -->
              <div class="flex justify-between items-center text-center mb-3">
                <h6 class="font-bold w-full">${{ getRealPrice(item) }}</h6>
              </div>
            </div>
            <!-- ACTION BUTTONS -->
            <div class="flex flex-wrap addToCartBtn" style="justify-content: center">
              <!-- is in cart -->
              <div v-if="item.amountInCart" class="addToCartBtn">

                <div class="inputNumber">
                  <vs-input-number min="0" :value="item.amountInCart"
                  @input="updateItemAmountByProd($event, item.productID);"
                  :max="getStock(item)"
                  class="inline-flex"/>
                </div>

                <router-link tag="vs-button" class="goToCartButton" :to="{ name: 'cart' }">
                  <span class="text-sm font-semibold">
                    IR AL CARRO
                  <!-- <font-awesome-icon icon="shopping-cart"/> -->
                  </span>
                </router-link>
              </div>

              <!-- is NOT in cart -->
              <div v-else class="addToCartBtn item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
              @click="addItemToCart(item);" :class="loadAddButton? 'disable':'' ">
                <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />
                <span class="text-sm font-semibold ml-2">AGREGAR</span>
              </div>

            </div>

      </vx-card>
    <!-- </div>
  </div> -->
</template>

<script>
export default{
  props: {
    item: {
      type: Object,
      required: true,
    },
  }, // PROPS
  methods: {
    getClass(Item) {
      if (!this.getStock(Item)) return 'noStock';
      if (this.getStock(Item) < Item.stockAlert) return 'lowStock';
      return 'okStock';
    },
    zoomIn(item){
      return this.$store.dispatch('products/setZoomProductID',item.productID)
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
// Uso real
.imgContainer {
  border: none;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
  width:  300px;
  img {
    margin: 0;
    max-width: 100%;
    max-height: 100%;
    margin-right: auto;
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
  }
  @media (max-width: 1919px) { height: 250px; width: 250px; } // < Laptop XL
  @media (max-width: 1550px) { height: 220px; width: 220px; }
  @media (max-width: 1439px) { height: 200px; width: 200px; } // < Laptop L
  @media (max-width: 1350px) { height: 160px; width: 160px; }
  @media (max-width: 1199px) { height: 200px; width: 200px; } // < 3 products per line
  @media (max-width: 1080px) { height: 165px; width: 165px; }
  @media (max-width:  978px) { height: 200px; width: 200px; } // < hide sidebar
  @media (max-width:  850px) { height: 150px; width: 150px; }
  @media (max-width:  650px) { height: 135px; width: 135px; } // < list view

}


.stockMessage {
  text-align: center;
  color: white;
  width: 100%;
  padding: 10px 0;
  border-radius: 7px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.14);
  margin-bottom: 5px;
  font-weight: 500;
}
.noStock {
  background-color: #FF4136;
  color: #800600;
  color: white;
}
.lowStock {
  // background-color: #FF851B;
  // color: #663000;
  background-color: #FFDC00;
  color: #665800;
}
.okStock {
  background-color: #2ECC40;
  color: #0E3E14;
  // background-color: #01FF70;
  // color: #00662C;
}
.goToCartButton {
  padding: 10px 0px;
  width: 100%;
}

.inputNumber {
  display: block;
  margin-right: auto;
  width: 107px;
  margin-left: auto;
}


.grid-view-item {
    display:flex;
    .grid-view-img {
        // max-width: 100%;
        // max-height: 100%;
        width: auto;
        transition: .35s;
        height: 100%;
        max-height: 150px;
        @media (min-width: 1150px) {
          max-height: 200px;
        }
        @media (min-width: 1400px) {
          max-height: 300px;
        }

        //overflow: hidden;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 4px 25px 0px rgba(0,0,0,.25);

        .grid-view-img{
            opacity: 0.9;
        }
    }
  .productName {
    line-height: 20px !important;
    overflow: visible;
    //height: 40px !important;
  }
  .addToCartBtn {
    margin: 10px;
    border-radius: 10px;
    margin-top: 0;
  }
  .item-img-container.bg-white.flex.items-center.justify-center.mb-4 {
    overflow: hidden;
  }
}
</style>

<style lang="scss">
  //Areglar img - Con scoped no podia reemplazar estilos propios de Vuexy
.vx-card__body {
  width: 100% !important;
  display: flex !important;
  height: 100% !important;
  flex-direction: column !important;
}

.vx-card__collapsible-content.vs-con-loading__container {
  width: 100% !important;
}


</style>
