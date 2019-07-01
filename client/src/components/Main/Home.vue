<template>
  <v-layout v-if="!isUserLoggedIn" justify-center column>
    <v-layout justify-center>
    <v-flex xs6 class="mt-5">
      <h1
        class="display-3 mr-3 white--text font-weight-black blue-grey--text text--darken-2"
      >{{ msg }}</h1>
    </v-flex>
      </v-layout>
    <v-flex xs6>
      <v-layout row align-center justify-center class="mx-auto">
        <!-- <v-flex xs3 offset-xs2 class="mr-2">
          <v-card dark>
                <v-card-title justify-center class="mr-3">
                  <h2
                    class="headline font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${about}`"
                  ></h2>
                </v-card-title>
          <v-img :src="images.sample"></v-img>
          </v-card>
        </v-flex>-->
        <v-flex xs6 class="mt-5 mr-5">
          <v-timeline>
            <v-timeline-item :color="`${steps[0].color}`" dark large right>
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-3`"
                  v-text="`Step ${steps[0].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title>
                  <v-btn
                    depressed
                    large
                    :class="`subheading font-weight-black mx-0 blue-grey--text text--lighten-5 ${steps[0].color}`"
                    :to="{name: 'register'}"
                  >START FREE TRIAL NOW</v-btn>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item :color="`${steps[1].color}`" fill-dot dark left small>
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-3`"
                  v-text="`Step ${steps[1].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title :class="`${steps[1].color} justify-center`">
                  <h2
                    class="headline font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[1].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item :color="`${steps[2].color}`" dark large right>
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-3`"
                  v-text="`Step ${steps[2].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title :class="`${steps[2].color} justify-center`">
                  <h2
                    class="headline font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[2].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item :color="`${steps[3].color}`" dark fill-dot left small>
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-3`"
                  v-text="`Step ${steps[3].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title :class="`${steps[3].color} justify-center`">
                  <h2
                    class="headline mr-3 font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[3].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item :color="`${steps[4].color}`" dark large right>
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-3`"
                  v-text="`Step ${steps[4].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title :class="`${steps[4].color} justify-center`">
                  <h2
                    class="headline mr-3 font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[4].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>
            <v-timeline-item :color="`${steps[5].color}`" dark fill-dot left small>
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text text--darken-3`"
                  v-text="`Step ${steps[5].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title :class="`${steps[5].color} justify-center`">
                  <h2
                    class="headline mr-3 font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[5].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>
            <v-timeline-item :color="`${steps[6].color}`" dark right large>
              <template v-slot:opposite>
                <span
                  :class="`display-1 font-weight-bold grey--text text--darken-3`"
                  v-text="`${steps[6].step}`"
                ></span>
              </template>
              <v-card>
                <v-card-title class="deep-orange accent-4 justify-center">
                  <h2
                    class="headline mr-3 font-weight-bold blue-grey--text text--lighten-5"
                    v-text="`${steps[6].msg}`"
                  ></h2>
                </v-card-title>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Hello",
  data() {
    return {
      images: {
        sample: require("../../assets/o2g.png")
      },
      msg: "Welcome to Portal Vlab",
      about: "What about our solution?",
      steps: [
        {
          step: "1",
          color: "light-blue"
        },
        {
          step: "2",
          color: "indigo",
          msg: "Wait acceptation"
        },
        {
          step: "3",
          color: "teal",
          msg: "Deployment ready (Check your email)"
        },
        {
          step: "4",
          color: "light-green",
          msg: "Connect to Portal Vlab"
        },
        {
          step: "5",
          color: "purple",
          msg: "Access your URL from your Dashboard"
        },
        {
          step: "6",
          color: "indigo",
          msg: "Ready for testing"
        },
        {
          step: "And more....",
          color: "pink",
          msg:
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
