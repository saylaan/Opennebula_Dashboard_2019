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
      <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="vlabvms">
        <template v-slot:items="props">
          <td class="text-xs-left">{{props.item.active ? 'OK': 'KO'}}</td>
          <td class="text-xs-left">{{props.item.name}}</td>
          <td class="text-xs-left">{{props.item.type}}</td>
          <!-- <v-btn
            class="grey darken-1 font-weight-bold"
            :to="{
                name: `edit-vm`,
                params : {
                    vmId: props.item.id
                }
        }"
          >Edit</v-btn> -->
        </template>
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
      vlabvms: [],
      vlab: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
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
