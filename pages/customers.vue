<template>
  <v-card class="mx-auto" color="white" width="400px">
    <v-card-text>
      <Customer :customer="customer" class="mx-4" />
    </v-card-text>
  </v-card>
</template>

//
<script>
import Customer from '@/components/Customer.vue'
export default {
  name: 'Customers',
  components: {
    Customer
  },
  data() {
    return {
      customers: [
        {
          name: 'Dave',
          street: '123 Here',
          city: 'Now',
          state: 'OR',
          zip: '97123'
        }
      ]
    }
  },
  computed: {
    customer() {
      return this.customers[0]
    }
  }
}
</script>

<style lang="scss" scoped></style>
