<template>
  <v-layout wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Adding Vlab">
        <v-text-field label="Title" v-model="vlab.title" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Name" v-model="vlab.name" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Days left" v-model="vlab.time" :rules="[required]"></v-text-field>
        <br>
        <v-textarea label="Logo" v-model="vlab.vlabImage" :rules="[required]"></v-textarea>
        <br>
        <span class="danger-alert">{{error}}</span>
        <v-btn class="blue-grey lighten-3" @click="create({name: 'vlab'})">Create Vlab</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import VlabService from "@/services/VlabService";

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
