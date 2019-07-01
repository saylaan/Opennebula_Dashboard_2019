<template>
  <panel v-if="isUserLoggedIn" title="URL">
    <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="userurls">
      <template v-slot:items="props">
        <td class="text-xs-left">{{props.item.name}}</td>
          <td>
          <a class="text-xs-left" :href="props.item.url">{{props.item.url}}</a>
          </td>
        <td class="text-xs-left">{{props.item.log}}</td>
        <td class="text-xs-left">{{props.item.password}}</td>
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
          text: "Type",
          value: "type"
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
