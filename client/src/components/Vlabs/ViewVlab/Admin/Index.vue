<template>
<v-container fluid grid-list-md justify-center>
  <v-layout class="mt-5" v-if="isUserLoggedIn && admin" justify-center wrap>
    <v-flex fill-height xs12 sm10 md5 d-flex class="mt-1">
        <vlab-data/>
      </v-flex>
      <v-flex fill-height xs12 sm10 md5 d-flex class="mt-1 ml-1">
        <vlab-sip/>
      </v-flex>
      <v-flex fill-height xs12 sm10 md5 d-flex class="mt-1">
        <vlab-url/>
      </v-flex>
      <v-flex d-flex fill-height xs12 sm10 md5 class="ml-1 mt-1">
        <vlab-vm/>
      </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapState } from "vuex";
import VlabData from "./VlabData";
import VlabVm from "./VlabVM";
import VlabUrl from "./VlabUrl";
import VlabSip from "./VlabSip";
import VlabService from "@/services/Vlab/VlabService";
import VlabUserLogService from "@/services/Vlab/VlabUserLogService";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  async mounted() {
    const vlabId = this.route.params.vlabId;
    this.vlab = (await VlabService.getVlab(vlabId)).data;
    if (this.isUserLoggedIn) {
      VlabUserLogService.post({
        VlabId: vlabId
      });
    }
  },
  components: {
    VlabData,
    VlabVm,
    VlabUrl,
    VlabSip
  }
};
</script>

<style scoped>
</style>
