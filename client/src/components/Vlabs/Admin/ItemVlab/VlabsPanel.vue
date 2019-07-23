<template>
    <panel v-if="isUserLoggedIn && admin" title="Vlabs">
      <!-- <v-btn
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
      </v-btn> -->
      <v-data-table :headers="headers" hide-actions :items="vlabs" class="elevation-1">
        <!-- <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear> -->
        <template v-slot:items="props">
          <td class="text-xs-left">{{props.item.name}}</td>
          <td class="text-xs-left">{{props.item.ownername}}</td>
          <td class="text-xs-left">{{needCredential(props.item.dayleft)}}</td>
          <td class="text-xs-left">{{props.item.assign ? 'YES': 'NO'}}</td>
          <v-layout justify-center>
                      <v-btn
              class="grey darken-1 font-weight-bold"
              :to="{
                  name: 'vlab',
                  params: {
                    vlabId: props.item.id}
                 }"
            >View Vlab</v-btn>
          </v-layout>
        </template>
      </v-data-table>
    </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabService from "@/services/Vlab/VlabService";

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
        },
        {
          text: "Day left",
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
      vlabs: []
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    needCredential(time) {
      if (time <= 1) {
        return "Need licence";
      }
      return time;
    }
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.vlabs = (await VlabService.getAllVlabs(value)).data;
      }
    }
  }
};
</script>

<style scoped>

.vlab {
  padding: 20px;
  height: 200px;
  overflow: hidden;
}

.vlab-title {
  font-size: 20px;
}

.vlab-name {
  font-size: 20px;
}

.vlab-time {
  font-size: 20px;
}

.album-image {
  width: 50%;
  margin: 0 auto;
}
</style>
