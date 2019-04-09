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

for passing obj : v-bind:main="name"
props: [
    "name"
]