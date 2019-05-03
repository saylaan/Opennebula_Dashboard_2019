<template>
  <panel v-if="isUserLoggedIn" title="URL">
     <v-btn
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
      </v-btn>
    <v-layout wrap>
    <v-data-table :headers:="headers" :pagination.sync="pagination" :items="vlaburls">
      <template v-slot:items="props">
        <td class="text-xs-right">{{props.item.title}}</td>
        <td class="text-xs-right">{{props.item.name}}</td>
      </template>
    </v-data-table>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from "vuex";

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
      vlaburls: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
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
