<template>
  <div>

    <!-- PROMPTS -->
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
      <vs-table ref="table" :data="Messages" pagination :max-items="itemsPerPage" noDataText="No hay Mensajes" search>
        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between" style="padding-bottom: 14px;">
          <div class="flex flex-wrap-reverse items-center">
            <vs-button color="primary" type="filled" class="columnsManagerBtn" @click="manageColumns()">
              <font-awesome-icon icon="columns"/>
            </vs-button>
          </div>

          <items-per-page :itemsLength="Messages.length" :currentPage ="currentPage" :itemsPerPage ="itemsPerPage"/>
        </div> <!-- header -->


        <template slot="thead">
          <vs-th v-if ="!isHidden.id">ID</vs-th>
          <vs-th v-if ="!isHidden.isAnswered">Respondido</vs-th>
          <vs-th v-if ="!isHidden.date">Fecha</vs-th>
          <vs-th v-if ="!isHidden.name">Nombre</vs-th>
          <vs-th v-if ="!isHidden.subject">Tema</vs-th>
          <vs-th v-if ="!isHidden.message">Mensaje</vs-th>
          <vs-th v-if ="!isHidden.email">Email</vs-th>
        </template>


        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <!-- id -->
            <vs-td v-if="!isHidden.id" :data="tr.id"><vs-chip color="primary">{{ tr.id }}</vs-chip></vs-td>
            <!-- isAnswered -->
            <vs-td v-if="!isHidden.isAnswered">
              <vs-switch v-model="tr.isAnswered" @click="modifyIsAnswered(tr)"/>
            </vs-td>
            <!-- date -->
            <vs-td v-if="!isHidden.date" :title="getTimeOfDB(tr.date)">
              {{ getDateOfDB(tr.date) }}
            </vs-td>
            <!-- name -->
            <vs-td v-if="!isHidden.name">
              {{ tr.name }}
            </vs-td>
            <!-- subject -->
            <vs-td v-if="!isHidden.subject">
              {{ tr.subject }}
            </vs-td>
            <!-- message -->
            <vs-td v-if="!isHidden.message">
              {{ tr.message }}
            </vs-td>
            <!-- email -->
            <vs-td v-if="!isHidden.email">
              {{ tr.email }}
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
  data() {
    return {
      Messages: [],

      // static
      HideableColumns: [
        { name: 'id'        , title: 'ID', },
        { name: 'isAnswered', title: 'Respondido', },
        { name: 'date'      , title: 'Fecha', },
        { name: 'name'      , title: 'Nombre', },
        { name: 'subject'   , title: 'Tema', },
        { name: 'message'   , title: 'Mensaje', },
        { name: 'email'     , title: 'Email', },
      ],
      selectedProfile: 1, // Lautaro
      Profiles: [
        /* 00 - Lisandro */ [],
        /* 01 - Lautaro */ [ 'id', ],
      ],
    };
  },
  created() {
    this.loadMessages();
  },
  methods: {
    // loadMessages
    // modifyIsAnswered
    loadMessages() {
      const vm = this;
      this.conectToDB({
        file: 'Contact', action: 'getMsg', params: { isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.Messages = res.data.data;
        },
      });
    },
    modifyIsAnswered(Message) {
      const vm = this;
      this.conectToDB({
        file: 'Contact', action: 'modifyMsg', params: { id: Message.id, isAnswered: !Message.isAnswered },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.myNotify('success', 'Éxito', `Mensaje modificado correctamente`);
        },
      });
    },
  }, // METHODS
} // export default

</script>
