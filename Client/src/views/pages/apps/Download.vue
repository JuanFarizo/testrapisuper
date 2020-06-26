<template>
  <div class="mainContainer">
    <div class="div-center logoContainer">
      <div class="logo">
        <img :src="getImg('/images/logo/clientHeader.png')" @click="$router.push({name: 'index'})"/>
      </div>
    </div>
    <div  >
      <h1 class="title tt-title center-text ">¿ TODAVIA NO TENÉS LA APP ?</h1>
      <h3 class="subtitle tt-title center-text">¡Descargala!</h3>
    </div>

    <div class="button-center">
      <div class="div-center">
        <button class=button-style @click="$router.push({name: 'app-iPhone'})" >
          <img :src="getImg('/images/app/iPhone_appStore.png ')" class="image-style"/> </button>
      </div>

      <div class="div-center border-top2">
        <button class=button-style @click="$router.push({name: 'app-android'})">
          <img :src="getImg('/images/app/google_playstore.png ')" class="image-style"/> </button>
      </div>
      <h3 class="center-text border-top2"> o</h3>
    </div>

    <div class="border-top1">
      <div>
       <h6 class="center-text">Mirá nuestro catálogo y comprá online!</h6>
      </div>
      <div class="reduce-pad border-top2">
        <vs-button   color="dark" @click="$router.push({name: 'catalogue'})">
          <span>
            <vs-icon icon="shopping_cart" color="white"></vs-icon>
          </span>
        Catalogo
          <span>
            <vs-icon icon="shopping_cart" color="white"></vs-icon>
          </span>
        </vs-button>
      </div>
    </div>


  </div>

</template>

<script>

export default {
  data(){
    return{


    }
  },
  methods: {


  }

}
</script>

<style scoped lang="scss">
  div{
    display: flex;
    flex-direction: column;

  }
  .div-center{
    align-items: center;
    display: flex;

  }
  .button-style{
    border-radius: 3px;
    border: 0;
    cursor: pointer;
    background-color: transparent;
    box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
  }
  .image-style{
    width:300px;
    height:90px;
    image-rendering:optimizeQuality;
    @media (max-width: 700px) {
      width:233px;
      height:70px;
    }
  }
  .button-center{
    display: inline-block;
    align-items: center;
    flex-direction: row;

  }
  .center-text{
    text-align: center;

  }
  .border-top1{
    padding-top: 20px;
  }
  .border-top2{
    padding-top: 10px;
  }
  .reduce-pad{
    width: 150;
    align-items: center;
  }
  .logo{
    background-image: url('/Rapisuper/Dual/images/app/logo.png');
    // background-repeat:no-repeat;
    // background-position:center;
    // background-size: contain;
    // width:80px;
    height: 100px;
    img {
      height: 100%;
      cursor: pointer;
    }
    padding: 25px 0;
    @media (max-width: 370px) {
      padding: 15px 0;
      height: 70px;
    }
  }

.foother{
  flex-direction: row-reverse;
  align-items: right;
  align-content: right;
  height:100%;
}

.mainContainer {
  background-color: #15B0CE;
  height: 100vh;
}

.title{
  background-color: #22223E;
  color: white;
  padding: 15px;
  font-size: 22px;
  @media (max-width: 450px) {
    font-size: 20px;
  }
  @media (max-width: 370px) {
    font-size: 17px;
  }
}

.subtitle {
  padding: 15px 0;
}

.logoContainer {
  background-color: white;
}
</style>
