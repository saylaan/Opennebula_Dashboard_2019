<template>
  <v-layout v-if="isUserLoggedIn" justify-center>
    <v-layout v-if="admin" row>
      <v-flex xs6>
        <users-panel class="mt-2"/>
      </v-flex>
      <v-flex class="ml-2" xs6>
        <vlabs-panel class="mt-2"/>
      </v-flex>
      <!-- TODO: MAKE THE NUMBER OF USER AND VLAB + NO SEARCH AND VIEW(only basic status) -->
    </v-layout>
    <v-layout v-if="!admin" row>
      <!-- TODO: MAKE THE USER DASHBOARD (TUTO ?) -->
    </v-layout>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabService from "@/services/VlabService";
import UserService from "@/services/UserService";
import VlabsPanel from "./ItemVlab/VlabsPanel";
import UsersPanel from "./ItemVlab/UsersPanel";

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
    UsersPanel
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
