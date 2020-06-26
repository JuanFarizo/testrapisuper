<template>
  <div>

    <!-- PROMPTS -->
    <!-- new brand -->
    <add-new-brand
    :isPromptActive="IsPromptActive.newBrand"
    :AllBrands="Brands"
    @addedNewBrand="Brands.unshift($event); IsPromptActive.newBrand = false;"
    @closePrompt="IsPromptActive.newBrand = false"
    />
    <!-- columns -->
    <columns-manager
      :isPromptActive="IsPromptActive.columnsManager"
      :HideableColumns="HideableColumns"
      :isHidden="isHidden"
      @updatePromptColumns="isHidden = $event;"
      @closePromptColumns="IsPromptActive.columnsManager = false;"
    />
    <!-- END PROMPTS -->

    <template>
      <vs-table ref="table" :data="Brands" pagination :max-items="itemsPerPage" noDataText="No hay marcas">
        <div slot="header" class="tableHeaderContainer">
          <div class="tableHeader">
            <vs-button class="tableHeaderItem" color="primary" type="border"
            @click="IsPromptActive.newBrand = true">
              <font-awesome-icon icon="plus"/>
              Nueva marca
            </vs-button>
          </div> <!-- .tableHeader -->

          <TableHeaderActions
          :vmMain="getThis()"
          :itemsLength="Brands.length"
          :currentPage="currentPage"
          :itemsPerPage="itemsPerPage"
          @newItemsPerPage="itemsPerPage = $event"
          @searchInput="searchBrands($event)"

          />
        </div> <!-- header -->


        <template slot="thead">
          <vs-th v-if ="!isHidden.id">ID</vs-th>
          <!-- <vs-th v-if ="!isHidden.img">Imagen</vs-th> -->
          <vs-th v-if ="!isHidden.name" sort-key="name">Nombre</vs-th>
          <vs-th v-if ="!isHidden.delete">Eliminar</vs-th>
        </template>


        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <!-- id -->
            <vs-td v-if="!isHidden.id" :data="tr.id"><vs-chip color="primary">{{ tr.id }}</vs-chip></vs-td>
            <!-- img -->
            <!-- <vs-td v-if="!isHidden.img">
              <div style="position: relative;">
                <img :src="getImgDual(`${tr.id}-1`)">
                <div class="isNewLabel" v-if="tr.isNew">Nuevo</div>
              </div>
            </vs-td> -->
            <!-- name -->
            <vs-td v-if="!isHidden.name" :data="tr.name">
              {{ tr.name }}
              <div class="isNewLabelBlock" v-if="tr.isNew">Nuevo</div>
            </vs-td>
            <!-- delete -->
            <vs-td v-if="!isHidden.delete" class="autoWidth">
              <vs-button color="danger" type="border" icon="clear" @click="deleteBrand(tr)"></vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </template> <!-- table -->

  </div>
</template>










<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';
// components
import addNewBrand from './components/addNew/AddNewBrand.vue';

export default {
  mixins: [vsTableConfig],
  components: {
    addNewBrand,
  },
  data() {
    return {
      IsPromptActive: { newBrand: false, },
      Brands: [],
      search: '',

      // static
      HideableColumns: [
        { name: 'id'    , title: 'ID', },
        // { name: 'img'   , title: 'Imagen', },
        { name: 'name'  , title: 'Nombre', },
        { name: 'delete', title: 'Eliminar marca', },
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id' ],
      ],
    };
  },
  created() {
    this.loadBrands();
  },
  methods: {
    // addedNewBrand
    // deleteBrand
    // loadBrands
    // modifyBrand
    // searchBrands
    deleteBrand(Brand) {
      let isSure = confirm(`Seguro que querés eliminar la marca "${Brand.name}"`)
      if (!isSure) return;
      Brand.isActive = 0;
      this.modifyBrand(Brand);
    },
    loadBrands() {
      let Params = {
        isActive: 1,
        search: this.search,
      }
      const vm = this;
      this.conectToDB({
        file: 'Brands', action: 'getBrand', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.Brands = vm.renameToLabel(res.data.data, 'name');
        },
      });
    },
    modifyBrand(paramsOriginal) {
      let params = this.copyObj(paramsOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Brands', action: 'modifyBrand', params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Marca modificada');
          if (params.isActive) {
            vm.myNotify('success', 'Éxito', `Marca <b>${params.name}</b> modificada correctamente`);
          } else {
            vm.myNotify('success', 'Éxito', `Marca <b>${params.name}</b> eliminada correctamente`);
            for (let i in vm.Brands) {
              if (params.id == vm.Brands[i].id) {
                vm.Brands.splice(i, 1);
              }
            }
          }
        },
      });
    },
    searchBrands(search) {
      this.search = search;
      this.loadBrands();
    },
  }, // METHODS
}

</script>
