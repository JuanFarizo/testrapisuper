<template>
  <div>

    <h1 class="tt-title-subpages mt-1 movileTitle">CARRO</h1>
    <div v-if="!isPurchaseFinished">
      <div ref="hiddenHeader"></div>
      <tab-products v-if="actualTab == 1" @goNextTab="goNextTab" ref="TabProducts"/>
      <tab-address v-if="actualTab == 2" @goNextTab="goNextTab" @goPreviousTab="goPreviousTab"/>
      <tab-payment-and-time @goNextTab="goNextTab" @goPreviousTab="goPreviousTab"
      v-if="actualTab == 3" :DaysList="DaysList"
      @purchaseFinished="isPurchaseFinished = true; result = $event"/>
    </div>
    <div v-else>
      <finished-purchase :result="result"/>
    </div>

  </div>
</template>

<script>
export default {
  components: {
    TabProducts: () => import('./components/cart/Tab1-Products.vue'),
    TabAddress: () => import('./components/cart/Tab2-Address.vue'),
    TabPaymentAndTime: () => import('./components/cart/Tab3-PaymentAndTime.vue'),
    FinishedPurchase: () => import('./components/cart/FinishedPurchase.vue'),
  },
  data() {
    return {
      actualTab: 1,
      isPurchaseFinished: false,
      result: false,
      reloaded: false,
      // Horarios
      DaysList: [], // shipping times options per day
      daysOfDiference: 0, // diference in days (to today) of the showed date shipping times
      daysToShow: 2, // amount of days to select
    }; // return DATA
  }, // DATA
  computed: {
  }, // COMPUTED
  watch: {
    'Cart.selectedAddressID'(val) {
      this.fillAddress(val);
    },
    'Cart.selectedReceiverID'(val) {
      this.fillReceiver(val);
    },
    '$route.query': function() {
      this.getQueryMain();
    },
    // actualTab(val) {
    //   if (val == 1) {
    //     console.log(this.$refs);
    //     console.log(this.$refs.TabProducts);
    //     this.$refs.tab1.loadDiscount();
    //   }
    // },
  }, // WATCH
  created() {
    this.reloaded = true;
    this.getQueryMain();
    this.loadAddressList();
    this.loadReceiverList();
    this.isPurchaseFinished = false;
    this.checkAllStock();
    this.calculateTimeList();
  }, // CREATED
  mounted() {
    // setTimeout(() => {
    //   this.actualTab = 3;
    // }, 100);
  },
  methods: {
    // checkAllStock
    // goNextTab
    // goPreviousTab
    // updateTab

    // HORARIO
    // calculateTimeList
    // loadShippingTimes
    // assignDay
    checkAllStock() {
      console.log('Controlo todos los stocks');
    },
    goNextTab() {
      this.actualTab++
      this.updateTab();
    },
    goPreviousTab() {
      this.actualTab--;
      this.updateTab();
    },
    updateTab() {
      let position = this.$refs.hiddenHeader.offsetTop;
      this.myScrollTo(position-150);
      this.finishUpdateURL({tab: this.actualTab});
    },

    calculateTimeList() { // gets the time list of one day, if not times are founded recalls itself
      // avoid loops
      if (this.daysOfDiference > 14) {
        if (!this.DaysList.length) this.myNotify('danger', 'Error', 'No se pudieron cargar los horarios');
        return;
      }
      // get exceptions
      let date = this.getActualDateToDB({day: this.daysOfDiference});
      let Params = {
        date: date,
        cityID: this._City.id, // check is the same cityID, or cityID = 0
      }
      this.conectToDB({
        file: 'ShippingTimesExceptions', action: 'getException', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let Exception = res.data.data[0];
          let dayName = this.daysOfWeekNames[this.getActualDayOfWeek({ day: this.daysOfDiference })];
          // get shippingTimeID common or by exception
          let shippingTimeID = this._City[`${dayName}ShippingTimeID`];
          if (typeof Exception != 'undefined') {
            shippingTimeID = Exception.shippingTimeID;
          }
          if (shippingTimeID == 0) { // closed
            this.daysOfDiference++;
            this.calculateTimeList();
          } else {
            this.loadShippingTimes(date, shippingTimeID);
          }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });

    },

    loadShippingTimes(date, shippingTimeID) { // adds the time items to the day
      let Params = {
        shippingTimeID: shippingTimeID,
        isActive: 1,
      }
      this.conectToDB({
        file: 'ShippingTimes', action: 'getShippingTimeItem', params: Params,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          let ShippingTimeItems = res.data.data;
          if (ShippingTimeItems.length) {

            ShippingTimeItems = this.assignDay(ShippingTimeItems);
            if (ShippingTimeItems.length) {
              let Day = {
                name: this.getNameOfDate(date, {year: false}),
                date: date,
                timeList: ShippingTimeItems,
              }
              this.DaysList.push(Day);
              // // select item (not working)
              // if (this.DaysList.length == 1) {
              //   let firstItem = { date: Day.date, time: Day.timeList[0].time, }
              //   this.ReceptionDatetime = firstItem;
              // }
            }
          }
          this.daysOfDiference++;
          // continue adding
          if (this.DaysList.length < this.daysToShow) {
            this.calculateTimeList();
          }
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      });
    },

    assignDay(FullList) {
      let check = this.daysOfDiference == 0;
      let NewList = [];
      let realNow = this.getActualMinutesOfDay();
      let now = realNow;
      for (let Time of FullList) {
        if (check) {
          // if (!this.Buyer.isAdmin) {
            now = realNow + +(Time.timeToCutBefore ? Time.timeToCutBefore : Time.timeToCutBeforeDefault);
          // }
          if (Time.time <= now) continue;
        }
        NewList.push(Time);
      }
      return NewList;
    },


  }, // METHODS
} // export default
</script>

<style lang="scss">

.continueButton:focus {
  box-shadow: 0 8px 25px -8px rgba(var(--vs-primary),1) !important;
}
.cartTab {
  margin-top: 30px;
}
.tabTitle {
  font-weight: bold;
  font-size: 25px;
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 15px;
  color: #22223E;
}
</style>
