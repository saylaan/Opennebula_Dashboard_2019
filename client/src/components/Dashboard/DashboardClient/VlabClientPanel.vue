<template>
  <panel v-if="isUserLoggedIn && !admin" title="Vlab">
      <v-data-table
        :headers="headers" 
        hide-default-footer
        :loading="isData(vlabuser)"
        loading-text="No data for the moment"
        :items-per-page="1"
        :items="vlabuser">
        <template v-slot:item.dayleft="{item}">
          {{needCredential(item.dayleft, item.assign)}}
        </template>
        <template v-slot:item.assign="{item}">
          <v-chip :color="getWarning(item.dayleft)" text-color="white"></v-chip>
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
        {text: "Name", value: "nameparse", align: "center", sortable: false},
        {text: "Owner name", value: "ownername", align: "center"},
        {text: "Remaining days", value: "dayleft", align: "center"},
        {text: "", value: "assign", align: "center"}
      ],
      vlabuser: []
    };
  },
  watch: {
    async vlabuser() {
      await setTimeout(async () => {
        this.vlabuser = (await VlabUserService.index()).data;
      }, 3000)
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
    isData(vlabs) {
      if (vlabs) {
        return (false)
      } else {
        return (true)
      }
    },
    needCredential(time) {
      if (time < 1) {
        return "0";
      }
      return time;
    },
    getWarning(time) {
      if (time <= 3) {
        return "red"
      } else if (time > 3 && time <= 7) {
        return "orange"
      } else {
        return "green"
      }
    }
  }
};
</script>

<style scoped>

</style>
