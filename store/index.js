import Vuex from 'vuex'
import md5 from 'md5'
import db from '~/plugins/firestore'
import { saveUserData, clearUserData } from '~/utils'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loading: false,
      token: '',
      user: null
    },
    mutations: {
      setLoading(state, loading) {
        state.loading = loading
      },
      setUser(state, user) {
        state.user = user
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken: state => (state.token = ''),
      clearUser: state => (state.user = null)
    },
    actions: {
      async authenticateUser({ commit }, userPayload) {
        try {
          commit('setLoading', true)
          const authUserData = await this.$axios.$post(
            `/${userPayload.action}/`,
            {
              email: userPayload.email,
              password: userPayload.password,
              returnSecureToken: userPayload.returnSecureToken
            }
          )
          let user
          if (userPayload.action === 'register') {
            const avatar = `http://gravatar.com/avatar/${md5(
              authUserData.email
            )}?d=identicon`
            user = { email: authUserData.email, avatar }
            await db
              .collection('users')
              .doc(userPayload.email)
              .set(user)
          } else {
            const loginRef = db.collection('users').doc(userPayload.email)
            const loggedInUser = await loginRef.get()
            user = loggedInUser.data()
          }
          commit('setUser', user)
          commit('setToken', authUserData.idToken)
          commit('setLoading', false)
          saveUserData(authUserData, user)
        } catch (err) {
          console.error(err)
        }
      },
      setLogoutTimer({ dispatch }, interval) {
        setTimeout(() => dispatch('logoutUser'), interval)
      },
      logoutUser({ commit }) {
        commit('clearToken')
        commit('clearUser')
        clearUserData()
      }
    },
    getters: {
      loading: state => state.loading,
      isAuthenticated: state => !!state.token,
      user: state => state.user
    }
  })
}
export default createStore
