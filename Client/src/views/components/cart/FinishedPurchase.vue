<template>
  <div class="mx-auto" :class="['finishedPurchase-'+ getResult(), {'finishedPurchase-admin': Buyer.isAdmin }]">


    <!-- ADMIN message -->
    <div v-if="Buyer.isAdmin" class="text-center">
      <div class="mx-auto" style="width: 150px">
        <img :src="getImg('cart/emoji_sunglasses.png')" style="width: 150px">
      </div>
      <div v-if="Cart.isForMe">
        <h2>¡Graciar por la compra, <b>{{ Cart.Seller.nick }}</b>!</h2>
        <p>Ya quedó registrada</p>
      </div>
      <div v-else>
        <h2>¡Venta terminada!</h2>
        <p>¡Felicitaciones <b>{{ Cart.Seller.nick }}</b>! A seguir vendiendo...</p>
      </div>
    </div>

    <!-- NO ADMIN message -->
    <div v-else>
      <div class="iconContainer text-center">
        <font-awesome-icon :icon="getIcon()"/>
      </div>
      <h2 class="text-center">{{ result ? '¡Compra terminada con éxito!' : '¡Error en la compra!'}}</h2>
      <div class="text-center" v-if="result">
        <div v-if="Cart.shippingNeeded">
          Relajate y esperá tranquilo, nosotros nos encargamos...<br>
          <b>
            {{ getNameOfDate(Cart.ReceptionDatetime.date, {year: false}) }} -
            {{ showRange(Cart.ReceptionDatetime.time) }}
          </b> llegará tu pedido.
        </div>
        <div v-else>
          Pasá a retirarlo cuando quieras<br>
          <div class="mt-3">
            <u>HORARIOS</u><br>
            <router-link :to="{ name: 'shippingTime' }">
              <font-awesome-icon icon="mouse-pointer"/>
              Ver los horarios de envío
            </router-link>
          </div>
          <p class="extraInfo">La compra debe ser hecha por lo menos media hora antes de retirar el pedido</p>
        </div>
      </div>
      <div class="text-center mt-3" v-else>
        Por favor, ponete en contacto con nosotros: <b>{{ _AllBranchsInfo.phone }}</b>
      </div>
    </div>
    <div class="text-center mt-5" style="font-size: 16px;">
      <vs-button tag="vs-button" color="rgb(255, 255, 255)" type="border" @click="goToCatalogue">
        <!-- <router-link :to="{ name: 'catalogue' }" style="color: white"> -->
          Volver al catálogo
        <!-- </router-link> -->
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: { type: Boolean, required: true, },
  }, // PROPS
  methods: {
    getResult() {
      return this.result ? 'success' : 'failure';
    },
    getIcon() {
      return ['far', this.result ? 'check-circle' : 'times-circle']
    },
    goToCatalogue() {
      this.$router.push({ name: 'catalogue' })
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
.finishedPurchase-success {
  background-color: #28C76F;
}
.finishedPurchase-failure {
  background-color: #FF4757;
}
.finishedPurchase-admin {
  background-color: #15B0CE;
}
.finishedPurchase-success,
.finishedPurchase-failure {
  margin: 100px 0;
  padding: 50px;
  color: white;
  border-radius: 50px;
  max-width: 700px;
  div {
    line-height: 30px;
    font-size: 18px;
  }
  h2 {
    font-weight: bold !important;
    color: white;
  }

  .iconContainer {
    opacity: 0.85;
    font-size: 50px;
    position: relative;
    top: -15px;
  }

  @media (max-width: 1024px) {
    margin: 30px 0;
    @media (max-width: 730px) {
      margin-right: 10px !important;
      margin-left:  10px !important;
      margin-top: 0;
      @media (max-width: 575px) {
        padding: 50px 30px;
        line-height: 22px;
        font-size: 15px;
      }
    }
  }
}

.extraInfo {
  opacity: 0.8;
  font-size: 13px;
}

</style>
