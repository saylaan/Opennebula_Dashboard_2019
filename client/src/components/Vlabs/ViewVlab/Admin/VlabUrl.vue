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
    <v-layout wrap>
      <v-data-table :headers:="headers" :pagination.sync="pagination" :items="vlaburls">
        <template v-slot:items="props">
          <td class="text-xs-right">{{props.item.active ? 'OK': 'KO'}}</td>
          <td class="text-xs-right">{{props.item.name}}</td>
          <td class="text-xs-right">{{props.item.url}}</td>
          <td class="text-xs-right">{{props.item.log}}</td>
          <td class="text-xs-right">{{props.item.password}}</td>
          <v-btn
            class="grey darken-1 font-weight-bold"
            :to="{
                name: `edit-url`,
                params : {
                    urlId: props.item.id
                }
        }"
          >Edit</v-btn>
        </template>
      </v-data-table>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import UrlVlabService from "@/services/Url/UrlVlabService";
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
      vlaburls: [],
      vlab: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  watch: {
    async vlaburl() {
      try {
        this.vlaburls = (await UrlVlabService.index({
          VlabId: this.vlab.id
        })).data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    const vlabId = this.route.params.vlabId;
    this.vlab = (await VlabService.getVlab(vlabId)).data;
    try {
      this.vlaburls = (await UrlVlabService.index({
        VlabId: this.vlab.id
      })).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
textarea {
  width: 80%;
  font-family: monospace;
  border: none;
  height: 200px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 20px;
}
</style>
