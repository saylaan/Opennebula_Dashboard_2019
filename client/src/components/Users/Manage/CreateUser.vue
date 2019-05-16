<template>
  <v-layout v-if="isUserLoggedIn && admin" justify-center>
    <v-flex xs6>
      <panel title="Create User">
          <v-text-field class="mt-5" label="Company name" type="name" v-model="userview.companyname" 
          outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                The name of the company must be valid
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>domain</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
        <br>
          <v-text-field class="padding-input" label="First name" type="name"
          v-model="userview.firstname" 
          outline clearable>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>account_box</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-text-field class="padding-input" label="Last name" type="nane"
          v-model="userview.lastname" 
          outline clearable>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>account_box</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-text-field label="Email" type="name" v-model="userview.email"
          outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your email must be valid
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>email</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
        <br>
          <v-textarea label="Purpose" type="purpose" v-model="userview.purpose"
          outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Explain for what purpose you need a access to the portal
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>notes</v-icon>
              </v-fade-transition>
            </template>
          </v-textarea>
        <br>
        <span class="danger-alert">{{error}}</span>
        <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" 
        @click="create({name: 'users'})">
        Create User</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService"

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
.padding-input {
  margin-left: 32px;
}
</style>
