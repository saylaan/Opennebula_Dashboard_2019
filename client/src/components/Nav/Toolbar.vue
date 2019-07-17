<template>
  <v-toolbar 
    :clipped-left="drawer.clipped" 
    app 
    absolute
    :dark="dark">
    <img v-if="!isUserLoggedIn"
      src="../../assets/ALELogo.jpg"
      aspect-ratio="1"
      @click="mainNav({name: 'home'})"
    >
    <img v-if="isUserLoggedIn"
      src="../../assets/LogoALE.png"
      aspect-ratio="1"
      @click="mainNav({name: 'home'})"
    >
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="isUserLoggedIn">
         <v-list>
      <v-list-tile @click="navToSetting({name: 'settings'})">
        <v-list-tile-title class="title font-weight-medium">{{this.user.lastname}} {{this.user.firstname}}</v-list-tile-title>
      </v-list-tile>
    </v-list> 
    </v-toolbar-items>
    <v-toolbar-items v-if="!admin">
      <v-btn flat :to="{name: 'message'}">
        <v-icon grey x-large>email</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn v-if="!isUserLoggedIn" flat :to="{name: 'signin'}" class="body-2 font-weight-bold">Sign in</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn v-if="!isUserLoggedIn" flat :to="{name: 'register'}" class="body-2 font-weight-bold">Register</v-btn>
      <v-btn v-if="isUserLoggedIn" flat @click="logout">Log out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService"

export default {
  data() {
    return {
    }
  },
  props: {
    drawer: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["user", "isUserLoggedIn", "dark", "admin"])
  },
  watch: {
    async getUserView() {
      try {
        this.userview = (await UserService.getUser(this.user.id)).data;
        console.log('watch userview', this.userview)
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    try {
      this.userview = (await UserService.getUser(this.user.id)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setDark", false);
      this.$store.dispatch("setGrad", "to top right, #5D29A9, #CBC8D0");
      this.$router.push({
        name: "home"
      });
    },
    mainNav(route) {
      if (!this.isUserLoggedIn) {
        this.$router.push(route);
      } else if (this.isUserLoggedIn) {
        this.$router.push('dashboard')
      }
    },
    async navToSetting(route) {
      this.drawer.active.one = null
      this.drawer.active.two = null
      this.drawer.active.three = null
      this.drawer.active.four = "primary"
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.v-toolbar {
  opacity: 0.9;
}
</style>
