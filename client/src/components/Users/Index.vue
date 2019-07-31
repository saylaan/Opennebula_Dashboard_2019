<template>
  <v-layout class="mt-5" v-if="isUserLoggedIn && admin" justify-center row wrap>
    <!-- <v-flex xs9 class="ml-1">
      <Users-search-panel/>
    </v-flex> -->
    <v-flex xs9 class="mt-2">
      <users-client-panel/>
    </v-flex>
    <v-flex xs9 class="mt-2">
      <users-archive-panel/>
    </v-flex>
    <v-flex xs9 class="mt-2">
      <users-admin-panel/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UsersClientPanel from "./ItemUser/UsersClientPanel";
import UsersArchivePanel from "./ItemUser/UsersArchivePanel";
import UsersAdminPanel from "./ItemUser/UsersAdminPanel";
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
    UsersClientPanel,
    UsersArchivePanel,
    UsersAdminPanel,
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
