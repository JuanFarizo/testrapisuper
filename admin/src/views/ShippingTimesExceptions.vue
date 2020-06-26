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

    <AddException
    :isEditing="isEditingException"
    :ExceptionToEdit="ExceptionToEdit"
    :isPromptActive="IsPromptActive.addException"
    :allExceptions="allExceptions"
    @addedException="addedException($event)"
    @modifyExceptionDB="modifyExceptionDB($event, true)"
    @closePrompt="IsPromptActive.addException = false;"
    />

    <template>
      <vs-table ref="table" :data="allExceptions" pagination :max-items="itemsPerPage" noDataText="No hay excepciones">
        <div slot="header" class="tableHeaderContainer">
          <div class="tableHeader">

            <vs-button class="tableHeaderItem" color="primary" type="border"
            @click="openEditOrNewException()" v-if="checkUser('subAdmin')">
              <font-awesome-icon icon="plus"/>
              Nueva fecha especial
            </vs-button>

          <div class="tableHeaderItem">
            <vs-checkbox v-model="showOldExceptions">
              Mostrar anteriores
            </vs-checkbox>
          </div>

          </div> <!-- .tableHeader -->

          <TableHeaderActions
          :vmMain="getThis()"
          :itemsLength="allExceptions.length"
          :currentPage="currentPage"
          :itemsPerPage="itemsPerPage"
          @newItemsPerPage="itemsPerPage = $event"
          @searchInput="searchException($event)"
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
              <vs-button @click="openEditOrNewException(tr)" type="border" size="small">
                <font-awesome-icon icon="edit"/>
              </vs-button>
            </vs-td>
            <!-- name -->
            <vs-td v-if="!isHidden.name" class="nowrap">
              {{ tr.name }}
            </vs-td>
            <!-- date -->
            <vs-td v-if="!isHidden.date" class="centered">
              <span class="date" :class="getDateClass(tr)">
                {{ getDateOfDB(tr.date) }}
              </span>
            </vs-td>
            <!-- shippingTimeID -->
            <vs-td v-if="!isHidden.shippingTimeID" class="centered">
              <vs-chip color="primary">
                {{ tr.shippingTimeID }}
              </vs-chip>
            </vs-td>
            <!-- shippingTime -->
            <vs-td v-if="!isHidden.shippingTime" class="centered">
              <span :class="{ closedText: !tr.shippinTimeID }">
                {{ tr.shippingTime }}
              </span>

            </vs-td>
            <!-- datetimeCreated -->
            <vs-td v-if="!isHidden.datetimeCreated">
              <vs-tooltip :text="getTimeOfDB(tr.datetimeCreated)">
                {{ getDateOfDB(tr.datetimeCreated) }}
              </vs-tooltip>
            </vs-td>
            <!-- creatorEmployeeID -->
            <vs-td v-if="!isHidden.creatorEmployeeID" class="centered">
              <vs-chip color="primary">
                {{ tr.creatorEmployeeID }}
              </vs-chip>
            </vs-td>
            <!-- creatorEmployee -->
            <vs-td v-if="!isHidden.creatorEmployee">
              {{ tr.creatorEmployee }}
            </vs-td>
            <!-- delete -->
            <vs-td v-if="!isHidden.delete">
              <vs-button color="danger" type="border" icon="clear" @click="deleteException(tr)"></vs-button>
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

