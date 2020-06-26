<template>
  <div class="tt-desctop-parent-cart tt-parent-box">
    <div class="tt-cart tt-dropdown-obj" style="padding-bottom: 0;" data-tooltip="Carro" data-tposition="bottom">

      <!-- citySelector -->
      <template v-if="_City.id">
        <div class="branchImgContainer" v-if="!isFullFranchise()">
          <img :src="getImg(`branches/${_City.branchID}.jpg`)">
        </div>

        <div class="cityContainer">
          <div class="">
            Ciudad:
          </div>
          <div class="cityName" @click="openCitySelector()">
            {{ _City.name }}
            <font-awesome-icon icon="chevron-down"/>
          </div>
        </div>
      </template>

      <router-link v-if="$route.name != 'cart'" :to="{ name: 'cart' }" tag="button" class="cartButton tt-dropdown-toggle">
        Terminar compra
        <font-awesome-icon icon="shopping-cart" class="cartIcon"/>
        <span class="cartAmount mainBGColor">
          {{ Cart.totalItemsAmount }}
        </span>
      </router-link>


      <router-link v-else :to="{ name: 'cart' }" tag="button" class="cartButton2 tt-dropdown-toggle">
        <font-awesome-icon icon="shopping-cart" class="cartIcon2"/>
        <span class="cartAmount2 mainBGColor">
          {{ Cart.totalItemsAmount }}
        </span>
      </router-link>


      <div class="tt-dropdown-menu">
        <div class="tt-mobile-add">
          <h6 class="tt-title">CARRO DE COMPRAS</h6>
          <button class="tt-close">Cerrar</button>
        </div>
        <div class="tt-dropdown-inner" style="display: none;">
          <div class="tt-cart-layout">
            <!-- layout emty cart -->
            <a href="empty-cart.html" class="tt-cart-empty">
              <i class="icon-f-39"></i>
              <p>No Products in the Cart</p>
            </a>
            <div class="tt-cart-content">
              <div class="tt-cart-list">
                <cart-item/>
              </div>
              <div class="tt-cart-total-row">
                <div class="tt-cart-total-title">SUBTOTAL:</div>
                <div class="tt-cart-total-price">$324</div>
              </div>
              <div class="tt-cart-btn">
                <div class="tt-item">
                  <a href="#" class="btn">TERMINAR COMPRA</a>
                </div>
                <div class="tt-item">
                  <a href="cart.php" class="btn-link-02 tt-hidden-mobile">Ver carro</a>
                  <a href="cart.php" class="btn btn-border tt-hidden-desctope">VER CARRO</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CartItem from './Header-CartItem.vue';

export default {
  components: {
    CartItem
  },
  methods: {
    openCitySelector() {
      this.$store.dispatch('layout/showLayout', 'citySelector');
    },
  }, // METHODS
};
</script>

<style lang="scss" scoped>

.cartButton {
  border-radius: 10px 10px 0 0;
  padding: 10px 15px !important;
  background-color: #22223E !important;
  color: white !important;
}

.cartIcon {
  color: white;
}

.cartButton2 {
  background-color: white !important;
  color: #22223E !important;
}

.cartIcon2 {
  color: #22223E;
}

.cartAmount2,
.cartAmount {
  display: inline-block;
  padding: 1px 6px 0px 6px;
  background: #15B0CE;
  color: #ffffff;
  border-radius: 30px;
  position: absolute;
  font-size: 12px;
  line-height: 1.7;
  cursor: pointer;
  top: -5px;
  left: 185px;
  /* left: 195px; */
  /* left: 208px; */
}
.cartAmount2 {
  left: 22px;
}

.cityContainer {
  margin-right: 10px;
  margin-top: 8px;
  font-size: 10px;
  .cityName {
    font-size: 12px;
  }
  .cityName:hover {
    color: #15B0CE;
    cursor: pointer;
  }
}

.branchImgContainer {
  width:  40px;
  height: 40px;
  margin-right: 5px;
  img {
    border-radius: 5px;
    width: 100%;
  }
}

</style>
