<template>
  <v-layout v-if="isUserLoggedIn && admin" column>
    <panel title="Total User">
      <v-flex class="user">
        <h2>Active User : {{ totalUser }}</h2>
      </v-flex>
    </panel>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService"

export default {
  data () {
    return {
      users: null,
      totalUser: 0
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler(value) {
        this.users = (await UserService.index(value)).data;
        for (let user in this.users) {
          this.totalUser++
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
