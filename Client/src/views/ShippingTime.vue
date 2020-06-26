<template>
  <div>

    <h1 class="tt-title-subpages" style="margin-top: 50px;">
      Horarios de envío a <b>{{ _City.name }}</b>
    </h1>

    <vs-table ref="table" :data="['']" noDataText="Cargando..." class="myTable">

      <template slot="thead">
        <vs-th v-for="dayNameSpanish in daysOfWeekNamesSpanish">
          {{ dayNameSpanish }}
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td v-for="(dayName, dayIndex) in daysOfWeekNamesMondayFirst">
              <div v-for="ShippingTime in ShippingTimeList[dayName]" class="timeItem">
                {{ showRange(ShippingTime.time, ShippingTime.timeRange || ShippingTime.timeRangeDefault) }}
              </div>

              <div v-if="ShippingTimeList[dayName].length == 0" style="color: #AAA; font-style: italic;">
                Cerrado
              </div>

          </vs-td>
        </vs-tr>
      </template>
    </vs-table>


  </div>
</template>

<script>
import "@/../../Dual/assets/css/vsTable.scss";

export default {
  data() {
    return {
      ShippingTimeList: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
    } // return DATA
  }, // DATA
  created() {
    this.loadCity();
  },
  methods: {
    // loadCity
    // loadShippingTimes
    loadCity() {
      let Params = {
        cityID: this.getCityID(),
      }
      this.conectToDB({
        file: 'Cities', action: 'getCity', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let City = res.data.data[0];
          for (let dayName of this.daysOfWeekNamesMondayFirst) {
            let Item = {
              shippingTimeID: City[`${dayName}ShippingTimeID`],
              dayName: dayName,
            }
            this.loadShippingTimes(Item);
          }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    loadShippingTimes(ItemOriginal) {
      let Item = this.copyObj(ItemOriginal);
      let Params = {
        shippingTimeID: Item.shippingTimeID,
        isActive: 1,
      }
      this.conectToDB({
        file: 'ShippingTimes', action: 'getShippingTimeItem', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let ShippingTimeItems = res.data.data;
          this.ShippingTimeList[Item.dayName] = ShippingTimeItems;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

  .timeItem {
    white-space: nowrap;
    margin-top:    10px;
    margin-bottom: 10px;
  }

  .myTable {
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
  }

</style>
