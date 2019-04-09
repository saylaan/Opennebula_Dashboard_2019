<template>
  <v-layout v-if="isUserLoggedIn" column>
          <v-btn
        class="blue-grey darken-1"
        slot="action"
        :to="{name: 'user-create'}"
        light
        medium
        absolute
        right
        middle
        fab
      >
        <v-icon>add</v-icon>
      </v-btn>
    <panel title="User">
      <v-btn
      :to="{name: 'edit-user'}"
      class="blue-grey lighten-3">
      Edit User</v-btn>
    </panel>
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
</style>
