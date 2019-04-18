<template>
  <v-layout v-if="isUserLoggedIn">
    <vlab-admin v-if="admin"/>
    <vlab-user v-if="!admin"/>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabAdmin from "./Admin/VlabAdmin";
import VlabUser from "./User/VlabUser";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  components: {
    VlabAdmin,
    VlabUser
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
