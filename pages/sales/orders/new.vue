<template>
  <v-card width="auto" class="mx-auto">
    <Order :order="order" :save-handler="saveHandler" />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Order from '@/components/Order.vue'

export default {
  name: 'NewOrder',
  components: {
    Order
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('orders/getNewOrderNo')
    } catch (e) {
      error(e)
    }
  },
  computed: {
    nextOrderNo() {
      return this.$store.state.orders.nextOrderNo
    },
    order() {
      return { orderNo: this.nextOrderNo }
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
