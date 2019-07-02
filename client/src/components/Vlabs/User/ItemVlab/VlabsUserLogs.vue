<template>
  <panel v-if="isUserLoggedIn" title="Vlab user logs">
    <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="vlabuserlogs">
      <template v-slot:items="props">
        <td class="text-xs-left">{{props.item.name}}</td>
        <td class="text-xs-left">{{changeDate(props.item.createdAt)}}</td>
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
          text: "Date",
          value: "date"
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
  },
  methods: {
    changeDate(time) {
      return (time.substring(0, 10))
    }
  }
};
</script>

<style>
</style>
