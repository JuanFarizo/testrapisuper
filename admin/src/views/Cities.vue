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

    <!-- <AddCity
    :isEditing="isEditingCity"
    :CityToEdit="CityToEdit"
    :isPromptActive="IsPromptActive.addCity"
    @addedCity="addedCity($event)"
    @modifyCityDB="modifyCityDB($event, true)"
    @closePrompt="IsPromptActive.addCity = false;"
    /> -->

    <!-- END PROMPTS -->

    <vs-table ref="table" :data="allCities" :max-items="itemsPerPage"
    noDataText="No hay ciudades">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">

          <vs-button class="tableHeaderItem" color="primary" type="border"
          @click="openEditOrNewCity()" v-if="checkUserIsMe()">
            <font-awesome-icon icon="plus"/>
            Nueva ciudad
          </vs-button>
        </div> <!-- .tableHeader -->

        <!-- :itemsLength="allCities.length"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @newItemsPerPage="itemsPerPage = $event" -->
        <TableHeaderActions
        :vmMain="getThis()"
        @searchInput="searchCity($event)"
        />
      </div> <!-- header -->


      <template slot="thead">
        <vs-th v-for="Col in Columns" v-if="!isHidden[Col.name] && (!Col.onlyMainHouse ? true : isMainHouse())" :class="Col.nowrap == false ? '' : 'nowrap'">
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
          <vs-td v-if="!isHidden.edit" class="autoWidth centered">
            <vs-button @click="switchEditingTime(tr.id)" size="small" type="border"
            v-if="!checkIsEditingTime(tr.id)">
              <font-awesome-icon icon="edit"/>
            </vs-button>
            <template v-else>
              <vs-button @click="finishEditingTime(0)" size="small" type="filled" color="danger" class="mr-2">
                <font-awesome-icon icon="times"/>
              </vs-button>

              <vs-button @click="finishEditingTime(1)" size="small" type="filled" color="success">
                <font-awesome-icon icon="check"/>
              </vs-button>
            </template>
          </vs-td>
          <!-- name -->
          <vs-td v-if="!isHidden.name" class="nowrap">
            <div class="cityName">
              {{ tr.name }}
            </div>
          </vs-td>
          <!-- shippingTime in all days of week -->
          <vs-td v-if="!isHidden[`${day}ShippingTime`]" v-for="day in daysOfWeek">
            <div v-if="checkIsEditingTime(tr.id)">
              <v-select class="selectShippingTime" :options="allShippingTimes"
              :reduce="name => name.id" :clearable="false"
              label="name" v-model="EditingCityTimes[day]"/>
            </div>
            <div v-else style="width: 100%; text-align: center;"
            :class="{ closedText: !tr[`${day}ShippingTimeID`] }">
              {{ tr[`${day}ShippingTime`] }}
            </div>
          </vs-td>
          <!-- delete -->
          <vs-td v-if="!isHidden.delete">
            <vs-button color="danger" type="border" icon="clear" @click="deleteCity(tr)"></vs-button>
          </vs-td>

        </vs-tr>

        <vs-tr style="height: 280px;"></vs-tr>
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
    AddCity: () => import('./components/cities/AddCity.vue'),
  },
  data() {
    return {
      itemsPerPage: 50,
      // edit
      isEditingCity: false,
      CityToEdit: {},
      editingTimeCityID: 0,

      search: '',
      IsPromptActive: {
        addCity: false,
        columnsManager: false,
      },
      allCities: [],
      allShippingTimes: [],
      EditingCityTimes: this.getEmptyCityTime(),

      // static
      Columns: [
        { name: 'id'                    , title: 'ID', },
        { name: 'edit'                  , title: 'Editar', },
        { name: 'name'                  , title: 'Ciudad', },
        { name: 'mondayShippingTime'    , title: 'Lunes', },
        { name: 'tuesdayShippingTime'   , title: 'Martes', },
        { name: 'wednesdayShippingTime' , title: 'Miércoles', },
        { name: 'thursdayShippingTime'  , title: 'Jueves', },
        { name: 'fridayShippingTime'    , title: 'Viernes', },
        { name: 'saturdayShippingTime'  , title: 'Sábado', },
        { name: 'sundayShippingTime'    , title: 'Domingo', },
        { name: 'delete'                , title: 'Eliminar', },
      ],
      daysOfWeek: [
         'monday'
        ,'tuesday'
        ,'wednesday'
        ,'thursday'
        ,'friday'
        ,'saturday'
        ,'sunday'
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id', 'roleID', 'cuit', 'dob', 'dniTramitNumber', 'dateJoined', ],
      ],
    };
  },
  created() {
    this.loadCities();
    this.loadShippingTimes();
  },
  methods: {
    // addedCity
    // checkIsEditingTime
    // deleteCity
    // openEditOrNewCity
    // finishEditingTime
    // getEmptyCityTime
    // loadCities
    // loadShippingTimes
    // modifyCityDB
    // replaceCityInList
    // searchCity
    // switchEditingTime
    addedCity(cityID) {
      let Params = { cityID: cityID };
      this.conectToDB({
        file: 'Cities', action: 'getCity', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let City = res.data.data[0];
          this.allCities.unshift(City);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    checkIsEditingTime(cityID) {
      if (this.editingTimeCityID == cityID) return true;
      return false;
    },

    deleteCity(City) {
      if (!confirm(`Seguro que querés eliminar a "${City.fullName}"`)) return;
      let Params = {
        cityID: City.id,
        isActive: 0,
      }
      const index = this.allCities.findIndex(i => i.id == City.id);
      if (index != -1) this.allCities.splice(index, 1);
      this.modifyCityDB(Params);
    },

    openEditOrNewCity(City = '') {
      if (City == '') {
        // new city
        this.CityToEdit = {};
        this.isEditingCity = false;
      } else {
        // edit city
        this.CityToEdit = City;
        this.isEditingCity = true;
      }
      alert('Función no disponible');
      return;
      this.IsPromptActive.addCity = true;
    },

    finishEditingTime(save) {
      let cityID = this.editingTimeCityID;
      this.$nextTick(() => {
        this.editingTimeCityID = 0;
      });
      if (!save) return;
      // update DOM
      let index = this.allCities.findIndex(i => i.id == cityID);
      if (index == -1) return;
      let Params = { cityID: cityID };
      for (let day of this.daysOfWeek) {
        Params[`${day}ShippingTimeID`] = this.EditingCityTimes[day];
        let oldID = this.allCities[index][`${day}ShippingTimeID`];
        let newID = this.EditingCityTimes[day];
        if (oldID == newID) continue;
        let timeIndex = this.allShippingTimes.findIndex(i => i.id == newID);
        if (index == -1) continue;
        this.allCities[index][`${day}ShippingTimeID`] = this.allShippingTimes[timeIndex].id;
        this.allCities[index][`${day}ShippingTime`] = this.allShippingTimes[timeIndex].name;
      }
      // updateDB
      this.conectToDB({
        file: 'Cities', action: 'modifyCity', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.myNotify('success', 'Éxito', 'Ciudad modificada con éxito');
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    getEmptyCityTime() {
      return {
        monday    :0,
        tuesday   :0,
        wednesday :0,
        thursday  :0,
        friday    :0,
        saturday  :0,
        sunday    :0,
      }
    },

    loadCities() {
      let Params = {
        isActive: 1,
        branchID: this.getBranchID(),
        search: this.search,
      }
      this.conectToDB({
        file: 'Cities', action: 'getCity', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          this.allCities = res.data.data;
          console.log('allCities', this.allCities);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    loadShippingTimes() {
      let Params = {
        isActive: 1,
        branchID: this.getBranchID(),
      }
      this.conectToDB({
        file: 'ShippingTimes', action: 'getShippingTime', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allShippingTimes = res.data.data;
          console.log('allShippingTimes', allShippingTimes);
          let closeTime = { id: 0, name: 'Cerrado', }
          allShippingTimes.unshift(closeTime);
          this.allShippingTimes = allShippingTimes;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    modifyCityDB(paramsOriginal, addIt) {
      let Params = this.copyObj(paramsOriginal);
      this.conectToDB({
        file: 'Cities', action: 'modifyCity', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let action = Params.isActive ? 'modificada' : 'eliminada';
          console.log(`Ciudad ${action} ID: ${Params.cityID}`);
          this.myNotify('success', 'Éxito', `Ciudad ${ action } correctamente`);
          if (addIt) this.replaceCityInList(Params.cityID);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    replaceCityInList(cityID) {
      let Params = {
        cityID: cityID,
      }
      this.conectToDB({
        file: 'Cities', action: 'getCity', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let City = res.data.data[0];
          let index = this.allCities.findIndex(i => i.id == Params.cityID);
          if (index != -1) this.allCities.splice(index, 1, City);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    searchCity(search) {
      this.search = search;
      this.loadCities();
    },
    switchEditingTime(cityID) {
      this.editingTimeCityID = cityID;
      // copyData
      let index = this.allCities.findIndex(i => i.id == cityID);
      if (index == -1) return;
      for (let day of this.daysOfWeek) {
        this.EditingCityTimes[day] = this.allCities[index][`${day}ShippingTimeID`];
      }
    },
  }, // METHODS
}

</script>


<style lang="scss" scoped>

  .cityName {
    width: 100%;
    text-align: center;
    background-color: #DDD;
    background-color: #15B0CE;
    color: white;
    border-radius: 25px;
    padding: 5px 15px;
  }
  .selectShippingTime {
    width: 200px;
  }
  .closedText {
    color: #DDD;
  }

</style>
