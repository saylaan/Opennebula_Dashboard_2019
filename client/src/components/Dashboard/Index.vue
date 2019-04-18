<template>
  <v-layout v-if="isUserLoggedIn" row wrap justify-center>
    <v-flex xs3 class=" ml-2 mt-2" v-if="admin">
          <users-panel/>
    </v-flex>
    <v-flex xs3 class="ml-1 mr-1 mt-2" v-if="admin">
          <vlabs-panel />
    </v-flex>
    <v-flex xs6 class="ml-1 mt-2" v-if="admin">
      <messages-client-panel />
    </v-flex>
    <v-flex xs6 class="mt-2 ml-1" v-if="admin">
      <messages-faq-panel />
    </v-flex>

    <v-flex v-if="!admin" row>
      <!-- <v-flex xs12>
        <user-messages class="mt-2"/>
      </v-flex>-->
      <!-- TODO: MAKE THE USER DASHBOARD (TUTO ?) -->
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabService from "@/services/Vlab/VlabService";
import UserService from "@/services/User/UserService";
import VlabsPanel from "./DashboardAdmin/VlabsPanel";
import UsersPanel from "./DashboardAdmin/UsersPanel";
import MessagesClientPanel from "./DashboardAdmin/MessagesClientPanel";
import MessagesFaqPanel from "./DashboardAdmin/MessagesFAQPanel";

export default {
  data() {
    return {
      vlabs: null,
      users: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  async mounted() {
    this.vlabs = (await VlabService.getAllVlabs()).data;
    this.users = (await UserService.index()).data;
  },
  components: {
    VlabsPanel,
    UsersPanel,
    MessagesClientPanel,
    MessagesFaqPanel
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
