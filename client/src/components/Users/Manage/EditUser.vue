<template>
  <v-layout wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Edit user">
        <span class="danger-alert">{{error}}</span>
        <v-btn class="blue-grey lighten-3">Save settings</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>

export default {};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>
