<template>
  <div id="customer">
    <v-form @submit.prevent="saveHandler">
      <v-toolbar class="no-background mb-3" dense elevation="1">
        <v-spacer></v-spacer>
        <v-icon>mdi-card-account-details-outline</v-icon>
        <v-toolbar-title class="ml-1">Customer</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-row>
        <v-col class="py-0">
          <v-text-field v-model="customer.name" placeholder="Name" dense />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-text-field v-model="customer.street" placeholder="Street" dense />
        </v-col>
      </v-row>
      <v-row>
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
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
