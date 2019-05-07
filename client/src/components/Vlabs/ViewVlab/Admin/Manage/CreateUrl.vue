<template>
  <v-layout justify-center>
    <v-flex v-if="isUserLoggedIn && admin" xs6>
      <panel title="Create Url">
        <v-text-field label="Name" v-model="url.name" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Url" v-model="url.url" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Login" v-model="url.log" :rules="[required]"></v-text-field>
        <br>
        <v-textarea label="Password" v-model="url.password" :rules="[required]"></v-textarea>
        <br>
        <span class="danger-alert">{{error}}</span>
        <v-btn class="grey darken-1"
          @click="create({name: 'vlab',
            params: {
              vlabId: vlabId
            }
          })">Create Url</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import UrlService from '@/services/Url/UrlService'
import UrlVlabService from '@/services/Url/UrlVlabService'
// TODO add URLVLAB and URLUSER
import { mapState } from "vuex";

export default {
  data() {
    return {
      url: {
        name: null,
        url: null,
        log: null,
        password: null
      },
      vlabId: 0,
      error: null,
      required: value => !!value || "Required."
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  methods: {
    async create(route) {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.url).every(
        key => !!this.url[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        const url = (await UrlService.post(this.url)).data
        await UrlVlabService.post(url.id, this.vlabId)
        this.$router.push(route);
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    this.vlabId = this.route.params.vlabId
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>
