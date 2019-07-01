<template>
  <panel v-if="isUserLoggedIn" title="SIP">
      <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="vlabsips">
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
import SipVlabService from "@/services/Sip/SipVlabService";
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
      vlabsips: [],
      vlab: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  watch: {
    async vlabsip() {
      try {
        this.vlabsips = (await SipUserService.index({
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
      this.vlabsips = (await SipVlabService.index({
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
