
// cartel de "todas las columnas están ocultas"

// styles
import "@/../../Dual/assets/css/vsTable.scss";
// components

export const vsTableConfig = {
  components: {
  },
  data() {
    return {
      totalPages: 0,
      isMounted: false,
      IsPromptActive: {
        columnsManager: false,
      },
      HiddenColumns: {},
      HideableColumns: [],
      isHidden: {},
      isVisible: {},
      // static
      maxPageNumbers: 7,
      itemsPerPage: 30,
      // default values
      selectedProfile: 0,
      Profiles: [[]],
    };
  }, // DATA
  created() {
    this.loadProfile();
  },
  watch: {
    selectedProfile: function() {
      this.loadProfile();
    },
    '$store.state.windowWidth'(val) {
      if(val <= 576) {
        this.maxPageNumbers = 4;
      }
    },
  }, // WATCH
  methods: {
    // loadProfile
    // manageColumns
    // newItemsPerPage
    // updateSearchQuery
    loadProfile(isHidden) {
      // if (typeof isHidden != 'undefined') {
      //
      // }
      // Single profiles
      if (this.Profiles[this.selectedProfile] instanceof Array) {
        for (let i in this.Profiles[this.selectedProfile]) {
          let field = this.Profiles[this.selectedProfile][i]
          this.$set(this.isHidden, field, true);
        }
        // Complex profiles
      } else {
        for (let field in this.Profiles[this.selectedProfile]) {
          this.$set(this.isHidden, field, {});
          for (let subField of this.Profiles[this.selectedProfile][field]) {
            this.$set(this.isHidden[field], subField, true);
          }
        }
      }
    }, // loadProfile()
    manageColumns() {
      this.IsPromptActive.columnsManager = true;
      this.HiddenColumns.length = 0;
      for (let col in this.HideableColumns) {
        this.HiddenColumns[col];
      }
    },
    newItemsPerPage(ev) {
      console.log(ev);
    },
    updateSearchQuery() {
      console.log('busco busco');
    },
  }, // METHODS
  computed: {
    currentPage() {
      if(this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0;
    },
    currentPage2() {
      if(this.isMounted) {
        return this.$refs.table2.currentx
      }
      return 0;
    },
  }, // COMPUTED
  mounted() {
    this.isMounted = true;
  }, // MOUNTED
} // export
