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
              v-model="order.customerName"
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
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12" sm="6">
            <v-row
              ><v-text-field
                v-model="oDates.dateOrdered"
                label="Date Ordered"
                class="mx-2"
                prepend-inner-icon="mdi-calendar"
                readonly
                @click="pickDate('dateOrdered')"
            /></v-row>
            <v-row
              ><v-text-field
                v-model="oDates.dateShipped"
                label="Date Shipped"
                class="mx-2"
                prepend-inner-icon="mdi-calendar"
                readonly
                @click="pickDate('dateShipped')"
            /></v-row>
          </v-col>
          <v-col cols="12" sm="6">
            Paid: {{ order.totalPaid }} Balance: {{ order.balance }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mx-2 border-top">
      <v-col cols="12">
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Unit</th>
                <th class="text-right">Price</th>
                <th class="text-right">Quantity</th>
                <th class="text-right">Extended Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(lineItem, index) in product.lineItems"
                :key="lineItem.product"
              >
                <td>{{ lineItem.productCode }}</td>
                <td>{{ lineItem.description }}</td>
                <td>{{ lineItem.unit }}</td>
                <td class="text-right">{{ lineItem.unitPrice }}</td>
                <td class="text-right">
                  <v-text-field
                    v-model="lineItem.quantity"
                    placeholder="Enter Quantity"
                    autofocus
                    dense
                    @change="quantityUpdate(lineItem, index)"
                  />
                </td>
                <td class="text-right">{{ lineItem.extendedPrice }}</td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    v-model="product.lookup"
                    placeholder="Product Lookup"
                    dense
                    @change="productLookup"
                  />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-right">Total:</td>
                <td class="text-right font-weight-bold">
                  {{ order.totalPrice }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-form @submit.prevent="saveHandler(order)">
      <v-btn type="submit">Save</v-btn>
    </v-form>

    <!-- DIALOGS  -->
    <v-dialog v-model="customerConfirmDialog" dense fixed-header width="800">
      <v-system-bar height="48" window>
        <span class="display-1">Select a Customer</span>
      </v-system-bar>
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

    <v-dialog v-model="datePickerData.flag" width="300">
      <v-app-bar>
        <v-toolbar-title>
          {{ datePickerData.titles[datePickerData.field] }}
        </v-toolbar-title>
      </v-app-bar>
      <v-date-picker v-model="datePickerData.date" @click:date="datePicked" />
    </v-dialog>

    <v-dialog v-model="product.dialog" dense fixed-header width="800">
      <v-system-bar height="48" window>
        <span class="display-1">Select a Product</span>
      </v-system-bar>
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Unit</th>
              <th class="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="prod in product.matches"
              :key="prod._id"
              @click="selectProduct(prod)"
            >
              <td>{{ prod.code }}</td>
              <td>{{ prod.description }}</td>
              <td>{{ prod.unit }}</td>
              <td class="text-right">{{ prod.price }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { dateOut } from '@/helpers/dateHelpers'

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
      customer: {},
      customerMatches: [],
      customerConfirmDialog: false,
      oDates: {
        dateOrdered: dateOut(this.order.dateOrdered),
        dateShipped: dateOut(this.order.dateShipped)
      },
      datePickerData: {
        flag: false,
        date: '',
        field: '',
        titles: {
          dateOrdered: 'Date Ordered',
          dateShipped: 'Date Shipped'
        }
      },
      product: {
        lineItems: [],
        lookup: '',
        matches: [],
        dialog: false
      }
    }
  },
  computed: {
    customers() {
      return this.$store.state.customers.customers
    },
    products() {
      return this.$store.state.products.products
    },
    ...mapGetters({
      getCustomer: 'customers/getById',
      customerSearch: 'customers/customerSearch',
      getProduct: 'products/getById',
      productSearch: 'products/productSearch'
    })
  },
  mounted() {
    if (this.order.customer) {
      this.customer = { ...this.getCustomer(this.order.customer) }
    }
    if (this.order.products) {
      this.product.lineItems = this.order.products.map((prod) => {
        const p = this.getProduct(prod.product)
        return { ...prod, description: p.description, unit: p.unit }
      })
    }
  },
  methods: {
    customerLookup() {
      const searchMatches = this.customerSearch.filter((cust) => {
        const rec = cust.record.toLowerCase()
        return rec.includes(this.order.customerName.toLowerCase())
      })
      this.customerMatches = this.customers.filter((customer) => {
        return searchMatches.find((match) => match._id === customer._id)
      })
      this.customerConfirmDialog = true
    },
    datePicked() {
      this.order[this.datePickerData.field] = new Date(
        this.datePickerData.date + ' 12:00:00'
      )
      this.oDates[this.datePickerData.field] = dateOut(
        this.order[this.datePickerData.field]
      )
      this.datePickerData.field = ''
      this.datePickerData.flag = false
    },
    pickDate(dateField) {
      this.datePickerData.field = dateField
      let date
      if (this.order[dateField]) {
        date = new Date(this.order[dateField])
      } else {
        date = new Date()
      }
      this.datePickerData.date = date.toISOString().substr(0, 10)
      this.datePickerData.flag = true
    },
    productLookup() {
      const searchMatches = this.productSearch.filter((prod) => {
        const rec = prod.record.toLowerCase()
        return rec.includes(this.product.lookup.toLowerCase())
      })
      this.product.matches = this.products.filter((product) => {
        return searchMatches.find((match) => match._id === product._id)
      })
      this.product.dialog = true
    },
    selectCustomer(cust) {
      this.customer = { ...cust }
      this.order.customer = cust._id
      this.order.customerName = cust.name
      this.customerConfirmDialog = false
    },
    selectProduct(prod) {
      this.product.lineItems.push({
        product: prod._id,
        productCode: prod.code,
        description: prod.description,
        unit: prod.unit,
        unitPrice: prod.price
      })
      this.order.products.push({
        product: prod._id,
        productCode: prod.code,
        unitPrice: prod.price
      })
      this.product.lookup = ''
      this.product.dialog = false
      this.$nextTick()
    },
    sumTotal(total, amt) {
      return {
        extendedPrice:
          parseFloat(total.extendedPrice) + parseFloat(amt.extendedPrice)
      }
    },
    quantityUpdate(lineItem, index) {
      const extendedPrice = (
        parseFloat(lineItem.unitPrice).toFixed(2) *
        parseFloat(lineItem.quantity)
      ).toFixed(2)
      Vue.set(this.order.products, index, {
        ...this.order.products[index],
        quantity: lineItem.quantity,
        extendedPrice
      })
      Vue.set(this.product.lineItems, index, {
        ...lineItem,
        extendedPrice
      })
      this.order.totalPrice = this.product.lineItems.reduce(
        this.sumTotal
      ).extendedPrice
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
.border-top {
  border-top: 1px solid lightgrey;
}
.right-border {
  border-right: 1px solid lightgrey;
}
</style>
