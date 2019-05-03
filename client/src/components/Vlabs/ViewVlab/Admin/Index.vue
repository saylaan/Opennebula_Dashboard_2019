<template>
  <v-layout column v-if="isUserLoggedIn && admin">
    <v-layout justify-center>
      <v-flex xs6>
        <vlab-data :vlab="vlab"/>
      </v-flex>
    </v-layout>
    <v-layout row justify-center class="mt-2">
      <v-flex xs6>
        <vlab-vm/>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <vlab-url/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabData from "./VlabData";
import VlabVm from "./VlabVM";
import VlabUrl from "./VlabUrl";
import VlabService from "@/services/Vlab/VlabService";
import VlabUserLogService from "@/services/Vlab/VlabUserLogService";

export default {
  data() {
    return {
      vlab: {}
    };
  },
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
    VlabUrl
  }
};
</script>

<style scoped>
</style>
