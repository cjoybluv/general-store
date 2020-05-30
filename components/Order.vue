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
          <v-col class="py-0">
            <v-text-field v-model="customer.street" dense readonly />
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
    <v-dialog v-model="customerConfirmDialog" dense fixed-header width="800">
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th>Name</th>
              <th>Street</th>
              <th>City</th>
              <th>St</th>
              <th>Zip</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cust in customerMatches"
              :key="cust._id"
              @click="selectCustomer(cust)"
            >
              <td>{{ cust.name }}</td>
              <td>{{ cust.street }}</td>
              <td>{{ cust.city }}</td>
              <td>{{ cust.state }}</td>
              <td>{{ cust.zip }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      },
      customerMatches: [],
      customerConfirmDialog: false
    }
  },
  computed: {
    customers() {
      return this.$store.state.customers.customers
    },
    ...mapGetters({
      customerSearch: 'customers/customerSearch'
    })
  },
  methods: {
    customerLookup() {
      const searchMatches = this.customerSearch.filter((cust) => {
        const rec = cust.record.toLowerCase()
        return rec.includes(this.customer.name.toLowerCase())
      })
      this.customerMatches = this.customers.filter((customer) => {
        return searchMatches.find((match) => match._id === customer._id)
      })
      this.customerConfirmDialog = true
    },
    selectCustomer(cust) {
      this.customer = { ...cust }
      this.order.customerId = cust._id
      this.customerConfirmDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.right-border {
  border-right: 1px solid lightgrey;
}
</style>
