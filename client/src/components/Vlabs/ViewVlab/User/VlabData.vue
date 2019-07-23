<template>
  <panel v-if="isUserLoggedIn && !admin" title="Vlab">
      <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="vlabuser">
        <template v-slot:items="props">
          <td class="text-xs-left">{{props.item.nameparse}}</td>
          <td class="text-xs-left">{{needCredential(props.item.dayleft)}}</td>
          <td class="text-xs-left">{{props.item.assign ? 'YES': 'NO'}}</td>
        </template>
      </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabUserService from "@/services/Vlab/VlabUserService";
import VlabService from '@/services/Vlab/VlabService'

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "route", "user", "admin"])
  },
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "nameparse"
        },
        {
          text: "Dayleft",
          value: "dayleft"
        },
        {
          text: "Assign",
          value: "assign"
        }
      ],
      pagination: {
        sortBy: "createAt",
        descending: true
      },
      vlabuser: []
    };
  },
  watch: {
    async vlab() {
      if (!this.isUserLoggedIn) {
        return;
      }
      try {
        this.vlabuser = (await VlabUserService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    try {
      this.vlabuser = (await VlabUserService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    needCredential(time) {
      if (time <= 1) {
        return "Need credential";
      }
      return time;
    }
  }
};
</script>

<style scoped>

</style>
