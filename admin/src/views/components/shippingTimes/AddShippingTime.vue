<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  :title="isEditing ? 'Editar horario' : 'Crear horario'">
    <div class="">
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input label="Nombre" v-model="NewShippingTime.name" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <inputHour v-model="NewShippingTime.timeRangeDefault"
          @input="$refs.ShippingTimeItems.calculateDefaultRanges(NewShippingTime.timeRangeDefault)"
          label="Duración estandar" class="inputLine"/>
        </vs-col>
      </vs-row>


      <ShippingTimeItems ref="ShippingTimeItems"
      :SelectedShippingTime="ShippingTimeToEdit"
      :isActive="isPromptActiveLocal"
       class="mt-5"/>


      <PromptButtons @accept="finishAction" @cancel="isPromptActiveLocal = false;"/>
    </div>
  </vs-popup>
</template>

<script>
export default {
  components: {
    ShippingTimeItems: () => import('./ShippingTimeItems.vue'),
  },
  props: {
    isPromptActive: { type: Boolean, required: true, },
    isEditing: { type: Boolean, required: true, },
    ShippingTimeToEdit: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      // NewShippingTime: {},
      NewShippingTime: {},
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
      if (val) {
        if (!this.isEditing) {
          // new shippingTime
          this.NewShippingTime = this.getNewShippingTime();
          this.addShippingTime();
        } else {
          // edit
          this.copyEditData();
        }
      }
    },
  }, // WATCH

  created() {
  }, // CREATED

  methods: {
    // addShippingTime
    // checkData
    // copyEditData
    // finishAction
    // getNewShippingTime
    // loadRoles
    addShippingTime() {
      // Primero creo el shippingTime con isActive en 0, para poder agregarle items.
      // Le pongo el isActive en 1 cuando apreto aceptar
      console.log('creo');
      let Params = this.NewShippingTime;
      this.conectToDB({
        file: 'ShippingTimes', action: 'addShippingTime', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let NewShippingTimeID = res.data.data;
          console.log(NewShippingTimeID);
          this.ShippingTimeToEdit.id = NewShippingTimeID;
          console.log(this.NewShippingTime);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    checkData() {
      let msg = '';
      if (this.NewShippingTime.timeRangeDefault == '') msg = 'La duración no puede ser 0';
      if (this.NewShippingTime.name == '') msg = 'Tenés que ponerle un nombre';
      if (msg != '') {
        console.log(msg);
        this.myNotify('warning', 'Alerta', msg);
        return false;
      }
      return true;
    },

    copyEditData() {
      for (let key in this.NewShippingTime) {
        if (typeof this.NewShippingTime[key] == 'undefined') continue;
        this.NewShippingTime[key] = this.ShippingTimeToEdit[key];
      }
    },

    finishAction() {
      if (!this.checkData()) return;
      let Params = this.NewShippingTime;
      Params.isActive = 1;
      console.log(Params);
      if (this.isEditing) {
        console.log(' edito');
        console.log(Params);
        Params.shippingTimeID = Params.id;
        this.$emit('modifyShippingTimeDB', Params);
      } else {
        console.log('no edito');
        this.$emit('addedShippingTime', NewShippingTimeID);
      }
      this.isPromptActiveLocal = false;
    },

    getNewShippingTime() {
      return {
        id:                0,
        // branchID:          this.getBranchID(),
        name:              '',
        timeRangeDefault:  0,
        datetimeCreated:   this.getActualDatetimeToDB(),
        creatorEmployeeID: this.getEmployeeID(),
        isActive:          0,
      }
    },
    loadRoles() {
      let Params = { isActive: 1, }
      this.conectToDB({
        file: 'ShippingTimes', action: 'getShippingTimeRoles', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.allRoles = res.data.data;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
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
