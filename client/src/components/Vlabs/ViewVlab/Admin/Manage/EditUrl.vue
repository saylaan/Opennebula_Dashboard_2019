<template>
  <v-layout v-if="isUserLoggedIn && admin" justify-center>
    <v-flex xs6>
      <panel title="Edit url">
        <v-text-field class="mt-5" label="Name" v-model="url.name" :rules="[required]"
        outline clearable>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>all_out</v-icon>
              </v-fade-transition>
            </template>
        </v-text-field>
        <br>
        <v-text-field label="Url" v-model="url.url" :rules="[required]"
        outline clearable>
                            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>link</v-icon>
              </v-fade-transition>
            </template></v-text-field>
        <br>
          <v-text-field class="padding-input" label="Login" type="log" v-model="url.log" 
          outline clearable>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>account_box</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
        <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="url.password"
            autocomplete="new-password"
            outline
            clearable
          >
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
        <br>
        <span class="danger-alert">{{error}}</span>
        <v-btn
          elevation-24 large class="grey darken-1 mb-4 font-weight-bold"
          @click="save({name: 'vlab',
            params: {
              vlabId: vlabId
            }
          })"
        >Save Url</v-btn>
        <v-btn 
        elevation-24 large class="grey darken-1 mb-4 font-weight-bold" 
        @click="discard()">Discard</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import UrlService from "@/services/Url/UrlService";
import UrlVlabService from "@/services/Url/UrlVlabService";
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
        this.$router.push(route);
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
      this.vlabId = this.route.params.vlabId;
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
