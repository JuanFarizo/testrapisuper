/*=========================================================================================
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
          path => router path
          name => router name
          component(lazy loading) => component to load
          meta : {
            rule => which user can have access (ACL)
            breadcrumb => Add breadcrumb to specific page
            pageTitle => Display title besides breadcrumb
          }
==========================================================================================*/

import Vue from 'vue';
import VueAnalytics from 'vue-ua';
import Router from 'vue-router';
import store from '@/store/store.js';
Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('./layouts/Main.vue'),
      children: [
        {
          path: '/', redirect: 'sales'
        },
        {
          path: 'home', name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Inicio',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Inicio', active: true }, ],
          },
        },
        {
          path: 'stats', name: 'stats',
          component: () => import('./views/Stats.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Estadísticas',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Estadísticas', active: true }, ],
          },
        },
        {
          path: 'products', name: 'products',
          component: () => import('./views/Products.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Productos',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Productos', active: true }, ],
          },
        },
        {
          path: 'productsFullList', name: 'productsFullList',
          component: () => import('./views/ProductsFullList.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Todos los productos',
            breadcrumb: [ { title: 'Home', url: '/' },  { title: 'Productos', url: 'products' }, { title: 'Todos los productos', active: true }, ],
          },
        },
        {
          path: 'sales', name: 'sales',
          component: () => import('./views/Sales.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Ventas',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Ventas', active: true }, ],
          },
        },
        {
          path: 'purchases', name: 'purchases',
          component: () => import('./views/Purchases.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Compras',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Compras', active: true }, ],
          },
        },
        {
          path: 'config', name: 'config',
          component: () => import('./views/Config.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Configuración',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Configuración', active: true }, ],
          },
        },
        {
          path: 'newPurchase', name: 'newPurchase',
          component: () => import('./views/NewPurchase.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Nueva compra',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Nueva compra', active: true }, ],
          },
        },
        {
          component: () => import('./views/Categories.vue'),
          path: 'categories', name: 'categories',
          meta: {
            rule: 'editor', pageTitle: 'Categorías',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Categorías', active: true }, ],
          },
        },
        {
          path: 'brands', name: 'brands',
          component: () => import('./views/Brands.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Marcas',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Marcas', active: true }, ],
          },
        },
        {
          path: 'suppliers', name: 'suppliers',
          component: () => import('./views/Suppliers.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Proveedores',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Proveedores', active: true }, ],
          },
        },
        {
          path: 'accounting', name: 'accounting',
          component: () => import('./views/Accounting.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Contabilidad',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Contabilidad', active: true }, ],
          },
        },
        {
          path: 'buyers', name: 'buyers',
          component: () => import('./views/Buyers.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Clientes',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Clientes', active: true }, ],
          },
        },
        {
          path: 'messages', name: 'messages',
          component: () => import('./views/Messages.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Mensajes',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Mensajes', active: true }, ],
          },
        },
        {
          path: 'stockMovements', name: 'stockMovements',
          component: () => import('./views/StockMovements.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Movimientos de stock',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Movimientos de stock', active: true }, ],
          },
        },
        {
          path: 'saleMistakes', name: 'saleMistakes',
          component: () => import('./views/SaleMistakes.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Errores en las ventas',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Ventas', url: '/sales' }, { title: 'Errores en las ventas', active: true }, ],
          },
        },
        {
          path: 'employees', name: 'employees',
          component: () => import('./views/Employees.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Empleados',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Empleados', active: true }, ],
          },
        },
        {
          path: 'marketingCampains', name: 'marketingCampains',
          component: () => import('./views/MarketingCampains.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Campañas de marketing',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Campañas de marketing', active: true }, ],
          },
        },
        {
          path: 'discounts', name: 'discounts',
          component: () => import('./views/Discounts.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Descuentos para compras',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Descuentos para compras', active: true }, ],
          },
        },
        {
          path: 'discountsHistory', name: 'discountsHistory',
          component: () => import('./views/DiscountsHistory.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Historial de descuentos',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Historial de descuento', active: true }, ],
          },
        },
        {
          path: 'employeesSchedules', name: 'employeesSchedules',
          component: () => import('./views/EmployeesSchedules.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Horarios',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Horarios', active: true }, ],
          },
        },
        {
          path: 'cities', name: 'cities',
          component: () => import('./views/Cities.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Ciudades',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Ciudades', active: true }, ],
          },
        },
        {
          path: 'shippingTimes', name: 'shippingTimes',
          component: () => import('./views/ShippingTimes.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Horarios de envío',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Horarios de envío', active: true }, ],
          },
        },
        {
          path: 'shippingTimesExceptions', name: 'shippingTimesExceptions',
          component: () => import('./views/ShippingTimesExceptions.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Fechas especiales',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Horarios de envío', url: 'shippingTimes' }, { title: 'Fechas especiales', active: true }, ],
          },
        },
        {
          path: 'priceHistory', name: 'priceHistory',
          component: () => import('./views/PriceHistory.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Historial precios',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Historial de precios', active: true }, ],
          },
        },

        {
          path: 'localSales', name: 'localSales',
          component: () => import('./views/LocalSales.vue'),
          meta: {
            rule: 'editor', pageTitle: 'localSales',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Ventas en local', active: true }, ],
          },
        },
        // {
        //   path: '*',
        //   redirect: 'page-error404'
        // },
      ], // children
    }, // path ''
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '/pages',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        {
          path: 'login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Ingresar'
          }
        },
        {
          path: 'error404', name: 'page-error404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: { rule: 'editor', pageTitle: 'Error 404' }
        },
        {
          path: 'notAuthorized', name: 'page-notAuthorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: { rule: 'editor', pageTitle: 'No Autorizado' }
        },
        // Redirect to 404 page, if no match found
        {
          path: '*',
          redirect: {name:'page-error404'}
        },
      ] // children
    }, // path 'pages'
    {
      path: '*',
      redirect: {name:'page-error404'}
    },
  ] // routes
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
      appLoading.style.display = "none";
    }
})


