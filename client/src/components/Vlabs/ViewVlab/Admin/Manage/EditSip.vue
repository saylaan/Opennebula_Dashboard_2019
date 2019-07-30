<template>
  <v-layout class="mt-5" v-if="isUserLoggedIn && admin" justify-center>
    <v-flex xs6>
      <panel title="Edit sip">
        <v-text-field class="mt-5" label="Name" v-model="sip.name" :rules="[required]"
        outline clearable>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>all_out</v-icon>
              </v-fade-transition>
            </template>
        </v-text-field>
        <br>
          <v-text-field class="padding-input" label="Login" type="log" v-model="sip.login" 
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
            v-model="sip.passwd"
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
        elevation-24 large class="grey darken-1 font-weight-bold" 
        @click="cancel()">Cancel</v-btn>
        <v-icon @click="undo()">refresh</v-icon>
      </v-layout>
        </v-layout>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SipService from "@/services/Sip/SipService";
import SipVlabService from "@/services/Sip/SipVlabService";
import { mapState } from "vuex";

export default {
  data() {
    return {
      sip: {
        name: null,
        login: null,
        passwd: null
      },
      sipId: 0,
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
        this.sip = (await SipService.getSip(this.sipId)).data;
      } catch (err) {
        console.log(err);
      }
    },
    async cancel() {
      this.$router.go(-1)
    },
    async save(route) {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.sip).every(
        key => !!this.sip[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        await SipService.put(this.sip);
        this.$router.push(route);
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    try {
      this.sipId = this.route.params.sipId;
      this.vlabId = this.route.params.vlabId;
      this.sip = (await SipService.getSip(this.sipId)).data;
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
