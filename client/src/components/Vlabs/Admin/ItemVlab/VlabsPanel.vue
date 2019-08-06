<template>
 <v-layout justify-center>
  <v-flex xs12 sm6 md10>
    <panel v-if="isUserLoggedIn && admin" title="Vlabs">
      <!-- <v-btn
        class="grey darken-3"
        slot="action"
        :to="{name: 'vlab-create'}"
        light
        medium
        absolute
        right
        middle
        fab
      >
        <v-icon>add</v-icon>
      </v-btn> -->
      <v-data-table 
      :headers="headers" 
      :items="vlabs" 
      :items-per-page="10"
      :loading="isData(vlabs)" 
      loading-text="No data for the moment"
      class="elevation-12">
        <template v-slot:item.dayleft="{item}">
          {{needCredential(item.dayleft, item.assign)}}
        </template>
        <template v-slot:item.assign="{item}">
          <v-chip :color="getWarning(item.dayleft)" text-color="white">{{getTypeWarning(item.dayleft)}}</v-chip>
        </template>
        <template v-slot:item.id="{item}">
          <v-btn
              class="grey darken-1 font-weight-bold"
              :to="{
                  name: 'vlab',
                  params: {
                    vlabId: item.id}
                 }"
            >View Vlab</v-btn>
        </template>
      </v-data-table>
    </panel>
  </v-flex>
 </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabService from "@/services/Vlab/VlabService";

export default {
  data() {
    return {
      headers: [
        {text: "Vlab name", value: "name", sortable: false, align: "left"},
        {text: "Owner name", value: "ownername"},
        {text: "Remaining days", value: "dayleft", align: "center"},
        {text: "", value: "assign"},
        {text: "", value: "id"}
      ],
      // pagination: {
      //   sortBy: "createAt",
      //   descending: true
      // },
      vlabs: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    needCredential(time, assign) {
      if (!assign) {
        return "-";
      }
      return time;
    },
    getWarning(time) {
      if (time < 3) {
        return 'red'
      } else if (time >= 3 && time < 7) {
        return 'orange'
      } else {
        return 'green'
      }
    },
    isData(vlabs) {
      if (vlabs) {
        return (false)
      } else {
        return (true)
      }
    },
    getTypeWarning(time) {
      if (time < 3) {
        return 'High'
      } else if (time >= 3 && time < 7) {
        return 'Medium'
      } else {
        return 'Low'
      }
    }
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.vlabs = (await VlabService.getAllVlabs(value)).data;
      }
    }
  }
};
</script>

<style scoped>

</style>
