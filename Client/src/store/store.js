import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

import moduleGlobalMethods from '@/../../Dual/store/globalMethods/moduleGlobalMethods.js';
import moduleDataDB from '@/../../Dual/store/dataDB/index.js';
import moduleLocalDB from '@/../../Dual/store/localDB/index.js';

import moduleAuth from './auth/moduleAuth.js';
import moduleBuyer from './buyer/moduleBuyer.js';
import moduleCart from './cart/moduleCart.js';
import moduleLayout from './layout/moduleLayout.js';
import moduleProducts from './products/moduleProducts.js';


export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    globalMethods: moduleGlobalMethods,
    dataDB: moduleDataDB,
    localDB: moduleLocalDB,

    auth: moduleAuth,
    buyer: moduleBuyer,
    cart: moduleCart,
    layout: moduleLayout,
    products: moduleProducts,
  },

  strict: process.env.NODE_ENV !== 'production'

})
