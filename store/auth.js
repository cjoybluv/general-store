// import UserService from '@/services/UserService'

export const namespaced = true

export const state = () => ({
  user: {},
  token: '',
  isAuthenticated: false
})

export const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  ownerId(state) {
    return state.user._id
  },
  token(state) {
    return state.token || localStorage.getItem('token')
  },
  user(state) {
    return state.user
  },
  userTags(state) {
    return state.user.tags
  }
}

export const mutations = {
  CLEAR_AUTH(state) {
    state.user = {}
    state.token = ''
    state.isAuthenticated = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  SET_AUTH(state, authData) {
    state.user = authData.user
    state.token = authData.token
    state.isAuthenticated = true
    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', JSON.stringify(authData.user))
    this.$axios.setToken(authData.token, 'Bearer')
  },
  CLEAR_USER(state) {
    state.user = {}
  },
  SET_USER(state, user) {
    state.user = user
  }
}
export const actions = {
  login({ commit, dispatch }, loginData) {
    commit('CLEAR_AUTH')
    // dispatch('clearUserData')
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('/auth/login', loginData)
        .then((data) => {
          commit('SET_AUTH', data)
          // const notification = {
          //   type: 'success',
          //   message: 'LOGIN SUCCESS!'
          // }
          // dispatch('notification/add', notification, { root: true })
          resolve(data)
        })
        .catch((error) => {
          // const notification = {
          //   type: 'error',
          //   message: 'LOGIN FAILURE! ' + error.message
          // }
          // dispatch('notification/add', notification, { root: true })
          reject(error)
        })
    })
  },
  logoff({ commit, dispatch }) {
    commit('CLEAR_AUTH')
    dispatch('clearUserData')
    return new Promise((resolve) => {
      const notification = {
        type: 'success',
        message: 'LOGOFF SUCCESS!'
      }
      dispatch('notification/add', notification, { root: true })
      resolve()
    })
  },
  register({ commit, dispatch }, registerData) {
    commit('CLEAR_AUTH')
    dispatch('clearUserData')
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('/auth/register', registerData)
        .then((data) => {
          commit('SET_AUTH', data)
          const notification = {
            type: 'success',
            message: 'REGISTER SUCCESS!'
          }
          dispatch('notification/add', notification, { root: true })
          resolve(data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'REGISTER FAILURE! ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          reject(error)
        })
    })
  },
  getFromLocal({ commit }) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      if (token && user) {
        const authData = { token, user }
        commit('SET_AUTH', authData)
        resolve(authData)
      } else {
        const error = new Error('Not Authorized')
        reject(error)
      }
    })
  }
}
