import Vue from 'vue'
// import CustomerService from '@/services/CustomerService.js'

export const namespaced = true

export const state = () => ({
  customers: [],
  customer: {}
})
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
    // return CustomerService.getCustomers().then((response) => {
    //   commit('SET_CUSTOMERS', response.data)
    // })
    return this.$axios.get('/customers').then((response) => {
      commit('SET_CUSTOMERS', response.data)
    })
  },
  fetchCustomer({ commit, state }, id) {
    // return CustomerService.getCustomer(id).then((response) => {
    //   commit('SET_CUSTOMER', response.data)
    // })
    return this.$axios.get('/customers/' + id).then((response) => {
      commit('SET_CUSTOMER', response.data)
    })
  },
  saveCustomer({ commit }, customer) {
    if (customer._id) {
      return this.$axios
        .put('/customers/' + customer._id, customer)
        .then((response) => {
          commit('UPDATE_CUSTOMER', response.data)
        })
    } else {
      return this.$axios.post('/customers', customer).then((response) => {
        commit('SAVE_CUSTOMER', response.data)
      })
    }
  }
}
