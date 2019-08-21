<template>
  <panel v-if="isUserLoggedIn" title="URL">
      <v-data-table 
       :headers="headers"
       hide-default-footer
       :loading="isData(userurls)"
       loading-text="No data for the moment"
       :items-per-page="10"
       :items="userurls"
       class="elevation-12">
        <template v-slot:item.url="{item}">
        <a @click="goToUrl(item.url)">{{item.url}}</a>
        </template>
        <template v-slot:item.id="{item}">
        <v-btn
          class="grey darken-1 font-weight-bold"
          :to="{
              name: `edit-url`,
              params : {
              urlId: item.id
          }
        }"
        >Edit</v-btn>
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
        {text: "Name", value: "name", align: "left", sortable: false},
        {text: "Url", value: "url", align: "center"},
        {text: "Login", value: "log", align: "center"},
        {text: "Password", value: "password", align: "center"}
      ],
      userurls: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  watch: {
    async userurls() {
      await setTimeout(async () => {
        this.userurls = (await UrlUserService.index()).data;
      }, 3000)
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
    async goToUrl(url) {
      window.open(url, '_blank')
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
