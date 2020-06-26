<template>
  <div id="tt-pageContent">
  	<div class="container-indent" style="display: none;">
  		<div class="container">
  			<div class="contact-map">
  				<div id="map" style="background-color: lightgrey;"></div>
  			</div>
  		</div>
  	</div>
  	<div class="container-indent">
  		<div class="container container-fluid-custom-mobile-padding">
  			<div class="tt-contact02-col-list">
  				<div class="row">
  					<div class="col-sm-12 col-md-4 ml-sm-auto mr-sm-auto">
  						<div class="tt-contact-info">
                <font-awesome-icon icon="phone" class="tt-icon"/>
  							<h6 class="tt-title">VAMOS A HABLAR!</h6>
  							<address>
                  {{ _AllBranchsInfo.phone }}
  							</address>
  						</div>
  					</div>
  					<div class="col-sm-6 col-md-4">
              <div class="tt-contact-info">
                <font-awesome-icon icon="map-marker-alt" class="tt-icon"/>
  							<h6 class="tt-title">VISITANOS</h6>
  							<address>
                  {{ _Branch.address }},<br>
  								{{ _Branch.city }}
  							</address>
  						</div>
  					</div>
  					<div class="col-sm-6 col-md-4">
  						<div class="tt-contact-info">
                <font-awesome-icon :icon="['fas', 'clock']" class="tt-icon"/>
  							<h6 class="tt-title">HORARIOS</h6>
  							<address>
                  <router-link :to="{ name: 'shippingTime' }">
                    <font-awesome-icon icon="mouse-pointer"/>
                    Ver los horarios de envío
                  </router-link>
  							</address>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>

    <div class="">
      <vs-button color="primary" size="large"
      style="margin-left: auto;
      margin-right: auto;
      display: block;
      margin-top: 100px;
      margin-bottom: 100px;
      ">
        <a :href="`https://wa.me/${_AllBranchsInfo.phone.replace(/\s/g, '')}?text=¡Hola!`"
        style="color: white !important;">
          <font-awesome-icon :icon="['fab', 'whatsapp']"/>
          ¡Whatsappeanos!
        </a>
      </vs-button>
    </div>

  	<!-- <div class="container-indent">
  		<div class="container container-fluid-custom-mobile-padding">
  			<form id="contactform" class="contact-form form-default" method="post" novalidate="novalidate" action="#">
  				<div class="row">
  					<div class="col-md-6">
  						<div class="form-group">
  							<input type="text" class="form-control" v-model="NewMsg.name" placeholder="Nombre *">
  						</div>
  						<div class="form-group">
  							<input type="text" name="email" class="form-control" v-model="NewMsg.email" placeholder="Email *">
  						</div>
  						<div class="form-group">
  							<input type="text" name="subject" class="form-control" v-model="NewMsg.subject" placeholder="Tema">
  						</div>
  					</div>
  					<div class="col-md-6">
  						<div class="form-group">
  							<textarea  name="message" class="form-control" rows="7" placeholder="Mensaje *" v-model="NewMsg.message"></textarea>
  						</div>
  					</div>
  				</div>
  				<div class="text-center">
  					<button type="button" class="btn" @click="sendMsg()">ENVIAR MENSAJE</button>
  				</div>
  			</form>
  		</div>
  	</div> -->
  </div>
</template>


<script>
export default {
  data() {
    return {
      NewMsg: this.getNewMsg(),
    };
  },
  methods: {
    clearNewMsg() {
      this.NewMsg = this.getNewMsg();
    },
    getNewMsg() {
      return {
        buyerID: '0',
        email: '',
        name: '',
        subject: '',
        message: '',
        date: this.getActualDatetimeToDB(),
      }
    },
    sendMsg() {
      const vm = this;
      this.conectToDB({
        file: 'Contact', action: 'addMsg', params:  this.NewMsg,
        success: function(res){
          alert('Mensaje enviado con éxito!')
          vm.clearNewMsg();
        }
      });
    },
  },
}
</script>

<style lang="css" scoped>
input, textarea {
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1) !important;
}
</style>
