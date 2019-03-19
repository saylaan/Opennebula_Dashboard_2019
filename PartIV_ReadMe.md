# SandboxALE-AAPP_2019
Create an webAAP for managing OpenNebula VMs

For having a logout button hide :
-make a new btn just beside the btn signin and put !$store.state.isUserLoggedIn
-add a method on click for setting :
this.$store.dispatch('setToken', null)
this.$store.dispatch('setUser', null)

Handling different window and page.
