import state from './moduleState.js'
import mutations from './moduleMutations.js'
import actions from './moduleActions.js'
import getters from './moduleGetters.js'

export default {
	namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
