<template>
  <v-layout v-if="isUserLoggedIn && !admin" row justify-center wrap>
    <!-- TODO: ALL THE VM LINK TO THE VLAB AND THEIR STATUS
    -->
    <v-flex class="ml-1" xs9>
      <vlabs-user/>
    </v-flex>
    <v-flex class="mt-5" xs9>
      <vlabs-user-logs/>
    </v-flex>
    <!-- <v-flex class="ml-5 mt-5" xs5>
      <vlabs-user-urls/>
    </v-flex> -->
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabsUser from "./ItemVlab/VlabsUser";
import VlabsUserLogs from "./ItemVlab/VlabsUserLogs";
import VlabsUserUrls from "./ItemVlab/VlabsUserUrls";

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
