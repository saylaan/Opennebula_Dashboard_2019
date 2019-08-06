<template>
  <v-container fluid grid-list-md justify-center>
    <!-- <v-layout class="mt-5" v-if="isUserLoggedIn && admin" justify-center row>
      <v-flex xs6>
        <v-layout column justify-center class="mt-2">
          <v-flex xs6>
            <users-panel/>
          </v-flex>
          <v-flex xs6 class="mt-2">
            <messages-from-client-panel/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout column justify-center class="mt-2 ml-2">
          <v-flex xs6>
            <vlabs-panel/>
          </v-flex>
          <v-flex xs6 class="mt-2">
            <messages-faq-panel/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout> -->
    <v-layout class="mt-5" v-if="isUserLoggedIn && !admin" justify-center wrap>
          <v-flex fill-height xs12 sm8 md5 d-flex class="mt-1">
            <vlab-client-panel/>
          </v-flex>
          <v-flex fill-height xs12 sm8 md5 d-flex class="mt-1 ml-1">
            <url-client-panel/>
          </v-flex>
          <v-flex fill-height xs12 sm8 md5 d-flex class="mt-1">
            <vm-client-panel/>
          </v-flex>
      <v-flex fill-height xs12 sm8 md5 d-flex class="mt-1 ml-1">
            <sip-client-panel/>
          <!-- <v-flex xs6 class="mt-2">
            <messages-client-panel/>
          </v-flex> -->
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import VlabsPanel from "./DashboardAdmin/VlabsPanel";
import UsersPanel from "./DashboardAdmin/UsersPanel";
import MessagesFromClientPanel from "./DashboardAdmin/MessagesFromClientPanel";
import MessagesFaqPanel from "./DashboardAdmin/MessagesFAQPanel";
import MessagesClientPanel from "./DashboardClient/MessagesClientPanel";
import TotalVlabClientPanel from "./DashboardClient/TotalVlabClientPanel";
import TotalVmClientPanel from "./DashboardClient/TotalVmClientPanel";
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
    TotalVlabClientPanel,
    TotalVmClientPanel,
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
