<template>
  <v-app-bar
    :clipped-left="drawer.clipped" 
    app 
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
    <v-spacer></v-spacer>
    <v-btn v-if="!admin && isUserLoggedIn" :href="'mailto:support@vlab.aapp.al-enterprise.com?subject=VLAB'" icon small x-large>
      <v-icon>email</v-icon>
    </v-btn>
    <v-toolbar-items>
      <v-btn text v-if="isUserLoggedIn" @click="navToSetting({name: 'settings'})" class="hidden-sm-and-down body-1s font-weight-bold">
        {{this.user.firstname}} {{this.user.lastname}}
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
    <v-btn v-if="!isUserLoggedIn" text :to="{name: 'signin'}" class="body-2 font-weight-bold">Sign in</v-btn>
    <!-- <v-btn v-if="!isUserLoggedIn" small :to="{name: 'register'}" class="body-2 font-weight-bold">Register</v-btn> -->
    <v-btn v-if="isUserLoggedIn" text @click="logout" class="body-1s font-weight-bold">Log out</v-btn>
    </v-toolbar-items>
  </v-app-bar>
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

@media screen and (max-width: 720px) {
  .nonePhone {
    display: none !important;
  }
}
</style>
