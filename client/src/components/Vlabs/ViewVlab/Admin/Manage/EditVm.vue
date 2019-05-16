<template>
  <v-layout v-if="isUserLoggedIn && admin" justify-center>
    <v-flex xs6>
      <panel title="Edit Vm">
        <v-text-field label="Name" v-model="vm.name" :rules="[required]"></v-text-field>
        <br>
        <v-text-field label="Type" v-model="vm.type" :rules="[required]"></v-text-field>
        <br>
        <span class="danger-alert">{{error}}</span>
        <v-btn
          class="grey darken-1 font-weight-bold"
          @click="save({name: 'vlab',
            params: {
              vlabId: vlabId
            }
          })"
        >Save Vm</v-btn>
        <v-btn class="grey darken-1 font-weight-bold" @click="discard()">Discard</v-btn>
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
      vmId: 0,
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
      const areAllFieldsFilledIn = Object.keys(this.vm).every(
        key => !!this.vm[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      try {
        await VmService.put(this.vm);
        this.$router.push(route);
      } catch (err) {
        console.log(err);
      }
    },
    async discard() {
      this.vm = (await VmService.getVm(this.vmId)).data;
    }
  },
  async mounted() {
    try {
      this.vmId = this.route.params.vmId;
      this.vlabId = this.route.params.vlabId;
      this.vm = (await VmService.getVm(this.vmId)).data;
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
