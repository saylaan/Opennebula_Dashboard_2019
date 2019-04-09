<template>
  <v-layout column align-center v-if="!isUserLoggedIn" class="hello">
    <h1 class="mt-5">{{ msg }}</h1>
    <!-- <img src="../../assets/oxeArch.jpg"> -->
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
      msg: "Welcome to the portal Vlab of Alcatel-Lucent"
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  }
};
</script>

<style scoped>

img {
  width: 400px;
  height: 500px;
}

</style>
