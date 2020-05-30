<template>
  <div id="order">
    <v-toolbar
      class="no-background mb-3 d-flex justify-space-between align-center"
      dense
      elevation="3"
    >
      <v-icon>mdi-phone-log</v-icon>
      <v-toolbar-title class="ml-1">Order</v-toolbar-title>
      <v-toolbar-items class="d-flex align-center ml-4">
        <h3>{{ order.orderNo }}</h3>
      </v-toolbar-items>
    </v-toolbar>

    <v-row>
      <v-col cols="12" sm="6" class="pl-6 right-border">
        <v-row class="px-2">
          <v-col class="py-0">
            <v-text-field
              v-model="customer.name"
              placeholder="Customer Name / Lookup"
              dense
              autofocus
              @change="customerLookup"
            />
          </v-col>
        </v-row>
        <v-row class="px-2">
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field v-model="customer.city" placeholder="City" dense />
          </v-col>
          <v-col cols="12" sm="2" class="py-0">
            <v-text-field v-model="customer.state" placeholder="ST" dense />
          </v-col>
          <v-col cols="12" sm="4" class="py-0">
            <v-text-field v-model="customer.zip" placeholder="Zip" dense />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">right</v-col>
    </v-row>

    <v-form @submit.prevent="saveHandler(order)">
      <v-btn type="submit">Save</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    },
    saveHandler: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      customer: {
        name: ''
      }
    }
  },
  methods: {
    customerLookup() {
      console.log('customerLookup', this.customer)
      // if (e) e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
.right-border {
  border-right: 1px solid lightgrey;
}
</style>
