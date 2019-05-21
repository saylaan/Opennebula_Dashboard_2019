<template>
  <v-layout justify-center>
    <v-flex v-if="isUserLoggedIn && admin" xs6>
      <panel title="Create Vlab">
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
        <v-btn class="grey darken-1 font-weight-bold" @click="create({name: 'vlabs'})">Create Vlab</v-btn>
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
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    async create(route) {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.vlab).every(
        key => !!this.vlab[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        await VlabService.post(this.vlab);
        this.$router.push(route);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>
