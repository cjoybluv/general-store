import Vue from 'vue'

export const namespaced = true

export const state = () => ({
  orders: [],
  order: {}
})
export const mutations = {
  SAVE_ORDER(state, order) {
    state.orders.push(order)
  },
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  SET_ORDER(state, order) {
    state.order = order
  },
  UPDATE_ORDER(state, order) {
    const idx = state.orders.findIndex((ord) => ord._id === order._id)
    Vue.set(state.orders, idx, { ...order })
  }
}
export const actions = {
  fetchOrders({ state, commit }) {
    return this.$axios
      .get('/orders')
      .then((response) => {
        commit('SET_ORDERS', response.data)
      })
      .catch((e) => {
        console.log('fetchProducts', e)
      })
  },
  fetchOrder({ commit, state }, id) {
    return this.$axios.get('/orders/' + id).then((response) => {
      commit('SET_ORDER', response.data)
    })
  },
  saveOrder({ commit }, order) {
    if (order._id) {
      return this.$axios.put('/orders/' + order._id, order).then((response) => {
        commit('UPDATE_ORDER', response.data)
      })
    } else {
      return this.$axios.post('/orders', order).then((response) => {
        commit('SAVE_ORDER', response.data)
      })
    }
  }
}
