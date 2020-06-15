<template>
  <v-card width="500" class="mx-auto">
    <Product :product="product" :save-handler="saveHandler" />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Product from '@/components/Product.vue'

export default {
  name: 'NewProduct',
  transition: 'fade',
  components: {
    Product
  },
  data() {
    return {
      product: {}
    }
  },
  methods: {
    saveHandler(formData) {
      this.saveProduct({ ...formData }).then(
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
