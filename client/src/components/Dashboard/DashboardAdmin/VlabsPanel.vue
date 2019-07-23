<template>
  <panel v-if="isUserLoggedIn && admin" title="Total vlab">
    <v-layout class="vlab" column align-center justify-center>
      <h2>Assign Vlab : {{ assignVlabs }}</h2>
      <br>
      <br>
      <h2>Unassign Vlab : {{ totalVlabs - assignVlabs }}</h2>
      <br>
      <br>
      <h2>Total Vlab : {{ totalVlabs }}</h2>
    </v-layout>
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
      assignVlabs: 0
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
          if (this.vlabs[i].assign) {
            this.assignVlabs++;
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.vlab {
  overflow: visible;
}
</style>
