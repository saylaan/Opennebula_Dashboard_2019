<template>
  <panel v-if="isUserLoggedIn" title="VM">
      <v-data-table
        :headers="headers"
        hide-default-footer
        :loading="isData(vmusers)"
        loading-text="No data for the moment"
        :items-per-page="10"
        :items="vmusers"
        class="elevation-12">
          <template v-slot:item.active="{item}">
            <p>{{item.active ? 'OK': 'KO'}}</p>
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
        {text: "Vlab", value: "name", align: "left", sortable: false},
        {text: "Type", value: "type", align: "center"},
        {text: "Active", value: "active", align: "center"}
      ],
      vmusers: []
    };
  },
  methods: {
    isData(vlabs) {
      if (vlabs) {
        return (false)
      } else {
        return (true)
      }
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  watch: {
    async vlabvm() {
      try {
        this.vmusers = (await VmUserService.index()).data;
        for (let i = 0, j = 0; i !== this.vmusers.length; i++) {
          var count = (this.vmusers[i].type.match(/_/g) || []).length
          if (count >= 1) {
            this.vmusers.splice(i, 1)
            i--
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    try {
      this.vmusers = (await VmUserService.index()).data;
      for (let i = 0, j = 0; i !== this.vmusers.length; i++) {
        var count = (this.vmusers[i].type.match(/_/g) || []).length
        if (count >= 1) {
          this.vmusers.splice(i, 1)
          i--
        }
      }
    } catch (err) {
      // console.log(err);
    }
  }
};
</script>

<style scoped>

</style>
