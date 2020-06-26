<script>


    addProductActivityHistory(params) {
      this.conectToDB({
        file: 'NewProduct', action: 'createProductActivityHistory',
        params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Actividad agregada a la historia');
        },
      });
    },

    addProductPriceHistory(Params) {
      this.conectToDB({
        file: 'PriceHistory', action: 'addProductPriceHistory', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Precio agregado a la historia');
        },
      });
    },

    addSupplierUProduct(params) {
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'createSupplierUProduct',
        params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Producto agregado al proveedor');
          vm.addSupplierUProductHistory(params);
        },
      });
    }, // addSupplierUProduct

    addSupplierUProductHistory(params) {
      this.conectToDB({
        file: 'NewProduct', action: 'createSupplierUProductHistory',
        params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Producto agregado al proveedor (historia)');
        },
      });
    }, // addSupplierUProductHistory

    deleteProductDetailsUCategories(params) {
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'deleteProductDetailsUCategories',
        params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Categoría modificada para el producto');
          params.isActive = 0;
          vm.addProductDetailsUCategoriesHistory(params);
        },
      });
    }, // deleteProductDetailsUCategories



    loadProductSupplier(productID) {
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProductSuppliers',
        params: { productID: productID, isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.LoadedSuppliers = vm.renameToLabel(res.data.data);
          vm.SelectedSuppliers = vm.renameToLabel(res.data.data);
        },
      });
    }, // loadProductSupplier

    modifySupplierUProduct(params) {
      this.conectToDB({
        file: 'NewProduct', action: 'modifySupplierUProduct',
        params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Producto modificado en el proveedor');
        },
      });
    }, // modifySupplierUProduct

    updatePrice() {
      const vm = this;
      if (vm.NewProduct.price != vm.LoadedPrice || vm.NewProduct.offert != vm.LoadedOffert) {
        let Params = {
          branchID: this.getBranchID(),
          detailsID: vm.NewProduct.detailsID,
          price: vm.NewProduct.price,
          offert: vm.NewProduct.offert,
        }
        vm.addProductPriceHistory(Params);
      }
    }, // updatePrice

    updateSuppliers() {
      const vm = this;
      // Add new suppliers
      for (let i in vm.SelectedSuppliers) {
        if (vm.SelectedSuppliers[i] == null) continue;
        for (let j in vm.LoadedSuppliers) {
          var isNew = true;
          var isNewPrice = true;
          if (vm.SelectedSuppliers[i].id == vm.LoadedSuppliers[j].id) {
            vm.LoadedSuppliers[j] = null;
            isNew = false;
            if (vm.SelectedSuppliersPrices[i] == vm.LoadedSuppliers[j].price) {
              isNewPrice = false;
            }
          }
        }
        let params = {
          supplierID: vm.SelectedSuppliers[i].id,
          productID: vm.NewProduct.id,
          price: vm.SelectedSuppliersPrices[i],
        }
        if (isNew) {
          vm.addSupplierUProduct(params);
        } else if (isNewPrice) {
          vm.modifySupplierUProduct(params);
        }
      }
      // Remove extra suppliers
      for (let i in vm.LoadedSuppliers) {
        if (vm.LoadedSuppliers[i] == null) continue;
        let params = {
          supplierID: vm.LoadedSuppliers[i].id,
          productID: vm.NewProduct.id,
          isActive: 0,
        }
        vm.modifySupplierUProduct(params);
      }
      vm.LoadedSuppliers = [];
    }, // updateSuppliers



  }, // METHODS
} // EXPORT
</script>
