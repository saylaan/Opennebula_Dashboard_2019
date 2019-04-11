<template>
  <v-layout v-if="isUserLoggedIn && !admin" row justify-center>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabService from "@/services/VlabService";
import VlabsUsers from "./ItemVlab/VlabsUsers";

export default {
  data() {
    return {
      vlab: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  components: {
    VlabsUsers
  },
  props: {
    main: {
      type: Object,
      require: true
    }
  }
};
</script>

<style scoped>
</style>
