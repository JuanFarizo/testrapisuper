import vSelect from 'vue-select';
export const mainMixin = {
  components: {
    'v-select': vSelect,
  },
  data:()=>({
    myToken: '',
  }),

  computed: {
  }, // COMPUTED
  mounted() {
    // myToken
    if(!localStorage.myToken) {
      localStorage.myToken = this.getMyToken();
    }
    this.myToken = localStorage.myToken;
    // buyerID
    if(localStorage.buyerID) {
      vm.$store.dispatch('buyer/modifyBuyerID', localStorage.buyerID);
    }
  },
  methods: {
    // getMyToken
    // saveBuyerID
    getMyToken() {
      let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      console.log(token);
      return token;
    },
    saveBuyerID() {
      localStorage.buyerID = this.Buyer.id;
    },
  }, // METHODS
}
