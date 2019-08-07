<template>
  <panel v-if="isUserLoggedIn" title="SIP">
    <v-layout justify-center>
    <div v-if="isSip()" class="title">SIP Domain: oxe-{{this.usersips[0].vlabname.toLowerCase()}}.ale-aapp.com</div>
    </v-layout>
      <v-data-table
       :headers="headers"
       hide-default-footer
       :loading="isData(usersips)"
       loading-text="No data for the moment"
       :items-per-page="10"
       :items="usersips"
       class="elevation-12">
      </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import SipUserService from "@/services/Sip/SipUserService";
import VlabService from "@/services/Vlab/VlabService";

export default {
  data() {
    return {
      headers: [
        {text: "Name", value: "name", sortable: false, align: "left"},
        {text: "Login", value: "login", align: "center"},
        {text: "Password", value: "passwd", align: "center"}
      ],
      usersips: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  watch: {
    async usersip() {
      try {
        this.usersips = (await SipUserService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    isData(vlabs) {
      if (vlabs) {
        return (false)
      } else {
        return (true)
      }
    },
    async isSip() {
      if (this.usersips[0]) {
        return (true)
      } else {
        return false
      }
    }
  },
  async mounted() {
    try {
      this.usersips = (await SipUserService.index()).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
</style>
