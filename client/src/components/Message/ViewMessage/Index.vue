<template>
  <v-layout class="mt-5" row justify-center v-if="isUserLoggedIn">
    <v-flex xs6>
      <message-data/>
    </v-flex>
  </v-layout>
</template>

<script>
import MessageData from "./MessageData";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  components: {
    MessageData
  }
};
</script>

<style>
</style>
