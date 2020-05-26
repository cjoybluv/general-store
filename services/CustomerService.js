export default {
  getCustomers() {
    return this.$axios.get('/customers')
  },
  getCustomer(id) {
    return this.$axios.get('/customers/' + id)
  },
  postCustomer(customer) {
    return this.$axios.post('/customers', customer)
  },
  putCustomer(customer) {
    return this.$axios.put('/customers/' + customer._id, customer)
  }
}
