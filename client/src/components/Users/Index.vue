<template>
  <v-layout class="mt-5" v-if="isUserLoggedIn && admin" row justify-center wrap>
    <v-flex xs6 class="ml-1">
      <Users-search-panel/>
    </v-flex>
    <v-flex xs6 class="ml-1 mt-2">
      <users-panel/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UsersPanel from "./ItemUser/UsersPanel";
import UsersSearchPanel from "./ItemUser/UsersSearchPanel";
import UserService from "@/services/User/UserService";

export default {
  data() {
    return {
      users: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  async mounted() {
    this.users = (await UserService.index()).data;
  },
  components: {
    UsersPanel,
    UsersSearchPanel
  },
  props: {
    main: {
      type: Object,
      require: true
    }
  }
};
</script>

<style scoped>
</style>
