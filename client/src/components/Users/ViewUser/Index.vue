<template>
  <v-layout justify-center v-if="isUserLoggedIn && admin">
      <v-flex xs6 >
        <user-data v-bind:userview="userview"/>
      </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserData from "./UserData";
import UserService from "@/services/User/UserService";

export default {
  data() {
    return {
      userview: {}
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  async mounted() {
    const userId = this.route.params.userId;
    this.userview = (await UserService.getUser(userId)).data;
  },
  components: {
    UserData
  }
};
</script>

<style scoped>
</style>
