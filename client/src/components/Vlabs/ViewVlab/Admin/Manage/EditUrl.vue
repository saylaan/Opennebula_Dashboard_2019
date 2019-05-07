<template>
  <v-layout v-if="isUserLoggedIn && admin" justify-center>
    <v-flex xs6>
      <panel title="Edit url">
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
          @click="save({name: 'vlab',
            params: {
              vlabId: vlabId
            }
          })">Save Url</v-btn>
        <v-btn class="grey darken-1"
          @click="discard()">Discard</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import UrlService from '@/services/Url/UrlService'
import UrlVlabService from '@/services/Url/UrlVlabService'
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
      urlId: 0,
      vlabId: 0,
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
      const areAllFieldsFilledIn = Object.keys(this.url).every(
        key => !!this.url[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        await UrlService.put(this.url);
        this.$router.push(route)
      } catch (err) {
        console.log(err);
      }
    },
    async discard() {
      this.url = (await UrlService.getUrl(this.urlId)).data;
    }
  },
  async mounted() {
    try {
      this.urlId = this.route.params.urlId;
      this.vlabId = this.route.params.vlabId
      this.url = (await UrlService.getUrl(this.urlId)).data;
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
