<template>
  <panel v-if="isUserLoggedIn" title="Search">
    <v-text-field label="Search by company, name"></v-text-field>
  </panel>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  }
};
</script>

<style>
</style>
