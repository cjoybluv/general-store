<template>
  <div>
    <Customer :customer="customer" :save-handler="saveHandler" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Customer from '@/components/Customer.vue'

export default {
  name: 'NewCustomer',
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
        this.$router.push({ name: 'customers' })
      )
    },
    ...mapActions({
      saveCustomer: 'customers/saveCustomer'
    })
  }
}
</script>

<style lang="scss" scoped></style>
