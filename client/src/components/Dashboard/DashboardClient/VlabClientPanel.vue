<template>
  <panel v-if="isUserLoggedIn" title="Vlab Info">
    <v-flex class="vlab">
      <h2>Active Vlab : {{ activeVlab ? 'OK' : 'KO' }}</h2>
      <!-- <br>
      <br> -->
      <!-- <h2>Unactive Vlab : {{ totalVlabs - activeVlab }}</h2>
      <br>
      <br>
      <h2>Total Vlab : {{ totalVlabs }}</h2> -->
    </v-flex>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabUserService from "@/services/Vlab/VlabUserService";

export default {
  data() {
    return {
      vlabs: null,
      totalVlabs: 0,
      activeVlab: 0
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler() {
        this.vlabs = (await VlabUserService.getVlabUsers()).data;
        for (var i = 0; i !== this.vlabs.length; i++) {
          this.totalVlabs++;
          if (this.vlabs[i].active) {
            this.activeVlab++;
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.vlab {
  padding: 20px;
  overflow: hidden;
}
</style>
