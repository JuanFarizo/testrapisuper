<template>
  <div class="">
    <!-- AGREGAR PRODUCTO -->
    <vs-popup title="Agregar Producto" :active.sync="isPromptActiveLocal">

      <div class="imgContainer imgContainer-m mx-auto" style="margin-top: 50px;">
        <img :src="getImgDual(`${SelectedProduct ? SelectedProduct.productID : '0' }-1`)">
      </div>

      <div class="flex" style="justify-content: space-around;" v-if="SelectedProduct != null">
        <div class="mb-2">
          <p>Precio unitario: ${{ showPrice(SelectedProduct.price) }}</p>
        </div>
        <div class="mb-2">
          <p>Precio Total: ${{ showPrice(SelectedProduct.price * amount) }}</p>
        </div>
        <div class="mb-2">
          <p>Stock: {{ SelectedProduct.stock }}</p>
        </div>
      </div>

      <vs-row vs-w="12">


        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="9" class="mb-3">

          <div class="w-full">
            <label class="labelVselect">Producto</label>
            <v-select searchable class="w-full" label="fullName" v-model="SelectedProduct"
            :options="filteredProductList"/>
          </div>

        </vs-col>


        <vs-col vs-type="" vs-w="3" class="mb-3">
          <vs-input class="w-full" type="number" label="Cantidad" variant="primary" v-model="amount" min="1"
          @change="amount = amount <= 1 ? 1 : amount"></vs-input>
        </vs-col>

      </vs-row>

      <div>
        <vs-checkbox v-model="showNoStock" class="showNoStockCheckbox">
          Mostrar productos sin stock
        </vs-checkbox>
      </div>


      <div class="helpText" style="margin-top: 15px; margin-top: 275px;">
        * Si no aparece en la lista, ya está en la compra *
      </div>

      <PromptButtons
      @accept="addProduct()"
      @cancel="isPromptActiveLocal = false"
      />

    </vs-popup>
  </div>
</template>

<script>
import vSelect from 'vue-select';
export default {
  components: {
    'v-select': vSelect,
  },
  props: {
    isPromptActive: { type: Boolean, required: true, },
    SelectedSale: { type: Object, required: true, },
    SaleProductsList: { type: Array, required: true, },
  }, // PROPS
  data() {
    return {
      showNoStock: false,
      SelectedProduct: null,
      amount: 1,
      allProductsList: [],
      filteredProductList: [],
    }; // return DATA
  }, // DATA

  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        if (!val) {
          this.$emit('closePrompt');
          this.SelectedProduct = null;
          this.amount = 1;
        }
      }
    },
  }, // COMPUTED

  watch: {
    showNoStock(val) {
      this.loadProducts();
    },
    isPromptActive(val) {
      if (!val) return;
      if (!this.allProductsList.length) {
        this.loadProducts();
      } else {
        this.filterProducts();
      }
    }
  }, // WATCH

  methods: {
    // addProduct
    // filterProducts
    // loadProducts
    addProduct() {
      try {
        let Params = {
          productID: this.SelectedProduct.productID,
          price: this.SelectedProduct.price,
          amount: this.amount,
          relevance: this.SaleProductsList.length+1,
          isAdded: 1,
          websiteZoneID: this._localDB.StockChangesWebsiteZoneIDs.addProduct,
        }
        // Agregar producto a BD y despues a hacer llamada por API para actualizar DOM, ya que tiene una ID
        this.$emit('addSaleItemDB', Params);
      } catch (error) {
        this.myNotify('danger', 'Error', 'Un error ha ocurrido!')
        console.log(error, error.response)
      } finally {
        this.isPromptActiveLocal = false
      }
    },

    filterProducts() {
      let productList = this.allProductsList;
      let filteredList = []
      for (let ProductOfBranch of productList) {
        let isInList = false;
        for (let SaleProd of this.SaleProductsList) {
          if (ProductOfBranch.productID == SaleProd.productID) isInList = true;
        }
        if (!isInList) {
          filteredList.push(ProductOfBranch);
        }
      }
      this.filteredProductList = filteredList;
    },

    loadProducts() {
      let Params = {
        branchID: this.getBranchID(),
        hasStock: !this.showNoStock,
        isActive: 1,
      }
      this.conectToDB({
        file: 'Products', action: 'getProductOfBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allProductsList = res.data.data;
          console.log('allProductsList', allProductsList);
          this.allProductsList = allProductsList;
          this.filterProducts();
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
  }, // METHODS

} // export default
</script>

<style lang="css" scoped>

.imgContainer {
  margin-top: 25px;
  margin-bottom: 25px;
}
.showNoStockCheckbox {
  margin-left: auto;
  /* margin-right: auto; */
  margin-right: 30px;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 225px;
}

</style>
