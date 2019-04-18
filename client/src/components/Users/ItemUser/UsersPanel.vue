<template>
  <v-layout v-if="isUserLoggedIn && admin" column>
    <panel title="Users">
    <v-btn
      class="grey darken-3"
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
    <v-flex v-for="user in users" :key="user.title" class="user">
      <v-layout row glow>
        <v-flex xs9>
          <v-layout column wrap>
            <v-flex xs6 class="user-companyname">
              <h5>Company name : {{user.companyname}}</h5>
            </v-flex>
            <v-flex xs6 class="user-firstname">
              <h5>Name : {{user.firstname}} {{user.lastname}}</h5>
            </v-flex>
            <v-flex xs6 class="user-purpose">
              <h5> Purpose: {{user.purpose}}</h5>
            </v-flex>
          </v-layout>
      </v-flex>
          <v-flex>
            <v-btn
              class="grey darken-1"
              :to="{
                  name: 'user',
                  params: {
                    userId: user.id}
                 }"
            >View user</v-btn>
          </v-flex>
      </v-layout>
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
      users: null
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
      }
    }
  }
};
</script>

<style scoped>
.user {
  padding: 20px;
  height: 100px;
  overflow: hidden;
}

.user-companyname {
  font-size: 20px;
}

.user-firstname {
  font-size: 20px;
}

.user-lastname {
  font-size: 20px;
}

.user-purpose {
  font-size: 20px;
}
</style>
