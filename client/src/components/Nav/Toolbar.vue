<template>
  <v-toolbar 
    :clipped-left="drawer.clipped" 
    app 
    absolute
    :dark="dark">
    <img
      v-if="!isUserLoggedIn"
      src="../../assets/LogoLoggedOut.png"
      aspect-ratio="0.9"
      @click="mainNav({name: 'home'})"
    >
    <img
      v-if="isUserLoggedIn"
      src="../../assets/LogoLoggedIn.png"
      aspect-ratio="0.9"
      @click="mainNav({name: 'home'})"
    >
    <v-toolbar-items>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-if="isUserLoggedIn" @click="navToSetting({name: 'settings'})" class="body-1s font-weight-bold"> {{this.user.lastname}} {{this.user.firstname}}</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn v-if="!admin" :href="'mailto:support@vlab.aapp.al-enterprise.com?subject=VLAB'" icon flat x-large>
        <v-icon>email</v-icon>
      </v-btn>
      <v-btn v-if="!isUserLoggedIn" flat :to="{name: 'signin'}" class="body-2 font-weight-bold">Sign in</v-btn>
      <!-- <v-btn v-if="!isUserLoggedIn" flat :to="{name: 'register'}" class="body-2 font-weight-bold">Register</v-btn> -->
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
    ...mapState(["user", "isUserLoggedIn", "dark", "admin", "active"])
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
    async mainNav(route) {
      if (!this.isUserLoggedIn) {
        this.$router.push(route);
      } else if (this.isUserLoggedIn) {
        if (this.admin) {
          this.$router.push('vlabs')
        } else if (!this.admin) {
          this.$router.push('dashboard')
        }
      }
    },
    async navToSetting(route) {
      this.$store.dispatch('setActive', 'four')
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
