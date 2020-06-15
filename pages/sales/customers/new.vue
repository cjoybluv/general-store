<template>
  <v-card width="500" class="mx-auto">
    <Customer :customer="customer" :save-handler="saveHandler" />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Customer from '@/components/Customer.vue'

export default {
  name: 'NewCustomer',
  transition: 'fade',
  components: {
    Customer
  },
  data() {
    return {
      customer: {}
    }
  },
  methods: {
    saveHandler(formData) {
      this.saveCustomer({ ...formData }).then(
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
