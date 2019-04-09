<template>
  <v-layout v-if="isUserLoggedIn" wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Edit settings">
        <span class="danger-alert">{{error}}</span>
        <v-btn class="blue-grey lighten-3">Save settings</v-btn>
      </panel>
    </v-flex>
  </v-layout>
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
.danger-alert {
  color: red;
}
</style>
