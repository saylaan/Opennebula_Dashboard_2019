<template>
  <panel v-if="isUserLoggedIn" title="URL">
    <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="vlaburls">
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
import UrlVlabService from "@/services/Url/UrlVlabService";
import VlabService from "@/services/Vlab/VlabService";

export default {
  data() {
    return {
      headers: [
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
