export const productsMixin = {
  data(){ return {
    allBrands: [],
    allSubcategories: [],
    totalProductsShowed: 0,
  };}, // DATA
  computed: {
    isFilterUsed() {
      if (this.Query.Brand.id != 0) return true;
      if (this.Query.Category.id != 0) return true;
      if (this.Query.search != '') return true;
      return false;
    },
  }, // COMPUTED
  methods: {
    // GET DATA
      // getEmptyQuery
    // FILTER
      // filterBrands
      // filterCategory
      // filterPrice
      // filterSearchLocal
      // checkSearchTimer
      // checkRedirectionToCatalogue
      // filterProducts
      // resetFilter
      // updateCategoryBreadcrumbs
      // updateSubcategories
    // calculateCategoriesAmount
    // hideProduct
    // LOAD
      // loadBrands
      // loadCategories
      // loadCategoriesProducts
      // loadProducts
    // MISC
      // managePagination

    calculateCategoriesAmount() {
      for (let Brand of this.allBrands) {
        Brand.amount = 0;
        for (let ProdOfBranch of this._allProductsOfBranch) {
          if (ProdOfBranch.brandID == Brand.id && !ProdOfBranch.isHidden) {
            Brand.amount++;
          }
        }
      }
    },
    modifyIsHiddenProduct(Product, value) {
      this.$store.dispatch("products/modifyIsHidden", { productID: Product.productID, isHidden: !value });
    },
    filterBrands(Product){
      // this.resetFilter('brand');
      if (!this.Query.Brand.id) return true;
      if (Product.brandID == this.Query.Brand.id) {
        return true;
      }
      return false;
    },
    filterPrice(Product){
      let realPrice = this.getRealPriceFloat(Product);
      if (realPrice < this.Query.minPrice) {
        return false;
      }
      if (!this.Query.maxPrice) {
        return true
      }
      if (realPrice > +this.Query.maxPrice) {
        return false
      }
      return true;
    },

    filterCategory(){
      if (this.Query.Category.id != 0) {
        this.resetFilter('category');
      }
      let index = this._Categories.findIndex(i => i.id == this.Query.Category.id);
      if (index != -1) {
        for (let ProdOfBranch of this._allProductsOfBranch){
          let show = false;
          for (let detailsID of this._Categories[index].children){
            if (ProdOfBranch.detailsID == detailsID) {
              show = true;
            }
          } // for
          this.$store.dispatch("products/modifyIsHidden", { productID: ProdOfBranch.productID, isHidden: !show });
        } // for
      } // if
      this.finishFilterProducts();
      this.closeLoaderMain();

      // VERSION VIEJA
      // if (!this.Query.categoriesID.length) return true;
      // if (!this._Categories.length) return true;
      //
      // // Extraes la que tenés que comparar
      // for (let selectedCategoryID of this.Query.categoriesID) {
      //   console.log(1);
      //   // Agarras la categoría padre
      //   for (let Category of this._Categories) {
      //     console.log(Category);
      //     // Usás la categoría seleccionada
      //     if (selectedCategoryID == Category.id) {
      //       console.log(3);
      //
      //       // Obtenés la id del details hijo
      //       for (let childDetailsID of Category.children) {
      //         console.log(4);
      //         console.log(Product);
      //         console.log(childDetailsID);
      //
      //
      //         // Comparás que alguno de los hijos de esa category sea nuestro product
      //         if (Product.detailsID == childDetailsID){
      //           console.log(5);
      //           return true;
      //         }
      //       }
      //     }
      //   }
      // }
      // return false;
    },

    filterSearchLocal() {
      let Params = {
        search: this.removeWhiteSpaces(this.Query.search),
        productsArray: this._allProductsOfBranch,
        action: this.modifyIsHiddenProduct,
        finalCallback: this.finishFilterProducts,
      }
      if (Params.search != '') {
        this.resetFilter('search');
      }
      this.filterSearch(Params);
    },


    checkSearchTimer() {
      const search = this.Query.search;
      const vm = this;
      setTimeout(() => {
        if (search == vm.Query.search) {
          vm.finishUpdateURL();
          vm.filterSearchLocal();
        }
      }, this.doneTypingInterval);
    },
    checkRedirectionToCatalogue(search) {
      if (this.$router.currentRoute.name != 'catalogue') {
        this.$router.push({ name: 'catalogue', query: { s: search, }, });
      }
    },

    filterProducts() {
      // for (let Product of this._allProductsOfBranch){
      //   this.$store.dispatch("products/modifyIsHidden", { productID: Product.id, isHidden: false });
      // } // for

      if (this.Query.search) {
        this.filterSearchLocal();
      }
      if (this.Query.Category.id != 0) {
        this.filterCategory();
      }
      this.finishFilterProducts();
    },

    finishFilterProducts() {
      // update pagination

      if (this.totalProductsShowed < this.itemsPerPage * this.currentPage) {
        this.$store.dispatch("products/updateCurrentPage", 1);
      }
      this.managePagination();
      this.calculateCategoriesAmount();
    },
    resetFilter(notReset = '') {
      // Brands
      // if (notReset != 'brand') {
      //   if ()
      //   this.calculateCategoriesAmount();
      //   for (let Brand of this.allBrands) {
      //     Brand.isSelected = false;
      //   }
      //   this.$store.dispatch('products/updateQueryBrand', 0);
      // }
      // search
      if (notReset != 'search') {
        this.$store.dispatch('products/updateQuerySearch', '');
      }
      // category
      if (notReset != 'category') {
        this.$store.dispatch('products/updateQueryCategory', 0);
      }
      // default
      if (notReset == '') {
        // show alll
        for (let ProdOfBranch of this._allProductsOfBranch) {
          this.$store.dispatch("products/modifyIsHidden", { productID: ProdOfBranch.productID, isHidden: false });
        }
        // url
        this.$router.push({ name: 'catalogue' }).catch((err) => {});
      }
      // page
      this.$store.dispatch("products/updateCurrentPage", 1);
      // sidebar
      // this.toggleFilterSidebar(false);
    },
    updateCategoryBreadcrumbs() {
      this.categoriesBreadCrumbs = [];
      let parentID = this.Query.Category.parentID;
      let counter = 0;
      while (parentID != 0 && counter < 20) {
        counter++;
        for (let Cat of this._Categories) {
          if (Cat.id == parentID) {
            let NewCat = { id: Cat.id, name: Cat.name };
            this.categoriesBreadCrumbs.push(NewCat)
            parentID = Cat.parentID;
            break;
          }
        }
      }
    },
    updateSubcategories() {
      this.allSubcategories = [];
      this.$nextTick(() => {
        for (let Cat of this._Categories) {
          if (Cat.parentID == this.Query.Category.id) {
            let SubCat = {
              id: Cat.id,
              name: Cat.name,
              amount: Cat.children.length,
            }
            this.allSubcategories.push(SubCat);
          }
        }
      }); // next tick (evita que se seleccione automáticamente la subcategoría)
    },
    hideProduct(productID) {
      // Remove
      this.$store.dispatch("products/removeProduct", productID);
      // // Hide
      // this.$store.dispatch("products/modifyIsHidden", { productID: productID, isHidden: true });
    },
    loadBrands() {
      const vm = this;
      this.conectToDB({
        file: 'Brands', action: 'getBrand', params:  { isActive: 1 },
        success: function(res){
          if(!vm.checkDBResponse(res)) return;
          vm.allBrands = res.data.data;
          // console.log(vm.allBrands);
          for (let Brand of vm.allBrands) {
            let value = false;
            if (Brand.id == vm.Query.Brand.id) value = true;
            vm.$set(Brand, 'isSelected', value);
            vm.$set(Brand, 'amount', 0);
          }
          vm.calculateCategoriesAmount();
        }
      });
    },
    loadCategories() {
      const vm = this;
      this.conectToDB({
        file: 'Categories', action: 'getCategory', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let allCategories = res.data.data;
          for (let Cat of allCategories) {
            let Params = {
              id: Cat.id,
              name: Cat.name,
              parentID: Cat.parentID,
            }
            vm.$store.dispatch("products/addCategory", Params);
          }
          vm.loadCategoriesProducts();
        },
      });
    },
    loadCategoriesProducts() {
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getCategoryProducts', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          for (let CatProd of res.data.data) {
            vm.addProdToCat(CatProd);
          }
          vm.$store.dispatch("products/updateQueryCategory", vm.Query.Category.id);
        },
      });
    },
    addProdToCat(CatProd) {
      this.$store.dispatch("products/addCategoryChildren", {
        detailsID: CatProd.productDetailsID,
        categoryID: CatProd.categoryID,
      });
      let index = this._Categories.findIndex(i => i.id == CatProd.categoryID);
      if (index == -1) return;
      if (this._Categories[index].parentID == 0) return;
      let Params = {
        categoryID: this._Categories[index].parentID,
        productDetailsID: CatProd.productDetailsID,
      }
      this.addProdToCat(Params);
    },
    loadProducts() {
      let Params = {
        isActive: 1,
        branchID: this.getBranchID(),
        // orderByNewer: 1,
      };
      if (!this.Buyer.isAdmin) {
        Params.hasPrice = true;
        Params.hasStock = true;
      }
      this.conectToDB({
        file: 'Products', action: 'getProductOfBranch', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          // Carga el _allProductsOfBranch
          let _allProductsOfBranch = res.data.data;
          if (!_allProductsOfBranch.length) {
            this.myNotify('danger', 'Error', 'No hay productos para mostrar');
          }
          for (let ProdOfBranch of _allProductsOfBranch) {
            ProdOfBranch.isHidden     = false;
            ProdOfBranch.isInPage     = false;
            ProdOfBranch.amountInCart = 0;
            ProdOfBranch.categories   = [];
          }
          this.$store.dispatch("products/loadProducts", _allProductsOfBranch);

          for (let ProdOfBranch of _allProductsOfBranch) {
            this.updateAmountInCart(ProdOfBranch.productID);
          }
          this.filterProducts();
          this.orderProductsBy(0);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    orderProductsBy(selectedValue) {
      let list = [];
      switch (selectedValue) {
        // Alphabetic
        case 0: list = this._allProductsOfBranch.concat(); break;
        // case 0: list = this._allProductsOfBranch.concat().sort((a,b)=>(a.fullName > b.fullName ? 1 : -1)); break;
        // Newer
        case 1: list = this._allProductsOfBranch.concat().sort((a,b)=>(a.dateCreated > b.dateCreated ? 1 : -1)); break;
        // +bajo
        case 2: list = this._allProductsOfBranch.concat().sort((a,b)=>(Math.max(a.price, a.offert)<Math.max(b.price, b.offert))?-1:1); break;
        // +alto
        case 3: list = this._allProductsOfBranch.concat().sort((a,b)=>(Math.max(a.price, a.offert)<Math.max(b.price, b.offert))?1:-1); break;
        // Aca se podria definir alguno para 'destacados'
        case 4: list = this._allProductsOfBranch.concat(); break;
      }
      this.$store.dispatch('products/setSortedProducts', list);

      this.managePagination();
    },

    managePagination() {
      let i = 0;
      this.totalProductsShowed = 0;
      let currentPage = this.currentPage || 1;
      let itemsPerPage = this.itemsPerPage || 36;
      let min = (currentPage-1) * itemsPerPage;
      let max =  currentPage    * itemsPerPage;
      for (let ProdOfBranch of this._sortedProducts) {
        if (i >= min && i < max) {
          // Muestra
          this.$store.dispatch("products/addIsInPage", ProdOfBranch.productID);
          this.totalProductsShowed++;
        } else {
          // Oculta
          if (ProdOfBranch.isInPage) {
            this.$store.dispatch("products/removeIsInPage", ProdOfBranch.productID);
          }
        }

        if (!ProdOfBranch.isHidden) {
          i++;
        }
      } // for
    },
  }, // METHODS
} // export default
