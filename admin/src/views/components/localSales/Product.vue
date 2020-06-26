<template>
  <vs-card>
    <template slot="header">
      <h3 class="text-center">{{product.product.name}}{{product.product.fullName}}</h3>

      <vs-chip color="success" v-if="product.product.detail.offert">Oferta!</vs-chip>
    </template>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6" vs-xs="12">
        <img
          style="max-height: 16vh;"
          class="p-1"
          src="https://rapisuper.com.ar/images/catalogue/1313-1.webp"
        />
      </vs-col>
      <vs-col class="text-center" style="align-self: center" vs-w="6" vs-sm="12">
        <vs-row>
          <vs-col>
            <vs-input-number v-model="quantity" :min="1" :step="1" />
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col>
            <p
              style="font-size: 20px"
              class="font-light"
            >(${{product.product.detail.offert || product.product.detail.price}} * {{product.quantity}})</p>

            <p
              style="font-size: 40px"
              class="font-bold"
            >${{(product.product.detail.offert || product.product.detail.price)*product.quantity}}</p>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <template slot="footer">
      <vs-button color="danger" size="small" @click="deleteProduct()">X</vs-button>
    </template>
  </vs-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      quantity: 1
    };
  },
  watch: {
    quantity() {
      this.updateProduct();
    }
  },

  methods: {
    ...mapActions("localSales", ["productCRUD"]),
    updateProduct() {
      this.productCRUD({
        product: this.product.product,
        quantity: this.quantity
      });
    },
    deleteProduct() {
      this.productCRUD({
        product: this.product.product,
        quantity: 0
      });
    }
  },
  created() {
    console.log(this.product);
  }
};
</script>

<style>
</style>
