<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">

      <!-- <div class="flex">
        <h4 class="sidebarHeaderItem">ASIGNAR PRODUCTOS</h4>
      </div> -->
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>

    <vs-row class="p-6 pb-0 pt-4">
      <vs-col vs-type="flex" vs-w="12">
        <h2>{{ Parent.name }}</h2>
        <span class="ml-5">({{ categoryProductAmount }})</span>
      </vs-col>
    </vs-row>

    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-0 pb-6" :settings="scrollbarSettings">

      <div class="p-6 pt-0">

        <vs-row>
          <vs-col vs-type="flex" vs-w="12">
            <vs-input v-model="search" label="Buscar" class="mt-5 w-full" @input="filterSearchLocal"/>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col vs-type="flex" vs-w="12" class="mt-4">
            <h4>Productos</h4>
          </vs-col>
        </vs-row>

        <vs-row v-for="ProdDetails in allProductsDetails">
          <vs-col vs-type="flex" vs-w="12" class="mt-2" v-if="ProdDetails.isVisible">
            <vs-checkbox v-model="ProdDetails.isSelected" @change="clickCheckbox(ProdDetails)">
              {{ ProdDetails.childName }}
            </vs-checkbox>
          </vs-col>
        </vs-row>

        <div class="fix-SidebarBottom"></div>

      </div>

    </VuePerfectScrollbar>

  </vs-sidebar>
</template>





<!-- - - - - - - - - - - - - - - - SCRIPT - - - - - - - - - - - - - - - -->
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
export default {
  components: {
    VuePerfectScrollbar,
  },
  props: {
    Parent: { type: Object, required: true, },
    isSidebarActive: { type: Boolean, required: true, },
    allProductsCategories: { type: Array, required: true, },
  }, // PROPS
  data() {
    return {
      search: '',
      allProductsDetails: [],
      categoryProductAmount: 0,
      scrollbarSettings: { wheelSpeed: .60, },
    } // return DATA
  }, // DATA
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set() {
        let Params = {
          categoryID: this.Parent.id,
          totalProducts: this.categoryProductAmount,
        }
        this.$emit('closePrompt', Params);
      },
    },
  }, // COMPUTED
  watch: {
    Parent: function() {
      this.resetData();
    },
  }, // WATCH
  created() {
    this.loadProductsDetails();
  }, // CREATED
  methods: {

    // addProductsToCategory
    // addToHistoryDB
    // clickCheckbox
    // close
    // filterSearch
    // finish
    // loadProductsDetails
    // removeProductOfCategory
    // resetData

    addProductsToCategory(ProdDetails) {
      const vm = this;
      let Params = { categoryID: this.Parent.id, detailsID: ProdDetails.id };
      console.log(Params);
      this.conectToDB({
        file: 'NewProduct', action: 'createProductDetailsUCategories', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log(res.data);
          // Add it to DB
          Params.isActive = 1;
          vm.addToHistoryDB(Params);
          // Add it to array
          let Item = {
            id: res.data.data,
            productDetailsID: Params.detailsID,
            categoryID: Params.categoryID,
            isActive: 1,
          }
          vm.allProductsCategories.push(Item);
          vm.resetData();
        },
      });
    },

    addToHistoryDB(Params) {
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'createProductDetailsUCategoriesHistory',
        params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        },
      });
    },

    clickCheckbox(ProdDetails) {
      console.log(ProdDetails);
      // isSelected still is the oposite
      if (ProdDetails.isSelected) {
        this.addProductsToCategory(ProdDetails);
      } else {
        this.removeProductOfCategory(ProdDetails);
      }
    },

    close() {
      this.resetData();
    },

    filterSearchLocal() {
      let Params = {
        search: this.search,
        productsArray: this.allProductsDetails,
        action: this.modifyProductVisibility,
        prop: 'childName',
      }
      this.filterSearch(Params);
    },

    modifyProductVisibility(Product, value) {
      Product.isVisible = value;
    },

    loadProductsDetails() {
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProductDetails',
        params: {  },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allProductsDetails = res.data.data;
          for (let ProdDetails of vm.allProductsDetails) {
            vm.$set(ProdDetails, 'childName', '');
            vm.$set(ProdDetails, 'isVisible', true);
            vm.$set(ProdDetails, 'isSelected', false);

          }
          vm.loadProductsNames();
        },
      });
    },

    loadProductsNames() {
      // Esta función le pone el nombre de algún producto al detalle
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProduct',
        params: { isActive: 1, hasStock: true, },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let Products = res.data.data;
          let listToDelete = [];
          for (let i = 0; i < vm.allProductsDetails.length; i++) {
            let ProdDetails = vm.allProductsDetails[i];
            let childName = '';
            for (let Prod of Products) {
              if (Prod.detailsID == ProdDetails.id) {
                childName = Prod.fullName;
                break;
              }
            }
            // Save product name
            if (childName != '') { ProdDetails.childName = childName; }
            else { listToDelete.push(i); }
          } // for

          // Detelete empty details
          for (var i = 0; i < listToDelete.length; i++) {
            vm.allProductsDetails.splice(+listToDelete[i]-i, 1); // tengo que restarle i por el cambio que se hace en la lista al borrar un item
          }
        },
      });
    },

    removeProductOfCategory(ProdDetails) {
      const vm = this;
      let Params = { categoryID: this.Parent.id, detailsID: ProdDetails.id, isActive: 0 };
      this.conectToDB({
        file: 'NewProduct', action: 'deleteProductDetailsUCategories',
        params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          // Add it to DB
          Params.isActive = 0;
          vm.addToHistoryDB(Params);
          // Remove it of array
          for (var i = 0; i < vm.allProductsCategories.length; i++) {
            let Item = vm.allProductsCategories[i];
            if (Item.categoryID == Params.categoryID && Item.productDetailsID == Params.detailsID) {
              vm.allProductsCategories.splice(i, 1);
            }
          }
          vm.resetData();
        },
      });
    },

    resetData() {
      this.categoryProductAmount = 0;

      console.log('RESET DATA');
      for (let ProdDetails of this.allProductsDetails) {
        ProdDetails.isSelected = false;
        for (let ProdCat of this.allProductsCategories) {
          if (ProdCat.categoryID == this.Parent.id) {
            if (ProdDetails.id == ProdCat.productDetailsID) {
              ProdDetails.isSelected = true;
              this.categoryProductAmount++;
            }
          }
        }
      } // for
    },

  }, // METHODS
} // EXPORT
</script>










