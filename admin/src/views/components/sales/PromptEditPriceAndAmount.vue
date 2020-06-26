<template>
  <vs-popup title="Cambiar precio o cantidad" :active.sync="isPromptActiveLocal">
    <div>
      <div class="mb-5">
        <div class="mb-3 text-center">
          <h3>{{ SaleProd.fullName }}</h3>
        </div>
        <div class="imgContainer" style="margin-right: auto; margin-left: auto">
          <img :src="getImgDual(`${SaleProd.productID}-1`)">
        </div>
        <!-- <div>
          <p class="help">Modificar los valores de "precio nuevo"</p>
        </div> -->
      </div>
      <vs-table :data="[SaleProd]">
        <template slot="thead">
          <vs-th></vs-th>
          <vs-th>
            <div class="text-center w-full">Cantidad</div>
          </vs-th>
          <vs-th>
            <div class="text-center w-full">Precio unitario</div>
          </vs-th>
          <vs-th>
            <div class="text-center w-full">Precio total</div>
          </vs-th>
          <vs-th>
            <div class="text-center w-full">Porcentaje</div>
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <vs-td>
              <div class="text-right w-full">
                <b>Pedido</b>
              </div>
            </vs-td>
            <vs-td>
              <div class="text-center w-full">{{ SaleProd.amount }} x</div>
            </vs-td>
            <vs-td>
              <div class="text-center w-full">$ {{ SaleProd.price }}</div>
            </vs-td>
            <vs-td>
              <div class="text-center w-full">$ {{ showPrice(SaleProd.price * SaleProd.amount) }}</div>
            </vs-td>
            <vs-td>
              <div class="text-center w-full">100 %</div>
            </vs-td>
          </vs-tr>

          <vs-tr>
            <vs-td>
              <div class="text-right w-full">
                <b>Cambio</b>
              </div>
            </vs-td>
            <vs-td>
              <vs-input type="number" style="width: 80px;" min="0"
              @change="NewProd.amount = NewProd.amount == '' ? 0 : NewProd.amount;
              NewProd.amount = NewProd.amount > 0 ? NewProd.amount : 0;"
              v-model="NewProd.amount" icon="close" icon-after/>
            </vs-td>
            <vs-td>
              <vs-input disabled type="number" style="width: 100px;"
              @change="NewProd.price = showPrice(NewProd.price);"
              v-model="NewProd.price" icon="attach_money"/>
            </vs-td>
            <vs-td>
              <vs-input disabled type="number" style="width: 100px;"
              v-model="newProdTotal" icon="attach_money"/>
            </vs-td>
            <vs-td style="position: relative;">
              <vs-input disabled type="number" style="width: 80px;"
              @change="newProdPercentage = newProdPercentage == '' ? 0 : newProdPercentage"
              v-model="newProdPercentage"/>
              <font-awesome-icon icon="percentage" class="percentageIcon"/>
            </vs-td>
          </vs-tr>

          <vs-tr>
            <vs-td colspan="5">
              <div class="alertPrice" v-if="priceDiference != 0"
              :class="priceDiference < 0 ? 'alertMore': 'alertLess'">
                <div class="text-center">
                  <!-- <font-awesome-icon :icon="priceDiference > 0 ? 'plus' : 'minus'" class="mr-2"/> -->
                  $ {{ Math.abs(priceDiference) }}
                  {{ priceDiference < 0 ? 'sumado!' : 'descontado!' }}
                </div>
              </div>
            </vs-td>
          </vs-tr>
        </template>

      </vs-table>

      <vs-divider/>

      <div class="flex my-3">
        <vs-button type="border" color="danger" style="margin-left: auto;"
        @click="$emit('closePrompt')">
          Cancelar
        </vs-button>
        <vs-button type="filled" class="ml-2"
        @click="finishEdit()">
          Aceptar
        </vs-button>
      </div>


    </div>
  </vs-popup>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    SaleProd: { type: Object, required: true, },
  }, // PROPS
  data() {
    return {
      users: [],
      NewProd: { amount: 0, price: 0, },
    }; // return DATA
  }, // DATA



  computed: {
    arrayProd: function() {
      return [this.SaleProd];
    },
    priceDiference: function() {
      let originalTotal = this.showPrice(this.SaleProd.price * this.SaleProd.amount);
      return this.showPrice(originalTotal - this.newProdTotal);
    },
    newProdTotal: {
      get() {
        return this.showPrice(this.NewProd.price * this.NewProd.amount);
      },
      set(val) {
        this.NewProd.price = this.showPrice(val / this.NewProd.amount);
      }
    },
    newProdPercentage: {
      get() {
        return Math.round(this.NewProd.price / this.SaleProd.price * 100);
      },
      set(val) {
        console.log('cambio'+ val);
      }
    },

    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        this.$emit('closePrompt');
      }
    },
  }, // COMPUTED

  watch: {
    isPromptActiveLocal: function(val) {
      if (val) {
        this.NewProd = {
          amount: this.SaleProd.amount,
          price: this.SaleProd.price,
        }
      }
    },
  }, // WATCH

  methods:  {
    // finishEdit
    finishEdit() {

      // ESTA FUNCIÓN SOLO ESTÁ HECHA PARA CAMBIAR LA CANTIDAD, PERO NO EL PRECIO

      // if (thi.SaleProd.price == NewProd.price && this.SaleProd.amount == NewProd.amount) return;
      // this.SaleProd.amount = this.NewProd.amount;
      // Modify Sale Product DB


      if (this.SaleProd.amount == this.NewProd.amount) return;
      let newAmount = this.NewProd.amount - this.SaleProd.amount;
      // Modify Sale DB
      let Params = {
        productID: this.SaleProd.productID,
        amount: newAmount,
        price: this.SaleProd.price,
        websiteZoneID: this._localDB.StockChangesWebsiteZoneIDs.modifyProductAmount,
      }
      this.$emit('calculateNewTotal', Params);
      // Modify Sale Products
      let Params2 = {
        saleProdID: this.SaleProd.id,
        amount: this.NewProd.amount,
      }
      this.$emit('modifySaleProductDB', Params2);
      // Modify DOM
      this.SaleProd.amount = this.NewProd.amount;
      this.$emit('closePrompt')
    },

  }, // METHODS


} // export default
</script>

<style lang="scss" scoped>

td {
  padding-left: 3px;
  padding-right: 3px;
}

td /deep/ {
  padding-left: 3px;
  padding-right: 3px;
}

/deep/ td {
  padding-left: 3px;
  padding-right: 3px;
}

.percentageIcon {
  position: absolute;
  right: 25px;
  opacity: 0.4;
}








.alertPrice {
  font-size: 18px;
  padding: 12px;
  border-radius: 30px;
  padding: 10px;
  text-align: center;
  color: white;
  width: 100%;
  span {
    display: flex !important;
  }
}
.alertMore {
  background-color: #28C76F;
}
.alertLess {
  background-color: #EA5455;
}
input {
  width: 80px;
  padding-top: 4px;
  border: none;
}
.icon {
  position: absolute;
  top: 4px;
}

.priceInput {
  position: relative;
  input {
    margin-left: 30px;
    padding-left: 15px;
  }
  .icon {
    left: 30px;
  }
}

.percentageInput {
  padding-left: 100px;
  position: relative;
  input {
    margin-left: 25px;
    padding-left: 5px;
    width: 50px;
  }
  .icon {
    left: 120px;
  }
}

.help {
  opacity: 0.6;
  font-style: italic;
  text-align: center;
  margin-top: 15px;
}
</style>
