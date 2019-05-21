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
      <v-data-table :headers:="headers" :pagination.sync="pagination" :items="vlabs">
        <template v-slot:items="props">
          <td class="text-xs-right">{{props.item.title}}</td>
          <td class="text-xs-right">{{props.item.name}}</td>
          <td class="text-xs-right">{{needCredential(props.item.time)}}</td>
          <td class="text-xs-right">{{props.item.active ? 'OK': 'KO'}}</td>
                      <v-btn
              class="grey darken-1 font-weight-bold"
              :to="{
                  name: 'vlab',
                  params: {
                    vlabId: props.item.id}
                 }"
            >View Vlab</v-btn>
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
          text: "Name",
          value: "title"
        },
        {
          text: "CompanyName",
          value: "name"
        },
        {
          text: "TimeLeft",
          value: "time"
        },
        {
          text: "Active",
          value: "active"
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
        return "Need credential";
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
