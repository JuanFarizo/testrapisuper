export const userMixin = {
  data() { return {
    NewAddress: this.getNewAddress(),
    NewReceiver: this.getNewReceiver(),
    NewBuyer: this.getNewBuyer(),

    temporalAccountID: 0,
    hasAccount: false,
  };}, // DATA
  watch: {
    'NewAddress.cityID'(cityID) {
      if (cityID == 0) return;
      const index = this._allCities.findIndex(i => i.id == cityID);
      this.NewAddress.city = index == -1 ? '' : this._allCities[index].name;
    },
  }, // WATCH
  computed: {
  }, // COMPUTED
  methods: {

    addNewAddressDB() {
      let Params = this.copyObj(this.NewAddress);
      Params.buyerID = this.Buyer.id;
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'addAddress', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          Params.id = res.data.data;
          vm.$store.dispatch('buyer/addAddress', Params);
          vm.$store.dispatch('cart/updateSelectedAddressID', res.data.data);
          // Hide form
          vm.addNewAddress = false;
          // clear NewAddress
          vm.NewAddress = vm.getNewAddress();
        },
      });
    },
    addNewBuyerDB(register) {
      this.$store.dispatch("cart/modifyCartAddress", this.NewAddress);

      let Params = this.copyObj(this.NewBuyer);
      Params.token = this.myToken;
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'addBuyer', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.$store.dispatch('buyer/modifyBuyerID', res.data.data);
          vm.addNewAddressDB();
          vm.addNewReceiverDB(true);
          if (register) {
            vm.addNewEmailDB();
            vm.addNewPasswordDB();
          }
        }
      });
    },

    modifyBuyerDB(ParamsOriginal) {
      let Params = this.copyObj(ParamsOriginal);
      Params.buyerID = this.Buyer.id;
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'modifyBuyer', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          // nada
        }
      });
    },

    addNewEmailDB() {
      let Params = {
        buyerID: this.Buyer.id,
        email: this.NewBuyer.email,
        isSuscriptionActive: 0,
        createdReasonID: 1 // Al crear buyer
      }
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'addEmail', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.modifyBuyerDB({emailID: res.data.data})
        }
      });
    },

    addNewPasswordDB() {
      let Params = {
        buyerID: this.Buyer.id,
        pass: this.NewBuyer.pass,
      }
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'addPass', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.modifyBuyerDB({passID: res.data.data})
        }
      });
    },

    addNewReceiverDB(addToBuyer = false) {
      let Params = this.copyObj(this.NewReceiver);
      Params.buyerID = this.Buyer.id;
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'addReceiver', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          if (addToBuyer) {
            vm.modifyBuyerDB({receiverID: res.data.data})
          }
          let MyNewReceiver = {
            id: res.data.data,
            buyerID: Params.buyerID,
            name: Params.name,
            surname: Params.surname,
            phone: Params.phone,
          }
          vm.$store.dispatch('buyer/addReceiver', MyNewReceiver);
          vm.$store.dispatch('cart/updateSelectedReceiverID', MyNewReceiver.id);
          // hide form
          vm.addNewReceiver = false;
          // clear
          vm.NewReceiver = vm.getNewReceiver();
        }, error: function(error) { console.log(error); vm.myNotify('danger', 'Error', 'Error al crear dirección'); },
      });
    },
    fillAddress(addressID) {
      const index = this.AddressList.findIndex(i => i.id == addressID);
      this.$store.dispatch("cart/modifyCartAddress", this.AddressList[index]);
    },
    fillReceiver(receiverID) {
      const index = this.ReceiverList.findIndex(i => i.id == receiverID);
      this.$store.dispatch("cart/modifyCartReceiver", this.ReceiverList[index]);
    },
    getNewAddress() {
      return {
        streetName: '',
        streetNumber: '',
        floorAndDepartment: '',
        city: '',
        cityID: 0,
        extraReferences: '',
      };
    },
    getNewBuyer() {
      return { email: '', pass: '' }
    },
    getNewReceiver() {
      return { name: '', surname: '', phone: '', };
    },
    loadAddressList() {
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'getAddress', params: { buyerID: this.Buyer.id, isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.$store.dispatch('buyer/clearAddresses');
          for (let Item of res.data.data) {
            vm.$store.dispatch('buyer/addAddress', Item);
          }
          // select address
          vm.$store.dispatch('cart/updateSelectedAddressID', res.data.data.length ? res.data.data[0].id : 0);
        }
      });
    },
    loadReceiverList() {
      const vm = this;
      this.conectToDB({
        file: 'Buyers', action: 'getReceiver', params: { buyerID: this.Buyer.id, isActive: 1 },
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
          vm.$store.dispatch('buyer/clearReceivers');
          for (let Item of res.data.data) {
            vm.$store.dispatch('buyer/addReceiver', Item);
          }
          // select Receiver
          vm.selectedReceiver = res.data.data.length ? res.data.data[0].id : 0;
        }, error: function(error) { vm.myNotify('danger', 'Error', 'Error al cargar destinatarios'); },
      });
    },
    saveWholeBuyer(register) {
      if (!this.validateNewForm('receiver')) return false;
      if (this.Cart.shippingNeeded) {
        if (!this.validateNewForm('address'))  return false;
      }
      if (register) {
        if (!this.validateNewForm('buyer'))    return false;
      }
      this.addNewBuyerDB(register);
      return true;
    },
    validateNewForm(form) {
      switch (form) {
        case 'address':
          return this.validateFields(this.NewAddress, {streetName: 'Calle', streetNumber: 'Número de calle', cityID: 'Ciudad'});
          break;
        case 'buyer':
          return this.validateFields(this.NewBuyer, {email: 'Email', pass: 'Contraseña'});
          break;
        case 'receiver':
          return this.validateFields(this.NewReceiver, {name: 'Nombre', surname: 'Apellido'});
          break;
        default: return false;
      }
    },

    setUserBasicConfig() {
      this.setUserCity();
      this.setUserBranch();
      this.setBranchByCity(this.$store, () => {
        this.loadProducts();
      });
    },

    setUserCity() {
      let cityID = this.getCityID();
      let allCities = this._allCities;
      let index = allCities.findIndex(i => i.id == cityID);
      if (index == -1) return;
      this.$store.dispatch('dataDB/setCity', allCities[index]);
    },

    setUserBranch() {
      let index = this._allBranches.findIndex(i => i.id == this._City.branchID);
      if (index == -1) return;
      this.$store.dispatch('dataDB/setBranch', this._allBranches[index]);
    },

  }, // METHODS
}
