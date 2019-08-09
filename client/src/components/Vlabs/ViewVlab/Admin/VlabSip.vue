<template>
  <panel v-if="isUserLoggedIn" title="SIP">
    <v-btn
      class="grey darken-3"
      slot="action"
      @click="resetPassword()"
      light
      medium
      absolute
      right
      middle
    >
      Reset Password
    </v-btn>
    <v-layout justify-center>
    <!-- <div v-if="isSip()" class="title">SIP Domain: oxe-{{this.vlabsips[0].vlabname.toLowerCase()}}.ale-aapp.com</div> -->
    </v-layout>
      <v-data-table
       :headers="headers"
       hide-default-footer
       :loading="isData(vlabsips)"
       loading-text="No data for the moment"
       :items-per-page="10"
       :items="vlabsips"
       class="elevation-12">
        <!-- <template v-slot:item.id="props">
          <v-layout justify-center>
          <v-btn
            class="grey darken-1 font-weight-bold"
            :to="{
                name: `edit-sip`,
                params : {
                    sipId: props.item.id
                }
          }"
          >Edit</v-btn>
          </v-layout>
        </template>-->
      </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import SipVlabService from "@/services/Sip/SipVlabService";
import SipService from "@/services/Sip/SipService";
import VlabService from "@/services/Vlab/VlabService";

export default {
  data() {
    return {
      headers: [
        {text: "Name", value: "name", sortable: false, align: "left"},
        {text: "Login", value: "login", align: "center"},
        {text: "Password", value: "passwd", align: "center"}
        // {text: "", value: "id", align: "center"}
      ],
      vlabsips: [],
      vlab: null
    };
  },
  methods: {
    async resetPassword() {
      try {
        await SipService.changePwd(this.vlabsips)
        const vlabId = this.route.params.vlabId;
        this.vlab = (await VlabService.getVlab(vlabId)).data;
        try {
          this.vlabsips = (await SipVlabService.index({
            VlabId: this.vlab[0].id
          })).data;
        } catch (err) {
          console.log(err);
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
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  watch: {
    async vlabsip() {
      try {
        const vlabId = this.route.params.vlabId;
        this.vlab = (await VlabService.getVlab(vlabId)).data;
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
