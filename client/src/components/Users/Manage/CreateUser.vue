<template>
  <v-layout wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Adding User">
        <span class="danger-alert">{{error}}</span>
        <v-btn class="blue-grey lighten-3">Create Vlab</v-btn>
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
