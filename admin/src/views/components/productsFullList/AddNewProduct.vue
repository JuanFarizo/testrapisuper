<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer
    v-model="isSidebarActiveLocal"
  >

    <AddNewBrand
      :isPromptActive="IsPromptActive.newBrand"
      :AllBrands="allBrands"
      @addedNewBrand="addedNewBrand($event)"
      @closePrompt="IsPromptActive.newBrand = false"
    />

   <!-- <AddNewCategory
      :isPromptActive="IsPromptActive.newCategory"
      :AllCategories="allCategories"
      @addedNewCategory="loadCategories()"
      @closePrompt="IsPromptActive.newCategory = false; isSidebarActiveLocal = true;"
    /> -->

    <!-- <AddNewSupplier
      :isPromptActive="IsPromptActive.newSupplier"
      :AllSuppliers="allSuppliers"
      @addedNewSupplier="addedNewSupplier($event)"
    /> -->


    <div class="mt-6 flex items-center justify-between px-6">
      <div class="flex">
        <h4 class="sidebarHeaderItem">
          <span v-if="editingProduct">MODIFICAR PRODUCTO</span>
          <span v-else>
            <span v-if="NewProduct.detailsID == 0">NUEVO PRODUCTO</span>
            <span v-else>NUEVA VARIEDAD</span>
          </span>
        </h4>
        <div class="sidebarHeaderItemSeparation"></div>
        <vs-checkbox class="sidebarHeaderItem" v-model="doNotClose">No cerrar</vs-checkbox>
      </div>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>

    <vs-row v-if="fullName != ''" class="p-6 pb-0 pt-4">
      <vs-col vs-type="flex" vs-w="12" class="noPaddingX">
        <h2>{{ fullName }}</h2>
      </vs-col>
    </vs-row>

    <vs-divider class="mb-0" v-if="fullName != ''"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-0" :settings="scrollbarSettings">

      <div class="p-6 pt-0">

        <!-- <vs-row>
          <vs-col vs-type="flex" vs-w="12" class="noPaddingX" v-if="NewProduct.detailsID != 0">
            <h5 style="display: block">Otras variantes:</h5>
          </vs-col>
          <vs-col vs-type="flex" vs-w="12" class="noPaddingX" v-if="NewProduct.detailsID != 0" style="margin-top: 10px; margin-bottom: 15px;">
            <ul>
              <li v-for="Sibling in Siblings" :key="'sibling-'+ Sibling.id">
                {{ '- '+ Sibling.fullName }}
              </li>
            </ul>
          </vs-col>
        </vs-row> -->

        <vs-row>
          <!-- Name -->
          <vs-col vs-type="flex" vs-w="12" class="noPaddingX">
            <vs-input v-model="NewProduct.name" label="Nombre" class="mt-5 w-full" />
          </vs-col>
        </vs-row>

        <vs-row>
          <!-- VariantName -->
          <vs-col vs-w="6" class="colLeft">
            <label class="labelTitle mt-2 w-full">Variante</label>
            <vs-input v-model="NewProduct.variantName" class="w-full" />
          </vs-col>
          <!-- Brand -->
          <vs-col vs-w="6" class="colRight">
            <label class="labelTitle mt-2 w-full">Marca</label>
            <v-select v-model="SelectedBrand" :options="allBrands" label="name"></v-select>
          </vs-col>
        </vs-row>

        <vs-row>
          <!-- Category -->
          <!-- <vs-col vs-w="8" class="colLeft">
            <label class="labelTitle mt-2 w-full">Categorías</label>
            <v-select multiple v-model="SelectedCategories":options="allCategories"
            label="name"></v-select>
          </vs-col> -->
          <!-- BarsCode -->
          <!-- <vs-col vs-w="4" class="colRight">
            <label class="labelTitle mt-2 w-full">Código de barras</label>
            <vs-input v-model="NewProduct.barsCode" class="w-full" />
          </vs-col>-->
        </vs-row>

        <!-- SUPPLIERS -->
        <!-- SupplierID -->
        <!-- <vs-row> -->
          <!-- <vs-col vs-w="6" class="colLeft">
            <label class="labelTitle mt-2 w-full">Proveedor</label>
            <v-select v-model="SelectedSuppliers[0]" :options="allSuppliers" label="name"></v-select>
          </vs-col> -->
          <!-- IVA -->
          <!-- <vs-col vs-w="6" class="noPaddingX">
            <vs-input-number label="IVA" v-model="NewProduct.iva" class="numberInputRight" style="padding: 8px; margin-top: 23px;" @focus="$event.target.select()"/>
          </vs-col> -->
          <!-- Buy price -->
          <!-- <vs-col vs-w="6" class="noPaddingX">
            <vs-input-number label="$ compra sin IVA" v-model="NewProduct.noIvaPrice" class="numberInputLeft" style="padding: 8px;" @focus="$event.target.select()"/>
          </vs-col>
          <vs-col vs-w="6" class="noPaddingX">
            <vs-input-number label="$ compra con IVA" v-model="SelectedSuppliersPrices[0]" class="numberInputRight" style="padding: 8px;" @focus="$event.target.select()"/>
          </vs-col> -->
        <!-- </vs-row> -->

        <!-- Description -->
        <!-- <div>
          <label class="labelTitle mt-2 w-full">Descripción</label>
          <vs-textarea class="textarea" v-model="NewProduct.description" />
        </div> -->

        <!-- IMAGES -->
        <vs-row>
          <!-- IMG WEBP-->
          <vs-col vs-type="flex" vs-w="6" class="colLeft">
            <UploadPhoto title=".webp" format="webp" v-model="photoData['webp']"
            :fileName="this.NewProduct.id +'-1'" destinationURL="catalogue"
            />
          </vs-col>
          <vs-col vs-type="flex" vs-w="6" class="colRight">
            <UploadPhoto title=".jpg" format="jpg" v-model="photoData['jpg']"
            :fileName="this.NewProduct.id +'-1'" destinationURL="catalogue/jpg"
            />
          </vs-col>
        </vs-row>




        <!-- EXTRAS -->
        <vs-collapse :type="'border'" class="mt-5" style="padding-bottom: 10px;">
          <vs-collapse-item>
            <div slot="header">Extras</div>

            <vs-checkbox v-model="hasParent" class="mt-2">
              Tiene padre
            </vs-checkbox>

            <!-- HAS PARENT -->
            <vs-row v-if="hasParent" class="mt-2">
              <!-- productParentID -->
              <vs-col vs-type="flex" vs-w="6" class="noPaddingX">
                <v-select v-model="SelectedParent" class="w-full"
                :options="allProducts" label="fullName"></v-select>
              </vs-col>
              <!-- productParentMultiplier -->
              <vs-col vs-type="flex" vs-w="6" class="noPaddingX">
                <vs-input-number label="Multiplicador padre" name="productParentMultiplier"
                v-model="NewProduct.productParentMultiplier" class="w-full" />
              </vs-col>
            </vs-row>

            <vs-divider/>

            <!-- SIN TERMINAR -->

            <vs-row>
              <!-- isActive -->
              <!-- <vs-col vs-type="flex" vs-w="6">
                <vs-checkbox v-model="!NewProduct.isActive" class="mt-2">No publicado</vs-checkbox>
              </vs-col> -->
              <!-- OnlySuppliers -->
              <!-- <vs-col vs-type="flex" vs-w="6">
                <vs-checkbox v-model="NewProduct.onlySuppliers" class="mt-2">Solo proveedores</vs-checkbox>
              </vs-col> -->
            </vs-row>

          </vs-collapse-item>
        </vs-collapse>

        <p class="helpInfo">* En el nombre se pueden usar los valores { marca } { variante } *</p>

      </div>
      <!-- HAY QUE ELIMINAR LO DE precios, el stock y eso -->
      <div class="fix-SidebarBottom"></div>

    </VuePerfectScrollbar>

    <!-- BUTTONS -->
    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-row>
        <!-- Crear -->
        <vs-col vs-type="flex" vs-w="8">
          <vs-button @click="finishAction()" class="w-full">
            <span v-if="editingProduct">Modificar producto</span>
            <span v-else>
              <span v-if="NewProduct.detailsID == 0">Crear producto</span>
              <span v-else>Crear variedad</span>
            </span>
          </vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-w="4">
          <vs-button type="border" class="w-full" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
        </vs-col>
      </vs-row>
    </div>
  </vs-sidebar>
