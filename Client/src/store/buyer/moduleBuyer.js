import state from './moduleBuyerState.js'
import mutations from './moduleBuyerMutations.js'
import actions from './moduleBuyerActions.js'
import getters from './moduleBuyerGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
