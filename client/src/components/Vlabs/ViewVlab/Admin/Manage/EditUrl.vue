<template>
  <v-layout class="mt-5" v-if="isUserLoggedIn && admin" justify-center>
    <v-flex xs12 sm8 md4>
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
        <v-layout column class="mb-4" justify-center align-center>
        <span class="danger-alert">{{error}}</span>
      <v-layout class="mt-2" justify-center align-center row>
        <v-btn
          elevation-24 large class="grey darken-1 font-weight-bold"
          @click="save({name: 'vlab',
            params: {
              vlabId: vlabId
            }
          })"
        >Save</v-btn>
        <v-btn 
        elevation-24 large class="grey darken-1 font-weight-bold ml-1" 
        @click="cancel()">Cancel</v-btn>
        <v-icon @click="undo()">refresh</v-icon>
      </v-layout>
        </v-layout>
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
    async undo() {
      try {
        this.error = null
        this.url = (await UrlService.getUrl(this.urlId)).data;
      } catch (err) {
        console.log(err);
      }
    },
    async cancel() {
      this.$router.go(-1)
    },
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
