<template>
  <v-layout class="mt-5" column v-if="isUserLoggedIn">
    <v-flex v-if="admin">
      <v-layout row justify-space-between>
        <v-flex xs4 class="mt-2">
          <users-panel/>
        </v-flex>
        <v-flex xs4 class="mt-2">
          <vlabs-panel/>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 class="mt-2">
          <messages-from-client-panel/>
        </v-flex>
        <v-flex xs12 class="mt-2 ml-1">
          <messages-faq-panel/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="!admin">
      <v-layout justify-center column>
        <v-layout justify-center>
        <v-flex xs6 class="mt-2">
          <vlab-client-panel/>
        </v-flex>
        </v-layout>
        <!-- <v-flex xs6 class="ml-1 mt-2">
            <vm-client-panel/>
        </v-flex>-->
        <v-layout row>
          <v-layout column>
            <v-flex xs6 class="mt-2">
              <url-client-panel/>
            </v-flex>
            <v-flex xs6 class="mt-2">
              <messages-client-panel/>
            </v-flex>
          </v-layout>
          <v-flex xs6 class="ml-2 mt-2">
            <sip-client-panel/>
          </v-flex>
        </v-layout>
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
import UrlClientPanel from "./DashboardClient/UrlClientPanel";
import SipClientPanel from "./DashboardClient/SipClientPanel";

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
    VmClientPanel,
    UrlClientPanel,
    SipClientPanel
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