let permissionsByRole = [
  // 0 Nada
  [
    'home',
  ],
  // 1 Administrador
  [
    'home',
    'stats',
    'products',
    'productsFullList',
    'sales',
    'purchases',
    'config',
    'newPurchase',
    'categories',
    'brands',
    'suppliers',
    'accounting',
    'buyers',
    'messages',
    'stockMovements',
    'saleMistakes',
    'employees',
    'marketingCampains',
    'discounts',
    'discountsHistory',
    'employeesSchedules',
    'cities',
    'shippingTimes',
    'shippingTimesExceptions',
    'priceHistory',
    'localSales',
  ],
  // 2 Sub administración
  [
    'home',
    'sales',
    'products',
    'stockMovements',
    'saleMistakes',
    'employees',
    'employeesSchedules',
  ],
  // 3 Gestión
  [
    'home',
    'sales',
    'products',
    'stockMovements',
    'saleMistakes',
    'employees',
  ],
  // 4 Ventas
  ['home', 'sales', 'products',],
  // 5 Empleado
  ['home', ],
  // 6 Carga productos
  ['home', 'sales', 'products', 'productsFullList'],
];

let noControledPaths = [
  'page-login',
  'page-notAuthorized',
  'page-forgot-password',
  'page-error404',
  'page-error-500',
  'page-register',
  'page-comingsoon',
]

function goToLogin(to = { path: 'sales' }) {
  router.push({ name: 'page-login', query: { to: to.path } })
}
function goHome() {
  router.push({ name: 'home', });
}
function goNoAuthorized() {
  router.push({ name: 'page-notAuthorized', });
}

router.beforeEach((to, from, next) => {
  let vm = new Vue({});
  if (to.name == null) {
    router.push('/');
    return;
  }

  // load Employee, load Branch and continue
  let finishGiveAccess = (Employee, to) => {
    if (!Employee.isWorking) {
      goHome();
      return;
    }
    for (let permittedPage of permissionsByRole[Employee.roleID]) {
      if (permittedPage == to.name) {
        return next();
      }
    }
    goNoAuthorized();
    return;
  }

  // ! starts running here
  vm.loadAllEmployees((allEmployees, Employee) => {
    // no controled paths
    for (let path of noControledPaths) {
      if (to.name === path) return next();
    }
    // control access
    if (typeof Employee == 'undefined') {
      goToLogin(to);
      return;
    }
    // set allEmployees of branch
    allEmployees = allEmployees.filter(i => i.branchID == Employee.branchID);
    store.dispatch('dataDB/setAllEmployees', allEmployees);
    // load/set Branch
    if (vm._Branch.id) {
      finishGiveAccess(Employee, to);
      return;
    }
    let Params = {
      branchID: Employee.branchID,
    }
    vm.conectToDB({
      file: 'Branches', action: 'getBranch', params: Params,
      success: (res) => {
        if (res.data.error) { console.log(res.data.data); return; }
        let Branch = res.data.data[0];
        // console.log('Branch', Branch);
        store.dispatch('dataDB/setBranch', Branch);
        finishGiveAccess(Employee, to);
        return;
      }, error: (error) => { vm.myNotify('danger', 'Error', error); },
    });
  }); // loadAllEmployees
}); // beforeEach

router.afterEach((to, from) => {
  let defaultTitle = 'Admin Rapisuper';
  document.title = `${to.meta.pageTitle} - ${defaultTitle}` || defaultTitle;
});




// - - - - - - - - - - Analytics - - - - - - - - - - //

Vue.use(VueAnalytics, {
  // [Required] The name of your app as specified in Google Analytics.
  appName: 'Rapisuper',
  // [Required] The version of your app.
  appVersion: '1.0',
  // [Required] Your Google Analytics tracking ID.
  trackingId: '<your_tracking_id>',
  // If you're using vue-router, pass the router instance here.
  vueRouter: router,

  // // Global Dimensions and Metrics can optionally be specified.
  // globalDimensions: [
  //   { dimension: 1, value: 'FirstDimension' },
  //   { dimension: 2, value: 'SecondDimension' }
  //   // Because websites are only 2D, obviously. WebGL? What's that?
  // ],

  // globalMetrics: [
  //   { metric: 1, value: 'MyMetricValue' },
  //   { metric: 2, value: 'AnotherMetricValue' }
  // ]
});


export default router
