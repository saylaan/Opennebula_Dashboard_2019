<template>
  <panel v-if="isUserLoggedIn" title="VM">
    <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="vlabvms">
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
          text: "Vm name",
          value: "name"
        },
        {
          text: "vm type",
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
        for (let i = 0, j = 0; i !== this.vlabvms.length; i++) {
          var count = (this.vlabvms[i].type.match(/_/g) || []).length
          if (count >= 1) {
            this.vlabvms.splice(i, 1)
            i--
          }
        }
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
        VlabId: this.vlab.id
      })).data;
      for (let i = 0, j = 0; i !== this.vlabvms.length; i++) {
        var count = (this.vlabvms[i].type.match(/_/g) || []).length
        if (count >= 1) {
          this.vlabvms.splice(i, 1)
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
