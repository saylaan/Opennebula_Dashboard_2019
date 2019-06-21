<template>
  <panel v-if="isUserLoggedIn" title="Vlabs User">
    <v-data-table :headers:="headers" :pagination.sync="pagination" :items="vlabusers">
      <template v-slot:items="props">
        <td class="text-xs-right">{{props.item.name}}</td>
        <td class="text-xs-right">{{props.item.ownername}}</td>
        <td class="text-xs-right">
          <v-btn
            class="grey darken-1 font-weight-bold"
            :to="{
                  name: 'vlab',
                  params: {
                    vlabId: props.item.VlabId}
                 }"
          >View Vlab</v-btn>
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabUserService from "@/services/Vlab/VlabUserService";

export default {
  data() {
    return {
      headers: [
        {
          text: "Vlab name",
          value: "name"
        },
        {
          text: "Owner name",
          value: "ownername"
        }
      ],
      pagination: {
        sortBy: "data",
        descending: true
      },
      vlabusers: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  async mounted() {
    if (this.isUserLoggedIn) {
      this.vlabusers = (await VlabUserService.index()).data;
    }
  }
};
</script>

<style>
</style>
