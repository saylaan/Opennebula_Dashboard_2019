<template>
    <v-layout wrap>
        <v-flex xs6 offset-xs3>
            <div class="white elevation-2">
                <v-toolbar class="purple" flat dense dark>
                    <v-toolbar-title>Sign in</v-toolbar-title>
                </v-toolbar>
                <div class="pl-4 pr-4 pt-2 pb-2" dark>
                    <v-text-field label='Email' v-model="email"></v-text-field><br>
                    <v-text-field label='Password' v-model="password"></v-text-field><br>
                    <div class="error" v-html="error"/>
                    <v-btn class="purple" @click="register" dark>Sign in</v-btn>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>

.error {
    color: red;
}

</style>
