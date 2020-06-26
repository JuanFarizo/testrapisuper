<template>
  <vs-popup
    title='Editar stock'
    :active.sync="isPromptActiveLocal"
  >
  <div v-if="!ProductOfBranch.hasInfiniteStock" class="con-exemple-prompt">

      <div v-if="!isLoaded">
        <div class="centerx example-loading">
          <div class="fill-row-loading">
            <div :class="{'activeLoading':activeLoading}" :id="[`loading-sound`]"
            class="vs-con-loading__container loading-example">
            </div>
          </div>
        </div>
      </div>

      <div v-else class="w-full" style="position: relative;">
        <h4 class="title">Stock de <b>{{ ProductOfBranch.fullName }}</b></h4>
        <div class="modifyStockBtnGroup">
          <div class="modifyStockBtn" @click="modifyStock(-1); selectInput();">
            <font-awesome-icon icon="minus"/>
          </div>
          <div class="stockNum unselectable">
            <input type="number" v-model="newStock"
            @keyup.enter="finishModifyStock"
            ref="inputNewStock" @click="selectInput">
          </div>
          <div class="modifyStockBtn" @click="modifyStock(+1); selectInput();">
            <font-awesome-icon icon="plus"/>
          </div>
        </div>
        <!-- modifiedAmount -->
        <div class="unselectable" style="white-space: nowrap;"
        :class="{modifiedAmountLess: modifiedAmount < 0,  modifiedAmountMore: modifiedAmount > 0, modifiedAmountZero: modifiedAmount == 0}">
          {{ modifiedAmount < 0 ? '-' : '+' }}
          <span>{{ modifiedAmount* (modifiedAmount < 0 ? -1 : 1) }}</span>
        </div>
        <div class="flex" style="position: relative;">

          <span class="textAlert">Alerta:</span>
          <vs-input v-model="ProductOfBranch.stockAlert" type="number" class="inputStockAlert"/>
          <span v-if="ProductOfBranch.uxb" class="textUxb">
            (uxb: {{ ProductOfBranch.uxb }})
          </span>
        </div>

        <div style="width: 80%; margin: 0 auto;">
          <vs-divider/>
        </div>

        <div class="flex">
          <div style="width: 50%">
            <h4 class="text-center mb-1 unselectable">Motivo</h4>
            <vs-select class="reason" v-model="selectedReasonID" color="#15B0CE">
              <vs-select-item :value="Reason.id" :text="Reason.reason" v-for="Reason in Reasons" />
            </vs-select>
          </div>
          <div style="width: 50%">
            <h4 class="text-center mb-1 unselectable">Detalles</h4>
            <vs-input class="notes" v-model="notes"/>
          </div>
        </div>
      </div>

      <PromptButtons
      @accept="finishModifyStock()"
      @cancel="isPromptActiveLocal = false"
      />

    </div> <!-- no hasInfiniteStock -->


    <div v-else> <!-- hasInfiniteStock -->
      <h4 class="title">Stock de <b>{{ ProductOfBranch.fullName }}</b></h4>

      <div class="imgContainer"
      style="margin-left: auto;
        margin-right: auto;
        margin-bottom: 15px;">
        <img :src="getImgDual(`${ProductOfBranch.productID}-1`)">
      </div>

      <p class="text-center">
        Este producto tiene stock infinito
        <font-awesome-icon icon="infinity"/>
      </p>
      <div class="mt-5">
        <vs-checkbox v-model="pickUpPlaceHasStockLocal"
        style="margin-left: auto;
          margin-right: auto;
          width: 200px;">
          El proveedor tiene stock
        </vs-checkbox>
      </div>

      <PromptButtons
      @accept="finishModifyStockInfinite()"
      @cancel="isPromptActiveLocal = false"
      />

    </div>



  </vs-popup>
</template>




