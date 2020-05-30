<template>
  <v-card width="auto" class="mx-auto">
    <Order :order="order" :save-handler="saveHandler" />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Order from '@/components/Order.vue'

export default {
  name: 'NewCustomer',
  components: {
    Order
  },
  data() {
    return {
      order: {
        orderNo: 'NEW'
      }
    }
  },
  methods: {
    saveHandler(formData) {
      this.saveOrder({ ...formData }).then(
        this.$router.push({ name: 'sales-orders' })
      )
    },
    ...mapActions({
      saveOrder: 'orders/saveOrder'
    })
  }
}
</script>

<style lang="scss" scoped></style>
