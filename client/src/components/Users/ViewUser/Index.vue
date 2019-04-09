<template>
  <v-layout column v-if="isUserLoggedIn">
    <v-layout row>
      <v-flex xs6 offset-xs3>
        <user-data :user="user"/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserData from "./UserData";
// import UserService from "@/services/UserService";

export default {
  data() {
    return {
      vlab: {}
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route"])
  },
  // ,
  // async mounted() {
  //   const vlabId = this.route.params.vlabId;
  //   this.vlab = (await VlabService.getVlab(vlabId)).data;

  //   if (this.isUserLoggedIn) {
  //     VlabUserLogService.post({
  //       VlabId: vlabId
  //     });
  //   }
  // },
  components: {
    UserData
  }
};
</script>

<style scoped>
</style>
