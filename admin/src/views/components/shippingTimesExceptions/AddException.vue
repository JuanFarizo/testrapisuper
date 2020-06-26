<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  :title="isEditing ? 'Editar excepción' : 'Crear excepción'">
    <div class="mainContainer">
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="12">
          <vs-input label="Nombre *" v-model="NewException.name" class="inputLine"/>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-input type="date" label="Fecha" v-model="NewException.date" class="inputLine"/>
        </vs-col>
        <vs-col vs-w="6">
          <div class="inputLine">
            <label class="labelVselect">Horario de envío</label>
            <v-select v-model="NewException.shippingTimeID" class="vSelect"
            :options="allShippingTimes" label="name" :reduce="ShippingTime => ShippingTime.id"/>
          </div>
        </vs-col>
      </vs-row>

    </div>
    <PromptButtons @accept="finishAction" @cancel="isPromptActiveLocal = false;"/>
  </vs-popup>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    isEditing: { type: Boolean, required: true, },
    ExceptionToEdit: { type: Object, required: true, },
    allExceptions: { type: Array, required: true, },
  }, // PROPS
  data() {
    return {
      NewException: {},
      allShippingTimes: [],
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
          // new exception
          this.NewException = this.getNewException();
        } else {
          // edit exception
          this.copyEditData();
        }
      }
    },
  },

  created() {
    this.loadShippingTimes();
  },

  methods: {
    // addException
    // checkData
    // copyEditData
    // finishAction
    // getNewException
    // loadShippingTimes
    addException() {
      let Params = this.NewException;
      this.conectToDB({
        file: 'ShippingTimesExceptions', action: 'addException', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let NewExceptionID = res.data.data;
          this.$emit('addedException', NewExceptionID);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    checkData() {
      let msg = '';
      // if (this.NewException.date < this.getActualDateToDB()) msg = 'La fecha no puede haber pasado';
      if (this.NewException.date == this.emptyDate) msg = 'Tenés que elegir una fecha';
      if (this.NewException.name == '') msg = 'Tenés que ponerle un nombre';
      if (this.NewException.shippinTimeID == null) this.NewException.shippinTimeID = 0;
      console.log(this.allExceptions);
      let index = this.allExceptions.findIndex(i => i.date == this.NewException.date);
      if (index != -1) msg = 'Ya hay una excepción para esa fecha';
      if (msg != '') {
        this.myNotify('warning', 'Atención', msg);
        return false;
      }
      return true;
    },

    copyEditData() {
      for (let key in this.NewException) {
        if (typeof this.NewException[key] == 'undefined') continue;
        this.NewException[key] = this.ExceptionToEdit[key];
      }
    },

    finishAction() {
      if (!this.checkData()) return;
      let Params = this.NewException;
      if (this.isEditing) {
        Params.exceptionID = Params.id;
        this.$emit('modifyExceptionDB', Params);
      } else {
        this.addException();
      }
      this.isPromptActiveLocal = false;
    },

    getNewException() {
      return {
        id:                0,
        branchID:          this.getBranchID(),
        name:              '',
        date:              '',
        shippingTimeID:    0,
        creatorEmployeeID: this.getEmployeeID(),
        isActive:          1,
      }
    },
    loadShippingTimes() {
      let Params = { isActive: 1, }
      this.conectToDB({
        file: 'ShippingTimes', action: 'getShippingTime', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allShippingTimes = res.data.data;
          let closed = { id: 0, name: 'Cerrado', }
          allShippingTimes.unshift(closed);
          this.allShippingTimes = allShippingTimes;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
  }, // METHODS

} // export default
</script>

<style lang="css" scoped>

  .mainContainer {
    padding-top: 50px;
    padding-bottom: 150px;
  }
  .inputLine {
    margin-top: 5px;
    width: 100%;
  }

</style>
