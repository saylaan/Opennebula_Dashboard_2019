<template>
  <panel v-if="isUserLoggedIn && admin" title="Vlab user logs">
    <v-data-table :headers:="headers" :pagination.sync="pagination" :items="vlabuserlogs">
      <template v-slot:items="props">
        <td class="text-xs-right">{{props.item.name}}</td>
        <td class="text-xs-right">{{props.item.ownername}}</td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabUserLogService from "@/services/Vlab/VlabUserLogService";

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
        sortBy: "createAt",
        descending: true
      },
      vlabuserlogs: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
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
