import Vue from 'vue'

export const namespaced = true

export const state = () => ({
  customers: [],
  customer: {}
})

export const getters = {
  //
  customerSearch: (state) => {
    return state.customers.map((customer) => {
      return {
        _id: customer._id,
        stringSearch:
          customer.name +
          customer.street +
          customer.city +
          customer.state +
          customer.zip
      }
    })
  },
  getById: (state) => (id) => {
    return (
      state.customers &&
      state.customers.filter((customer) => {
        return customer._id === id
      })[0]
    )
  }
}

export const mutations = {
  SAVE_CUSTOMER(state, customer) {
    state.customers.push(customer)
  },
  SET_CUSTOMERS(state, customers) {
    state.customers = customers
  },
  SET_CUSTOMER(state, customer) {
    state.customer = customer
  },
  UPDATE_CUSTOMER(state, customer) {
    const idx = state.customers.findIndex((cust) => cust._id === customer._id)
    Vue.set(state.customers, idx, { ...customer })
  }
}

export const actions = {
  fetchCustomers({ state, commit }) {
    return this.$axios
      .get('/customers')
      .then((response) => {
        commit('SET_CUSTOMERS', response.data)
      })
      .catch((e) => {
        console.log('fetchCustomers', e)
      })
  },
  fetchCustomer({ commit, state }, id) {
    return this.$axios
      .get('/customers/' + id)
      .then((response) => {
        commit('SET_CUSTOMER', response.data)
      })
      .catch((e) => {
        console.log('fetchCustomer', e)
      })
  },
  saveCustomer({ commit }, customer) {
    if (customer._id) {
      return this.$axios
        .put('/customers/' + customer._id, customer)
        .then((response) => {
          commit('UPDATE_CUSTOMER', response.data)
          commit('SET_CUSTOMER', response.data)
        })
    } else {
      return this.$axios.post('/customers', customer).then((response) => {
        commit('SAVE_CUSTOMER', response.data)
        commit('SET_CUSTOMER', response.data)
      })
    }
  }
}
