<template>
  <v-layout v-if="isUserLoggedIn && admin" column>
    <panel title="Total User">
      <v-flex class="user">
        <h2>Active User : {{ totalUsers }}</h2>
        <br>
        <br>
        <h2>Unactive User : {{ totalUsers }}</h2>
      </v-flex>
    </panel>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService";

export default {
  data() {
    return {
      users: null,
      totalUsers: 0
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
        for (let user in this.users) {
          this.totalUsers++;
        }
      }
    }
  }
};
</script>

<style scoped>
.user {
  padding: 20px;
  height: 200px;
  overflow: hidden;
}
</style>
