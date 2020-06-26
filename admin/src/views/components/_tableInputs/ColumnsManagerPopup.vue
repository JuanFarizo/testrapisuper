<template lang="html">
  <vs-prompt
    title='Ocultar columnas'
    :active.sync="isPromptActiveLocal"
    :buttons-hidden="true"
  >
    <div class="con-exemple-prompt" style="padding-bottom: 10px;">
      <div class="w-full">
        <!-- multipleRows -->
        <ul v-if="multipleRows != null" v-for="(rowTitle, rowName) in multipleRows" class="listRow" style="">
          <h3>{{ rowTitle }}</h3>
          <li v-for="Col in HideableColumns[rowName]" v-if="Col.onlyMainHouse ? isMainHouse() : true">
            <vs-checkbox v-model="isShowed[rowName][Col.name]" @change="changeValue()">
              {{ Col.title }}
            </vs-checkbox>
          </li>
        </ul>
        <!-- HideableColumns -->
        <ul>
          <li v-for="Col in HideableColumns" v-if="Col.onlyMainHouse ? isMainHouse() : true">
            <vs-checkbox v-model="isShowed[Col.name]" @change="changeValue()">
              {{ Col.title }}
            </vs-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </vs-prompt>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true },
    HideableColumns: { required: true },
    isHidden: { type: Object, required: true },
    multipleRows: { type: Object, required: false, default: null }
  }, // PROPS
  data() {
    return {
      isShowed: {},
      // isShowed: {},
    } // return DATA
  }, // DATA
  computed: {
    isPromptActiveLocal: {
      get() {
        return this.isPromptActive;
      },
      set(val) {
        this.$emit('closePromptColumns', val);
      }
    },
    // isShowed: {
    //   get() {
    //     let list = this.copyObj(this.isHidden);
    //     // console.log(this.isHidden);
    //     for (let item in list) {
    //       list[item] = !list[item];
    //       // console.log(item);
    //       // console.log(list[item]);
    //     }
    //     return list;
    //   },
    //   set(val) {
    //     // console.log(val);
    //     this.$emit('updatePromptColumns', val);
    //   }
    // },
  }, // COMPUTED
  watch: {
    isShowed(val) {
      // console.log(val);
      // let newVal = this.getReversedIsHidden(val);
      // console.log(newVal);
      // this.$emit('updatePromptColumns', newVal);
    },
  },
  created() {
    this.isShowed = this.getReversedIsHidden(this.isHidden);
  }, // CREATED
  methods: {
    // changeValue
    // getReversedIsHidden
    changeValue() {
      let newVal = this.getReversedIsHidden(this.isShowed);
      this.$emit('updatePromptColumns', newVal);
    },
    // this methods is low efficient
    getReversedIsHidden(value) {
      // multipleRows
      if (this.multipleRows != null) {
        var list = {};
        // copy list
        for (let key in value) {
          list[key] = this.copyObj(value[key]);
        }
        for (let rowName in this.multipleRows) {
          for (let Col of this.HideableColumns[rowName]) {
            list[rowName][Col.name] = !list[rowName][Col.name];
          }
        }
      } else {
        var list = this.copyObj(value);
        // one row
        for (let Col of this.HideableColumns) {
          list[Col.name] = !list[Col.name];
        }
      }
      return list;
    },
  }
} // export default
</script>

<style lang="scss" scoped>
.listRow {
  margin-bottom: 15px;
}
.listRow li {
  margin-top: 5px;
}
</style>
