<template>
  <div>
    <vs-popup :active.sync="isPromptActiveLocal" title="Editar venta">
      <!-- receptionTime -->
      <vs-select class="mx-auto mt-3" label="Tiempo de recepcion" v-model="newSale.receptionTime">
        <vs-select-item :value="(halfhour-1)*30" :text="showRange((halfhour-1)*30)" v-for="halfhour in 48" :key="halfhour" />
      </vs-select>
      <!-- receptionDate -->
      <vs-input class="mx-auto mt-3" label="Fecha de recepcion" v-model="newSale.receptionDate" type="date"/>
      <!-- paymentPrediction -->
      <vs-input class="mx-auto mt-3" label="Prediccion de pago" v-model="newSale.paymentPrediction"/>
      <!-- paymentTypeID -->
      <div class="mx-auto mt-3 vs-component vs-con-input-label vs-input vs-input-primary">
        <label class="vs-input--label">Tipo de pago</label>
        <vs-row>
          <vs-col vs-w="12" v-for="PaymentType in allSalePaymentTypes" :key="`paymentType${PaymentType.id}`">
            <vs-radio v-model="newSale.paymentTypeID" vs-name="paymentType"
            :vs-value="PaymentType.id">{{ PaymentType.name }}</vs-radio>
          </vs-col>
        </vs-row>
      </div>

      <PromptButtons @accept="finishEdit" @cancel="isPromptActiveLocal = false;"/>
    </vs-popup>
  </div>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    Sale: { type: Object, required: true, },
  }, // PROPS

  data() {
    return {
      newSale: {},
      allSalePaymentTypes: [{id: 1}, {id:2}],
    }
  }, // DATA

  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        if (!val) this.$emit('closePrompt');
      }
    },
  }, // COMPUTED

  watch: {
    allSalePaymentTypes(val) {
      console.log(val);
    }
  }, // WATCH

  mounted() {
    // set allSalePaymentTypes
    let Params = { vm: this, val: 'allSalePaymentTypes', }
    this.$store.dispatch('globalMethods/loadAllSalePaymentTypes', Params);
  },

  methods: {
    finishEdit() {
      try {
        let Params = {
          saleID: this.newSale.id,
          receptionTime: this.newSale.receptionTime,
          receptionDate: this.newSale.receptionDate,
          paymentPrediction: this.newSale.paymentPrediction,
          paymentTypeID: this.newSale.paymentTypeID,
        };
        // console.log("NewSale:", this.newSale.paymentTypeID)
        // console.log("Sale:", this.Sale.paymentTypeID)
        this.updateSale()
        this.$emit('modifySale', Params);
        this.myNotify('success', 'Exíto', 'Venta modificada!')
        // console.log("NewSale:", this.newSale.paymentTypeID)
        // console.log("Sale:", this.Sale.paymentTypeID)
      } catch (error) {
        this.myNotify('danger', 'Error', 'Un error ha ocurrido!')
        // console.log(error)
      }
      this.isPromptActiveLocal = false;
    },
    updateSale() {
      // Actualiza la data de Sale sin hacer un request a la API
      this.Sale.receptionTime = this.newSale.receptionTime
      this.Sale.receptionDate = this.newSale.receptionDate
      this.Sale.paymentPrediction = this.newSale.paymentPrediction
      this.Sale.paymentTypeID = this.newSale.paymentTypeID
    }
  },
  updated() {
    //Deslinkea newSale con Sale
    if (this.newSale.id != this.Sale.id) {
      this.newSale = {
        ...this.Sale
      }
    }
  },
} // export default
</script>

<style lang="css" scoped>

</style>
