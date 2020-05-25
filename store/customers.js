// import CustomerService from '@/services/CustomerService.js'
import Vue from 'vue'
export const state = () => ({
  customers: [
    {
      _id: '123',
      name: 'Dave',
      street: '123 Here',
      city: 'Now',
      state: 'OR',
      zip: '97123'
    },
    {
      _id: '124',
      name: 'Charlie',
      street: '99 There',
      city: 'Then',
      state: 'OR',
      zip: '97126'
    },
    {
      _id: '125',
      name: 'Bob',
      street: '5623 Everywhere',
      city: 'Now',
      state: 'OR',
      zip: '97123'
    }
  ],
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
    // return CustomerService.getcustomers().then((response) => {
    //   commit('SET_CUSTOMERS', response.data)
    // })
    return true
  },
  fetchCustomer({ commit, state }, id) {
    // return CustomerService.getcustomer(id).then((response) => {
    //   commit('SET_CUSTOMER', response.data)
    // })
    commit(
      'SET_CUSTOMER',
      state.customers.find((customer) => customer._id === id)
    )
    return true
  },
  saveCustomer({ commit }, customer) {
    if (customer._id) {
      commit('UPDATE_CUSTOMER', customer)
    } else {
      commit('SAVE_CUSTOMER', customer)
    }
    return true
  }
}
