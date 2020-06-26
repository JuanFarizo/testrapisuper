<template>
  <div>

    <!-- PROMPTS -->
    <!-- new brand -->
    <addNewMistake
    :ItemToModify="ItemToModify"
    :isPromptActive="IsPromptActive.newMistake"
    @addedNewMistake="allMistakes.unshift($event);"
    @closePrompt="IsPromptActive.newMistake = false"
    @deleteItemFromList="deleteItemFromList($event)"
    />
    <!-- columns -->
    <columns-manager
      :isPromptActive="IsPromptActive.columnsManager"
      :HideableColumns="Columns"
      :isHidden="isHidden"
      @updatePromptColumns="isHidden = $event;"
      @closePromptColumns="IsPromptActive.columnsManager = false;"
    />
    <!-- END PROMPTS -->

    <template>
      <vs-table ref="table" :data="filteredMistakes" pagination :max-items="itemsPerPage" noDataText="No hay errores">
        <div slot="header" class="tableHeaderContainer">
          <div class="tableHeader">

            <vs-button class="tableHeaderItem" color="primary" type="border" @click="openPrompt()">
              <font-awesome-icon icon="plus"/>
              Nuevo error
            </vs-button>

            <!-- Filter -->
            <v-select v-model="selectedFilteredBy" class="tableHeaderItem"
            :options="filteredByOptions" :reduce="name => name.id" label="name"
            style="display: inline-block; min-width: 200px"></v-select>
          </div> <!-- .tableHeader -->

          <TableHeaderActions
          :vmMain="getThis()"
          :itemsLength="allMistakes.length"
          :currentPage="currentPage"
          :itemsPerPage="itemsPerPage"
          @newItemsPerPage="itemsPerPage = $event"
          @searchInput="searchMistake($event);"
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
            <vs-td v-if="!isHidden.id" class="centered"><vs-chip color="primary">{{ tr.id }}</vs-chip></vs-td>
            <!-- typeID -->
            <vs-td v-if="!isHidden.typeID" class="centered"><vs-chip color="primary">{{ tr.typeID }}</vs-chip></vs-td>
            <!-- type -->
            <vs-td v-if="!isHidden.type" class="nowrap autoWidth">
              <div class="typeIcon" :class="`typeIcon${tr.typeID}`"><div></div></div>
              {{ tr.type }}
            </vs-td>
            <!-- date -->
            <vs-td v-if="!isHidden.dateTime" style="width: 78px;">
              <vx-tooltip :text="getTimeOfDB(tr.dateTime)">
                {{ getDateOfDB(tr.dateTime) }}
              </vx-tooltip>
            </vs-td>
            <!-- saleDate -->
            <vs-td v-if="!isHidden.saleDate" style="width: 78px;">
              <vx-tooltip :text="showRange(tr.saleTime, tr.saleTimeRange)">
                {{ getDateOfDB(tr.saleDate) }}
              </vx-tooltip>
            </vs-td>
            <!-- modify -->
            <vs-td v-if="!isHidden.edit" class="centered autoWidth">
              <vs-button type="flat" @click="openPrompt(tr, 'edit')">
                <font-awesome-icon icon="edit"/>
              </vs-button>
            </vs-td>
            <!-- saleID -->
            <vs-td v-if="!isHidden.saleID" class="centered"><vs-chip color="primary">{{ tr.saleID }}</vs-chip></vs-td>
            <!-- state -->
            <vs-td v-if="!isHidden.state" class="nowrap autoWidth">
              <div class="state" :class="'state'+tr.stateID" @click="changeState(tr)">
                {{ tr.state }}
              </div>
            </vs-td>
            <!-- buyerFullName -->
            <vs-td v-if="!isHidden.buyerFullName" class="nowrap">{{ tr.buyerFullName }}</vs-td>
            <!-- stateID -->
            <vs-td v-if="!isHidden.stateID" class="centered"><vs-chip color="primary">{{ tr.stateID }}</vs-chip></vs-td>
            <!-- responsibleEmployeeID -->
            <vs-td v-if="!isHidden.responsibleEmployeeID" class="centered"><vs-chip color="primary">{{ tr.responsibleEmployeeID }}</vs-chip></vs-td>
            <!-- responsibleEmployee -->
            <vs-td v-if="!isHidden.responsibleEmployee" class="nowrap" style="position: relative;">
              <div class="userImg">
                <img :src="getImg(`employees/${tr.responsibleEmployeeID}.png`)">
              </div>
              <span style="padding-left: 40px;">{{ tr.responsibleEmployee }}</span>
            </vs-td>
            <!-- responsibleEmployee -->
            <vs-td v-if="!isHidden.description">{{ tr.description }}</vs-td>
            <!-- delete -->
            <vs-td v-if="!isHidden.delete" class="centered autoWidth">
              <vs-button type="flat" color="danger" @click="deleteItem(tr)">
                <font-awesome-icon icon="trash"/>
              </vs-button>
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
import vSelect from 'vue-select';
export default {
  mixins: [vsTableConfig],
  components: {
    'v-select': vSelect,
    addNewMistake: () => import('./components/mistakes/AddNewMistake.vue'),
  },
  data() {
    return {
      IsPromptActive: { newMistake: false, },
      allMistakes: [],
      ItemToModify: null,
      selectedFilteredBy: 1,
      filteredMistakes: [],
      filteredByOptions: [
        { id: 1, name: 'Todos' },
        { id: 2, name: 'Corregir' },
        { id: 3, name: 'Próximas ventas' },
      ],
      search: '',

      // static
      Columns: [
        { name: 'id'    , title: 'ID', },
        { name: 'typeID', title: 'ID tipo', },
        { name: 'type', title: 'Tipo', },
        { name: 'dateTime'  , title: 'Fecha de registro', nowrap: false },
        { name: 'saleDate'  , title: 'Fecha de compra',   nowrap: false },
        { name: 'edit', title: 'Editar', },
        { name: 'stateID', title: 'ID de estado', },
        { name: 'state', title: 'Estado', },
        { name: 'saleID', title: 'ID de venta', },
        { name: 'buyerFullName', title: 'Comprador', },
        { name: 'responsibleEmployeeID', title: 'ID Responsable', },
        { name: 'responsibleEmployee', title: 'Responsable', },
        { name: 'description', title: 'Descripción', },
        { name: 'delete', title: 'Eliminar', },
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id', 'dateTime', 'saleID', 'typeID', 'stateID', 'responsibleEmployeeID', ],
      ],
    };
  },
  computed: {
  },
  watch: {
    selectedFilteredBy(val) {
      if (val == null) {
        this.$nextTick(() => {
          this.selectedFilteredBy = 1;
        });
      }

      this.filterMistakes();
    },
  }, // WATCH
  created() {
    this.loadMistakes();
  },
  methods: {
    // changeState
    // deleteItem
    // deleteItemFromList+
    // filterMistakes
    // loadMistakes
    // openPrompt
    // searchMistake
    changeState(Mistake) {
      let allStates = this._localDB.SalesMistakesStates;
      let allStateIDs = this._localDB.SalesMistakesStateIDs;
      let newVal = allStates.length <= Mistake.stateID+1 ? 1 : Mistake.stateID+1;
      let Params = {
        mistakeID: Mistake.id,
        stateID: newVal,
      }
      Mistake.stateID = newVal;
      Mistake.state = allStates[newVal];
      this.modifyMistakeDB(Params);
    },
    deleteItem(Item) {
      this.deleteItemFromList(Item.id);
      let Params = {
        mistakeID: Item.id,
        isActive: 0,
      }
      this.modifyMistakeDB(Params);
    },
    deleteItemFromList(itemID) {
      let index = this.allMistakes.findIndex(i => i.id == itemID);
      this.allMistakes.splice(index, 1);
    },
    modifyMistakeDB(Params) {
      this.conectToDB({
        file: 'SaleMistakes', action: 'modifyMistake', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    filterMistakes() {
      switch (this.selectedFilteredBy) {
        case 1: // Todos
          this.filteredMistakes = this.allMistakes;
          break;
        case 2: // Corregir
          this.filteredMistakes = this.allMistakes.filter(i => i.typeID == 1);
          break;
        case 3: // Próximas ventas
          this.filteredMistakes = this.allMistakes.filter(i => i.typeID == 2);
          break;
      }
    },
    loadMistakes() {
      let Params = {
        branchID: this.getBranchID(),
        isActive: 1,
        search: this.search,
      }
      this.conectToDB({
        file: 'SaleMistakes', action: 'getMistake', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.allMistakes = res.data.data;
          console.log('allMistakes', res.data.data);
          this.filterMistakes();
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    openPrompt(Item, action = 'create') {
      switch (action) {
        case 'create':
          this.ItemToModify = null;
          break;
        case 'edit':
          this.ItemToModify = Item;
          break;
      }
      this.IsPromptActive.newMistake = true;
    },
    searchMistake(search) {
      this.search = search;
      this.loadMistakes();
    },
  }, // METHODS
} // export default

</script>

<style lang="scss">
.state {
  border-radius: 30px;
  padding: 5px 15px;
  border: 1px solid;
  width: 100%;
  text-align: center;
}
.state1 { background-color: #7FDBFF; color: #004966; border-color: #004966; }
.state2 { background-color: #FF851B; color: #663000; border-color: #663000; }
.state3 { background-color: #2ECC40; color: #0E3E14; border-color: #0E3E14; }

.userImg {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 1px solid;
  border-radius: 30px;
  position: absolute;
  left: 2px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.typeIcon {
  height: 15px;
  width: 15px;
  border-radius: 10px;
  background-color: #DDDDDD;
  margin-bottom: 1px;
  margin-right: 5px;
  div {
    background-color: white;
    height: 5px;
    width: 5px;
    border-radius: 10px;
    margin-left: 5px;
    margin-top: 5px;
  }
}
.typeIcon1 { background-color: #FF4136; }
.typeIcon2 { background-color: #001F3F; }
</style>
