<template>
  <v-layout column align-center v-if="!isUserLoggedIn" class="hello">
    <h1>{{ msg }}</h1>
    <!-- <img src="../../assets/oxeArch.jpg"> -->
    <v-btn class="trial" :to="{name: 'register'}">START FREE TRIAL NOW</v-btn>
    <img src="../../assets/o2g.png">
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

.trial {
  width: 300px;
  height: 200px;
  color: red;
}

img {
  width: 400px;
  height: 500px;
}

</style>
