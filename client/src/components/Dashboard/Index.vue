<template>
  <v-layout column justify-center>
    <v-flex xs12>
      <vlabs-search-panel/>
    </v-flex>
    <v-flex xs12>
      <vlabs-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabsPanel from "./ItemVlab/VlabsPanel";
import VlabsSearchPanel from "./ItemVlab/VlabsSearchPanel";
import VlabService from "@/services/VlabService";

export default {
  data() {
    return {
      vlabs: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  async mounted() {
    // request to the DB
    this.vlabs = (await VlabService.getAllVlabs()).data;
  },
  components: {
    VlabsPanel,
    VlabsSearchPanel
  },
  props: {
    main: {
      type: Object
    }
  }
};
</script>

<style scoped>
</style>
