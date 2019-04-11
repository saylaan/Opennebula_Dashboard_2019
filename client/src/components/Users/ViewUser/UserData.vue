<template>
  <panel v-if="isUserLoggedIn && admin" title="User view">
    <v-layout wrap>
      <v-flex xs6>
        <v-flex class="user-companyname">{{userview.companyname}}</v-flex>
        <v-flex class="user-firstname">{{userview.firstname}}</v-flex>
        <v-flex class="user-lastname">{{userview.lastname}}</v-flex>
        <v-flex class="user-purpose">{{userview.purpose}}</v-flex>
      </v-flex>
      <v-btn
        class="blue-grey lighten-3"
        :to="{name: 'edit-user', params () {
            return {
              userId: userview.id
            }
          }}">Edit</v-btn>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  props: ['userview']
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

.user-purpose {
  font-size: 18px;
}
</style>
