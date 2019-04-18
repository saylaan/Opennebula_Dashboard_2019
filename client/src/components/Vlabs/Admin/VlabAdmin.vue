<template>
  <v-layout v-if="isUserLoggedIn && admin" row justify-center>
    <v-flex xs6 v-if="isUserLoggedIn">
      <vlabs-users/>
      <vlabs-users-logs class="mt-2"/>
    </v-flex>
    <v-flex
      :class="{
          xs12: !isUserLoggedIn,
          xs6: isUserLoggedIn
        }"
      class="ml-2"
    >
      <vlabs-search-panel/>
      <vlabs-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabsPanel from "./ItemVlab/VlabsPanel";
import VlabsSearchPanel from "./ItemVlab/VlabsSearchPanel";
import VlabService from "@/services/Vlab/VlabService";
import VlabsUsers from "./ItemVlab/VlabsUsers";
import VlabsUsersLogs from "./ItemVlab/VlabsUsersLogs";

export default {
  data() {
    return {
      vlabs: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  async mounted() {
    this.vlabs = (await VlabService.getAllVlabs()).data;
  },
  components: {
    VlabsPanel,
    VlabsSearchPanel,
    VlabsUsers,
    VlabsUsersLogs
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
