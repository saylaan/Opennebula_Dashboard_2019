<template>
  <v-layout v-if="isUserLoggedIn && admin" justify-center>
    <v-flex xs6>
      <panel title="Edit vlab">
        <v-text-field label="Title" v-model="vlab.title" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Name" v-model="vlab.name" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Days left" v-model="vlab.time" :rules="[required]"></v-text-field>
        <br>
        <v-textarea label="Logo" v-model="vlab.vlabImage" :rules="[required]"></v-textarea>
        <br>
        <v-layout justify-center>
        <span class="danger-alert">{{error}}</span>
        <v-btn class="grey darken-1 font-weight-bold" @click="save({name: 'vlab'})">Save Vlab</v-btn>
        <v-btn class="grey darken-1 font-weight-bold" @click="discard()">Discard</v-btn>
        </v-layout>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import VlabService from "@/services/Vlab/VlabService";
import { mapState } from "vuex";

export default {
  data() {
    return {
      vlab: {
        title: null,
        name: null,
        time: null,
        vlabImage: null
      },
      error: null,
      required: value => !!value || "Required."
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "route", "user", "admin"])
  },
  methods: {
    async save(route) {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.vlab).every(
        key => !!this.vlab[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      const vlabId = this.route.params.vlabId;
      try {
        await VlabService.put(this.vlab);
        this.$router.push({
          name: "vlab",
          params: {
            vlabId: vlabId
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async discard() {
      const vlabId = this.route.params.vlabId;
      this.url = (await VlabService.getVlab(vlabId)).data;
    }
  },
  async mounted() {
    try {
      const vlabId = this.route.params.vlabId;
      this.vlab = (await VlabService.getVlab(vlabId)).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>
