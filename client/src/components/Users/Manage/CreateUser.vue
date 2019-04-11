<template>
  <v-layout v-if="isUserLoggedIn && admin" wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Create User">
        <v-text-field label="Company name" v-model="userview.companyname" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="First name" v-model="userview.firstname" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Last name" v-model="userview.lastname" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Email" v-model="userview.email" :rules="[required]"></v-text-field>
        <br>
        <v-textarea label="Purpose" v-model="userview.purpose" :rules="[required]"></v-textarea>
        <br>
        <span class="danger-alert">{{error}}</span>
        <v-btn class="blue-grey lighten-3" @click="create({name: 'users'})">
        Create User</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/UserService"

export default {
  data() {
    return {
      userview: {
        companyname: null,
        firstname: null,
        lastname: null,
        email: null,
        purpose: null
      },
      error: null,
      required: value => !!value || "Required."
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    async create(route) {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.userview).every(
        key => !!this.userview[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        await UserService.post(this.userview);
        this.$router.push(route);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>
