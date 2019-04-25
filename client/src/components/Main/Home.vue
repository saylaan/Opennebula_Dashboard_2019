<template>
  <v-layout column justify-center v-if="!isUserLoggedIn" class="hello">
    <v-flex xs6 class="mt-5">
      <h1>{{ msg }}</h1>
    </v-flex>
    <v-flex xs6 class="mt-5">
      <img src="../../assets/o2g.png">
    </v-flex>
    <v-flex xs6>
      <v-btn depressed large color="primary mt-5" :to="{name: 'register'}">START FREE TRIAL NOW</v-btn>
    </v-flex>
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
