<template>
  <div id="tt-pageContent">
  	<div class="container-indent">
  		<div class="container container-fluid-custom-mobile-padding">
  			<h1 class="tt-title-subpages">INFORMACIÓN</h1>

        <!-- INFORMACIÓN DE COMPRA -->
  			<h2 class="tt-base-color small">INFORMACIÓN DE COMPRA</h2>
  			<div class="tt-box-faq-listing">
  				<div class="row">
            <!-- Col 1 -->
            <div class="col-sm-12 col-md-6">
              <!-- Pedidos -->
              <div class="tt-box-faq">
                <h6 class="tt-title"><a href="#">Pedidos</a></h6>
                <p>El pedido se realiza íntegramente a través de nuestra página web o aplicación del celular. El pedido mínimo es de <i>${{ _Branch.minimumPurchase }}</i>.</p>
              </div>

  						<div class="tt-box-faq">
  							<h6 class="tt-title"><a href="#">¿Qué métodos de entrega hay?</a></h6>
                <p>Contamos con dos maneras de entregar los pedidos:</p>
                <ul>
                  <li>
                    <b>Entrega a domicilio </b><i>gratuita</i> con nuestra trimotor o camioneta.
                  </li>
                  <li></b>Retiro en persona</b> por nuestro depósito en calle <i>{{_Branch.address}}, {{_Branch.city}}</i></li>
                </ul>
  						</div>
  					</div>
            <!-- Col 2 -->
  					<div class="col-sm-12 col-md-6">
              <div class="tt-box-faq">
                <h6 class="tt-title"><a href="#">¿Cuándo llega mi pedido?</a></h6>
                <p>Al momento de hacer la compra, seleccionás el horario en el que querés recibir el paquete.
                <br>¡Así elegís el horario que te quede más cómodo!</p>
              </div>
              <div class="tt-box-faq">
                <h6 class="tt-title"><a href="#">¿En qué horarios trabajan?</a></h6>
                <p>Podés ver los horarios de envío a tu ciudad haciendo <router-link :to="{ name: 'shippingTime' }">click aquí</router-link></p>
              </div>
		        </div>
  				</div>
  			</div>

  			<hr class="hr-01">

        <!-- INFORMACIÓN DE PAGO -->
  			<h2 class="tt-base-color small">INFORMACIÓN DE PAGO</h2>
  			<div class="tt-box-faq-listing">
  				<div class="row">
            <!-- Col 1 -->
  					<div class="col-sm-12 col-md-6">
  						<div class="tt-box-faq">
  							<h6 class="tt-title"><a href="#">¿En qué momento se paga el pedido?</a></h6>
                <p>Todos los pagos se realizan <b>contra entrega</b></p>
              </div>
            </div> <!-- Col 1 -->
            <!-- Col 2 -->
  					<div class="col-sm-12 col-md-6">
              <div class="tt-box-faq">
                <h6 class="tt-title"><a href="#">¿Qué tipos de pagos aceptan?</a></h6>
                <p>Se aceptan <b>todos</b> los tipos de pago:</p>
                <ul>
                  <li>Efectivo</li>
                  <li>Tarjetas de débito</li>
                  <li>Tarjeta Mutual Argentino</li>
                  <li>Tarjeta Central</li>
                  <li>Tarjeta Mastercard</li>
                  <li>Tarjeta Visa</li>
                  <li>Otras tarjetas de crédito</li>
                </ul>
              </div>
		        </div> <!-- Col 2 -->

  				</div>
  			</div> <!-- INFORMACIÓN DE PAGO -->


        <hr class="hr-01">

        <!-- OTROS -->
        <h2 class="tt-base-color small">OTROS</h2>
        <div class="tt-box-faq-listing">
          <div class="row">
            <div class="col-sm-12">
              <div class="tt-box-faq">
                <h6 class="tt-title"><a href="#">DUDAS O CONSULTAS</a></h6>
                <p>Podés contactarte con nosotros via:</p>
                <ul>
                  <li>
                    <font-awesome-icon :icon="['fas', 'phone']"/>
                    Llamadas
                    ({{ _AllBranchsInfo.phone }})
                  </li>
                  <li>
                    <font-awesome-icon :icon="['fab', 'whatsapp']"/>
                    Whatsapp ({{ _AllBranchsInfo.phone }})
                  </li>
                  <li v-if="_SocialMedia.Instagram">
                    <font-awesome-icon :icon="['fab', 'instagram']"/>
                    Instagram
                    <a target="_blank" :href="_SocialMedia.Instagram.url">
                      ({{ _SocialMedia.Instagram.name }})
                    </a>
                  </li>
                  <li v-if="_SocialMedia.Facebook">
                    <font-awesome-icon :icon="['fab', 'facebook-f']"/>
                    Facebook
                    <a target="_blank" :href="_SocialMedia.Facebook.url">
                      ({{ _SocialMedia.Facebook.name }})
                    </a>
                  </li>
                  <li v-if="_SocialMedia.Twitter">
                    <font-awesome-icon :icon="['fab', 'twitter']"/>
                    Twitter
                    <a target="_blank" :href="_SocialMedia.Facebook.url">
                      ({{ _SocialMedia.Twitter.name }})
                    </a>
                  </li>
                  <li v-if="_Branch.address">
                    <font-awesome-icon :icon="['fas', 'map-marker-alt']"/>
                    Visita a nuestro local
                    ({{ `${_Branch.address}, ${_Branch.city}` }})
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div> <!-- OTROS -->

  		</div>
  	</div>
  </div>
</template>

<style lang="css" scoped>
  li {
    list-style-type: disc;
    list-style-position: inside;
    line-height: 2;
    margin-left: 30px;
  }
  li ul li {
    list-style-type: circle;
  }
  .tt-title {
    font-size: 18px !important;
  }
  p {
    font-size: 16px;
  }
  b {
    font-weight: 600;
  }
</style>
