<template>
  <div id="product">
    <v-form @submit.prevent="saveHandler(product)">
      <v-toolbar class="no-background mb-3" dense elevation="1">
        <v-spacer></v-spacer>
        <v-icon>mdi-card-account-details-outline</v-icon>
        <v-toolbar-title class="ml-1">Product</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-row class="px-2">
        <v-col class="py-0">
          <v-text-field
            v-model="product.code"
            placeholder="Code"
            dense
            autofocus
          />
        </v-col>
      </v-row>
      <v-row class="px-2">
        <v-col class="py-0">
          <v-text-field
            v-model="product.description"
            placeholder="Description"
            dense
          />
        </v-col>
      </v-row>
      <v-row class="px-2">
        <v-col cols="12" sm="6" class="py-0">
          <v-text-field v-model="product.unit" placeholder="Unit" dense />
        </v-col>
        <v-col cols="12" sm="2" class="py-0">
          <v-text-field v-model="product.price" placeholder="Price" dense />
        </v-col>
        <v-col cols="12" sm="4" class="py-0">
          <v-text-field
            v-model="product.inventory"
            placeholder="Inventory"
            dense
          />
        </v-col>
      </v-row>
      <v-btn type="submit">Save</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    saveHandler: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
