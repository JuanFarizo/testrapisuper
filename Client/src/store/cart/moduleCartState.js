export default {
  // iPhoneCounter: 0,

  cartItems: [],
  isForMe: false,
  isReceived: false,
  selectedAddressID: 0,
  selectedReceiverID: 0,
  cartHasBeenLoaded: false,
  shippingNeeded: true,
  totalTotal: 0,
  totalProducts: 0,
  appliedDiscount: 0,
  totalShipping: 0,
  totalItemsAmount: 0,
  saleTypeID: 0,
  buyerEmployeeID: 0,
  Seller: {
    id: 0,
    name: '',
    nick: '',
  },
  ReceptionDatetime: { date: '', time: '', timeRange: 0, },
  Receiver: {
    id: 0, name: '', surname: '', Phone: '',
  },
  Address: {
    streetName: '',
    streetNumber: '',
    floorAndDepartment: '',
    extraReferences: '',
    cityID: null,
    city: '',
  },
  Discount: {
    id: 0, // this is actually, the codeID
    avaibleUses: 0,
    buyerID: 0,
    buyerName: '',
    buyerSurname: '',
    code: '',
    discountID: 0,
  },
} // export default
