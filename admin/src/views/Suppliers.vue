<template>
  <div>

    <!-- PROMPTS -->
    <!-- new supplier -->
    <add-new-supplier
      :isPromptActive="IsPromptActive.newSupplier"
      :AllSuppliers="Suppliers"
      @addedNewSupplier="Suppliers.unshift($event); IsPromptActive.newSupplier = false;"
      @closePrompt="IsPromptActive.newSupplier = false"
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
      <vs-table ref="table" :data="Suppliers" pagination :max-items="itemsPerPage" noDataText="No hay proveedores">
        <div slot="header" class="tableHeaderContainer">
          <div class="tableHeader">

            <vs-button class="tableHeaderItem" color="primary" type="border" @click="IsPromptActive.newSupplier = true">
              <font-awesome-icon icon="plus"/>
              Nuevo proveedor
            </vs-button>
          </div> <!-- .tableHeader -->

          <TableHeaderActions
          :vmMain="getThis()"
          :itemsLength="Suppliers.length"
          :currentPage="currentPage"
          :itemsPerPage="itemsPerPage"
          @newItemsPerPage="itemsPerPage = $event"
          @searchInput="search = $event;"
          />

        </div> <!-- header -->


        <template slot="thead">
          <vs-th v-if ="!isHidden.id">ID</vs-th>
          <vs-th v-if ="!isHidden.name" sort-key="name">Nombre</vs-th>
          <vs-th v-if ="!isHidden.city" sort-key="city">Ciudad</vs-th>
          <vs-th v-if ="!isHidden.charge" sort-key="percentageCharge">Comisión</vs-th>
          <vs-th v-if ="!isHidden.email">Email</vs-th>
          <vs-th v-if ="!isHidden.phone">Teléfono</vs-th>
          <vs-th v-if ="!isHidden.address">Dirección</vs-th>
          <vs-th v-if ="!isHidden.extraInfo">Info extra</vs-th>
          <vs-th v-if ="!isHidden.delete">Eliminar</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <!-- id -->
            <vs-td v-if="!isHidden.id" :data="tr.id" class="autoWidth">
              <vs-chip color="primary">{{ tr.id }}</vs-chip>
            </vs-td>
            <!-- name -->
            <vs-td v-if="!isHidden.name" :data="tr.name">
              {{ tr.name }}
              <div class="isNewLabelBlock" v-if="tr.isNew">Nuevo</div>
            </vs-td>
            <!-- city -->
            <vs-td v-if="!isHidden.city" :data="tr.city">
              {{ tr.city }}
            </vs-td>
            <!-- charge -->
            <vs-td v-if="!isHidden.charge" :data="tr.percentageCharge">
              <span v-if="tr.percentageCharge">{{ tr.percentageCharge }}%</span>
              <span v-if="tr.percentageCharge && tr.fixedCharge">{{ ' + ' }}</span>
              <span v-if="tr.fixedCharge">${{ tr.fixedCharge }}</span>
            </vs-td>
            <!-- email -->
            <vs-td v-if="!isHidden.email">
              {{ tr.email }}
            </vs-td>
            <!-- phone -->
            <vs-td v-if="!isHidden.phone">
              {{ tr.phone }}
            </vs-td>
            <!-- address -->
            <vs-td v-if="!isHidden.address">
              {{ tr.address }}
            </vs-td>
            <!-- extraInfo -->
            <vs-td v-if="!isHidden.extraInfo">
              {{ tr.extraInfo }}
            </vs-td>
            <!-- delete -->
            <vs-td v-if="!isHidden.delete">
              <vs-button color="danger" type="border" icon="clear" @click="deleteSupplier(tr)"></vs-button>
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
import addNewSupplier from './components/addNew/AddNewSupplier.vue';

export default {
  mixins: [vsTableConfig],
  components: {
    addNewSupplier,
  },
  data() {
    return {
      IsPromptActive: {
        newSupplier: false,
        columnsManager: false,
      },
      Suppliers: [],

      // static
      HideableColumns: [
        { name: 'id'       , title: 'ID', },
        { name: 'name'     , title: 'Nombre', },
        { name: 'city'     , title: 'Ciudad', },
        { name: 'charge'   , title: 'Comisión', },
        { name: 'email'    , title: 'Email', },
        { name: 'phone'    , title: 'Teléfono', },
        { name: 'address'  , title: 'Dirección', },
        { name: 'extraInfo', title: 'Información extra', },
        { name: 'delete'   , title: 'Eliminar proveedor', },
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id' ],
      ],
    };
  },
  created() {
    this.loadSuppliers();
  },
  methods: {
    // deleteSupplier
    // loadSuppliers
    // modifySupplier
    deleteSupplier(Sup) {
      let isSure = confirm(`Seguro que querés eliminar el proveedor "${Sup.name}"`)
      if (!isSure) return;
      Sup.isActive = 0;
      this.modifySupplier(Sup);
    },
    loadSuppliers() {
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'getSupplier', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.Suppliers = vm.renameToLabel(res.data.data, 'name');
          console.log(vm.Suppliers);
        },
      });
    },
    modifySupplier(paramsOriginal) {
      let params = this.copyObj(paramsOriginal);
      const vm = this;
      this.conectToDB({
        file: 'Suppliers', action: 'modifySupplier', params: params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('Proveedor modificado');
          if (params.isActive) {
            vm.myNotify('success', 'Éxito', `Proveedor <b>${params.name}</b> modificado correctamente`);
          } else {
            vm.myNotify('success', 'Éxito', `Proveedor <b>${params.name}</b> eliminado correctamente`);
            for (let i in vm.Suppliers) {
              if (params.id == vm.Suppliers[i].id) {
                vm.Suppliers.splice(i, 1);
              }
            }
          }
        },
      });
    },
  }, // METHODS
}

</script>
