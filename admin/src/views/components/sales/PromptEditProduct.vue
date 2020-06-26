<template>
  <div>





    <vs-popup @cancel="closePrompt" @accept="finishEdit" :active.sync="isPromptActiveLocal" title="Editar producto">

      <div class="mb-3 flex" style="justify-content: space-between;">
        <span>
          {{ Product.fullName }} <b>x{{ Product.amount }}</b>
        </span>
        <span><b>Total:</b> ${{ (Product.price*Product.amount).toFixed(2) }}</span>
      </div>
      <vs-button type="border" class="w-full mb-3" @click="IsPromptActiveInner.editPrice = true">
        <font-awesome-icon icon="dollar-sign"/>
        Cambiar precio
      </vs-button>

      <vs-button type="border" class="w-full mb-3">
        <font-awesome-icon icon="boxes"/>
        Cambiar cantidad
      </vs-button>

      <vs-button type="border" class="w-full mb-3">
        <font-awesome-icon icon="balance-scale"/>
        Cambiar peso
      </vs-button>

      <vs-button type="border" class="w-full mb-3">
        <font-awesome-icon icon="exchange-alt"/>
        Cambiar producto
      </vs-button>


      <prompt-edit-price
      :Prod="Product"
      :isPromptActive="IsPromptActiveInner.editPrice"
      @closePrompt="IsPromptActiveInner.editPrice = false"
      />

    </vs-popup>


  </div>


</template>

<script>
export default {
  components: {
    PromptEditPrice: () => import('./modifyProduct/PromptEditPrice.vue'),
  },
  props: {
    isPromptActive: { type: Boolean, required: true, },
    Product: { type: Object, required: true, },
  }, // PROPS



  data() {
    return {
      IsPromptActiveInner: { editPrice: false, },
    }
  }, // DATA

  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        this.closePrompt();
      }
    },
  }, // COMPUTED

  methods: {
    closePrompt() {
      this.$emit('closePrompt');
    },
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
    },
    updateSale() {
      // Actualiza la data de Sale sin hacer un request a la API
      this.Sale.receptionTime = this.newSale.receptionTime
      this.Sale.receptionDate = this.newSale.receptionDate
      this.Sale.paymentPrediction = this.newSale.paymentPrediction
      this.Sale.paymentTypeID = this.newSale.paymentTypeID
    }
  },
} // export default

</script>

<style lang="css" scoped>

</style>
