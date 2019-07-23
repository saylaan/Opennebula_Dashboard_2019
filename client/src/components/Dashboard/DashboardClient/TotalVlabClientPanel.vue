<template>
  <panel v-if="isUserLoggedIn" title="Vlab Info">
    <v-layout justify-center>
      <h2>Assign Vlab : {{ assignVlab ? 'OK' : 'KO' }}</h2>
    </v-layout>
      <!-- <br>
      <br> -->
      <!-- <h2>Unassign Vlab : {{ totalVlabs - assignVlab }}</h2>
      <br>
      <br>
      <h2>Total Vlab : {{ totalVlabs }}</h2> -->
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
      assignVlab: 0
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler() {
        this.vlabs = (await VlabUserService.index()).data;
        for (var i = 0; i !== this.vlabs.length; i++) {
          this.totalVlabs++;
          if (this.vlabs[i].assign) {
            this.assignVlab++;
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
