<template>
  <v-container fluid>
    <h1>
      <span><v-icon large>mdi-account</v-icon></span>
      Order Lookup
    </h1>
    <v-data-iterator
      :items="orders"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-account-search"
              label="Search"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-sort"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-btn large color="blue" class="ml-2" @click="addOrder">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th
                  v-for="(key, index) in keys"
                  :key="index"
                  class="text-left"
                  :class="{ 'blue--text': sortBy === key }"
                >
                  {{ key }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in props.items"
                :key="item._id"
                @click="openOrder(item)"
              >
                <td>
                  {{ item.orderNo }}
                </td>
                <td>
                  {{ item.customerName }}
                </td>
                <td>
                  {{ item.dateOrdered }}
                </td>
                <td>
                  {{ item.totalPrice }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  name: 'Orders',
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('orders/fetchOrders')
    } catch (e) {
      error(e)
    }
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: ['Order#', 'CustomerName', 'Date Ordered', 'Total Price']
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders.orders
    },
    numberOfPages() {
      return Math.ceil(this.orders.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== `Name`)
    }
  },
  methods: {
    addOrder() {
      this.$router.push({ name: 'sales-orders-new' })
    },
    openOrder(order) {
      this.$router.push({ path: '/sales/orders/' + order._id })
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
</style>
