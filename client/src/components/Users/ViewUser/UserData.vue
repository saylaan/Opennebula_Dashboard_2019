<template>
  <panel v-if="isUserLoggedIn && admin" title="User view">
    <v-layout column justify-center align-center> 
        <v-flex xs6 class="user-companyname">
          <h4> Company name :
          {{userview.companyname}}
          </h4>
          <br>
        </v-flex>
        <v-flex xs6 class="user-firstname">
          <h4> Name : {{userview.firstname}} {{userview.lastname}}
          </h4>
          <br>
        </v-flex>
        <v-flex xs6 class="user-purpose">
          <h4> Purpose :
          {{userview.purpose}}
          </h4>
          <br>
        </v-flex>
      <v-flex xs6>
      <v-btn large
        class="grey darken-1 font-weight-bold"
        :to="{name: 'edit-user', params () {
            return {
              userId: userview.id
            }
          }}">Edit</v-btn>
      </v-flex>
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
