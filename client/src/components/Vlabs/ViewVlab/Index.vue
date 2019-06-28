<template>
  <v-layout v-if="isUserLoggedIn">
    <v-flex v-if="admin">
      <view-vlab-admin/>
    </v-flex>
    <v-flex v-if="!admin">
      <view-vlab-user/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import ViewVlabUser from "./User/Index";
import ViewVlabAdmin from "./Admin/Index";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  components: {
    ViewVlabUser,
    ViewVlabAdmin
  }
};
</script>

<style scoped>
</style>
