<template>
    <panel v-if="isUserLoggedIn" title="Setting">
      <v-btn
      :to="{name: 'edit-settings'}"
      class="blue-grey lighten-3">
      Edit Setting</v-btn>
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

<style scoped>
</style>
