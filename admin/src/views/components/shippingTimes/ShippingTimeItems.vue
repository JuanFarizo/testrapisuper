<template>
  <div>
    <vs-table ref="table" :data="allShippingTimesItems" noDataText="No hay horarios">
      <div slot="header" class="tableHeaderContainer">
        <div class="tableHeader">
        </div>
      </div> <!-- header -->


      <template slot="thead">
        <vs-th>Inicio</vs-th>
        <vs-th>Fin</vs-th>
        <vs-th>Eliminar</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <!-- time -->
          <vs-td class="nowrap">
            <div class="inputHour">
              <inputHour v-model="tr.time" @change="modifyShippingTimeItem(tr)"/>
            </div>
          </vs-td>

          <!-- timeRange -->
          <vs-td class="nowrap">
            <div class="inputHour" style="position: relative;">
              <inputHour v-model="tr.endTime" @input="modifyShippingTimeItem(tr)"/>
              <div title="Horario fijado" v-if="tr.timeRange != 0" class="thumbtack"
              @click="setTimeRangeToZero(tr)">
                <font-awesome-icon icon="thumbtack"/>
              </div>
            </div>
          </vs-td>

          <!-- delete -->
          <vs-td class="autoWidth">
            <vs-button color="danger" type="border" size="small"
            @click="deleteItem(tr)">
              <font-awesome-icon icon="times"/>
            </vs-button>
          </vs-td>

        </vs-tr>
      </template>


    </vs-table>
    <div class="w-full mt-2">
      <vs-button type="border" @click="addShippingTimeItem()">
        <font-awesome-icon icon="plus"/>
        Agregar
      </vs-button>
    </div>

    <div class="helpText mt-5" v-if="allShippingTimesItems.length">
      * Click sobre la hora para modificarla *
    </div>

  </div>
</template>

<script>
export default {
  props: {
    SelectedShippingTime: { type: Object, required: true, },
    isActive: { type: Boolean, required: true, },
  },
  data() {
    return {
      allShippingTimesItems: [],
    } // return DATA
  }, // DATA
  watch: {
    isActive(val) {
      if (val) {
        if (typeof this.SelectedShippingTime.id != 'undefined') {
          this.loadShippingTimesItems();
        } else {
          this.allShippingTimesItems = [];
        }
      }
    },
  }, // WATCH
  methods: {
    // addShippingTimeItem
    // calculateDefaultRanges
    // deleteItem
    // getNewShippingTimeItem
    // loadShippingTimesItems
    // modifyShippingTimeItem
    // modifyShippingTimeItemDB
    // setTimeRangeToZero

    addShippingTimeItem() {
      let Params = this.getNewShippingTimeItem();
      this.conectToDB({
        file: 'ShippingTimes', action: 'addShippingTimeItem', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
            let newItem = this.getNewShippingTimeItem();
            newItem.id = res.data.data;
            this.allShippingTimesItems.push(newItem);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    calculateDefaultRanges(defaultTimeRange) {
      for (let Item of this.allShippingTimesItems) {
        Item.endTime = Item.time + (Item.timeRange || defaultTimeRange);
        if (Item.timeRange == defaultTimeRange) {
          Item.timeRange = 0;
          let Params = {
            shippingTimeItemID: Item.id,
            timeRange: Item.timeRange,
          }
          this.modifyShippingTimeItem(Params);
        }
      }
    },

    deleteItem(ShippingTimeItem) {
      if (!confirm(`¿Seguro que querés eliminar el horario "${this.minToHour(ShippingTimeItem.time)}"?`)) return;
      let Params = {
        shippingTimeItemID: ShippingTimeItem.id,
        isActive: 0,
      }
      const index = this.allShippingTimesItems.findIndex(i => i.id == ShippingTimeItem.id);
      if (index != -1) this.allShippingTimesItems.splice(index, 1);
      this.modifyShippingTimeItemDB(Params);
    },

    getNewShippingTimeItem() {
      return {
        shippingTimeID: this.SelectedShippingTime.id,
        time: 0,
        timeRange: 0,
        endTime: 0,
        datetimeCreated: this.getActualDatetimeToDB(),
        creatorEmployeeID: this.getEmployeeID(),
        isActive: 1,
      }
    },

    loadShippingTimesItems() {
      let Params = {
        shippingTimeID: this.SelectedShippingTime.id,
        isActive: 1,
      };
      this.conectToDB({
        file: 'ShippingTimes', action: 'getShippingTimeItem', params: Params,
        success: (res) => {
          let allShippingTimesItems = res.data.data;
          console.log('allShippingTimesItems', allShippingTimesItems);
          let defaultTimeRange = this.SelectedShippingTime.timeRangeDefault;
          for (let Item of allShippingTimesItems) {
            Item.endTime = Item.time + (Item.timeRange || defaultTimeRange);
          }
          this.allShippingTimesItems = allShippingTimesItems;
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    modifyShippingTimeItem(ShippingTimeItem) {
      let timeRange = ShippingTimeItem.endTime - ShippingTimeItem.time;
      let newTimeRange = timeRange == this.SelectedShippingTime.timeRangeDefault ? 0 : timeRange;
      ShippingTimeItem.timeRange = newTimeRange;
      let Params = {
        shippingTimeItemID: ShippingTimeItem.id,
        time: ShippingTimeItem.time,
        timeRange: newTimeRange,
      }
      this.modifyShippingTimeItemDB(Params);
    },

    modifyShippingTimeItemDB(paramsOriginal) {
      let Params = this.copyObj(paramsOriginal);
      console.log(Params);
      this.conectToDB({
        file: 'ShippingTimes', action: 'modifyShippingTimeItem', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    setTimeRangeToZero(ShippingTimeItem) {
      ShippingTimeItem.timeRange = 0;
      ShippingTimeItem.endTime = ShippingTimeItem.time + this.SelectedShippingTime.timeRangeDefault;
      let Params = {
        shippingTimeItemID: ShippingTimeItem.id,
        timeRange: ShippingTimeItem.timeRange,
      }
      this.modifyShippingTimeItem(Params);
    },

  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

  .inputHour {
    width: 100%;
    // width: 50%;
    // margin-left: auto;
    // margin-right: auto;
  }
  .thumbtack {
    position: absolute;
    right: 0;
    top: 5px;
    padding: 5px;
  }

</style>
