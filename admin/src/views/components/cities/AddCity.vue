<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  :title="isEditing ? 'Editar ciudad' : 'Crear ciudad'">
    <div class="">
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Nombre" v-model="NewCity.name" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <label>Sucursal</label>
          <v-select label=""/>
          <vs-input label="Nombre" v-model="NewCity.name" class="inputLine"/>
        </vs-col>
      </vs-row>

      <PromptButtons @accept="finishAction" @cancel="isPromptActiveLocal = false;"/>
    </div>
  </vs-popup>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    isEditing: { type: Boolean, required: true, },
    CityToEdit: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      NewCity: this.getNewCity(),
    } // return DATA
  }, // DATA

  computed: {
    isPromptActiveLocal: {
      get(val) {
        return this.isPromptActive;
      },
      set(val) {
        if (val) return;
        this.$emit('closePrompt');
      }
    },
  }, // COMPUTED

  watch: {
    isPromptActiveLocal: function(val) {
      if (!val) return;
      if (!this.isEditing) {
        // new City
        this.NewCity = this.getNewCity();
        return;
      }
      this.copyEditData();
    },
  }, // WATCH

  created() {
  }, // CREATED

  methods: {
    // addCity
    // checkData
    // copyEditData
    // finishAction
    // getNewCity
    addCity() {
      let Params = this.NewCity;
      this.conectToDB({
        file: 'Cities', action: 'addCity', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let NewCityID = res.data.data;
          this.$emit('addedCity', NewCityID);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    checkData() {
      let msg = '';
      if (this.NewCity.name == '') msg = 'Tenés que escribir el nombre de la ciudad';
      if (this.NewCity.branchID == 0) msg = 'Tenés que seleccionar una sucursal';
      if (msg != '') {
        console.log(msg);
        this.myNotify('danger', 'Error', msg);
        return false;
      }
      return true;
    },

    copyEditData() {
      for (let key in this.NewCity) {
        if (typeof this.NewCity[key] == 'undefined') continue;
        this.NewCity[key] = this.CityToEdit[key];
      }
    },

    finishAction() {
      if (!this.checkData()) return;
      let Params = this.NewCity;
      if (this.isEditing) {
        Params.CityID = Params.id;
        this.$emit('modifyCityDB', Params);
      } else {
        this.addCity();
      }
      this.isPromptActiveLocal = false;
    },

    getNewCity() {
      return {
        id:                      0,
        branchID:                0,
        name:                    '',
        mondayShippingTimeID:    0,
        tuesdayShippingTimeID:   0,
        wednesdayShippingTimeID: 0,
        thursdayShippingTimeID:  0,
        fridayShippingTimeID:    0,
        saturdayShippingTimeID:  0,
        sundayShippingTimeID:    0,
        isActive:                1,
      }
    },
  }, // METHODS

} // export default
</script>

<style lang="css" scoped>
  .inputLine {
    margin-top: 5px;
    width: 100%;
  }
  .checkbox {
    padding-top: 25px;
  }
  .textarea {
    margin-top: 15px;
  }
</style>
