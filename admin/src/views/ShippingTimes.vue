<template>
  <div>

    <!-- columns -->
    <columns-manager
      :isPromptActive="IsPromptActive.columnsManager"
      :HideableColumns="Columns"
      :isHidden="isHidden"
      @updatePromptColumns="isHidden = $event;"
      @closePromptColumns="IsPromptActive.columnsManager = false;"
    />
    <!-- END PROMPTS -->

    <AddShippingTime
    :isEditing="isEditingShippingTime"
    :ShippingTimeToEdit="ShippingTimeToEdit"
    :isPromptActive="IsPromptActive.addShippingTime"
    @addedShippingTime="addedShippingTime($event)"
    @modifyShippingTimeDB="modifyShippingTimeDB($event, true)"
    @closePrompt="IsPromptActive.addShippingTime = false;"
    />

    <vs-table ref="table" :data="allShippingTimes" pagination :max-items="itemsPerPage" noDataText="No hay horarios">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">

          <vs-button class="tableHeaderItem" color="primary" type="border"
          @click="openEditOrNewShippingTime()" v-if="checkUser('subAdmin')">
            <font-awesome-icon icon="plus"/>
            Nuevo horario
          </vs-button>
        </div> <!-- .tableHeader -->

        <TableHeaderActions
        :vmMain="getThis()"
        :itemsLength="allShippingTimes.length"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @newItemsPerPage="itemsPerPage = $event"
        @searchInput="searchShippingTime($event)"
        />
      </div> <!-- header -->


      <template slot="thead">
        <vs-th v-for="Col in Columns" v-if="!isHidden[Col.name]" :class="Col.nowrap == false ? '' : 'nowrap'">
          {{ Col.title }}
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <!-- id -->
          <vs-td v-if="!isHidden.id" class="autoWidth">
            <vs-chip color="primary">{{ tr.id }}</vs-chip>
          </vs-td>
          <!-- edit -->
          <vs-td v-if="!isHidden.edit" class="autoWidth">
            <vs-button @click="openEditOrNewShippingTime(tr)" type="border" size="small">
              <font-awesome-icon icon="edit"/>
            </vs-button>
          </vs-td>
          <!-- name -->
          <vs-td v-if="!isHidden.name" class="nowrap">
            {{ tr.name }}
          </vs-td>
          <!-- timeRangeDefault -->
          <vs-td v-if="!isHidden.timeRangeDefault" class="nowrap">
            {{ minToHour(tr.timeRangeDefault).slice(-4) }}hs
          </vs-td>
          <!-- datetimeCreated -->
          <vs-td v-if="!isHidden.datetimeCreated">
            <vx-tooltip :text="getTimeOfDB(tr.datetimeCreated)">
              {{ getDateOfDB(tr.datetimeCreated) }}
            </vx-tooltip>
          </vs-td>
          <!-- creatorEmployee -->
          <vs-td v-if="!isHidden.creatorEmployee" class="nowrap">
            {{ tr.creatorEmployee }}
          </vs-td>
          <!-- delete -->
          <vs-td v-if="!isHidden.delete">
            <vs-button color="danger" type="border" icon="clear" @click="deleteShippingTime(tr)"></vs-button>
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>

  </div>
</template>










<script>
// mixins
import { vsTableConfig } from '@/mixins/vsTableConfig.js';

export default {
  mixins: [vsTableConfig],
  components: {
    AddShippingTime: () => import('./components/shippingTimes/AddShippingTime.vue'),
  },
  data() {
    return {
      itemsPerPage: 50,
      // edit
      isEditingShippingTime: false,
      ShippingTimeToEdit: {},

      IsPromptActive: {
        addShippingTime: false,
        columnsManager: false,
      },
      allShippingTimes: [],

      // static
      Columns: [
        { name: 'id'               , title: 'ID', },
        { name: 'edit'             , title: 'Editar', },
        { name: 'name'             , title: 'Nombre', },
        { name: 'timeRangeDefault' , title: 'Duración', },
        { name: 'datetimeCreated'  , title: 'Creado', },
        { name: 'creatorEmployee'  , title: 'Creador', },
        { name: 'delete'           , title: 'Eliminar', },
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id', 'creatorEmployee', ],
      ],
    };
  },
  created() {
    this.loadShippingTimes();
  },
  methods: {
    // addedShippingTime
    // deleteShippingTime
    // openEditOrNewShippingTime
    // loadShippingTimes
    // modifyShippingTimeDB
    // replaceShippingTimeInList
    // searchShippingTime

    addedShippingTime(shippingTimeID) {
      let Params = { shippingTimeID: shippingTimeID };
      this.conectToDB({
        file: 'ShippingTimes', action: 'getShippingTime', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let ShippingTime = res.data.data[0];
          this.allShippingTimes.unshift(ShippingTime);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    deleteShippingTime(ShippingTime) {
      if (!confirm(`Seguro que querés eliminar a "${ShippingTime.name}"`)) return;
      let Params = {
        shippingTimeID: ShippingTime.id,
        isActive: 0,
      }
      const index = this.allShippingTimes.findIndex(i => i.id == ShippingTime.id);
      if (index != -1) this.allShippingTimes.splice(index, 1);
      this.modifyShippingTimeDB(Params);
    },

    openEditOrNewShippingTime(ShippingTime = '') {
      if (ShippingTime == '') {
        // new shippingTime
        this.ShippingTimeToEdit = {};
        this.isEditingShippingTime = false;
      } else {
        // edit shippingTime
        this.ShippingTimeToEdit = ShippingTime;
        this.isEditingShippingTime = true;
      }
      this.IsPromptActive.addShippingTime = true;
    },

    loadShippingTimes() {
      let Params = {
        isActive: 1,
        branchID: this.getBranchID(),
        search: this.search,
      }
      this.conectToDB({
        file: 'ShippingTimes', action: 'getShippingTime', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allShippingTimes = res.data.data;
          console.log('allShippingTimes', allShippingTimes);
          this.allShippingTimes = allShippingTimes;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    modifyShippingTimeDB(paramsOriginal, addIt) {
      let Params = this.copyObj(paramsOriginal);
      this.conectToDB({
        file: 'ShippingTimes', action: 'modifyShippingTime', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let action = Params.isActive ? 'modificado' : 'eliminado';
          console.log(`Horario ${action} ID: ${Params.shippingTimeID}`);
          this.myNotify('success', 'Éxito', `Horario ${ action } correctamente`);
          if (addIt) this.replaceShippingTimeInList(Params.shippingTimeID);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    replaceShippingTimeInList(shippingTimeID) {
      let Params = {
        shippingTimeID: shippingTimeID,
      }
      this.conectToDB({
        file: 'ShippingTimes', action: 'getShippingTime', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let ShippingTime = res.data.data[0];
          let index = this.allShippingTimes.findIndex(i => i.id == Params.shippingTimeID);
          if (index != -1) this.allShippingTimes.splice(index, 1, ShippingTime);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    searchShippingTime(search) {
      this.search = search;
      this.loadShippingTimes();
    },

  }, // METHODS
} // export default

</script>