<script>
export default {
  props: {
    productOfBranchID: { type: Number, required: true, },
    isPromptActive: { type: Boolean, required: true, },
  },
  data() {
    return {
      isLoaded: false,
      notes: '',
      modifiedAmount: 0,
      selectedReasonID: 0,
      Reasons: [],

      ProductOfBranch: {},

      types:[
        'default',
        'point',
        'radius',
        'corners',
        'border',
        'sound',
        'material',
      ],
      activeLoading:false,
    };
  }, // DATA


  mounted(){
      this.$vs.loading({
        container: `#loading-sound`,
        type: 'sound',
        text: 'Cargando...'
      });
  },

  computed: {
    newStock: {
      get() {
        return this.ProductOfBranch.stock + this.modifiedAmount;
      },
      set(newVal, oldVal) {
        this.modifiedAmount = newVal - this.ProductOfBranch.stock;
      }
    },
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        if (!val) this.$emit('closePrompt');
      },
    },
  }, // COMPUTED
  watch: {
    // modifiedAmount: function(val) {
    //   console.log(val);
    // },
    // selectedReasonID: function(val) {
    //   console.log(val);
    // },
    isPromptActiveLocal(val) {
      if (val) {
        if (this.ProductOfBranch.hasInfiniteStock) {
          this.pickUpPlaceHasStockLocal = this.ProductOfBranch.pickUpPlaceHasStock;
        } else {
          this.loadProductOfBanch();
          this.resetData();
        }
        // open loader
        this.$vs.loading({
          container: `#loading-sound`,
          type: 'sound',
          text: 'Cargando...'
        });
      } // val == true
      else {
        this.isLoaded = false;
      }
    },
  }, // WATCH
  created() {
    this.loadReasons();
  },
  methods: {
    // checkIsComplete
    // finishModifyStock
    // finishModifyStockInfinite
    // loadProductOfBanch
    // loadReasons
    // modifyStock
    // selectInput
    // updateStockAlert

    checkIsComplete() {
      let errorMsg = '';
      // if (this.newStock < 0) {
      //   errorMsg = 'El stock no puede ser menor que 0"';
      // }
      // if (this.selectedReasonID == 0) {
      //   errorMsg = 'Falta completar el campo "Motivo"';
      // }
      if (this.selectedReasonID == 4) { // "Otros (detallar)"
        if (this.notes == '') {
          errorMsg = 'Falta completar el campo "Detalles"';
        }
      }
      if (errorMsg) {
        this.myAlert('warning', 'Alerta', errorMsg);
        return false;
      }
      this.isPromptActiveLocal = false;
      return true;
    },

    resetData() {
      this.modifiedAmount = 0;
      this.selectedReasonID = 0;
      this.notes = '';
    },

    finishModifyStock() {
      this.updateStockAlert();
      this.isPromptActiveLocal = false;
      let DomParams = {
        productOfBranchID: this.ProductOfBranch.id,
        newStock: this.newStock,
        newStockAlert: this.ProductOfBranch.stockAlert,
      }
      this.$emit('updateStock', DomParams);
      if (this.modifiedAmount == 0) return;
      if (!this.checkIsComplete()) return;
      // Impacta en DB
      let Params = {
        productID:     this.ProductOfBranch.productID,
        amount:        this.modifiedAmount,
        reasonID:      this.selectedReasonID,
        websiteZoneID: this._localDB.StockChangesWebsiteZoneIDs.stockChangePrompt,
        notes:         this.notes,
      }
      this.updateProductStock(Params);
    },

    finishModifyStockInfinite() {
      // update DOM
      this.ProductOfBranch.pickUpPlaceHasStock = this.pickUpPlaceHasStockLocal;
      this.isPromptActiveLocal = false;
      // update DB
      let Params = {
        productID: this.ProductOfBranch.id,
        pickUpPlaceHasStock: this.pickUpPlaceHasStockLocal,
      }
      this.$emit('modifyProductDB', Params);
    },

    loadProductOfBanch() {
      let Params = {
        productOfBranchID: this.productOfBranchID,
      }
      this.conectToDB({
        file: 'Products', action: 'getProductOfBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.ProductOfBranch = res.data.data[0];
          this.isLoaded = true;
          this.selectInput();
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    loadReasons() {
      this.conectToDB({
        file: 'NewProduct', action: 'getStockChangesReasons', params: {},
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.Reasons = res.data.data;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    modifyStock(change) {
      // if (this.newStock == 0 && change == -1) {
      //   alert('El stock no puede ser menor que 0');
      //   return;
      // }
      this.modifiedAmount += change;
    },

    selectInput() {
      if (this.ProductOfBranch.hasInfiniteStock) return;
      this.$nextTick(() => {
        this.$refs.inputNewStock.select();
      });
    },

    updateStockAlert() {
      let Params = {
        productOfBranchID: this.ProductOfBranch.id,
        stockAlert: this.ProductOfBranch.stockAlert,
        datetimeLastUpdate: this.getActualDatetimeToDB(),
      }
      this.conectToDB({
        file: 'Products', action: 'modifyProductOfBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
  } // METHODS
}
</script>



<style lang="scss" scoped>
  .modifyStockBtnGroup {
    color: #15B0CE;
    border: 1px solid #15B0CE;
    display: inline-block;
    border-radius: 5px;
    overflow: hidden;
    height: 50px;
    text-align: center;
    line-height: 48px;  /* 50 - 2 de borde*/
    display: table;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  .modifyStockBtn {
    width: 50px;
    display: inline-block;
    cursor: pointer;
  }
  .stockNum {
    display: inline-block;
    width: 50px;
    border-left: 1px solid #15B0CE;
    border-right: 1px solid #15B0CE;
  }
  .stockNum input {
    width: 100%;
    border: 0;
    text-align: center;
    height: 47.5px;
    font-size: 17px;
    color: #15B0CE;
    font-weight: bold;
  }
  .modifiedAmountLess span,
  .modifiedAmountLess {
    background-color: #EA5455;
  }
  .modifiedAmountMore span,
  .modifiedAmountMore {
    background-color: #28C76F;
  }
  .modifiedAmountZero span,
  .modifiedAmountZero {
    background-color: #15B0CE;
  }
  .modifiedAmountZero span,
  .modifiedAmountLess span,
  .modifiedAmountMore span {
    border-radius: 10px;
    padding: 2px 0;
    padding-right: 4px;
  }
  .modifiedAmountZero,
  .modifiedAmountLess,
  .modifiedAmountMore {
    font-size: 20px;
    border-radius: 50px;
    height: 50px;
    width: 50px;
    text-align: center;
    padding-top: 9px;
    color: white;
    font-weight: 500;
    top: 0;
    right: 0;
    position: absolute;
  }
  .title {
    text-align: center;
    margin: 0 60px;
    margin-bottom: 15px;
  }
  .notes,
  .reason {
    margin: 0 auto
  }

  .textAlert {
    position: absolute;
    left: 150px;
    top: 9px;
  }
  .inputStockAlert {
    margin-left: auto;
    margin-right: auto;
    width: 152px;
    /deep/ div input {
      text-align: center;
    }
  }
  .textUxb {
    position: absolute;
    left: 370px;
    top: 9px;
  }




















  .fill-row-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .loading-example {
      width: 200px;
      float: left;
      height: 200px;
      box-shadow: 0px 5px 20px 0px rgba(0,0,0,.05);
      border-radius: 10px;
      margin: 8px;
      transition: all .3s ease;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 0px 0px 0px rgba(0,0,0,.05);
        transform: translate(0,4px);
      }
      h4 {
        z-index: 40000;
        position: relative;
        text-align: center;
        padding: 10px;
      }

      &.activeLoading {
        opacity: 0 !important;
        transform: scale(.5);
      }
    }
  }


</style>
