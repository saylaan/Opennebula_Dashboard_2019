<template>
  <panel v-if="isUserLoggedIn" title="SIP">
    <v-btn
      class="grey darken-3"
      slot="action"
      :to="{name: 'create-sip'}"
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
      <v-data-table :headers:="headers" :pagination.sync="pagination" :items="vlabsips">
        <template v-slot:items="props">
          <td class="text-xs-right">{{props.item.active ? 'OK': 'KO'}}</td>
          <td class="text-xs-right">{{props.item.name}}</td>
          <td class="text-xs-right">{{props.item.login}}</td>
          <td class="text-xs-right">{{props.item.passwd}}</td>
          <v-btn
            class="grey darken-1 font-weight-bold"
            :to="{
                name: `edit-sip`,
                params : {
                    sipId: props.item.id
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
import SipVlabService from "@/services/Sip/SipVlabService";
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
        this.vlabsips = (await SipVlabService.index({
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
      console.log(this.vlabsips)
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
