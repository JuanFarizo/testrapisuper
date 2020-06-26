import state from './moduleGlobalMethodsState.js'
import mutations from './moduleGlobalMethodsMutations.js'
import actions from './moduleGlobalMethodsActions.js'
import getters from './moduleGlobalMethodsGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
