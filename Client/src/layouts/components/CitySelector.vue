<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  title="Seleccioná tu ciudad"
  :button-close-hidden="true"
  >
  <!-- :button-close-hidden="true" -->

    <div class="selector">
      <label class="labelVselect">Ciudad</label>
      <v-select :options="_allCities" v-model="SelectedCity"
      label="city" :clearable="false"
      />
    </div>

    <div class="branchImgContainer">
      <div>envio a cargo de {{SelectedCity.branchName}}</div>
      <img :src="getImg(`branches/${SelectedCity.branchID}.jpg`)">
    </div>

  <PromptButtons @accept="closePopUp(); selectCity()" :hideCancel="true"/>

  </vs-popup>
</template>

<script>
export default {
  name: 'CitySelector',
  props: {
    // isPromptActive: { type: Boolean, required: true, },
  }, // PROPS
  data() {
    return {
      SelectedCity: {},
      notShowMessage: false,
    } // return DATA
  }, // DATA
  computed: {
    isPromptActiveLocal: {
      get() {
        return this._LayoutIsActive.citySelector;
      },
      set(val) {
        if (!val) {
          if (!this.notShowMessage) this.showMessage();
        }
      },
    },
  }, // COMPUTED
  created() {
  }, // CREATED
  methods: {
    // closePopUp
    // selectCity
    // showMessage
    closePopUp() {
      this.$store.dispatch('layout/hideLayout', 'citySelector');
    },
    selectCity() {
      this.notShowMessage = true;
      // check
      if (this.SelectedCity == null) {
        this.showMessage();
        return;
      }
      // save
      localStorage.cityID = this.SelectedCity.id;
      this.isPromptActiveLocal = false;
      this.setUserBasicConfig();
      this.notShowMessage = false;
    },
    showMessage() {
      this.myNotify('warning', 'Atención', 'Tenés que seleccionar una ciudad');
    },

  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

.selector {
  margin-top: 50px;
  // margin-bottom: 150px
  margin-left:  15px;
  margin-right: 15px;
}

.branchImgContainer {
  max-width: 50%;
  margin-left: auto;
  margin-right: auto;
  // margin-top: 50px;
  margin-top: 25px;
  img {
    max-width: 100%;
    border-radius: 15px;
  }
}


</style>
