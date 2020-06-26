export default {
  SaleStates: [
    /* 0 */ 'Desconocido',
    /* 1 */ 'Pedido',
    /* 2 */ 'En armado',
    /* 3 */ 'Armado',
    /* 4 */ 'En control',
    /* 5 */ 'Controlado',
    /* 6 */ 'En camino',
    /* 7 */ 'Entregado',
    /* 8 */ 'Con errores',
    /* 9 */ 'Cancelado',
  ],
  SaleStateIDs: {
    Desconocido: 0,
    Pedido: 1,
    EnArmado: 2,
    Armado: 3,
    EnControl: 4,
    Controlado: 5,
    EnCamino: 6,
    Entregado: 7,
    ConErrores: 8,
    Cancelado: 9,
  },
  SaleProductsControlStateIDs: {
    pedido: 0,
    armado: 1,
    controlado: 2,
  },
  Cities: [
    { id: 1, name: 'San Carlos Centro'},
    { id: 2, name: 'San Carlos Sur'},
    { id: 3, name: 'San Carlos Norte'},
    { id: 4, name: 'Gessler'},
    { id: 5, name: 'Matilde'},
  ],
  SalePaymentTypeIDs: {
    Efectivo: 1,
    TarjetasLocales: 2,
    OtrasTarjetas: 3,
    QR: 4,
  },
  SalePaymentStateIDs: {
    EnEspera: 1,
    Pagado: 2,
    PagoCancelado: 3,
  },
  ProductPickUpStateIDs: {
    SinEncargar: 0,
    Pedido: 1,
    Recibido: 2,
  },
  DaysOfWeekIDs: {
    domingo: 0, lunes: 1, martes: 2, miercoles: 3, jueves: 4, viernes: 5, sabado: 6,
  },
  SaleTypeIDs: { saleInPlace: 1, call: 2, whatsapp: 3, instagram: 4, facebook: 5, twitter: 6, other: 7, },
  saleTypes: [
    { id: 1, label: 'Venta en local', },
    { id: 2, label: 'Llamada telefónica', },
    { id: 3, label: 'Whatsapp', },
    { id: 4, label: 'Instagram', },
    { id: 5, label: 'Facebook', },
    { id: 6, label: 'Twitter', },
    { id: 7, label: 'Otra', },
  ],
  StockChangesWebsiteZoneIDs: {
    sale: 1,
    stockChangePrompt: 2,
    cancelSale: 3,
    addProduct: 4,
    modifyProductAmount: 5,
    changeProductBy: 6, // SIN CONTROLAR
    deleteProduct: 7,
    masiveStockChanger: 8, // SIN CONTROLAR
    forceSaleStockControl: 9,
    deleteProductNoStock: 10,
  },
  accountingStates: {

  },
  SalesMistakesStateIDs: {
    SinResolver: 1,
    EnProceso: 2,
    Resuelto: 3,
  },
  SalesMistakesStates: [
    'Desconocido',
    'Sin resolver',
    'En proceso',
    'Resuelto',
  ],
  employeesRoleIDs: {
    Desconocido: 0,
    Administracion: 1,
    SubAdministracion: 2,
    Gestion: 3,
    Ventas: 4,
    Empleado: 5,
    CargaProductos: 6,
  },
  SaleProductDeletedReasonIDs: {
    NoStock: 1,
    NoWanted: 2,
    AddedByError: 3,
  },

  AllBranchsInfo: {
    phone: '3404 654696',
    email: 'contacto@rapisuper.com.ar',
  },
  SocialMedia: {
    Instagram: {
      name: 'rapi.super',
      url: 'https://www.instagram.com/rapi.super'
    },
    Facebook: {
      name: 'Rapisuper',
      url: 'https://www.facebook.com/rapisuper.com.ar',
    },
    Twitter: null,
  },
  ExternalLinks: {
    AppAndroid: 'https://play.google.com/store/apps/details?id=com.axter.rapisuper',
    AppIOS: 'https://apps.apple.com/ar/app/rapisuper/id1492181552?l=es',
  }
} // export default
