<template>
  <v-card width="auto" class="mx-auto">
    <Order :order="order" :save-handler="saveHandler" />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import Order from '@/components/Order.vue'

export default {
  name: 'OrderForm',
  components: {
    Order
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('orders/fetchOrder', params.id)
    } catch (e) {
      error(e)
    }
  },
  computed: {
    order() {
      return cloneDeep(this.$store.state.orders.order)
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
