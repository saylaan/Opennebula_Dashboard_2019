<template>
  <v-layout class="mt-5" v-if="isUserLoggedIn && !admin" justify-center row>
    <v-flex xs6>
    <v-layout column justify-center class="mt-2">
      <v-flex xs6>
        <vlab-data/>
      </v-flex>
      <v-flex xs6 class="mt-2">
        <vlab-vm/>
      </v-flex>
    </v-layout>
    </v-flex>
    <v-flex xs6>
    <v-layout column justify-center class="mt-2 ml-2">
      <v-flex xs6>
        <vlab-url/>
      </v-flex>
      <v-flex xs6 class="mt-2">
        <vlab-sip/>
      </v-flex>
    </v-layout>
    </v-flex>
  </v-layout>
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
