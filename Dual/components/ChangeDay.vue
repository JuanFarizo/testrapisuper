<template>
  <div>
    <small class="flex cursor-pointer">
      <div class="date">{{ selectedDate }}</div>
    </small>
    <vs-button type="border" size="small" @click="daysOfDiference--"><font-awesome-icon icon="arrow-left"/></vs-button>
    <vs-button type="border" size="small" @click="daysOfDiference++"><font-awesome-icon icon="arrow-right"/></vs-button>
     <!-- :disabled="daysOfDiference >= 0" -->
  </div>
</template>


<script>
export default {
  data() {
    return {
      daysOfDiference: 0,
    }; // return DATA
  }, // DATA
  computed: {
    selectedDate() {
      return this.getDateOfDB(this.getActualDateToDB({day: this.daysOfDiference}));
    }
  }, // COMPUTED
  watch: {
    daysOfDiference: function(days) {
      this.$emit('changeDay', this.daysOfDiference);
    },
  },
  methods: {

  }
} // export default
</script>


<style lang="css" scoped>
.date {
  /* border: 1px solid #15B0CE; */
  /* background-color: rgba(21, 176, 206, 0.2); */
  /* padding: 5px 0;
  border-bottom: 0; */
  text-align: center;
  width: 100%;
  border-radius: 7px 7px 0 0;
  color: #15B0CE;
  font-size: 14px;
  padding-bottom: 2px;
}

/deep/ button:first-of-type {
  border-radius: 0px 0px 0px 7px;
  border-right: 0;
  padding: 3px 10px !important;
}
/deep/ button:last-of-type {
  border-radius: 0px 0px 7px 0px;
  padding: 3px 10px !important;
}
</style>
