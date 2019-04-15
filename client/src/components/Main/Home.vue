<template>
  <v-layout column align-center v-if="!isUserLoggedIn" class="hello">
    <h1 class="mt-5">{{ msg }}</h1>
    <img class="mt-5" src="../../assets/o2g.png">
    <v-btn depressed large color="primary mt-5" :to="{name: 'register'}">START FREE TRIAL NOW</v-btn>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Hello",
  data() {
    return {
      msg: "Welcome to Portal Vlab"
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  }
};
</script>

<style scoped>

</style>
