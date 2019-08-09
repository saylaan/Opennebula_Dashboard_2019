<template>
  <panel v-if="isUserLoggedIn" title="VM">
    <!-- <v-btn
      class="grey darken-3"
      slot="action"
      :to="{name: 'create-vm'}"
      light
      medium
      absolute
      right
      middle
      fab
    >
      <v-icon>add</v-icon>
    </v-btn> -->
      <v-data-table
        :headers="headers"
        hide-default-footer
        :loading="isData(vlabvms)"
        loading-text="No data for the moment"
        :items-per-page="10"
        :items="vlabvms"
        class="elevation-12">
          <template v-slot:item.active="{item}">
            <p>{{item.active ? 'OK': 'KO'}}</p>
          </template>
          <!-- <v-btn
            class="grey darken-1 font-weight-bold"
            :to="{
                name: `edit-vm`,
                params : {
                    vmId: props.item.id
                }
        }"
          >Edit</v-btn> -->
      </v-data-table>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VmVlabService from "@/services/Vm/VmVlabService";
import VlabService from "@/services/Vlab/VlabService";

export default {
  data() {
    return {
      headers: [
        {text: "Vlab", value: "name", align: "center", sortable: false},
        {text: "Type", value: "type", align: "center"},
        {text: "Active", value: "active", align: "center"}
      ],
      vlabvms: [],
      vlab: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  methods: {
    isData(data) {
      if (data) {
        return (false)
      } else {
        return (true)
      }
    }
  },
  watch: {
    async vlabvm() {
      try {
        this.vlabvms = (await VmVlabService.index({
          VlabId: this.vlab.id
        })).data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    const vlabId = this.route.params.vlabId;
    this.vlab = (await VlabService.getVlab(vlabId)).data;
    try {
      this.vlabvms = (await VmVlabService.index({
        VlabId: this.vlab[0].id
      })).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>

</style>
