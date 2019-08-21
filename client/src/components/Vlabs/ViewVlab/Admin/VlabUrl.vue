<template>
  <panel v-if="isUserLoggedIn" title="URL">
    <v-btn
      class="grey darken-3"
      slot="action"
      :to="{name: 'create-url'}"
      light
      medium
      absolute
      right
      middle
      fab
    >
      <v-icon>add</v-icon>
    </v-btn>
      <v-data-table 
       :headers="headers"
       hide-default-footer
       :loading="isData(vlaburls)"
       loading-text="No data for the moment"
       :items-per-page="10"
       :items="vlaburls"
       class="elevation-12">
        <template v-slot:item.url="{item}">
        <a @click="goToUrl(item.url)">{{item.url}}</a>
        </template>
        <template v-slot:item.id="{item}">
        <!-- <v-btn
          class="grey darken-1 font-weight-bold"
          :to="{
              name: `edit-url`,
              params : {
              urlId: item.id
          }
        }"
        >Edit</v-btn> -->
        <v-btn
          class="grey darken-1 font-weight-bold"
          @click="resetUrl(item)"
        >Reset Password</v-btn>
        </template>
      </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import UrlVlabService from "@/services/Url/UrlVlabService";
import UrlService from "@/services/Url/UrlService";
import VlabService from "@/services/Vlab/VlabService";

export default {
  data() {
    return {
      headers: [
        {text: "Name", value: "name", align: "left", sortable: false},
        {text: "Url", value: "url", align: "center"},
        {text: "Login", value: "log", align: "center"},
        {text: "Password", value: "password", align: "center"},
        {text: "", value: "id"}
      ],
      vlaburls: [],
      vlab: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  watch: {
    async vlaburls() {
      await setTimeout(async () => {
        const vlabId = this.route.params.vlabId;
        this.vlaburls = (await UrlVlabService.index({
          VlabId: vlabId
        })).data;
      }, 3000)
    }
  },
  methods: {
    async resetUrl(url) {
      try {
        await UrlService.changePwd(url.id)
        const vlabId = this.route.params.vlabId;
        this.vlab = (await VlabService.getVlab(vlabId)).data;
        try {
          this.vlaburls = (await UrlVlabService.index({
            VlabId: this.vlab[0].id
          })).data;
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err)
      }
    },
    isData(data) {
      if (data) {
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
    const vlabId = this.route.params.vlabId;
    this.vlab = (await VlabService.getVlab(vlabId)).data;
    try {
      this.vlaburls = (await UrlVlabService.index({
        VlabId: this.vlab[0].id
      })).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>

</style>
