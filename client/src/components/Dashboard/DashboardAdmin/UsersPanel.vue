<template>
  <panel v-if="isUserLoggedIn && admin" title="Total User">
    <v-layout class="user" column align-center justify-center>
      <h2>Active User : {{ activeUsers }}</h2>
      <br>
      <br>
      <h2>Unactive User : {{ totalUsers - activeUsers }}</h2>
      <br>
      <br>
      <h2>Total User : {{ totalUsers }}</h2>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService";

export default {
  data() {
    return {
      users: null,
      totalUsers: 0,
      activeUsers: 0
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler() {
        this.users = (await UserService.index()).data;
        for (var i = 0; i !== this.users.length; i++) {
          this.totalUsers++;
          if (this.users[i].active) {
            this.activeUsers++;
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.user {
  overflow: visible;
}
</style>
