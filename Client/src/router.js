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

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
      return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '',
      component: () => import('./layouts/Main.vue'),
      children: [
        {
          path: '/', redirect: 'catalogue',
        },
        {
          path: 'index', name: 'index', redirect: 'catalogue',
          component: () => import('./views/Catalogue.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Index',
          }
        },
        {
          path: 'categories', name: 'categories',
          component: () => import('./views/Categories.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Categorías',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Categorías', active: true }, ],
          }
        },
        {
          path: 'catalogue', name: 'catalogue',
          component: () => import('./views/Catalogue.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Catálogo',
            breadcrumb: [ { title: 'Home', url: '/' },{ title: 'Catálogo', active: true }, ],
          }
        },
        {
          path: 'cart', name: 'cart',
          component: () => import('./views/Cart.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Carro',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Catálogo', url:'/catalogue'}, { title: 'Carro', active: true }, ],
          }
        },
        {
          path: 'info', name: 'info',
          component: () => import('./views/Info.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Cómo comprar',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Cómo comprar', url:'/info'}, ],
          }
        },
        {
          path: 'contact', name: 'contact',
          component: () => import('./views/Contact.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Contacto',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Contacto', url:'/contact'}, ],
          }
        },
        {
          path: 'games', name: 'games',
          component: () => import('./views/Games.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Juegos',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Contacto', url:'/contact'}, ],
          }
        },
        {
          path: 'shippingTime', name: 'shippingTime',
          component: () => import('./views/ShippingTime.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Horarios de envío',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Horarios de envío', url:'/shippingTime'}, ],
          }
        },
        {
          path: 'home', name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            rule: 'editor', pageTitle: 'Inicio',
            breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Inicio', url:'/home'}, ],
          }
        },
        // {
        //   path: 'product/:id', name: 'product',
        //   component: () => import('./views/Product.vue'),
        //   meta: {
        //     rule: 'editor', pageTitle: 'Producto',
        //     breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Catálogo', url:'/catalogue'}, { title: 'Producto', active: true }, ],
        //   }
        // },
        // {
        //   path: 'register', name: 'register',
        //   component: () => import('./views/Register.vue'),
        //   meta: {
        //     rule: 'editor', pageTitle: 'Registro',
        //     breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Registro', url:'/register'}, ],
        //   }
        // },
        // {
        //   path: 'account', name: 'account',
        //   component: () => import('./views/Account.vue'),
        //   meta: {
        //     rule: 'editor', pageTitle: 'Cuenta',
        //     breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Cuenta', url:'/account'}, ],
        //   }
        // },
        // {
        //   path: 'invoice', name: 'invoice',
        //   component: () => import('./views/Invoice.vue'),
        //   meta: {
        //     rule: 'editor', pageTitle: 'Factura',
        //     breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Cuenta', url: '/profile', }, { title: 'Factura', url:'/invoice'}, ],
        //   }
        // },
        // {
        //   path: 'profile', name: 'profile',
        //   component: () => import('./views/Profile.vue'),
        //   meta: {
        //     rule: 'editor', pageTitle: 'Cuenta',
        //     breadcrumb: [ { title: 'Home', url: '/' }, { title: 'Cuenta', url:'/profile'}, ],
        //   }
        // },


        //           //
        // REDIRECTS //
        //           //


      ] // children Client
    }, // main
    {
      path: '/app',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        { path: '/', redirect: { name: 'app-download' }, },
        {
          path: 'iPhone', name: 'app-iPhone',
          component: () => import('@/views/pages/apps/iPhone.vue'),
          meta: { rule: 'editor', pageTitle: 'App iPhone', }
        },
        {
          path: 'android', name: 'app-android',
          component: () => import('@/views/pages/apps/Android.vue'),
          meta: { rule: 'editor', pageTitle: 'App android', }
        },
        {
          path: 'download', name: 'app-download',
          component: () => import('@/views/pages/apps/Download.vue'),
          meta: { rule: 'editor', pageTitle: 'Apps', }
        },

      ]
    },

    {
      path: '/users',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        { path: '/', redirect: { name: 'user' }, },
        {
          path: 'change-password', name: 'change-pass',
          component: () => import('@/views/components/users/changePassword.vue'),
          meta: { rule: 'editor', pageTitle: 'Cambiar contraseña', }
        },
      ]
    },

    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        {
          path: '/pages/lock-screen', name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: { rule: 'editor' }
        },
        {
          path: '/pages/comingsoon', name: 'page-coming-soon', redirect: '/',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: { rule: 'editor' }
        },
        {
          path: '/pages/error-404', name: 'page-error-404', redirect: '/',
          component: () => import('@/views/pages/Error404.vue'),
          meta: { rule: 'editor' }
        },
        {
          path: '/pages/error-500', name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: { rule: 'editor' }
        },
        {
          path: '/pages/not-authorized', name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: { rule: 'editor' }
        },
        {
          path: '/pages/maintenance', name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: { rule: 'editor' }
        },
      ]
    },






    // Redirect to 404 page, if no match found
    // {
    //   path: '*',
    //   redirect: '/pages/error-404'
    // }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
      appLoading.style.display = "none";
    }
})

router.beforeEach((to, from, next) => {
  // return next();
  let vm = new Vue({});
  if (vm.getCityID()) {
    vm.setBranchByCity(store, () => {
      return next();
    });
  } else {
    return next();
  }
  // firebase.auth().onAuthStateChanged(() => {
  //   // get firebase current user
  //   const firebaseCurrentUser = firebase.auth().currentUser;
  //   if (
  //     to.path === "/pages/login" ||
  //     to.path === "/pages/forgot-password" ||
  //     to.path === "/pages/error-404" ||
  //     to.path === "/pages/error-500" ||
  //     to.path === "/pages/register" ||
  //     to.path === "/pages/comingsoon" ||
  //     (!!firebaseCurrentUser)
  //   ) {
  //   }
  //   router.push({ path: '/pages/login', query: { to: to.path } })
  //   // Specify the current path as the customState parameter, meaning it
  //   // will be returned to the application after auth
  //   // auth.login({ target: to.path });
  // });
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

router.afterEach((to, from) => {
  let defaultTitle = 'Rapisuper';
  document.title = `${to.meta.pageTitle} - ${defaultTitle}` || defaultTitle;
});


export default router
