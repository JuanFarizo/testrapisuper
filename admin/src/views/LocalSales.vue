<template>
  <vs-container>
    <vs-row class="my-4">
      <vs-col vs-justify="center" vs-align="center">
        <vs-card>
          <template slot="header">
            <h3 class="text-center">Agregar Producto</h3>
          </template>

          <!--USB READER-->
          <UsbReader style="text-align: -webkit-center;" @add-product="addProduct"></UsbReader>

          <!-- Buscador de productos x nombre -->

          <h4 class="text-center mt-5 mb-2">No encontras un producto?</h4>
          <autocomplete
            :search="searchProduct"
            :get-result-value="getProductFullName"
            @submit="searchProductSubmit"
            placeholder="Buscar un producto por nombre"
            style="max-width:300px"
            :debounceTime="500"
            class="mx-auto mb-4"
          ></autocomplete>
        </vs-card>
      </vs-col>
    </vs-row>
    <vs-row class="my-4">
      <vs-col v-for="(product, i) in products" :key="i" vs-lg="4" vs-sm="6" vs-xs="12">
        <Product :product="product"></Product>
      </vs-col>
    </vs-row>
    <vs-row class="my-4">
      <vs-col class="text-center">
        <vs-card id="resumen">
          <template slot="header">
            <h3 class="text-center">Resumen</h3>
          </template>

          <vs-row style="font-size: 15px" class="my-2">
            <vs-col vs-w="6">Nombre de Producto</vs-col>
            <vs-col vs-w="2">Cantidad</vs-col>
            <vs-col vs-w="2">Precio</vs-col>
            <vs-col vs-w="2">Subtotal</vs-col>
          </vs-row>

          <hr />

          <vs-row style="font-size: 15px" class="my-2" v-for="(product, i) in products" :key="i">
            <vs-col vs-w="6">{{product.product.fullName}}</vs-col>
            <vs-col vs-w="2">{{product.quantity}}</vs-col>
            <vs-col vs-w="2">${{product.product.detail.offert || product.product.detail.price}}</vs-col>
            <vs-col
              vs-w="2"
            >${{product.quantity*(product.product.detail.offert || product.product.detail.price)}}</vs-col>
          </vs-row>
          <hr />
          <hr />
          <vs-row style="font-size: 15px" class="font-bold">
            <vs-col vs-w="2" vs-offset="8">
              <p>Total</p>
            </vs-col>
            <vs-col vs-w="2">
              <p>${{total}}</p>
            </vs-col>
          </vs-row>
        </vs-card>
      </vs-col>
    </vs-row>
    <vs-row class="my-4">
      <vs-col class="text-center">
        <vs-button color="success" size="large" @click="confirmSale()">Confirmar venta</vs-button>
      </vs-col>
    </vs-row>
  </vs-container>
</template>

<script>
import UsbReader from '@/views/components/barcode/UsbReader';
import Product from '@/views/components/localSales/Product';

import { mapActions, mapState } from 'vuex';

import printJS from 'print-js';
import Autocomplete from '@trevoreyre/autocomplete-vue';
// Documentacion:  https://www.npmjs.com/package/@trevoreyre/autocomplete

export default {
  components: {
    UsbReader,
    Product,
    Autocomplete
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('localSales', ['products']),
    total() {
      return this.products.reduce((acc, el) => {
        return (
          acc +
          el.quantity * (el.product.detail.offert || el.product.detail.price)
        );
      }, 0);
    }
  },
  methods: {
    ...mapActions('localSales', ['productCRUD', 'resetProducts']),
    addProduct(payload) {
      console.log(payload);
      const code = payload.code;
      const quantity = payload.quantity;
      console.log(code);

      this.$api.get(`products/?barsCode=${code}`).then(res => {
        const payload = {
          quantity: quantity || 1,
          product: res.data.data.data[0]
        };
        this.productCRUD(payload);
      });
    },
    confirmSale() {
      const saleBody = {
        products: this.products,
        brandId: 1, //TODO: Cambiar para futuras brands!,
        saleTypeID: 2
      };
      saleBody.this.$api
        .post('sales/', saleBody)
        .then(res => {
          this.myNotify('success', 'Compra realizada');

          const vm = this;
          printJS({
            printable: 'resumen',
            type: 'html',
            // targetStyles: ["*"], //TODO: VER ESTILOS INDIVIDUALES
            //style: "#boletaImprimible {visibility: visible; height: auto; width: auto;}",
            documentTitle: 'RapiSuper',
            onLoadingStart: function() {},
            onLoadingEnd: function() {
              vm.resetProducts();
            }
          });
        })
        .catch(err => console.log(err.response));
    },
    searchProduct(input) {
      if (input.length < 1) {
        return [];
      }

      return new Promise(resolve => {
        this.$api.get(`products/?fullName[like]=${input}`).then(res => {
          resolve(res.data.data.data);
        });
      });
    },
    getProductFullName(result) {
      return result.fullName;
    },
    searchProductSubmit(result) {
      const payload = {
        quantity: 1,
        product: result
      };
      this.productCRUD(payload);
    }
  }
};
</script>

<style>
</style>