<template>
  <v-layout v-if="isUserLoggedIn" column>
    <panel title="Users">
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
    <v-flex v-for="user in users" :key="user.title" class="user">
      <v-layout row>
            <v-flex class="user-companyname">{{user.companyname}}</v-flex>
            <v-flex class="user-firstname">{{user.firstname}}</v-flex>
            <v-flex class="user-lastname">{{user.lastname}}</v-flex>
            <v-flex class="user-need">{{user.need}}</v-flex>
            <v-btn
              class="blue-grey lighten-3"
              :to="{
                  name: 'user',
                  params: {
                    userId: user.id}
                 }"
            >View user</v-btn>
      </v-layout>
    </v-flex>
    </panel>
    <!-- <panel title="User">
      <v-btn
      :to="{name: 'edit-user'}"
      class="blue-grey lighten-3">
      Edit User</v-btn>
    </panel>-->
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  props: ['users']
  // ,
  // watch: {
  //   // "$route.query.search": {
  //   //   immediate: true,
  //     async handler() {
  //       this.users = (await UserService.index(value)).data;
  //     }
  //   }
  // }
};
</script>

<style scoped>
.user {
  padding: 20px;
  height: 200px;
  overflow: hidden;
}

.user-companyname {
  font-size: 30px;
}

.user-firstname {
  font-size: 24px;
}

.user-lastname {
  font-size: 18px;
}

.user-need {
  font-size: 18px;
}

</style>
