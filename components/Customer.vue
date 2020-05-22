<template>
  <div>
    {{ customer.name }}
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
