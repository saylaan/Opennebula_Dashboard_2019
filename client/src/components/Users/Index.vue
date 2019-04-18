<template>
  <v-layout v-if="isUserLoggedIn && admin" column justify-center>
    <v-flex xs12>
      <Users-search-panel/>
    </v-flex>
    <v-flex xs12>
      <users-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UsersPanel from "./ItemUser/UsersPanel";
import UsersSearchPanel from "./ItemUser/UsersSearchPanel";
import UserService from "@/services/User/UserService"

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
