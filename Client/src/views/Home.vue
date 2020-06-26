<template>
    <div class="mainContainer">
        <div class="container">
          <hr class="divisor">
          <div style="text-align:center">
            <div class="tt-title texts-1"  style="background-color: #15B0C4;">
              <h1 >Bienvenido a Rapisuper! </h1>
              <h3> tu compra a un click!</h3>
            </div>
            <hr class="divisor">
            <h2 >NOVEDADES:</h2>
            <div class="sliders">
              <agile :options="options" >
                <div class="slide" >
                  <ItemGridView :item="allProducts[0]" buttonSizeInner="" inputSizeInner="small"/>
                  <ItemGridView :item="allProducts[1]" buttonSizeInner="" inputSizeInner="small" v-if="sizeSlider >1"/>
                  <ItemGridView :item="allProducts[2]" buttonSizeInner="" inputSizeInner="small" v-if="sizeSlider >2"/>
                </div>
                <div class="slide" >
                  <ItemGridView :item="allProducts[3]" buttonSizeInner="" inputSizeInner="small"/>
                  <ItemGridView :item="allProducts[4]" buttonSizeInner="" inputSizeInner="small" v-if="sizeSlider >1"/>
                  <ItemGridView :item="allProducts[5]" buttonSizeInner="" inputSizeInner="small" v-if="sizeSlider >2"/>
                </div>
                <div class="slide" >
                  <ItemGridView :item="allProducts[6]" buttonSizeInner="" inputSizeInner="small"/>
                  <ItemGridView :item="allProducts[7]" buttonSizeInner="" inputSizeInner="small" v-if="sizeSlider >1"/>
                  <ItemGridView :item="allProducts[8]" buttonSizeInner="" inputSizeInner="small" v-if="sizeSlider >2"/>
                </div>
                <div class="slide" >
                  <ItemGridView :item="allProducts[9]" buttonSizeInner="" inputSizeInner="small"/>
                  <ItemGridView :item="allProducts[10]" buttonSizeInner="" inputSizeInner="small" v-if="sizeSlider>1"/>
                  <ItemGridView :item="allProducts[11]" buttonSizeInner="" inputSizeInner="small" v-if="sizeSlider >2"/>
                </div>
                 <template slot="prevButton"><i class=" nav-button-prev"><p style="margin-top: 180px">◄</p></i></template>
                <template slot="nextButton"><i class=" nav-button-next"><p style="margin-top: 180px">►</p></i></template>
              </agile>
            </div>
          </div>
        </div>
        <div class="container" style="background-color: #15B0C4;">
          <router-link :to="{ name: 'info' }">
            <div class="ms-c">
              <div class="miscelTextContainer">
                <h1 class="miscelText"> Somos un supermercado completamente online</h1>
              </div>
              <div class="miscellanyContainer ">
                <h2 class="centerText">
                  CONOCENOS
                </h2>
                <img :src="getImg('/images/Home/phone_buy.jpg')" class="image-misel"/>
              </div>
            </div>
          </router-link>
          <router-link :to="{ name: 'register' }" >
            <div class="ms-c">
              <div class="miscellanyContainer">
                <h2 class="centerText">
                  REGISTRATE
                </h2>
                <img :src="getImg('/images/Home/register.jpg')" @click="$router.push({name: 'register'})" class="image-misel"/>
              </div>
              <div class="miscelTextContainer">
                <h1 class="miscelText" style="margin-top:90px; margin-left:20px">Proximamente vas a poder formar parte de nosotros</h1>
              </div>
            </div>
          </router-link>
        </div>
      </div>
</template>

<script>
import { VueAgile } from 'vue-agile'
export default {

  data(){
    return{
      activeItem: 0,
      allProducts: '',
      activeUsers: true, //activa la barra de login y register
      options: {
        dots:false,
        fade: true,
        navButtons: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        infinite: true,
        navButtons: true
      },
    } //DATA
  },
  components: {
    ItemListView: () => import('./components/ItemListView.vue'),
    ItemGridView: () => import('./components/ItemGridView.vue'),
    agile: VueAgile
  }, //COMPONENTS

  methods: {
    loadProduct() {
      let Params = {
        itemsPerPage: 12,
        page: 1,
        orderByNewer: true,
        isNormal: true,
        branchID:this.getBranchID()
        // hasPrice: true,
        // hasStock: true,
      };
      const vm = this;
      vm.conectToDB({
        file: 'Products', action: 'getProductOfBranch', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allProducts = res.data.data;
          vm.isActive = true;
          console.log(res.data);
          console.log(res.data.data);
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
  }, // METHODS
  created() {
    this.loadProduct();
  },//CREATED
  computed: {
    widthWindow(){
      return this.$store.state.windowWidth;
    },
    sizeSlider(){
      if(this.widthWindow <= 650 && this.widthWindow > 400){return 2;}
      if(this.widthWindow <= 400){return 1;}
      return 3;
    }
  }


}
</script>

<style lang="scss" scoped>
@import './../assets/css/footer.css';

.texts-1{
  color: #22223e;
   font-size: 160%;
   font-weight: 600;
   text-align: center;
}

.sliders{
  justify-content: center;
}
 @media(max-width: 500px){
   .sliders{
     width:100%;
   }
 }
.slide{
	align-items: center;
	// box-sizing: border-box;
	color: #fff;
	display: flex;
  justify-content: center;
  height:100%;
}
.consult-text{
  font-weight: 600;
  font-size: 25px;
  position: absolute;
  text-align: center;
}
.nav-button-prev{
	background: transparent;
  color: transparent;
	border: none;
	cursor: pointer;
	font-size: 50px;
	height: 92%;
	position: absolute;
	top: 0;
	transition-duration: .3s;
	width: 80px;
  text-align: center;
	&:hover{
		background-color: rgba(0, 0, 0, .4);
		opacity: 1;
    color: #fff;
  }
}
.nav-button-next{
	background: transparent;
  color: transparent;
	border: none;
	cursor: pointer;
	font-size: 50px;
	height: 92%;
	position: absolute;
	top: 0;
	transition-duration: .3s;
	width: 80px;
  right:0;
	&:hover{
		background-color: rgba(#000, .5);
		opacity: 1;
    color: #fff;
  }
}
.ms-c{
  display: inline-flex;
  flex-direction: row;
   @media(max-width:800px){ justify-content: center;}
}
.miscellanyContainer{
  position: relative;
  text-align: center;
  @media(max-width:800px){ justify-content: center;}
  @media (max-width: 500px){ max-width: 100%; margin-bottom: none;}
}
.image-misel{
  @media(max-width: 800px){width:100%; height:100%}
  // @media(max-width: 500px){width:50%; height:50%;}
  // @media(max-width: 300px){width:30%; height:30%;}
}
.centerText{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.miscelTextContainer{
  display:flex;
  align-items: center;
  text-align: center;
  text-anchor: 100%;
  @media(max-width:900px){display:none;}
}
.miscelText{
  font-size: 300%;
  @media(max-width:850px){ font-size:240%}
  @media(max-width:500px){ font-size:150%}
  @media(max-width:300px){ font-size:80%}
}
.divisor{
  margin-top: 8px;
  margin-bottom: 4px;
}
</style>