export default {
  mixins: [vsTableConfig],
  components: {
    AddException: () => import('./components/shippingTimesExceptions/AddException.vue'),
  },
  data() {
    return {
      itemsPerPage: 50,
      // edit
      isEditingException: false,
      ExceptionToEdit: {},

      IsPromptActive: {
        addException: false,
        columnsManager: false,
      },
      allExceptions: [],
      showOldExceptions: false,

      // static
      Columns: [
        { name: 'id',                title: 'ID', },
        { name: 'edit',              title: 'Editar', },
        { name: 'name',              title: 'Nombre', },
        { name: 'date',              title: 'Fecha', },
        { name: 'shippingTimeID',    title: 'ID Horario de envío', },
        { name: 'shippingTime',      title: 'Horario de envío', },
        { name: 'datetimeCreated',   title: 'Creación', },
        { name: 'creatorEmployeeID', title: 'ID Creador', },
        { name: 'creatorEmployee',   title: 'Creador', },
        { name: 'delete' ,           title: 'Eliminar', },
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id', 'shippingTimeID', 'datetimeCreated', 'creatorEmployeeID', 'creatorEmployee', ],
      ],
    }; // return DATA
  }, // DATA
  watch: {
    showOldExceptions(val) {
      this.loadExceptions();
    },
  }, // WATCH
  created() {
    this.loadExceptions();
  },
  methods: {
    // addedException
    // deleteException
    // getDateClass
    // openEditOrNewException
    // loadExceptions
    // modifyExceptionDB
    // replaceExceptionInList
    // searchException
    addedException(exceptionID) {
      let Params = { exceptionID: exceptionID };
      this.conectToDB({
        file: 'ShippingTimesExceptions', action: 'getException', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let Exception = res.data.data[0];
          this.allExceptions.unshift(Exception);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    deleteException(Exception) {
      if (!confirm(`Seguro que querés eliminar a "${Exception.name}"`)) return;
      let Params = {
        exceptionID: Exception.id,
        isActive: 0,
      }
      const index = this.allExceptions.findIndex(i => i.id == Exception.id);
      if (index != -1) this.allExceptions.splice(index, 1);
      this.modifyExceptionDB(Params);
    },

    getDateClass(Exception) {
      let today = this.getActualDateToDB();
      if (Exception.date > today) return 'future';
      if (Exception.date == today) return 'today';
      if (Exception.date < today) return 'past';
    },

    openEditOrNewException(Exception = '') {
      if (Exception == '') {
        // new exception
        this.ExceptionToEdit = {};
        this.isEditingException = false;
      } else {
        // edit exception
        this.ExceptionToEdit = Exception;
        this.isEditingException = true;
      }
      this.IsPromptActive.addException = true;
    },
    loadExceptions() {
      let Params = {
        isActive: 1,
        branchID: this.getBranchID(),
        search: this.search,
      }
      if (!this.showOldExceptions) {
        Params.minDate = this.getActualDateToDB();
      }
      this.conectToDB({
        file: 'ShippingTimesExceptions', action: 'getException', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let allExceptions = res.data.data;
          this.allExceptions = allExceptions;
          console.log('allExceptions', allExceptions);
          for (let ex of allExceptions) {
            console.log(ex.date);
          }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    modifyExceptionDB(paramsOriginal, addIt) {
      let Params = this.copyObj(paramsOriginal);
      this.conectToDB({
        file: 'ShippingTimesExceptions', action: 'modifyException', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let action = Params.isActive ? 'modificada' : 'eliminada';
          console.log(`Excepción ${action} ID: ${Params.exceptionID}`);
          this.myNotify('success', 'Éxito', `Excepción ${ action } correctamente`);
          if (addIt) this.replaceExceptionInList(Params.exceptionID);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    replaceExceptionInList(exceptionID) {
      let Params = {
        exceptionID: exceptionID,
      }
      this.conectToDB({
        file: 'ShippingTimesExceptions', action: 'getException', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let Exception = res.data.data[0];
          let index = this.allExceptions.findIndex(i => i.id == Params.exceptionID);
          if (index != -1) this.allExceptions.splice(index, 1, Exception);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },
    searchException(search) {
      this.search = search;
      this.loadExceptions();
    },
  }, // METHODS
}

</script>


<style lang="scss" scoped>

.closedText {
  color: #DDD;
}
.date {
  text-align: center;
  width: 100%;
  padding: 5px 15px;
  border-radius: 30px;
  color: white;
}
.date.past   { background-color: #22223E; }
.date.future { background-color: #15B0CE; }
.date.today  { background-color: #2ECC40; }

</style>
