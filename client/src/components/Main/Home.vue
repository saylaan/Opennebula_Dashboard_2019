<template>
<v-layout row>
  <v-flex xs6>
  <v-layout class="mt-5" v-if="!isUserLoggedIn" justify-center column>
      <!-- <v-flex xs6 class="mt-5">
        <v-layout justify-center>
        <h1
          class="display-3 mr-3 white--text font-weight-black blue-grey--text text--darken-2"
        >{{ msg }}</h1>
        </v-layout>
      </v-flex> -->
      <!-- <v-flex xs6> -->
        <v-flex elevation-24 sm4 class="ml-2">
          <v-card>
                <v-card-title justify-center class="mr-3">
                  <h2
                    class="font-weight-bold"
                    v-text="`${msg}`"
                  ></h2>
                  <div v-text="`${more}`">{{more}}
                  </div>
                  <a href="dspp@al-enterprise.com" class="font-weight-bold">dspp@al-enterprise.com</a>
                </v-card-title>
          </v-card>
        </v-flex>
      <v-layout row align-center justify-center class="mt-5">
        <v-flex sm9 class="mr-5">
          <v-timeline>
            <v-timeline-item :color="`${steps[0].color}`" dark large right>
              <!-- <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-5`"
                  v-text="`Step ${steps[0].step}`"
                ></span>
              </template> -->
              <v-card>
                <v-card-title :class="`${steps[0].color} justify-center`">
                 <h2
                    class="font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[0].msg}`"
                  ></h2>
                  <!-- <v-btn
                    depressed
                    large
                    :class="`font-weight-black mx-0 blue-grey--text text--lighten-5 ${steps[0].color}`"
                    :to="{name: 'signin'}"
                  >{{steps[0].msg}}</v-btn> -->
                </v-card-title>
              </v-card>
            </v-timeline-item>
            <v-timeline-item :color="`${steps[1].color}`" dark left small>
              <!-- <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-5`"
                  v-text="`Step ${steps[1].step}`"
                ></span>
              </template> -->
              <v-card>
                <v-card-title :class="`${steps[1].color} justify-center`">
                  <h2
                    class="font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[1].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item :color="`${steps[2].color}`" dark large right>
              <!-- <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-5`"
                  v-text="`Step ${steps[2].step}`"
                ></span>
              </template> -->
              <v-card>
                <v-card-title :class="`${steps[2].color} justify-center`">
                  <h2
                    class="font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[2].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item :color="`${steps[4].color}`" dark left small>
              <!-- <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold black-text text--darken-5`"
                  v-text="`Step ${steps[4].step}`"
                ></span>
              </template> -->
              <v-card>
                <v-card-title :class="`${steps[4].color} justify-center`">
                  <h2
                    class="mr-3 font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[4].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <!-- <v-timeline-item :color="`${steps[4].color}`" dark large right>
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-5`"
                  v-text="`Step ${steps[4].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title :class="`${steps[4].color} justify-center`">
                  <h2
                    class="mr-3 font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[4].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item> -->
            <!-- <v-timeline-item :color="`${steps[5].color}`" dark fill-dot left small>
              <template v-slot:opposite>
                <span
                  :class="`font-weight-bold grey--text text--darken-5`"
                  v-text="`Step ${steps[5].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title :class="`${steps[5].color} justify-center`">
                  <h2
                    class="mr-3 font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[5].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>
            <v-timeline-item :color="`${steps[6].color}`" dark right large>
              <template v-slot:opposite>
                <span
                  :class="`display-1 font-weight-bold grey--text text--darken-5`"
                  v-text="`${steps[6].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title class="deep-orange accent-4 justify-center">
                  <h2
                    class="mr-3 font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[6].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item> -->
          </v-timeline>
        </v-flex>
      </v-layout>
    <!-- </v-flex> -->
  </v-layout>
  </v-flex>
  <v-flex xs6>
  </v-flex>
</v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Hello",
  data() {
    return {
      msg: "DSPP Free Sandbox",
      about: "About...",
      more: "This Sandbox is provided for free with a pre-configuration of the virtual machines (today OXE and O2G) and must be used as it is." +
      "It is for test purpose to help you acquire expertise on the ALE APIs and develop your 3rd party application/solution integrated with OXE connected to Rainbow." +
      "If you need specific assistance or a Sandbox with specific configuration, please contact us at:",
      steps: [
        {
          step: "1",
          color: "light-blue",
          msg: "Ask for login and credentials",
          msgbis: "Click for sign in"
        },
        {
          step: "2",
          color: "indigo",
          msg: "Connect in the right top corner",
          msgbis: "Wait acceptation"
        },
        {
          step: "3",
          color: "teal",
          msg: "Get your working URLs for OXE and O2G and SIP",
          msgbis: "Deployment ready (Check your email)"
        },
        {
          step: "And more...",
          color: "light-green",
          msg: "Feedbacks - Support",
          msgbis: "Connect to Portal Vlab"
        },
        {
          step: "5",
          color: "purple",
          msg: "Feedbacks - Helps",
          msgbis: "Access your URL from your Dashboard"
        },
        {
          step: "6",
          color: "indigo",
          msg: "",
          msgbis: "Ready for testing"
        },
        {
          step: "And more....",
          color: "pink",
          msg: "",
          msgbis:
            "Feedbacks - Helps - Messages - Dashboard for activity - Vlab view"
        }
      ]
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  }
};
</script>

<style scoped>
</style>
