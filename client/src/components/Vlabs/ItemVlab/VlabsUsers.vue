<template>
  <panel title="Vlabs Users">
    <v-data-table :headers:="headers" :pagination.sync="pagination" :items="vlabusers">
      <template v-slot:items="props">
        <td class="text-xs-right">{{props.item.title}}</td>
        <td class="text-xs-right">{{props.item.name}}</td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabUserService from "@/services/VlabUserService";

export default {
  data() {
    return {
      headers: [
        {
          text: "VlabName",
          value: "title"
        },
        {
          text: "CompanyName",
          value: "name"
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
      this.vlabusers = (await VlabUserService.getVlabUsers()).data;
    }
  }
};
</script>

<style>
</style>
