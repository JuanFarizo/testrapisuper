// components
import rsPrompt from '@/views/components/rsPrompt.vue';
import rsSwitchOptions from '@/views/components/rsSwitchOptions.vue';
import inputHour from '@/views/components/inputHour.vue';
import vSelect from 'vue-select';

export const mainAdmin = {
  components: {
    rsPrompt,
    rsSwitchOptions,
    inputHour,
    'v-select': vSelect,
    employeeImg: () => import('@/views/components/employeeImg.vue'),
    TableSearch: () => import('@/views/components/_tableInputs/TableSearch.vue'),
    ItemsPerPage: () => import('@/views/components/_tableInputs/ItemsPerPage.vue'),
    ItemFilterTable: () => import('@/views/components/_tableInputs/ItemFilterTable.vue'),
    ColumnsManager: () => import('@/views/components/_tableInputs/ColumnsManagerButton.vue'),
    columnsManager: () => import('@/views/components/_tableInputs/ColumnsManagerPopup.vue'),
    TableHeaderActions: () => import('@/views/components/_tableInputs/_TableHeaderActions.vue'),

  },
  data() {
    return {
    }; // return DATA
  }, // DATA
  computed: {
  }, // COMPUTED
} // export default
