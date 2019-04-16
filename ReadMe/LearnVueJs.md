I.Vue-router: (Really important and powerfull in vue.js)

5. Nominate routes
We can make different view for the user.
<router-view class="view one"></router-view>
<router-view class="view two"></router-view>

const router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                default: Foo,
                a: Bar,
                b: Baz
            }
        }
    ]
})

It means in each route we can have xxx component depending on this route 

We can make nested routes. ####It can become very hard to understand well how it works
<navbar/>
<router-view/>
<router-view name="helper">
-->
{
    path: '/parametres',
    component: UserSettings,
    children: [{
        path: 'emails',
        component: UserEmailsSubscriptions
    }, {
        path:'profile',
        components: {
            default: UserProfile,
            helper: UserProfilePreview
        }
    }]
}


II.Props :

If value being mutate don't use props but better data

for passing obj : v-bind:main="name"
props: [
    "name"
]

data: () => ({}) -> this won't reflect the vue instance in arrow functions
data () {} => better use this one in all cases

III.Transitions

#Coloring app in vuejs
Actually the best way to manage that is by using vuex that give the possibility to change state during render time. (state / mutations / actions) and then adding ...className=".." to the tag and put this.$store.dispatch('mutation', data) in the correct method

JS:

Object.keys(obj) ==> all value of an object as key do .every(key => !!this.obj[key]) ==> check every value of it
