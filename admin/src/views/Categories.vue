<template>
  <div class="data-list-container">

    <!-- PROMPTS -->
    <!-- new category -->
    <add-new-category
      :isPromptActive="IsPromptActive.newCategory"
      :AllCategories="Categories"
      @addedNewCategory="addedNewCategory($event)"
      :NewCategory="NewCategory"
      @closePrompt="IsPromptActive.newCategory = false"
    />

    <!-- columns -->
    <columns-manager
      :isPromptActive="IsPromptActive.columnsManager"
      :HideableColumns="HideableColumns"
      :isHidden="isHidden"
      @updatePromptColumns="isHidden = $event;"
      @closePromptColumns="IsPromptActive.columnsManager = false;"
    />

    <!-- add product to category -->
    <add-product-to-category
      :isSidebarActive="IsPromptActive.addProductToCategory"
      :allProductsCategories="allProductsCategories"
      :Parent="AddProductTo"
      @closePrompt="modifyCategoryProducts($event)"
    />

    <list-products-without-category
      :allProductsCategories="allProductsCategories"
      :allCategories="Categories"
      @closePrompt="modifyCategoryProducts($event)"
    />

    <!-- New category to product -->
    <!-- <vs-prompt
      title='Nueva categoría para el producto'
      :active.sync="IsPromptActive.newSupplier"
      @accept="newSupplierEnd"
      accept-text="Agregar"
      cancel-text="Cancelar"
    >
      <div class="con-exemple-prompt">
        <div class="w-full">
          <vs-select label="Proveedor" v-model="NewSupplier.supplierID" class="w-full">
            <vs-select-item :value="Supplier.id" :text="Supplier.name" v-for="Supplier,index in NewSupplier.AllShowedSuppliers" />
          </vs-select>
          <div class="helpMessage">
            * Si no aparece en la lista, ya tiene precio *
          </div>
        </div>
      </div>
    </vs-prompt> -->
    <!-- END PROMPTS -->





    <vs-table ref="table" :data="Categories" pagination :max-items="itemsPerPage" noDataText="No hay categorías">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">
          <vs-button class="tableHeaderItem" color="primary" type="border" @click="addNewCategory({id: 0, name: ''})">
            <font-awesome-icon icon="plus"/>
            Nueva categoría
          </vs-button>
          <vs-button class="tableHeaderItem" color="primary" type="border" @click="toggleAll(false)">
            <font-awesome-icon icon="minus"/>
            Cerrar todos
          </vs-button>
          <vs-button class="tableHeaderItem" color="primary" type="border" @click="toggleAll(true)">
            <font-awesome-icon icon="plus"/>
            Expandir todos
          </vs-button>
        </div> <!-- .tableHeader -->

        <TableHeaderActions
        :hideColumnsManager="true"
        :hideSearch="true"
        />
        <!-- @searchInput="searchCategory($event)" -->

      </div> <!-- header -->

      <template slot="thead">
        <vs-th v-if="!isHidden.id">ID</vs-th>
        <vs-th v-if="!isHidden.parentID" class="nowrap">ID Padre</vs-th>
        <vs-th v-if="!isHidden.isShowed">Visible</vs-th>
        <vs-th v-if="!isHidden.name">Categoría</vs-th>
        <vs-th v-if="!isHidden.delete">Eliminar</vs-th>
      </template>

      <template slot-scope="{data}">

       <!-- <transition-group name="list" tag="vs-tr"> -->

        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data"
        v-if="!tr.isHidden">
          <!-- Expansible -->
          <!-- <vs-td class="autoWidth"> -->
          <!-- </vs-td> -->
          <!-- id -->
          <vs-td v-if="!isHidden.id" :data="tr.id" class="autoWidth"><vs-chip color="primary">{{ tr.id }}</vs-chip></vs-td>
          <!-- parentID -->
          <vs-td v-if="!isHidden.parentID" :data="tr.parentID" class="autoWidth">{{ tr.parentID }}</vs-td>
          <!-- isShowed -->
          <vs-td v-if="!isHidden.isShowed" class="autoWidth">
            <vs-switch v-model="tr.isShowed" @click="hideCategory(tr)"/>
          </vs-td>

          <!-- name -->
          <vs-td v-if="!isHidden.name" :data="tr.name" class="nowrap">

            <!-- indentation -->
            <div class="indentation" v-for="index in tr.parentsAmount"></div>
            <div class="indentationLineContainer" v-if="tr.parentsAmount"><div class="indentationLine"></div></div>
            <!-- Chevron -->
            <vs-button v-if="tr.hasSons" type="button" name="button" @click="toggleSubcategories(tr.id)">
              <font-awesome-icon icon="chevron-down" style="color: #22223E"/>
            </vs-button>
            <!-- Line -->
            <div v-else class="noSons"></div>

            <!-- sucategory -->
            <div class="addSubcategoryBtn">
              <vs-button color="primary" type="border" icon="add" size="small" @click="addNewCategory(tr)"
              :title='`Agregar subcategoría a "${tr.name}"`'></vs-button>
            </div>

            <!-- name -->
            <span>{{ tr.name }}</span>

            <!-- products amount -->
            <span v-if="tr.productsAmount"> ({{ tr.productsAmount }})</span>

            <!-- new label -->
            <div class="isNewLabelBlock" v-if="tr.isNew">Nuevo</div>

            <!-- {{ tr.parentsList }} -->

            <!-- Asignar -->
            <div class="assignProducts" @click="assignProducts(tr)" v-if="!tr.hasSons">
              Asignar productos
            </div>

          </vs-td>
          <!-- delete -->
          <vs-td v-if="!isHidden.delete" class="autoWidth">
            <vs-button color="danger" type="border" icon="clear" @click="deleteCategory(tr)":title='`Eliminar categoría "${tr.name}"`'></vs-button>
          </vs-td>
        </vs-tr>

      <!-- </transition-group> -->

      </template>
    </vs-table>
  </div>
