<template>
  <panel v-if="isUserLoggedIn" title="SIP">
    <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="usersips">
      <template v-slot:items="props">
        <td class="text-xs-left">{{props.item.name}}</td>
        <td class="text-xs-left">{{props.item.login}}</td>
        <td class="text-xs-left">{{props.item.passwd}}</td>
      </template>
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
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Login",
          value: "login"
        },
        {
          text: "Password",
          value: "passwd"
        }
      ],
      pagination: {
        sortBy: "createAt",
        descending: true
      },
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
