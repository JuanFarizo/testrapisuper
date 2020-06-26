export const products = {
  data() {
    return {
    };
  }, // DATA
  watch: {
  }, // WATCH
  methods: {
    addCategoriesToProductDetailsDB(ParamsOriginal) {
      let Params = this.copyObj(ParamsOriginal);
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'createProductDetailsUCategories', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Categoría agregada al producto', res.data);
          vm.addCategoryToProductDetailsHistoryDB(Params);
        },
      });
    }, // addCategoriesToProductDetailsDB

    addCategoryToProductDetailsHistoryDB(Params) {
      this.conectToDB({
        file: 'NewProduct', action: 'createProductDetailsUCategoriesHistory', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Categoría agregada al producto history', res.data);
        },
      });
    }, // addCategoryToProductDetailsHistoryDB

  }, // METHODS
} // export default
