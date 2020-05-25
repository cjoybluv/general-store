<template>
  <v-card width="500" class="mx-auto">
    <Customer :customer="customer" :save-handler="saveHandler" />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Customer from '@/components/Customer.vue'
export default {
  name: 'CustomerForm',
  components: {
    Customer
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('customers/fetchCustomer', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch event #' + params.id
      })
    }
  },
  computed: {
    customer() {
      return { ...this.$store.state.customers.customer }
    }
  },
  methods: {
    saveHandler(formData) {
      const customer = { ...formData }
      this.saveCustomer(customer).then(console.log('Customer Saved!'))
    },
    ...mapActions({
      saveCustomer: 'customers/saveCustomer'
    })
  }
}
</script>

<style lang="scss" scoped></style>
