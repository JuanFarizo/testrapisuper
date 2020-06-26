import state from './moduleProductsState.js'
import mutations from './moduleProductsMutations.js'
import actions from './moduleProductsActions.js'
import getters from './moduleProductsGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
