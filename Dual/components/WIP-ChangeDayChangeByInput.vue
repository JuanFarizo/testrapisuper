<template>
  <div>
    <small class="flex cursor-pointer">
      <div class="date" v-if="typeof selectedDate == 'string'">
        {{ selectedDate }}
      </div>
      <div class="date" v-else>
        <input type="number" v-model="dateDay">/<input type="number" v-model="dateMonth">/<input change="number" v-model="dateYear">
        <!-- {{
        `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`
      }} -->
    </div>
    </small>
    <vs-button type="border" size="small" @click="daysOfDiference--"><font-awesome-icon icon="arrow-left"/></vs-button>
    <vs-button type="border" size="small" @click="daysOfDiference++" :disabled="daysOfDiference >= 0"><font-awesome-icon icon="arrow-right"/></vs-button>
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
    dateDay:
      get() {
        return this.selectedDate.substring(8,10);
      }
    },
    dateMonth:
      get() {
        return this.selectedDate.substring(8,10);
      }
    },
    dateYear:
      get() {
        return this.selectedDate.substring(8,10);
      }
    },
    selectedDate: {
      get() {
        // let selectedDate = this.getDateOfDB(this.getActualDateToDB({day: this.daysOfDiference}));
        let selectedDate = this.getActualDateToDB({day: this.daysOfDiference});
        // switch (selectedDate) {
        //   case 'Hoy':
        //   case 'Mañana':
        //   case 'Ayer':
        //   case 'Anteayer':
        //     return selectedDate;
        // }

        return selectedDate;

        // return {
        //   day: selectedDate.substring(8,10),
        //   month: selectedDate.substring(5,7),
        //   year: selectedDate.substring(0,4),
        // }
      },
      set(val) {
        console.log(val);
      }
    }
  }, // COMPUTED
  watch: {
    daysOfDiference: function(days) {
      this.$emit('changeDay', this.daysOfDiference);
    },
    selectedDate: function(Date, OldDate) {
      console.log('|-----|');
      console.log(Date.day);
      console.log(Date.month);
      console.log(Date.year);
      console.log('-----');

      console.log(OldDate.day);
      console.log(OldDate.month);
      console.log(OldDate.year);
    }
  },
  methods: {
    checkDateNum(dateType, dateNum) {
      console.log(dateType);
      return ''
      // if ()
      // switch (dateType) {
      //   case 'day':
      //   if ()
      //   case 'month':
      //   case 'year':
      //
      //     break;
      //   default:
      //
      // }
    },
  }
} // export default
</script>


<style lang="scss" scoped>
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
  input {
    color: #15B0CE;
    border: none;
    width: 16px;
    padding-right: 1px;
    text-align: center;
  }
  input:last-of-type {
    width: 31px;
  }
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
