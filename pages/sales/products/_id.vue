<template>
  <v-card width="500" class="mx-auto">
    <Product :product="product" :save-handler="saveHandler" />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Product from '@/components/Product.vue'
export default {
  name: 'ProductForm',
  transition: 'fade',
  components: {
    Product
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('products/fetchProduct', params.id)
    } catch (e) {
      error(e)
    }
  },
  computed: {
    product() {
      return { ...this.$store.state.products.product }
    }
  },
  methods: {
    saveHandler(formData) {
      const product = { ...formData }
      this.saveProduct(product).then(
        this.$router.push({ name: 'sales-products' })
      )
    },
    ...mapActions({
      saveProduct: 'products/saveProduct'
    })
  }
}
</script>

<style lang="scss" scoped></style>