<!-- - - - - - - - - - - - - - - - STYLE - - - - - - - - - - - - - - - -->
<style lang="scss" scoped>
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 600px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }

  // Custom
  // Hide number arrows
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
    -moz-appearance:textfield; /* Firefox */
  }
  .noPaddingX {
    padding-left:  0;
    padding-right: 0;
  }
  .noMarginX {
    margin-left:  0;
    margin-right: 0;
  }
  .labelTitle {
    padding-left: 5px;
    font-size: .85rem;
    color: rgba(0,0,0,.7);
    display: block;
  }
  .textarea {
    // border: 1px solid rgba(0, 0, 0, 0.2);
    border: 5px solid red;
  }
  .input {
    height: 37px;
    border-radius: 5px;
  }
  .colLeft {
    padding-left:  0px;
    padding-right: 5px;
  }
  .colRight {
    padding-left: 5px;
    padding-right:  0px;
  }
  .colCenter {
    padding-right: 5px;
    padding-left:  5px;
  }
  .numberInputList {
    margin-top: 9px;
    padding: 10px 0;
  }
  .numberInputList:first-of-type {
    margin-top: 5px;
    margin-bottom: 0px;
  }
  .numberInputRight {
    margin-right: 0;
    margin-left:  5px;
  }
  .numberInputLeft {
    margin-left:  0;
    margin-right: 5px;
  }
  .priceMultiplier {
    width: 100%;
    margin-top: 5px;
    line-height: 43px;
    border-radius: 5px;
    border: 0;
    padding-left: 27px;
    margin-left: 5px;
    background-color: rgb(245, 245, 245);
  }
  .priceMultiplierX {
    position: absolute;
    top: 16px;
    left: 22px;
  }
  .helpInfo {
    text-align: center;
    width: 100%;
    margin-top: 30px;
    opacity: 0.5;
  }
  .loadImgBTN {
    // Para que esté default se puede usar la clase con-input-upload
    background-color: #F5F5F5;
    border-radius: 5px;
    height: 200px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: 1px dashed rgba(0,0,0,.1);
    font-weight: 600;
    cursor: pointer;
  }
  .loadImgBTN:hover {
    border-color: rgba(21, 176, 206, .5); /* 50% of #15B0CE */
  }
  .loadImgBTN:focus {
    // border-color: #15B0CE;
  }
  .deleteImgBTN {
    background-color: rgba(0, 0, 0, .25);
    height: 35px;
    width: 35px;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.1);
    color: white;
    position: absolute !important;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
  .imgPreview {
    width: 100%;
    height: 250px;
  }
  .imgPreview img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
  .sidebarHeaderItemSeparation {
    margin-left: 15px;
    padding-left: 16px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    height: 22px;
  }
  .sidebarHeaderItem {
    margin-left: 0;
  }
  .sidebarHeaderItem,
  .sidebarTitle {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 10px;
  }
}

.scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
}
</style>
