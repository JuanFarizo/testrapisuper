<template>
  <div class="">
    <!-- AGREGAR PRODUCTO -->
    <vs-popup title="Cambiar producto" :active.sync="isPromptActiveLocal">

      <h4 class="subtitle">Pedido</h4>
      <div class="section">
        <div class="flex" style="justify-content: space-between;">
          <div>
              <!-- 1px solid #EEEEEE -->
            <div class="imgContainer imgContainer-original">
              <img :src="getImgDual(`${OriginalProduct.productID}-1`)" alt="">
            </div>
          </div>
          <div class="flex" style="align-items: center;">
            {{ OriginalProduct.fullName }}
          </div>
          <div class="flex" style="align-items: center;">
            ${{ showPrice(OriginalProduct.price) }} x {{ OriginalProduct.amount }}u =
            ${{ showPrice(OriginalProduct.amount * OriginalProduct.price) }}
          </div>
        </div>
        <div class="w-full flex" style="justify-content: space-around; align-items: center;" v-if="OriginalProduct.amount != 1">
          <div>
            ¿Cuántos vas a devolver?
          </div>
          <div>
            <vs-input type="number" v-model="amountToChange" min="1" :max="OriginalProduct.amount"
            style="width: 100px; text-align: center;"/>
          </div>
          <div class="">
            (Quedan {{ OriginalProduct.amount - amountToChange }} en la compra)
          </div>
        </div>
      </div>

      <h4 class="subtitle">Reemplazo</h4>
      <div class="imgContainer imgContainer-reemplazo imgContainer-m">
        <img :src="getImgDual(`${SelectedProduct.id}-1`)">
         <!-- v-if="SelectedProduct.id" -->
      </div>

      <vs-row vs-w="12" v-if="SelectedProduct.id">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6" class="mb-3">
          <div class="mb-2">
            <p>Precio: ${{ showPrice(SelectedProduct.price) }}</p>
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6" class="mb-3">
          <div class="mb-2">
            <p>Stock: {{ SelectedProduct.stock }}</p>
          </div>
        </vs-col>
      </vs-row>

      <vs-row vs-w="12">


        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="9" class="mb-3">

          <vs-select autocomplete class="w-full" label="Producto" v-model="selectedProductIndex">
            <vs-select-item :key="index" :value="index" :text="Prod.fullName" v-for="(Prod,index) in filteredProductList"/>
          </vs-select>

        </vs-col>

        <vs-col vs-type="" vs-w="3" class="mb-3">
          <vs-input class="w-full" type="number" label="Cantidad" variant="primary" v-model="amount" min="1"
          @change="amount = amount <= 1 ? 1 : amount"></vs-input>
        </vs-col>

      </vs-row>


      <div v-if="SelectedProduct.id">
        <h5 class="subtitle">Resumen</h5>
        <div class="summary-less flex" style="justify-content: space-between;">
          <span>- {{ amountToChange }}u x {{ OriginalProduct.fullName }}</span><span>${{ amountToChange * OriginalProduct.price }}</span>
        </div>
        <div class="summary-more flex" style="justify-content: space-between;">
          <span>+ {{ amount }}u x {{ SelectedProduct.fullName }}</span><span>${{ amount * SelectedProduct.price }}</span>
        </div>
        <div class="changeNumber" :class="{ plusChange: totalDiference > 0, minusChange: totalDiference < 0 }">
          ${{ showPrice(totalDiference) }}
        </div>
      </div>

      <div class="w-full">
        <div class="flex" style="flex-direction: row-reverse; margin: 10 0px;">
          <vs-checkbox v-model="keepPrice">Mantener el precio</vs-checkbox>
        </div>
      </div>

      <div class="flex w-full mt-4">
        <vs-button type="border" color="danger" class="mr-2" style="margin-left: auto"
        @click="isPromptActiveLocal = false">
          Cancelar
        </vs-button>
        <vs-button type="border" @click="exchangeProduct()">
        <!-- :disabled="!validateAddProd" -->
          Confirmar
        </vs-button>
      </div>

    </vs-popup>
  </div>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    SelectedSale: { type: Object, required: true, },
    SaleProductsList: { type: Array, required: true, },
    OriginalProduct: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      allProductsOfBranchList: [],
      selectedProductIndex: null,
      amountToChange: 1,
      amount: 1,
      keepPrice: false,
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
          this.selectedProductIndex = null;
        }
      },
    },
    totalDiference: function() {
      return (this.SelectedProduct.price * this.amount - this.OriginalProduct.price * this.amountToChange).toFixed(2);
    },
    // validateAddProd() {
    //   let val1 = this.SelectedProduct.stock >= this.amount
    //   let val2 = this.amount > 0
    // //  console.log(val1, val2, this.amount, this.SelectedProduct.stock)
    //   if(val1 & val2) {return true}
    //   else {return false}
    // },
    filteredProductList() {
      let productOfBranchList = this.allProductsOfBranchList;
      let filteredList = []
      for (let ProdOfBranch of productOfBranchList) {
        let isInList = false;
        for (let SaleProd of this.SaleProductsList) {
          if (ProdOfBranch.productID == SaleProd.productID) isInList = true;
        }
        if (!isInList) {
          filteredList.push(ProdOfBranch);
        }
      }
      return filteredList;
    },
    SelectedProduct() {
      if (this.selectedProductIndex == null) return {};
      return this.allProductsOfBranchList[this.selectedProductIndex];
    },
  }, // COMPUTED

  watch: {
    OriginalProduct(val) {
      this.amountToChange = val.amount;
    },
    isPromptActiveLocal(val) {
      if (!val) return;
      if (!this.allProductsOfBranchList.length) this.loadProducts();
    }
  }, // WATCH

  methods: {
    // loadProducts
    // exchangeProduct
    exchangeProduct() {
      // SACO LOS QUE HAY QUE SACAR
      // let firstParams = {
      //   productID: this.OriginalProduct.productID,
      //   change: -this.amountToChange,
      //   price: this.OriginalProduct.price,
      // }
      // this.$emit('calculateNewTotal', firstParams);
      // let firstParamsToDB = {
      //   saleProdID: this.OriginalProduct.id,
      // }
      let finalAmount = this.OriginalProduct.amount - this.amountToChange;
      // if (finalAmount == 0) { firstParamsToDB.isActive = 0; }
      // else { firstParamsToDB.amount = finalAmount; }
      // this.$emit('modifySaleProductDB', firstParamsToDB);

      // PONGO LOS QUE HAY QUE PONER // El calculateNewTotal se hace auto al terminar
      let secondParamsToDB = {
        productID: this.SelectedProduct.id,
        price: (this.keepPrice ? OriginalProduct.price : this.SelectedProduct.price),
        amount: this.amount,
        relevance: this.SaleProductsList.length+(finalAmount == 0 ? 0 : 1),
      }
      this.$emit('addSaleItemDB', secondParamsToDB);

      // Cierro
      this.isPromptActiveLocal = false
    },
    loadProducts() {
      let Params = {
        branchID: this.getBranchID(),
        isActive: 1,
      }
      this.conectToDB({
        file: 'Products', action: 'getProductOfBranches', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allProductsOfBranchList = res.data.data;
          console.log('allProductsOfBranchList', allProductsOfBranchList);
          this.allProductsOfBranchList = allProductsOfBranchList
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    modifySale() {
      let Params = {
        productsAmount: this.SelectedSale.productsAmount,
        totalTotal: this.SelectedSale.totalTotal,
        totalProducts: this.SelectedSale.totalProducts,
      }
      this.SelectedSale.productsAmount += +this.amount;
      this.SelectedSale.totalTotal += +totalPrice;
      this.SelectedSale.totalProducts += +totalPrice;
      this.modifySaleDB()
    },
  }, // METHODS

} // export default
</script>

<style lang="scss" scoped>
.changeNumber {
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  text-align: center;
  background-color: #7FDBFF;
  color: #004966;
  font-weight: 800;
  border-radius: 30px;
  margin-bottom: 30px;
}
.plusChange {
  background-color: #2ECC40;
  color: #0E3E14;
}
.minusChange {
  background-color: #FF4136;
  color: #800600;
}

.summary-less,
.summary-more {
  font-weight: 600;
}
.summary-less {
  color: #800600;
}
.summary-more {
  color: #0E3E14;
}
.imgContainer-reemplazo {
  margin-top: 25px;
  margin-bottom: 25px;
}
.imgContainer-original {
  display: inline-block;
}
.subtitle {
  /* text-align: center; */
  margin-bottom: 10px;
}
.section {
  margin-bottom: 30px;
  padding: 0 15px;
}
</style>
