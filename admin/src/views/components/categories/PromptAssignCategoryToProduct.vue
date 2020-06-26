<template>
  <div>

    <vs-popup title="Asignar categoría" :active.sync="isPromptActiveLocal">
      <div class="w-full mb-3">
        <div class="imgContainer imgContainer-m mx-auto">
          <img :src="getImgDual(`${Product.id}-1`)" class="mx-auto" style="display: block; max-height: 100%; border-radius: 10px; box-shadow: 0 4px 15px 0 rgba(0,0,0,.1);">
        </div>
      </div>
      <p class="mb-4 text-center">Asignando categoría a <b>{{ Product.fullName }}</b></p>
      <vs-checkbox v-model="Cat.isSelected" v-for="Cat in allCategories"
      @change="addCategoryToProduct(Cat)" class="mb-1 ml-5">
        {{ Cat.name }}
      </vs-checkbox>
      <div class="w-full text-center" style="opacity: 0.5">
        <i>Los cambios se guardan automáticamente</i>
      </div>
    </vs-popup>

  </div>
</template>

<script>
export default {
  props: {
    allProductsCategories: { type: Array, required: true, },
    Product: { type: Object, required: true, },
    allCategories: { type: Array, required: true, },
    isPromptActive: { type: Boolean, required: true, },
  },
  data() {
    return {
    }; // return DATA
  }, // DATA
  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        this.$emit('closePrompt');
      }
    },
  }, // COMPUTED
  created() {
  },
  watch: {
    Product: function() {
      this.checkCategoriesOfProduct();
    },
  }, // WATCH
  created() {

  }, // CREATED
  methods: {
    // addCategoryToProduct
    // checkCategoriesOfProduct
    // filterCategories

    addCategoryToProduct(Cat) {
      let Params = {
        detailsID: this.Product.detailsID,
        categoryID: Cat.id,
      }
      if (Cat.isSelected) {
        const vm = this;
        this.conectToDB({
          file: 'NewProduct', action: 'createProductDetailsUCategories', params: Params,
          success: function(res){
            if (res.data.error) { console.log(res.data.data); return; }
          },
        });
      } else {
        Params.isActive = 0;
        const vm = this;
        this.conectToDB({
          file: 'NewProduct', action: 'deleteProductDetailsUCategories', params: Params,
          success: function(res){
            if (res.data.error) { console.log(res.data.data); return; }
          },
        });
      }
    },
    checkCategoriesOfProduct() {
      // all checkbox to false
      for (var i = 0; i < this.allCategories.length; i++) {
        this.$set(this.allCategories[i], 'isSelected', false);
      }
      // selected checkbox to true
      for (let ProdCat of this.allProductsCategories) {
        if (ProdCat.productDetailsID == this.Product.detailsID) {
          const index = this.allCategories.findIndex((i) => i.id == ProdCat.categoryID);
          if (index != -1) this.allCategories[index].isSelected = true;
        }
      }
    },

  }, // METHODS
}
</script>

<style lang="css" scoped>
</style>
