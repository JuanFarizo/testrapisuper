export default {
  methods: {
    getQueryMain() {
      let Query = this.$route.query;
      // GENERAL
      // isAdmin
      if (Query.isAdmin) {
        this.$store.dispatch('buyer/modifyIsAdmin', true);
      }
      // isTesterAdmin
      if (Query.isTesterAdmin) {
        this.$store.dispatch('buyer/modifyIsAdmin', true);
        this.$store.dispatch('buyer/modifyIsTester', true);
      }
      // isTester
      if (Query.isTester) {
        this.$store.dispatch('buyer/modifyIsTester', true);
      }
      // sellerID
      for (let Employee of this._allEmployees) {
        if (Query.sellerID == Employee.id) {
          this.$store.dispatch('buyer/modifyIsAdmin', true);
          // if (tab == 1) {
            this.$store.dispatch('cart/modifySeller', this.getEmployeeInfo(Query.sellerID));
            this.$store.dispatch('cart/modifySaleTypeID', this._localDB.SaleTypeIDs.saleInPlace);
          // }
        }
        if (Query.sellerID == 1) {
          this.$store.dispatch('buyer/modifyIsTester', true);
        }
      }
      // Search
      if (Query.s) {
        this.$store.dispatch('products/updateQuerySearch', Query.s);
      }
      // Category
      this.$store.dispatch('products/updateQueryCategory', Query.cat || 0);
      // Brand
      // if (Query.b) {
      //   this.$store.dispatch('products/updateQueryBrand', Query.b);
      // }

      // SPECIALS
      switch (this.$route.name) {
        case 'cart':
          // tab
          let tab = typeof Query.tab == 'undefined' ? 1 : +Query.tab;
          if (0 >= tab || 4 <= tab) return;
          this.actualTab = tab;
          if (this.reloaded) {
            this.reloaded = false;
            this.finishUpdateURL(1);
          }
          break; // cart
        case 'catalogue':
          // Page
          // if (Query.p) {
          //   this.$store.dispatch('products/updateCurrentPage', +Query.p);
          // }
          break; // catalogue
      }
    },
    finishUpdateURL(Params = {}) {
      // return;
      var Query = {};
      let routeName = '';
      // GENERAL
      let MyQuery = this.Query;
      // sellerID
      if (this.Cart.Seller.id) {
        Query.sellerID = this.Cart.Seller.id;
      }
      // isAdmin
      if (!Query.sellerID) {
        if (this.Buyer.isTester) {
          if (this.Buyer.isAdmin) {
            Query.isTesterAdmin = true;
          } else {
            Query.isTester = true;
          }
        } else if (this.Buyer.isAdmin) {
          Query.isAdmin = true;
        }
      }


      // SPECIALS
      switch (this.$route.name) {
        case 'cart':
          if (Params.tab != 1) Query.tab = Params.tab;
          break;
        case 'catalogue':
          // Search
          if (MyQuery.search) {
            Query.s = MyQuery.search;
          }
          // Category
          if (MyQuery.Category.id) {
            Query.cat = MyQuery.Category.id;
          }
          // Brand
          if (MyQuery.Brand.id) {
            Query.b = MyQuery.Brand.id;
          }
          // Current page
          if (this.currentPage != 1) {
            Query.p = this.currentPage;
          }
          // isAdmin
          // if (this.Buyer.isAdmin && this.currentPage != 1) {
          //   this.loadProducts();
          // }
          break; // catalogue
      }
      // FINISH
      let newRoute = { query: Query, }
      if (routeName) {
        newRoute.name = routeName;
      }
      this.$router.push(newRoute).catch((err) => {});
    },
  }, // METHODS
}
