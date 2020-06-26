<template>
  <div>
    <form @submit.prevent="sendCode()" class="centerx">
      <vs-input
        placeholder="Codigo de barras"
        label="Codigo de barras"
        v-model="code"
        ref="barcode"
        autofocus
        class="my-4"
      />
      <vs-input label="Cantidad" v-model="quantity" class="my-4" />
      <vs-button color="primary" @click="sendCode()">Agregar</vs-button>
    </form>
    <!-- Codigo: {{code}} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: null,
      quantity: 1
    };
  },
  methods: {
    sendCode() {
      this.code = String(this.code);
      if (this.quantity < 1) this.quantity = 1;
      // El codigo se podria ingresar manual o leido con el lector y se guarda en el state "code"
      this.$emit("add-product", { code: this.code, quantity: this.quantity });
      this.code = null;
      this.quantity = 1;
    }
  }
};
</script>

<style>
</style>