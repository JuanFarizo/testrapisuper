/*=========================================================================================
  Strucutre:
    url     => router path
    name    => name to display in sidebar
    slug    => router path name
    icon    => Feather Icon component/icon name
    tag     => text to display on badge
    tagColor  => class to apply on badge element
    i18n    => Internationalization
    submenu   => submenu of current item (current item will become dropdown )
          NOTE: Submenu don't have any icon(you can add icon if u want to display)
    isDisabled  => disable sidebar item/group
==========================================================================================*/

import store from '@/store/store.js';

let sidebarItemsOptions = [
  // Testing
  [
    { header: 'Testing', },
    { name: 'Compras', url: 'purchases', icon: 'ShoppingBagIcon', slug: 'purchases', },
    { name: 'Contabilidad', url: 'accounting', icon: 'DollarSignIcon', slug: 'accounting', },
    { name: 'Nueva compra', url: 'newPurchase', icon: 'ShoppingBagIcon', slug: 'newPurchase', },
    { name: 'Clientes', url: 'buyers', icon: 'UserIcon', slug: 'buyers', },
    { name: 'Proveedores', url: 'suppliers', icon: 'TruckIcon', slug: 'suppliers', },
    { name: 'Campañas', url: 'marketingCampains', icon: 'UserIcon', slug: 'marketingCampains', },
    { name: 'Ventas local', url: 'localSales', icon: 'UserIcon', slug: 'localSales', },
    { name: 'Historial descuentos', url: 'discountsHistory', icon: 'ListIcon', slug: 'discountsHistory', },
  ],
  // 1 Administración
  [
    { header: 'Análisis', },
    { name: 'Estadísticas', url: 'stats', icon: 'TrendingUpIcon', slug: 'stats', },
    { name: 'Historial precios', url: 'priceHistory', icon: 'DollarSignIcon', slug: 'priceHistory', },

    { header: 'Administrar', },
    { name: 'Productos', url: 'products', icon: 'BoxIcon', slug: 'products', },
    { name: 'Ventas', url: 'sales', icon: 'ShoppingCartIcon', slug: 'sales', },
    // { name: 'Compras', url: 'purchases', icon: 'ShoppingBagIcon', slug: 'purchases', },
    // { name: 'Contabilidad', url: 'accounting', icon: 'DollarSignIcon', slug: 'accounting', },
    { name: 'Errores', url: 'saleMistakes', icon: 'AlertCircleIcon', slug: 'saleMistakes', },

    { header: 'Configuración', },
    { name: 'General', url: 'config', icon: 'SettingsIcon', slug: 'config', },
    { name: 'Ciudades', url: 'cities', icon: 'MapPinIcon', slug: 'cities', },
    { name: 'Horarios envío', url: 'shippingTimes', icon: 'ClockIcon', slug: 'shippingTimes', },
    { name: 'Fechas especiales', url: 'shippingTimesExceptions', icon: 'CalendarIcon', slug: 'shippingTimesExceptions', },

    // { header: 'Crear', },
    // { name: 'Nueva compra', url: 'newPurchase', icon: 'ShoppingBagIcon', slug: 'newPurchase', },

    { header: 'Descuentos', },
    { name: 'Descuentos', url: 'discounts', icon: 'AwardIcon', slug: 'discounts', },
    // { name: 'Historial descuentos', url: 'discountsHistory', icon: 'ListIcon', slug: 'discountsHistory', },

    { header: 'Stock', },
    { name: 'Movimientos de stock', url: 'stockMovements', icon: 'ActivityIcon', slug: 'stockMovements', },

    { header: 'Empleados', },
    { name: 'Empleados', url: 'employees', icon: 'UserIcon', slug: 'employees', },
    { name: 'Horarios', url: 'employeesSchedules', icon: 'ClockIcon', slug: 'employeesSchedules', },

    { header: 'Características', onlyMainHouse: true, },
    { name: 'Categorías', url: 'categories', icon: 'FilterIcon', slug: 'categories', onlyMainHouse: true, },
    { name: 'Marcas', url: 'brands', icon: 'BookmarkIcon', slug: 'brands', onlyMainHouse: true, },
    // { name: 'Proveedores', url: 'suppliers', icon: 'TruckIcon', slug: 'suppliers', onlyMainHouse: true, },

    // { header: 'Marketing', },
    // { name: 'Campañas', url: 'marketingCampains', icon: 'UserIcon', slug: 'marketingCampains', },

    // { header: 'Clientes', },
    // { name: 'Clientes', url: 'buyers', icon: 'UserIcon', slug: 'buyers', },
    // { name: 'Mensajes', url: 'messages', icon: 'MailIcon', slug: 'messages', },
  ],
  // 2 Sub administración
  [
    { header: 'Administrar', },
    { name: 'Productos', url: 'products', icon: 'BoxIcon', slug: 'products', },
    { name: 'Ventas', url: 'sales', icon: 'ShoppingCartIcon', slug: 'sales', },
    { name: 'Errores', url: 'saleMistakes', icon: 'AlertCircleIcon', slug: 'saleMistakes', },

    { header: 'Stock', },
    { name: 'Movimientos de stock', url: 'stockMovements', icon: 'ActivityIcon', slug: 'stockMovements', },

    { header: 'Empleados', },
    { name: 'Empleados', url: 'employees', icon: 'UserIcon', slug: 'employees', },
    { name: 'Horarios', url: 'employeesSchedules', icon: 'ClockIcon', slug: 'employeesSchedules', },
  ],
  // 3 Gestión
  [
    { header: 'Administrar', },
    { name: 'Productos', url: 'products', icon: 'BoxIcon', slug: 'products', },
    { name: 'Ventas', url: 'sales', icon: 'ShoppingCartIcon', slug: 'sales', },
    { name: 'Errores', url: 'saleMistakes', icon: 'AlertCircleIcon', slug: 'saleMistakes', },

    { header: 'Stock', },
    { name: 'Movimientos de stock', url: 'stockMovements', icon: 'ActivityIcon', slug: 'stockMovements', },
  ],
  // 4 Ventas
  [
    { header: 'Administrar', },
    { name: 'Ventas', url: 'sales', icon: 'ShoppingCartIcon', slug: 'sales', },
    { name: 'Productos', url: 'products', icon: 'BoxIcon', slug: 'products', },
    // { header: 'Imágenes', },
    // { name: 'Android', url: 'img-android', icon: 'ImageIcon', slug: 'img-android', },
    // { name: 'Iphone', url: 'img-iphone', icon: 'ImageIcon', slug: 'img-iphone', },
  ],
  // 5 Employee
  [],
  // 6 Carga productos
  [
    { header: 'Administrar', },
    { name: 'Ventas', url: 'sales', icon: 'ShoppingCartIcon', slug: 'sales', },
    { name: 'Productos', url: 'products', icon: 'BoxIcon', slug: 'products', },
  ],
];

export default sidebarItemsOptions;