</template>





<!-- - - - - - - - - - - - - - - - SCRIPT - - - - - - - - - - - - - - - -->
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import vSelect from 'vue-select';
export default {
  components: {
    VuePerfectScrollbar,
    'v-select': vSelect,
    AddNewBrand: () => import('../addNew/AddNewBrand.vue'),
    AddNewCategory: () => import('../addNew/AddNewCategory.vue'),
    AddNewSupplier: () => import('../addNew/AddNewSupplier.vue'),
  },
  props: {
    isSidebarActive: { type: Boolean, required: true, },
    allProducts: { type: Array, required: true, },
  },
  data() {
    return {
      IsPromptActive: {
        newBrand: false, newCategory: false, newSupplier: false,
      },
      NewProduct: this.getNewProduct(),
      photoData: { // we will store base64 format of image in this string
        webp: '',
        jpg: '',
      },
      priceMultiplier: 1.3,
      Siblings: [],
      // Logic
      editingProduct: false,
      differentPrice: false,
      hasParent     : false,
      doNotClose    : false,
      // Options
      allBrands: [],
      allCategories: [],
      allSuppliers: [],
      // Selected
      SelectedParent: null,
      SelectedBrand: null,
      SelectedCategories: [],
      SelectedSuppliers: [null],
      SelectedSuppliersPrices: [0],
      // loaded
      LoadedCategories: [],
      LoadedSuppliers: [],
      LoadedPrice: 0,
      LoadedOffert: 0,
      scrollbarSettings: { // perfectscrollbar settings
        // maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
    } // return DATA
  }, // DATA
  created() {
    this.loadBrands();
    this.loadSuppliers();
    this.loadCategories();
    this.getProductID();
  }, // created()
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        this.$emit('modifySidebar', val);
      }
    },
    fullName: function() {
      this.helpFillFullName('marca');
      this.helpFillFullName('variante');
      let Info = {
        title: this.NewProduct.name,
        brand: this.SelectedBrand == null ? '' : this.SelectedBrand.name,
        variantName: this.NewProduct.variantName,
      }
      let value = this.calculateFullName(Info)
      this.NewProduct.fullName = value;
      return value;
    }, // END fullName
    // SelectedSuppliersPrices[0] : {
    //   get() {
    //     return val + val * this.NewProduct.iva;
    //   },
    // }
  },
  watch: {
    priceMultiplier: function() {
      this.NewProduct.price = parseFloat((this.priceMultiplier * this.SelectedSuppliersPrices[0])).toFixed(2);
    },
    SelectedSuppliersPrices: function(val) {
      val[0] = parseFloat(val[0]);
      this.NewProduct.price = parseFloat((this.priceMultiplier * val[0])).toFixed(2);
    },
    'NewProduct.iva': function(val) {
      let notIvaPrice = parseFloat(this.NewProduct.noIvaPrice);
      this.$set(this.SelectedSuppliersPrices, '0', (notIvaPrice + notIvaPrice * val / 100).toFixed(2));
    },
    'NewProduct.noIvaPrice': function(val) {
      val = parseFloat(val);
      this.$set(this.SelectedSuppliersPrices, '0', (val + val * this.NewProduct.iva / 100).toFixed(2));
    },
    differentPrice: function() {
      this.variantPrice = 0;
      if (!this.differentPrice) {
        this.variantPrice  = 0;
        this.variantOffert = 0;
      }
    },
    hasParent: function(val) {
      if (!val) {
        this.SelectedParent = null;
      }
    },
    SelectedParent: function(val) {
      if (val == null) {
        this.NewProduct.productParentID = 0;
        this.NewProduct.productParentMultiplier = 0;
      }
    },
    SelectedBrand: function (Brand) {
      if (Brand == null) {
        this.NewProduct.brandID = 0;
        return;
      };
      if (Brand.id == -1) {
        this.isSidebarActiveLocal = false;
        this.IsPromptActive.newBrand = true;
        this.SelectedBrand = null;
      } else {
        this.NewProduct.brandID = Brand.id;
      }
    },
    SelectedCategories: function (Categories) {
      let amount = Categories.length;
      if (!amount) return;
      if (Categories[amount-1].id == '-1') {
        this.isSidebarActiveLocal = false;
        this.IsPromptActive.newCategory = true;
        this.SelectedCategories.pop();
      }
    },
    SelectedSuppliers: function (Suppliers) {
      let amount = Suppliers.length;
      if (!amount) return;
      if (Suppliers[0] == null) return;
      if (Suppliers[amount-1].id == '-1') {
        this.isSidebarActiveLocal = false;
        this.IsPromptActive.newSupplier = true;
        this.SelectedSuppliers[amount-1] = null;
      }
    },
    'NewProduct.hasInfiniteStock': function(val) {
      this.NewProduct.pickUpPlaceHasStock = val;
      console.log('CAMBIO STOCK INFINITO');
    },
  }, // WATCH
  methods: {
    // PROMPTS
      // addedNewBrand
      // addedNewSupplier
    // ADD PRODUCT
      // addProduct
      // addProductDetails
      // getProductID
      // updateCategories
    // EDIT PRODUCT
      // editProduct
    // helpFillFullName
    // calculateFullName
    // finishAction
    // getNewProduct
    // LOAD
      // loadBrands
      // loadCategories
      // loadSuppliers
      // loadProductCategories
      // loadProductData
      // loadProductDetails
      // loadProductVariant
    // openSidebar
    // resetData

    // PROMPTS - - - - - - - - - -
    addedNewBrand(NewBrand) {
      this.IsPromptActive.newBrand = false;
      this.isSidebarActiveLocal = true;
      this.allBrands.unshift(NewBrand);
      this.SelectedBrand = NewBrand;
    }, // addedNewBrand

    // addedNewSupplier(NewSupplier) {
    //   this.IsPromptActive.newSupplier = false;
    //   this.isSidebarActiveLocal = true;
    //   this.SelectedSuppliers.unshift(NewSupplier);
    //   this.SelectedSuppliers.push(NewSupplier);
    // }, // addedNewSupplier




    // ADD PRODUCT - - - - - - - - - -
    addProduct() {
      var NewProd = this.copyObj(this.NewProduct);
      NewProd.creatorEmployeeID = this.getEmployeeID();
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'createProduct', params: NewProd,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          NewProd.id = res.data.data;
          vm.$emit('addedProduct', NewProd);
          let notifyMsg = `Producto <b>${NewProd.fullName}</b> creado correctamente`;
          console.log(notifyMsg);
          vm.myNotify('success', 'Éxito', notifyMsg);

          // isActive history
          // let Params = {
          //   productID: NewProd.id,
          //   isActive: vm.NewProduct.isActive,
          // }
          // console.log(Params);
        },
      });
    }, // addProduct

    addProductDetails() {
      let Params = this.NewProduct;
      const vm = this;
      let action = this.editingProduct ? 'modifyProductDetails' : 'createProductDetails';
      this.conectToDB({
        file: 'NewProduct', action: 'createProductDetails', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Detalles producto creado');
          vm.NewProduct.detailsID = res.data.data;
          vm.addProduct();
        },
      });
    }, // END addProductDetails

    getProductID() {
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getNextProductID',
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.NewProduct.id = res.data.data[0].newID;
        },
      });
    }, // END getProductID

    updateCategories() {
      const vm = this;
      // Add new categories
      for (let CatSelected of vm.SelectedCategories) {
        let Params = {
          detailsID: vm.NewProduct.detailsID,
          categoryID: CatSelected.key,
        }
        let isNew = true;
        for (let CatLoaded of vm.LoadedCategories) {
          if (CatLoaded == null) continue
          console.log(CatLoaded);
          console.log(CatSelected);
          if (CatLoaded.id == CatSelected.key) {
            console.log('PASE');
            CatLoaded = null;
            isNew = false;
          }
        }
        if (isNew) {
          // vm.addCategoriesToProductDetailsDB(Params);
        }
      } // for SelectedCategories

      return;

      // Remove extra categories
      for (let i in vm.LoadedCategories) {
        if (vm.LoadedCategories[i] == null) continue
        let params = {
          detailsID: vm.NewProduct.detailsID,
          categoryID: vm.LoadedCategories[i].id,
          isActive: 0,
        }
        vm.deleteProductDetailsUCategories(params);
      }
      vm.LoadedCategories = [];
    }, // updateCategories

    // EDIT PRODUCT - - - - - - - - - -
    editProductDetails() {
      let Params = this.NewProduct;
      Params.productID = Params.id;
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'modifyProductDetails', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.editProductVariant();
        },
      });
    }, // END addProductDetails

    editProductVariant() {
      let Params = this.NewProduct;
      Params.productID = Params.id;
      const vm = this;
      this.conectToDB({
        file: 'NewProduct', action: 'modifyProduct', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.$emit('modifiedProduct', Params.id);
          vm.myNotify('success', 'Éxito', 'Producto modificado correctamente');
        },
      });
    },


    helpFillFullName(searchingWord) {
      let title = this.NewProduct.name;
      let charsToDelete = 0;
      if (title.slice(-2) == `{${searchingWord.slice(0, 1)}`) charsToDelete = 2;
      // if (title.slice(-3) == `{ ${searchingWord.slice(0, 1  )}`) charsToDelete = 3; // Si lo hago que detecte con un espacio entre '{' y la letra, al borrar se vuelve a escribir
      if (!charsToDelete) return title;
      this.NewProduct.name = title.slice(0, -charsToDelete)+ `{ ${searchingWord} }`;
    },

    calculateFullName(Info) {
      let title = Info.title;
      let start = title.indexOf('{');
      let end = title.indexOf('}');
      while (start != -1 && end != -1 && start < end) {
        let variableName = title.substring(start+1, end).trim().toLowerCase();
        let variable = '';
        switch (variableName) {
          case 'marca':
          variable = Info.brand;
          break;
          case 'variante':
          variable = Info.variantName;
          break;
          default: variable = '#ERROR#';
        }
        title = title.substring(0, start) + variable + title.substring(end+1, title.length);
        start = title.indexOf('{');
        end = title.indexOf('}');
      }
      return title;
    },
    finishAction() {
      if (this.editingProduct) {
        // Modificar producto
        this.editProductDetails(); // it calls editProductVariant
      } else {
        if (this.NewProduct.detailsID == 0) {
          // Crear producto
          this.addProductDetails();
        } else {
          // Crear variedad
          this.addProduct()
        }
      }

      this.updateCategories();
      // this.addProductActivityHistory(Params);
      // this.updatePrice();
      // this.updateSuppliers();
      // Close
      if (!this.doNotClose) { this.isSidebarActiveLocal = false;
      } else { this.startNewProduct(); }
    },
    getNewProduct() {
      return {
        // Product details
        name: '',
        brandID: 0,
        price: 0,
        offert: 0,
        description: '',
        // Product
        id: 0,
        fullName: '',
        hasInfiniteStock: false,
        pickUpPlaceHasStock: false,
        detailsID: 0,
        variantName: '',
        stock: 0,
        stockAlert: 0,
        variantPrice: 0,
        variantOffert: 0,
        productParentID: 0,
        productParentMultiplier: 0,
        extraDescription: '',
        imagesAmount: 1,
        barsCode: '',
        isActive: true,
        onlySuppliers: false,
        iva: 21.0,
        noIvaPrice: 0.0,
      };
    }, // getNewProduct


    loadBrands() {
      const vm = this;
      this.conectToDB({
        file: 'Brands', action: 'getBrand', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allBrands = res.data.data;
          vm.allBrands.unshift({ id: -1, name: '* Crear nueva marca *'});
        },
      });
    }, // loadBrands

    loadCategories() {
      let Params = { isActive: 1 }
      const vm = this;
      this.conectToDB({
        file: 'Categories', action: 'getCategory', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let allCategories = res.data.data;
          allCategories.unshift({id: -1, name: '* Crear nueva categoría *'});
          for (let Cat of allCategories) {
            Cat.key = Cat.id; // this is to save the ID
            Cat.id = `cat${Cat.id}`; // this is to avoid duplicated key
          }
          vm.allCategories = allCategories;
        },
      });
    }, // loadCategories


    loadSuppliers() {
      let Params = { isActive: 1 }
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'getSupplier', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allSuppliers = res.data.data;
          vm.allSuppliers.unshift({ id: -1, label: '* Crear nuevo proveedor *'});
        },
      });
    }, // loadSuppliers

    loadProductCategories(detailsID) {
      let Params = {
        detailsID: detailsID,
        isActive: 1,
      }
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProductDetailsCategory', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let loadedCategories = res.data.data;
          for (let CatLoaded of loadedCategories) {
            for (let Cat of vm.allCategories) {
              if (Cat.key != CatLoaded.categoryID) continue;
              vm.LoadedCategories.push(Cat);
              vm.SelectedCategories.push(Cat);
            }
          }
        },
      });
    }, // loadProductCategories

    loadProductData(Product) {
      this.loadProductDetails(Product);
      if (this.editingProduct) {
        this.loadProductVariant(Product);
      }
    },

    loadProductDetails(Product) {
      let Params = {
        detailsID: Product.detailsID,
      }
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProductDetails', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          let AllDetails = res.data.data[0];
          // copy data to NewProduct
          for (let prop in AllDetails) {
            if (typeof vm.NewProduct[prop] == 'undefined') continue;
            if (prop == 'id') continue;
            vm.NewProduct[prop] = AllDetails[prop];
          }
          // brand
          let index = vm.allBrands.findIndex(i => i.id == AllDetails.brandID)
          if (index != -1) vm.SelectedBrand = vm.allBrands[index];
          // price
          vm.LoadedPrice = AllDetails.price;
          vm.LoadedOffert = AllDetails.offert;
          vm.loadProductCategories(Params.detailsID);
        },
      });
    }, // loadProductDetails

    loadProductVariant(Product) {
      // Product parent
      if (Product.productParentID) this.hasParent = true;
      for (let Prod of this.allProducts) {
        if (Prod.id != Product.productParentID) continue;
        this.SelectedParent = Prod;
      }
      for (let key in this.NewProduct) {
        if (typeof Product[key] != 'undefined') {
          this.NewProduct[key] = Product[key];
        }
      }
      // Suppliers
      // this.loadProductSupplier(Product.id);
      // img
      this.photoData['webp'] = this.getImg(`catalogue/${Product.id}-1.webp`);
      this.photoData['jpg'] = this.getImg(`catalogue/jpg/${Product.id}-1.jpg`);

      let Params = {
        detailsID: Product.detailsID,
      }
    },

    openSidebar(action = '', params = '') { // this is called by Products list
      this.editingProduct = false;
      if (action == 'new') {
        this.resetData();
        return;
      }
      if (action == 'edit') {
        this.editingProduct = true;
        var Product = params;
      }
      if (action == 'newVariant') {
        var Product = { detailsID: params, }
      }
      this.NewProduct.detailsID = Product.detailsID;
      this.loadProductData(Product);
      let Params = {
        productDetailsID: Product.detailsID,
        isActive: 1,
      }
      const vm = this;
      // loadSiblings
      this.conectToDB({
        file: 'Products', action: 'getProduct', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.Siblings = res.data.data;
        },
      });
    }, // startNewProduct

    resetData() {
      this.NewProduct = this.getNewProduct();
      this.photoData['webp'] = '';
      this.photoData['jpg'] = '';
      this.priceMultiplier = 1.3;
      this.editingProduct = false;
      this.differentPrice = false;
      this.hasParent = false;
      this.Siblings = [];
      // Selected
      this.SelectedParent = null;
      this.SelectedBrand = null;
      this.SelectedCategories = [];
      this.SelectedSuppliers = [];
      this.SelectedSuppliersPrices = [0];
      // loaded
      this.LoadedCategories = [];
      this.LoadedSuppliers = [];
      this.getProductID();
    }, // resetData

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
