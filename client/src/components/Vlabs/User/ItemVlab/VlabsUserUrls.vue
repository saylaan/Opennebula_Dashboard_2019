<template>
  <panel v-if="isUserLoggedIn" title="URL">
    <v-data-table :headers:="headers" :pagination.sync="pagination" :items="userurls">
      <template v-slot:items="props">
        <td class="text-xs-right">{{props.item.active ? 'OK': 'KO'}}</td>
        <td class="text-xs-right">{{props.item.name}}</td>
        <td class="text-xs-right">{{props.item.url}}</td>
        <td class="text-xs-right">{{props.item.log}}</td>
        <td class="text-xs-right">{{props.item.password}}</td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import UrlUserService from "@/services/Url/UrlUserService";
import VlabService from "@/services/Vlab/VlabService";

export default {
  data() {
    return {
      headers: [
        {
          text: "Active",
          value: "active"
        },
        {
          text: "Url",
          value: "url"
        },
        {
          text: "Login",
          value: "log"
        },
        {
          text: "Password",
          value: "password"
        }
      ],
      pagination: {
        sortBy: "createAt",
        descending: true
      },
      userurls: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  watch: {
    async userurl() {
      try {
        this.userurls = (await UrlUserService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    try {
      this.userurls = (await UrlUserService.index()).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
</style>
