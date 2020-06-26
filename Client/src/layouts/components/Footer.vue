<template lang="html">
  <footer>
    <div class="tt-footer-default tt-color-scheme-02" v-if="footerCartActive == true">
      <div class="container">
        <div class="row">
          <!--
          <div class="tt-mobile-collapse">
            <h4 class="tt-collapse-title">
              Enterate de las OFERTAS
            </h4>
            <div class="tt-collapse-content">
              <div id="newsletterform" class="form-inline form-default" method="post" novalidate="novalidate" action="#">
                <div class="form-group">
                  <input type="text" name="email" class="form-control" placeholder="Ingresá tu email"
                  v-model="emailSuscription" @keyup.enter.native="saveEmail()">
                  <button type="button" class="btn" @click="saveEmail()">Unite</button>
                </div>
              </div>
            </div>
          </div> -->

          <h4 v-if="$route.name != 'cart'" class="tt-collapse-title footerTopText">
            Para terminar la compra, haga click en el botón del carro en la barra superior
            <div style="white-space: no-wrap; display: inline-block;">
              <font-awesome-icon icon="arrow-right" style="margin-left: 10px;"/>
              <router-link :to="{ name: 'cart', }">
                <font-awesome-icon icon="shopping-cart" class="cartIcon secondaryColor"/>
              </router-link>
              <font-awesome-icon icon="arrow-left"/>
            </div>
          </h4>

        </div>
      </div>
    </div>


    <!-- Cols -->
    <div class="tt-footer-col tt-color-scheme-01">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="tt-mobile-collapse">
              <h4 class="tt-collapse-title">
                HORARIOS
              </h4>
              <div class="tt-collapse-content">
                <ul class="tt-list">
                  <router-link :to="{ name: 'shippingTime' }">
                    <font-awesome-icon icon="mouse-pointer"/>
                    Ver los horarios de envío
                  </router-link>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="tt-mobile-collapse">
              <h4 class="tt-collapse-title">NOSOTROS</h4>
              <div class="tt-collapse-content">
                <p>
                  Somos un supermercado completamente online.
                  ¡Hacé las compras desde tu dispositivo, y la llevamos a tu casa!
                  -
                  <router-link :to="{ name: 'info' }">Más info</router-link>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="tt-newsletter">
              <div class="tt-mobile-collapse">
                <h4 class="tt-collapse-title">
                  CONTACTO
                </h4>
                <div class="tt-collapse-content">
                  <address>
                    <p><span>Dirección:</span> {{ _Branch.address }}, {{ _Branch.city }}</p>
                    <p><span>Teléfono:</span> {{ _AllBranchsInfo.phone}}</p>
                    <p><span>E-mail:</span><a :href="`mailto:${_AllBranchsInfo.email}`"> {{ _AllBranchsInfo.email }}</a></p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tt-footer-custom">
      <div class="container">
        <div class="tt-row">
          <div class="tt-col-left">
            <div class="tt-col-item tt-logo-col">
              <!-- logo -->
              <router-link :to="{ name: 'index' }" class="tt-logo tt-logo-alignment">
                <img  src="images/custom/logo.png" alt="">
              </router-link>
              <!-- /logo -->
            </div>
            <div class="tt-col-item">
              <!-- copyright -->
              <div class="tt-box-copyright">
                &copy; Rapisuper {{ getActualYear() }}. Todos los derechos reservados
              </div>
              <!-- /copyright -->
            </div>
          </div>
          <div class="tt-col-right">
            <div class="tt-col-item">
              <!-- payment-list -->
              <ul class="tt-payment-list">
                <li>
                  <font-awesome-icon :icon="['fab', 'cc-visa']"/>
                </li>
                <li>
                  <font-awesome-icon :icon="['fab', 'cc-mastercard']"/>
                </li>
              </ul>
              <!-- /payment-list -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>



<script>
export default {
  data() {
    return {
      emailSuscription: '',
    };
  }, // DATA
  props:{
    footerCartActive: {default: true}
  },//PROPS
  methods: {
    saveEmail() {
      if (this.emailSuscription == '') {
        alert('Debe ingresar un email');
        return;
      }
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'addEmail', params:  {email: this.emailSuscription, isSuscriptionActive: 1, createdReasonID: 2 },
        success: function(res){
          alert('Email agregado con éxito')
          vm.emailSuscription = ''
        },
      });
    },
  } // METHODS
}
</script>



<style lang="css" scoped>

.cartIcon {
  margin: 0 15px;
}

.footerTopText {
  text-align: center;
  width: 100%;
  color: white;
  line-height: 30px;
}

.tt-payment-list li a {
  font-size: 30px;
}
</style>
