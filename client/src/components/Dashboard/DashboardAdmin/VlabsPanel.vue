<template>
  <panel v-if="isUserLoggedIn && admin" title="Total vlab">
    <v-flex class="vlab">
      <h2>Active Vlab : {{ activeVlabs }}</h2>
      <br>
      <br>
      <h2>Unactive Vlab : {{ totalVlabs - activeVlabs }}</h2>
      <br>
      <br>
      <h2>Total Vlab : {{ totalVlabs }}</h2>
    </v-flex>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabService from "@/services/Vlab/VlabService";

export default {
  data() {
    return {
      vlabs: null,
      totalVlabs: 0,
      activeVlabs: 0
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler() {
        this.vlabs = (await VlabService.getAllVlabs()).data;
        for (var i = 0; i !== this.vlabs.length; i++) {
          this.totalVlabs++;
          if (this.vlabs[i].active) {
            this.activeVlabs++;
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
  width: 200px;
  overflow: visible;
}
</style>
