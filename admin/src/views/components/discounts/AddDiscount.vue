<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  :title="isEditing ? 'Editar descuento' : 'Crear descuento'">
    <div class="">

      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="12">
          <vs-input label="Nombre" v-model="NewDiscount.name" class="inputLine"/>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6" class="text-center">
          <div class="w-full" style="padding-top: 20px;">
            Tipo de descuento
            <font-awesome-icon icon="arrow-right"/>
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <div class="w-full" style="margin-top: 10px;">
            <rs-switch-options
            v-model="selectedOptionID"
            :options="[ { id: 1, name: 'Valor', }, { id: 2, name: 'Porcentaje', }, ]"
            />
          </div>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="12" v-if="selectedOptionID == 1" type="number">
          <vs-input label="Descuento en pesos" v-model="NewDiscount.discountAmount"
          min="0" type="number" class="inputLine"/>
        </vs-col>

        <!-- <font-awesome-icon :icon="['far', 'file-word']"/> -->

        <template v-if="selectedOptionID == 2">
          <vs-col vs-type="flex" vs-w="6">
            <vs-input label="Descuento en porcentaje" v-model="NewDiscount.discountPercentaje"
            @input="inputPercentaje(NewDiscount, 'discountPercentaje')"
            icon-pack="fas" val-icon-pack="fas" icon="percent"
            min="0" max="100" type="number" class="inputLine"/>
          </vs-col>
          <vs-col vs-type="flex" vs-w="6">
            <vs-input label="Descuento máximo" v-model="NewDiscount.discountPercentajeMax"
            min="0" type="number" class="inputLine"/>
          </vs-col>
        </template>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="6">
          <vs-checkbox v-model="hasStartDate" class="checkboxDate">
            <span v-if="!hasStartDate">Fecha de inicio</span>
          </vs-checkbox>
          <vs-input v-if="hasStartDate" label="Fecha inicio"
          v-model="NewDiscount.datetimeStart" class="inputLine"/>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6">
          <vs-checkbox v-model="hasEndDate" class="checkboxDate">
            <span v-if="!hasEndDate">Fecha de finalización</span>
          </vs-checkbox>
          <vs-input v-if="hasEndDate" label="Fecha finalización" v-model="NewDiscount.datetimeEnd" class="inputLine"/>
        </vs-col>
      </vs-row>
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-w="12" class="textarea">
          <vs-textarea placeholder="Descripción" v-model="NewDiscount.description"/>
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
    DiscountToEdit: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      hasStartDate: false,
      hasEndDate: false,
      selectedOptionID: 1,
      NewDiscount: {},
      allRoles: [],
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
          // new discount
          this.hasStartDate = false;
          this.hasEndDate = false;
          this.NewDiscount = this.getNewDiscount();
          return;
        } else {
          // edit discount
          this.copyEditData();
        }
      }
    },
    selectedOptionID(val) {
      if (val != 1) {
        // 1 = per amount
        this.NewDiscount.discountAmount = 0;
      }
      if (val != 2) {
        // per percentaje
        this.NewDiscount.discountPercentaje = 0;
        this.NewDiscount.discountPercentajeMax = 0;
      }
    },
    'NewDiscount.datetimeStart'(val) {
      if (val == '') this.NewDiscount.datetimeStart = this.emptyDatetime;
    },
    'NewDiscount.datetimeEnd'(val) {
      if (val == '') this.NewDiscount.datetimeEnd = this.emptyDatetime;
    },
    codeLength(val) {
      if (val > 15) this.codeLength = 15;
      if (val <= 3) this.codeLength = 3;
    },
  }, // WATCH

  created() {
  }, // CREATED

  methods: {
    // addDiscount
    // checkData
    // copyEditData
    // finishAction
    // getNewDiscount
    // inputPercentaje
    // inputToNumber
    addDiscount() {
      let Params = this.NewDiscount;
      const vm = this;
      this.conectToDB({
        file: 'Discounts', action: 'addDiscount', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let NewDiscountID = res.data.data;
          vm.$emit('addedDiscount', NewDiscountID);
        }, error: (error) => { vm.myNotify('danger', 'Error', error); },
      });
    },
    checkData() {
      let msg = '';
      if (!this.validateDatetime(this.NewDiscount.datetimeEnd)) msg = 'La fecha de finalización tiene un valor inválido';
      if (!this.validateDatetime(this.NewDiscount.datetimeStart)) msg = 'La fecha de inicio tiene un valor inválido';
      if (this.NewDiscount.datetimeStart != this.emptyDatetime && this.NewDiscount.datetimeEnd != this.emptyDatetime) {
        if (this.NewDiscount.datetimeStart > this.NewDiscount.datetimeEnd) msg = 'La fecha de inicio no puede ser mayor a la de finalización';
      }
      if (this.selectedOptionID == 2) { // per percentaje
        if (this.NewDiscount.discountPercentaje <= 0) msg = 'El descuento tiene que ser mayor al 0%';
        if (this.NewDiscount.discountPercentaje > 100) msg = 'El descuento tiene que ser menor o igual al 100%';
      }
      if (this.selectedOptionID == 1) { // per amount
        if (this.NewDiscount.discountAmount <= 0) msg = 'El descuento tiene que ser mayor a $0';
      }
      if (msg != '') {
        console.log(msg);
        this.myNotify('warning', 'Atención', msg);
        return false;
      }
      return true;
    },

    copyEditData() {
      for (let key in this.NewDiscount) {
        if (typeof this.NewDiscount[key] == 'undefined') continue;
        this.NewDiscount[key] = this.DiscountToEdit[key];
      }
      if (this.DiscountToEdit.discountAmount != 0) {
        // per amount
        this.selectedOptionID = 1;
      } else {
        // per percentaje
        this.selectedOptionID = 2;
      }
      this.hasStartDate = this.NewDiscount.datetimeStart == this.emptyDatetime ? false : true;
      this.hasEndDate   = this.NewDiscount.datetimeEnd   == this.emptyDatetime ? false : true;
    },

    finishAction() {
      if (!this.checkData()) return;
      if (this.isEditing) {
        let Params = this.NewDiscount;
        Params.discountID = Params.id;
        this.$emit('modifyDiscountDB', Params);
      } else {
        this.addDiscount();
      }
      this.isPromptActiveLocal = false;
    },

    getNewDiscount() {
      return {
        id:                   0,
        branchID:             this.getBranchID(),
        name:                 '',
        avaibleUses:           1,
        discountAmount:        0,
        discountPercentaje:    0,
        discountPercentajeMax: 0,
        code:                  '',
        buyerID:               0,
        buyer:                 '',
        description:           '',
        discountOverID:        3,
        datetimeCreated:       this.getActualDatetimeToDB(),
        datetimeStart:         this.emptyDatetime,
        datetimeEnd:           this.emptyDatetime,
        isActive:              1,
      }
    },

    inputPercentaje(obj, key) {
      this.inputToNumber(obj, key);
      if (obj[key] > 100) obj[key] = 100;
      if (obj[key] < 0) obj[key] = 0;
    },

    inputToNumber(obj, key) {
      obj[key] = +obj[key];
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
  .codeGeneratorIcon {
    padding-left: 16px !important;
    margin-top: 26px;
  }
  .checkboxDate {
    /* height: 25px; */
    margin-top: 25px;
  }
</style>
