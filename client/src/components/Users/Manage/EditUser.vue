<template>
  <v-layout v-if="isUserLoggedIn && admin" v-on:keyup.enter="save()" justify-center>
    <v-flex xs6>
      <panel class="mt-5" title="Edit user">
          <v-text-field label="Company name" type="name" v-model="userview.companyname" 
          outline clearable>
            <!-- <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                The name of the company must be valid
              </v-tooltip>
            </template> -->
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
            <!-- <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your email must be valid
              </v-tooltip>
            </template> -->
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>email</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
        <br>
          <v-text-field label="Confirm email" type="name" v-model="confirmemail"
          outline clearable>
            <!-- <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your email must be the same
              </v-tooltip>
            </template> -->
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>email</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
        <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="userview.password"
            autocomplete="new-password"
            outline
            clearable
          >
            <!-- <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your password must contain at least 8 characters
              </v-tooltip>
            </template> -->
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-text-field
            label="Confirm password"
            type="password"
            v-model="confirmpassword"
            autocomplete="new-password"
            outline
            clearable
          >
            <!-- <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your password must be the same
              </v-tooltip>
            </template> -->
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-textarea label="Purpose" type="purpose" v-model="userview.purpose"
          outline clearable>
            <!-- <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Explain for what purpose you need a access to the portal
              </v-tooltip>
            </template> -->
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>notes</v-icon>
              </v-fade-transition>
            </template>
          </v-textarea>
        <!-- <br> -->
        <v-layout column class="mb-4" justify-center align-center>
        <span class="danger-alert">{{error}}</span>
        <v-layout class="mt-2" row justify-center align-center>
        <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold"
        @click="save()">Save</v-btn>
        <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold"
        @click="cancel()">Cancel</v-btn>
        <v-icon @click="undoEdit()">refresh</v-icon>
        </v-layout>
        </v-layout>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import UserService from "@/services/User/UserService";
import { mapState } from "vuex";

export default {
  data() {
    return {
      confirmpassword: null,
      confirmemail: null,
      userview: {
        companyname: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        purpose: null
      },
      error: null,
      required: value => !!value || "Required."
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "route", "user", "admin"])
  },
  methods: {
    async save() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.userview).every(
        key => !!this.userview[key]
      );
      if (this.confirmemail !== this.userview.email) {
        this.error = "The emails don't match"
        return;
      }
      if (this.confirmpassword !== this.userview.password) {
        this.error = "The passwords don't match"
        return;
      }
      const userId = this.route.params.userId;
      try {
        await UserService.put(this.userview);
        this.$router.push({
          name: "users"
        });
      } catch (err) {
        console.log(err);
      }
    },
    async undoEdit() {
      this.error = null
      const userId = this.route.params.userId;
      this.userview = (await UserService.getUser(userId)).data;
      this.confirmpassword = this.userview.password
      this.confirmemail = this.userview.email
    },
    async cancel() {
      this.$router.push({name: 'users'})
    }
  },
  async mounted() {
    try {
      const userId = this.route.params.userId;
      this.userview = (await UserService.getUser(userId)).data;
      this.confirmpassword = this.userview.password
      this.confirmemail = this.userview.email
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
.padding-input {
  margin: auto;
  /* margin-left: 32px; */
}
</style>