</template>










<!-- - - - - - - - - - - - - - - - SCRIPT - - - - - - - - - - - - - - - -->
<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
export default {
  mixins: [vsTableConfig],
  components: {
    addNewCategory: () => import('./components/addNew/AddNewCategory.vue'),
    AddProductToCategory: () => import('./components/categories/AddProductToCategory.vue'),
    ListProductsWithoutCategory: () => import('./components/categories/ListProductsWithoutCategory.vue'),
  },
  data() {
    return {
      AddProductTo: {},
      allProductsCategories: [],
      itemsPerPage: 250,
      IsPromptActive: { newCategory: false, addProductToCategory: false, },
      Categories: [],
      NewCategory: { parentID: 0, parentName: '', parentsAmount: 0 },
      search: '',

      // static
      HideableColumns: [
        { name: 'id'      , title: 'ID', },
        { name: 'parentID', title: 'ID Padre', },
        // { name: 'isShowed', title: 'Visible', },
        { name: 'name'    , title: 'Categoría', },
        { name: 'delete'  , title: 'Eliminar categoría', },
      ],
      // selectedProfile: 0, // Lisandro
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id', 'parentID', 'isShowed', ],
      ],
    };
  }, // DATA
  mounted() {
    this.loadCategories();
  }, // CREATED
  methods: {
    searchCategory(search) {
      this.search = search;
      this.loadCategories();
    },
    modifyCategoryProducts(Info) {
      for (let Cat of this.Categories) {
        if (Cat.id == Info.categoryID) {
          Cat.productsAmount = Info.totalProducts;
        }
      }
      this.IsPromptActive.addProductToCategory = false;
    },
    assignProducts(Cat) {
      this.IsPromptActive.addProductToCategory = true;
      this.AddProductTo = Cat;
      console.log('Agregar '+ Cat.name);
    },


    hideMySons(parentID) {
      for (let Cat of this.Categories) {
        if (Cat.parentID == parentID) {
          this.$set(Cat, 'isHidden', true);
          if (Cat.hasSons) this.hideMySons(Cat.id)
        }
      }
    },
    toggleAll(show) {
      for (let Cat of this.Categories) {
        if (Cat.parentID != 0) {
          Cat.isHidden = !show;
        }
      }
    },
    toggleSubcategories(parentID, show = null) {
      // Que se oculten después los nietos también
      for (let Cat of this.Categories) {
        if (parentID == Cat.parentID) {
          Cat.isHidden = show != null ? !show : !Cat.isHidden;
          if (Cat.isHidden && Cat.hasSons) {
            this.hideMySons(Cat.id);
          }
        }
      }
    },
    // addNewCategory
    // deleteCategory
    // getParentsInfo
    // hideCategory
    // loadCategories
    // modifyCategory

    addedNewCategory(newCat) {
      // reorder the list
      if (newCat.parentID == 0) {
        this.Categories.unshift(newCat);
        return;
      }
      for (var i = 0; i < this.Categories.length; i++) {
        let Cat = this.Categories[i];
        if (Cat.id == newCat.parentID) {
          Cat.hasSons = true;
          let show = true;
          this.toggleSubcategories(newCat.parentID, show);
          // Agrega al array
          newCat.parentsAmount = Cat.parentsAmount+1;
          this.Categories.splice(i+1, 0, newCat);
        }
      }
      this.NewCategory.name = '';
    },
    addNewCategory(Parent) {
      this.NewCategory.isShowed = 1;
      this.NewCategory.hasSons = false;
      this.NewCategory.isHidden = false;
      this.NewCategory.parentID = Parent.id;
      this.NewCategory.parentName = Parent.name;
      this.NewCategory.parentsAmount = typeof Parent.parentsAmount == 'undefined' ? 0 : Parent.parentsAmount;
      this.IsPromptActive.newCategory = true;
      this.IsPromptActive.name = '';
    },
    deleteCategory(Category, notification = true, ask = true) {
      let hasSubcategories = false;
      for (let i in this.Categories) {
        if (this.Categories[i].parentID == Category.id) {
          hasSubcategories = true;
        }
      }
      let extraMessage = !hasSubcategories ? '' : ' y sus subcategorías';
      let isSure = false;
      if (ask) {
        isSure = confirm(`Seguro que querés eliminar la categoría "${Category.name}"${extraMessage} ?`)
      } else {
        isSure = true;
      }
      if (!isSure) return;
      Category.isActive = 0;
      this.modifyCategory(Category, notification, hasSubcategories);
      for (let i in this.Categories) {
        if (this.Categories[i].parentID == Category.id) {
          this.deleteCategory(this.Categories[i], false, false);
        }
      }
    },
    hideCategory(Category) {
      let notification = true;
      let hasSubcategories = false;
      let hideCategory = true;
      this.modifyCategory(Category, notification, hasSubcategories, hideCategory);
    },
    loadCategories() {
      const vm = this;
      this.conectToDB({
        file: 'Categories', action: 'getCategory', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log(res.data.data);
          let Categories = res.data.data;
          for (let Cat of Categories) {
            Cat.productsAmount = 0;
            Cat.parentsAmount = 0;
            Cat.parentsList = '';
            Cat.isHidden = Cat.parentID == 0 ? false : true;
            Cat.hasSons = false;
          }
          vm.Categories = vm.getParentsInfo(Categories);
          vm.setParentHasSons();

          vm.loadProductsCategories();
        },
      });
    },

    loadProductsCategories() {
      const vm = this;
      this.conectToDB({
        file: 'Products', action: 'getProductDetailsCategory',
        params: { isActive: 1, },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.allProductsCategories = res.data.data;
          for (let Cat of vm.Categories) {
            for (let ProdCat of vm.allProductsCategories) {
              if (Cat.id == ProdCat.categoryID) {
                Cat.productsAmount++;
              }
            }
          }
        },
      });
    },

    setParentHasSons(parentID) {
      for (let Cat of this.Categories) {
        if (Cat.parentID != 0) {
          let index = this.Categories.findIndex(i => i.id == Cat.parentID)
          this.Categories[index].hasSons = true;
        }
      }
    },
    modifyCategory(paramsOriginal, notification = true, hasSubcategories = false, hideCategory = false) {
      let params = this.copyObj(paramsOriginal);
      params.isShowed = hideCategory ? !params.isShowed : params.isShowed;
      const vm = this;
      this.conectToDB({
        file: 'Categories', action: 'modifyCategory', params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Categoría modificada');
          // notification
          let extraMessage1 = !hasSubcategories ? '' : ' y sus subcategorías';
          let extraMessage2 = !hasSubcategories ? '' : 's';
          if (params.isActive) {
            if (!notification) return;
            vm.myNotify('success', 'Éxito', `Categoría <b>${params.name}</b> modificada correctamente`);
          } else {
            // delete item from array
            for (let i in vm.Categories) {
              if (params.id == vm.Categories[i].id) {
                vm.Categories.splice(i, 1);
              }
            }
            if (!notification) return;
            vm.myNotify('success', 'Éxito', `Categoría <b>${params.name}</b>${extraMessage1} eliminada${extraMessage2} correctamente`);
          }
        },
      });
    },
  }, // METHODS
}
</script>


<style>
.assignProducts {
  font-size: 14px;
  color: #22223E;
  display: inline-block;
  margin-left: 30px;
  cursor: pointer;
  padding: 7px 15px;
  border-radius: 5px;
}
.assignProducts:hover {
  box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
  color: #15B0CE;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.noSons {
  margin: 0px 25px;
  border-top: 1px solid #22223E;
  border-bottom: 2px solid #22223E;
  width: 15px;
  border-radius: 10px;
  display: inline-block;
}
.indentation {
  display: inline-block;
  padding-left: 50px;
  height: 100%;
}
.indentation:last-of-type {
  /* border-left: 1px solid #15B0CE; */
  height: 15px;
}
.indentationLineContainer {
  position: relative;
  display: inline-block;
  margin-right: 10px;
}
.indentationLine {
  display: inline-block;
  /* border-left: 1px solid #15B0CE; */
  position: absolute;
  top: -26px;
  height: 40px;
}
.addSubcategoryBtn {
  display: inline-block;
  margin-right: 15px;
  margin-left: 10px;
}
.isNewLabelBlock {
  margin-left: 15px;
  border-radius: 50px;
}
</style>
