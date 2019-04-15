<template>
  <v-layout v-if="isUserLoggedIn && !admin" column justify-center>
    <!-- TODO: ALL THE VM LINK TO THE VLAB AND THEIR STATUS
    -->
    <vlabs-user/>
    <vlabs-user-logs class="mt-5"/>
    <vlabs-user-urls class="mt-5"/>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabsUser from "./ItemVlab/VlabsUser";
import VlabsUserLogs from "./ItemVlab/VlabsUserLogs";
import VlabsUserUrls from "./ItemVlab/VlabsUserUrls"

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
    VlabsUser,
    VlabsUserLogs,
    VlabsUserUrls
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
