<template>
  <div class="camara">
    <h1>Camara Scanner</h1>
    <v-quagga
      :onDetected="logIt"
      :readerSize="readerSize"
      :readerTypes="['ean_reader']"
      class="camera"
    ></v-quagga>
  </div>
</template>

<script>
// import Vue from "vue";
// import VueQuagga from "vue-quaggajs";

// register component 'v-quagga'
Vue.use(VueQuagga);

export default {
  name: "VueBarcodeTest",
  data() {
    return {
      readerSize: {
        width: 640,
        height: 480
      }
    };
  },
  methods: {
    logIt(data) {
      // El codigo escaneado se encuentra en data.codeResult.code, una vez escaneado podria hacerse alguna transaccion o enviarlo a algun lado
      this.myNotify("success", "Codigo Escaneado", data.codeResult.code);
    }
  }
};
</script>

<style lang="scss" scoped>
.camera {
  max-width: 100vw;
}
</style>
