<template>
  <panel v-if="isUserLoggedIn" title="VM">
      <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="vmusers">
        <template v-slot:items="props">
          <td class="text-xs-left">{{props.item.active ? 'OK': 'KO'}}</td>
          <td class="text-xs-left">{{props.item.name}}</td>
          <td class="text-xs-left">{{props.item.type}}</td>
        </template>
      </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VmUserService from "@/services/Vm/VmUserService";

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
          text: "Type",
          value: "type"
        }
      ],
      pagination: {
        sortBy: "createAt",
        descending: true
      },
      vmusers: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  watch: {
    async vlabvm() {
      try {
        this.vmusers = (await VmUserService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    try {
      this.vmusers = (await VmUserService.index()).data;
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
