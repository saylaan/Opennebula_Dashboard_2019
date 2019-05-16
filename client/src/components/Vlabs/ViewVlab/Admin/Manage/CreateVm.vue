<template>
  <v-layout justify-center>
    <v-flex v-if="isUserLoggedIn && admin" xs6>
      <panel title="Create Vm">
        <v-text-field label="Name" v-model="vm.name" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Type" v-model="vm.type" :rules="[required]"></v-text-field>
        <br>
        <span class="danger-alert">{{error}}</span>
        <v-btn
          class="grey darken-1 font-weight-bold"
          @click="create({name: 'vlab',
            params: {
              vlabId: vlabId
            }
          })"
        >Create Vm</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import VmService from "@/services/Vm/VmService";
import VmVlabService from "@/services/Vm/VmVlabService";
import { mapState } from "vuex";

export default {
  data() {
    return {
      vm: {
        name: null,
        type: null
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
      const areAllFieldsFilledIn = Object.keys(this.vm).every(
        key => !!this.vm[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        const vm = (await VmService.post(this.vm)).data;
        await VmVlabService.post(vm.id, this.vlabId);
        this.$router.push(route);
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    this.vlabId = this.route.params.vlabId;
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>
