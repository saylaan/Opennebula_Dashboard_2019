<template>
  <v-layout class="mt-5" v-if="isUserLoggedIn && admin" v-on:keyup.enter="create({name: 'users'})" justify-center>
    <v-flex xs6>
      <panel title="Create User">
          <v-text-field class="mt-5" label="Company name" type="name" v-model="userview.companyname" 
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
          <br>
        <!-- <br> -->
          <!-- <v-text-field
            v-if="isAdmin()"
            label="Password"
            type="password"
            v-model="userview.password"
            autocomplete="new-password"
            outline
            clearable
          > -->
            <!-- <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your password must contain at least 8 characters
              </v-tooltip>
            </template> -->
            <!-- <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-text-field
            v-if="isAdmin()"
            label="Confirm password"
            type="password"
            v-model="confirmpassword"
            autocomplete="new-password"
            outline
            clearable
          > -->
            <!-- <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your password must be the same
              </v-tooltip>
            </template> -->
            <!-- <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br> -->
        <v-switch large color="red" v-model="userview.admin" label="Set Admin">
          <!-- <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Its for seeting the user to admin
              </v-tooltip>
            </template> -->
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>supervised_user_circle</v-icon>
              </v-fade-transition>
            </template>
        </v-switch>
        <br>
        <v-layout column align-center justify-center class="mb-4">
        <span class="danger-alert">{{error}}</span>
        <v-layout class="mt-2" row justify-center align-center>
          <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" 
          @click="create({name: 'users'})">
          Create</v-btn>
          <v-btn elevation-24 large class="grey darken-1 ml-1 mb-4 font-weight-bold" 
          @click="cancel()">
          Cancel</v-btn>
        </v-layout>
        </v-layout>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService"
import generator from "generate-password"

export default {
  data() {
    return {
      confirmemail: null,
      userview: {
        admin: false,
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
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    isAdmin() {
      return (this.userview.admin)
    },
    async create(route) {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.userview).every(
        key => {
          if (key === 'admin' || key === 'password') {
            return (true)
          }
          return (!!this.userview[key])
        }
      );
      if (!areAllFieldsFilledIn || !this.confirmemail) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      if (this.confirmemail !== this.userview.email) {
        this.error = "The emails don't match"
        return;
      }
      try {
        await UserService.post(this.userview);
        this.$router.push(route);
      } catch (err) {
        console.log(err);
      }
    },
    async cancel() {
      this.$router.push({name: 'users'})
    }
  }
  // async mounted() {
  //   try {
  //     this.userview.password = await generator.generate({
  //       length: 8,
  //       numbers: true
  //     })
  //     console.log(this.userview.password)
  //     this.confirmpassword = this.userview.password
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
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
