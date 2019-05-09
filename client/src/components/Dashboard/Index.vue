<template>
  <v-layout v-if="isUserLoggedIn">
    <v-flex v-if="admin">
      <v-layout row justify-space-around wrap>
        <v-flex xs4 class="ml-2 mt-2">
          <users-panel/>
        </v-flex>
        <v-flex xs4 class="ml-1 mr-1 mt-2">
          <vlabs-panel/>
        </v-flex>
        <v-flex xs12 class="ml-1 mt-5">
          <messages-from-client-panel/>
        </v-flex>
        <v-flex xs12 class="mt-2 ml-1">
          <messages-faq-panel/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="!admin">
      <v-layout column>
        <v-layout row justify-center>
          <v-flex xs6 class="ml-1 mt-2">
            <vlab-client-panel/>
          </v-flex>
          <v-flex xs6 class="ml-1 mt-2">
            <vm-client-panel/>
          </v-flex>
        </v-layout>
        <v-flex xs9 class="ml-1 mt-5">
          <messages-client-panel class="mt-2"/>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabsPanel from "./DashboardAdmin/VlabsPanel";
import UsersPanel from "./DashboardAdmin/UsersPanel";
import MessagesFromClientPanel from "./DashboardAdmin/MessagesFromClientPanel";
import MessagesFaqPanel from "./DashboardAdmin/MessagesFAQPanel";
import MessagesClientPanel from "./DashboardClient/MessagesClientPanel";
import VlabClientPanel from "./DashboardClient/VlabClientPanel";
import VmClientPanel from "./DashboardClient/VmClientPanel";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  components: {
    VlabsPanel,
    UsersPanel,
    MessagesFromClientPanel,
    MessagesFaqPanel,
    MessagesClientPanel,
    VlabClientPanel,
    VmClientPanel
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
