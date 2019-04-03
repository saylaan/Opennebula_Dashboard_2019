<template>
  <panel title="Vlabs Users">
    <v-data-table
      :headers:="headers"
      :pagination.sync="pagination"
      :items="vlabusers">
      <template v-slot:items="props">
        <td class="text-xs-right">
          {{props.item.vlabname}}
        </td>
        <td class="text-xs-right">
          {{props.item.companyname}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import VlabUsersService from '@/services/VlabUsersService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'VlabName',
          value: 'vlabname'
        },
        {
          text: 'CompanyName',
          value: 'companyname'
        }
      ],
      pagination: {
        sortBy: 'data',
        descending: true
      },
      vlabusers: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.vlabusers = (await VlabUsersService.getVlabUsers({
        UserId: this.user.id
      })).data
    }
  }
}
</script>

<style>

</style>
