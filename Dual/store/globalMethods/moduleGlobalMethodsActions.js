// loadAllSalePaymentTypes

export default {
  loadAllSalePaymentTypes({ dispatch }, Params) {
    let ParamsQuery = { isActive: 1, }
    Params.vm.conectToDB({
      file: 'Sales', action: 'getSalePaymentTypes', params: ParamsQuery,
      success: (res) => {
        if (res.data.error) { console.log(res.data.data); return; }
        Params.vm[Params.val] = res.data.data;
      }, error: (error) => { Params.vm.myNotify('danger', 'Error', error); },
    });
  },
} // export default
