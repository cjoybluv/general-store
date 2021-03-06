import Vue from 'vue'

export const namespaced = true

export const state = () => ({
  orders: [],
  order: {},
  nextOrderNo: ''
})

export const mutations = {
  SAVE_ORDER(state, order) {
    state.orders.push(order)
  },
  SET_NEXT_ORDER_NO(state, nextOrderNo) {
    state.nextOrderNo = nextOrderNo
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
        console.log('fetchOrders', e)
      })
  },
  fetchOrder({ commit, state }, id) {
    return this.$axios
      .get('/orders/' + id)
      .then((response) => {
        commit('SET_ORDER', response.data)
      })
      .catch((e) => {
        console.log('fetchOrder', e)
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
        response.data.products.forEach((product) => {
          this.$axios
            .put('/products/' + product.product + '/updateInventory', {
              quantity: product.quantity
            })
            .then((response) => {
              commit('products/UPDATE_PRODUCT', response.data, { root: true })
            })
        })
      })
    }
  },
  getNewOrderNo({ commit }) {
    return this.$axios
      .get('/appData/newOrderNo')
      .then((response) => {
        commit('SET_NEXT_ORDER_NO', response.data.data)
      })
      .catch((e) => {
        console.log('getNewOrderNo', e)
      })
  }
}
