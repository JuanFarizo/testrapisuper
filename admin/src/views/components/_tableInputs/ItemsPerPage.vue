<template>
  <div class="flex">
    <vs-dropdown vs-trigger-click class="dropdown" v-if="!isAnyUndefined([itemsLength, currentPage, itemsPerPageLocal])">
        <!-- <div class="itemsPerPageLocal flex items-center justify-between font-medium"> -->
      <div class="mainButton border border-solid d-theme-border-grey-light d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
        <span class="mr-2">
          {{ currentPage * itemsPerPageLocal - (itemsPerPageLocal - 1) }} -
          {{ itemsLength - currentPage * itemsPerPageLocal > 0 ? currentPage * itemsPerPageLocal : itemsLength }} de
          {{ itemsLength }}
        </span>
        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
      </div>
      <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
      <vs-dropdown-menu>
        <vs-dropdown-item @click="itemsPerPageLocal=itemsPerPageOriginal*1" ><span>{{itemsPerPageOriginal*1}}</span></vs-dropdown-item>
        <vs-dropdown-item @click="itemsPerPageLocal=itemsPerPageOriginal*2"><span>{{itemsPerPageOriginal*2}}</span></vs-dropdown-item>
        <vs-dropdown-item @click="itemsPerPageLocal=itemsPerPageOriginal*4"><span>{{itemsPerPageOriginal*4}}</span></vs-dropdown-item>
        <vs-dropdown-item @click="itemsPerPageLocal=itemsLength"><span>Todos</span></vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: { type: Number, required: true },
    itemsPerPage: { type: Number, required: true },
    itemsLength: { type: Number, required: true },
  },
  data() {
    return {
      itemsPerPageOriginal: 0,
    } // return DATA
  }, // DATA
  computed: {
    itemsPerPageLocal: {
      get() {
        return this.itemsPerPage
      },
      set(val) {
        this.$emit('newItemsPerPage', val);
      }
    },
  }, // COMPUTED
  created() {
    this.itemsPerPageOriginal = this.itemsPerPage;
  }, // CREATED
  methods: {
  }, // METHODS
} // export default
</script>

<!-- - - - - - - - - - - - - - - - STYLE - - - - - - - - - - - - - - - -->
<style lang="scss" scoped>
  .dropdown {
    margin-left: auto;
    cursor: pointer;
  }

  .mainButton {
    border-radius: 6px;
    height: 38px;
    padding: 0 15px;
  }



      .vs-table--header {
        display: flex;
        flex-wrap: wrap-reverse;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        > span {
          display: flex;
          flex-grow: 1;
        }

        .vs-table--search{
          padding-top: 0;

          .vs-table--search-input {
            padding: 0.9rem 2.5rem;
            font-size: 1rem;

            &+i {
              left: 1rem;
            }

            &:focus+i {
              left: 1rem;
            }
          }
        }
      }

      .vs-table {
        border-collapse: separate;
        border-spacing: 0 1.3rem;
        padding: 0 1rem;

        tr{
            box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
            td{
              padding: 20px;
              &:first-child{
                border-top-left-radius: .5rem;
                border-bottom-left-radius: .5rem;
              }
              &:last-child{
                border-top-right-radius: .5rem;
                border-bottom-right-radius: .5rem;
              }
            }
            td.td-check{
              padding: 20px !important;
            }
        }
      }

      .vs-table--thead{
        th {
          padding-top: 0;
          padding-bottom: 0;

          .vs-table-text{
            text-transform: uppercase;
            font-weight: 600;
          }
        }
        th.td-check{
          padding: 0 15px !important;
        }
        tr{
          background: none;
          box-shadow: none;
        }
      }

      .vs-table--pagination {
        justify-content: center;
      }
</style>






<!-- VERSION CON OPCIONES -->
<!-- <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
  <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
    <span class="mr-2">{{ currentPage * itemsPerPageLocal - (itemsPerPageLocal - 1) }} - {{ itemsLength - currentPage * itemsPerPageLocal > 0 ? currentPage * itemsPerPageLocal : itemsLength }} of {{ itemsLength }}</span>
    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
  </div>
  <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button>
  <vs-dropdown-menu>

    <vs-dropdown-item @click="itemsPerPageLocal=4">
      <span>4</span>
    </vs-dropdown-item>
    <vs-dropdown-item @click="itemsPerPageLocal=10">
      <span>10</span>
    </vs-dropdown-item>
    <vs-dropdown-item @click="itemsPerPageLocal=15">
      <span>15</span>
    </vs-dropdown-item>
    <vs-dropdown-item @click="itemsPerPageLocal=20">
      <span>20</span>
    </vs-dropdown-item>
  </vs-dropdown-menu>
</vs-dropdown> -->
