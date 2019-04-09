<template>
  <v-layout v-if="isUserLoggedIn" column justify-center>
    <v-flex xs12>
      <Users-search-panel/>
    </v-flex>
    <v-flex xs12>
      <users-panel v-bind:users="users" class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UsersPanel from "./ItemUser/UsersPanel";
import UsersSearchPanel from "./ItemUser/UsersSearchPanel";
import UserService from "@/services/UserService"

export default {
  data() {
    return {
      users: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
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
      type: Object
    }
  }
};
</script>

<style scoped>
</style>
