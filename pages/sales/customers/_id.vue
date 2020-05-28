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
      error(e)
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
      this.saveCustomer(customer).then(
        this.$router.push({ name: 'sales-customers' })
      )
    },
    ...mapActions({
      saveCustomer: 'customers/saveCustomer'
    })
  }
}
</script>

<style lang="scss" scoped></style>
