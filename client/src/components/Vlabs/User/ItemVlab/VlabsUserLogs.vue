<template>
  <panel v-if="isUserLoggedIn" title="Vlab user logs">
    <v-data-table :headers:="headers" :pagination.sync="pagination" :items="vlabuserlogs">
      <template v-slot:items="props">
        <td class="text-xs-right">{{props.item.title}}</td>
        <td class="text-xs-right">{{props.item.name}}</td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabUserLogService from "@/services/VlabUserLogService";

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
        sortBy: "createAt",
        descending: true
      },
      vlabuserlogs: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  async mounted() {
    if (this.isUserLoggedIn) {
      this.vlabuserlogs = (await VlabUserLogService.index()).data;
    }
  }
};
</script>

<style>
</style>
