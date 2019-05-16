######################## Use of Vuetify ################################

I.Basic:
->Can import component into the main.js from 'vuetify/lib' and then add components to Vue.use(...) or directly in .vue
->vuetify-loader = auto import of v-component
-Dynamic component use <component >:is="button ? 'v-btn' : 'v-chip'"
-<v-data-iterator content-tag="v-layout"> -> use all v-component in the content-tag

<v-app dark> --> put app in dark mode

1.Grid: 
v-container(1) -> v-layout(2) -> v-flex(3) (is set to flex: 1 1 auto)
(1):
-align-{type}
-d-{type}
-fill-height / fluid
-grid-list-{x through xl}
-justify-{type}
-tag / id
(2):
-align-{type}
-d-{type}
-fill-height / column / row / wrap / reverse
-grid-list-{x through xl}
-justify-{type}
-tag / id
(3):
-align-{type}
-(size)(1-12)
-grow / shrink
-offset-(size)
-order-(size)
-tag / id

extrasmall - small - medium - large - extralarge
    xs     -   sm  -    md  -   lg  -     xl

-Use offset how you want to place the v-flex where you want (row wrap for v-layout is nice to make sur the v-flex has a proper placement)
-Use order by specify the numbered of v-flex such as order-xs(order'1-2-3-4)
-Use justify to make space around v-flex
-Use align to make the fillin of the v-flex in column
-Use grow to fill available space in a row and shrink to only use the needed space.
-Use d-flex to specify the display of element (flex/inline-flex/block) <v-flex d-flex><v-layout column><v-flex d-flex>... </></></>
For example:
-<v-layout row wrap>
    <v-flex d-flex xs12 sm6 md4>
        <v-layout column wrap>
            <v-flex>
            ...
            <v-flex>
            ...
        <v-layout\>
    <v-flex\>
<v-layout/>
-Use <v-space\> when you need space between component into a nav bar example
-Use id/tag like id/class in html/css
-Use grid for making such as card-panel container for example.

Be caution this is the proper syntax for the layout -flex
Therefor a panel is consider such as a v-flex
We have to set the layout each time we use it (row... etc)

2.Icons:
->Import icons from a CDN = easier to user
->Custom icons by renaming the icons with our shortcut.
Vue.use(Vuetify, {
    iconfont: 'mdi',
    icons: {
        'product': 'mdi-product',
        ...
    }
})
->by adding v-text="icon" into <v-icon>, we can use it in a props: {props: { icon: {type: String, default: '$vuetify.icons.cancel'}}
->Use them as component in the main.js (Vue.component('font-awesome-icon', FontAwesomeIcon)) for making it global (import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' from a vue-icon or own with our ./path)

3.Internationalization: (TODO)

II.App Layout
1.Default Markup
<v-app> -> <v-nav> -> <v-toolbar app> -> <v-content> -> <v-container>
2.Breakpoint (check on launch of APP)
Vue = 12 point grid system with 5 types of media breakpoints (size & orientation)￼￼
<v-dialog :fullscreen="$vuetify.breakpoint.xsOnly">
We can customize but it's not necessary at all.


III.Input & Controls
outline clearable -> nice

##################################################################################
Tips:
-dont need class="" just put all inline
-<v-flex v-for="i in 2" :key="`6${i}`" xs6> -> do a iteration of v-flex of size xs6 with key='6${i}'
-v-bind="namefct" allow us to apply function to a layout to manage it dynamicly :
data() { --> Return data to the browser as a function.
    return {
        alignmentsAvailable: ['align-center',....] --> use style as an array to use it
        alignments: ['...']
    }
}
with a computed: {
    namefct () {
        return {
            [this.alignment]: true, // (because its a v-model="")
        }
    }
}
In fact : <v-radio-group v-model="alignment>
            <v-radio v-for="n in alignmentsAvailable" :key="n" :label="n === '' ? 'Nothing' : n " :value="n">
That's why it's working (with the selection the v-model change dynamically with data() and computed) ====> Really powerfull
Or an other example to make it more relevant:
(1) <v-select v-model="size" :items="items>
(2) <v-container v-bind="{[`grid-list-${size}`]: true}>
(3) <v-layout>
(4) <v-flex v-for="n in 9" :key="n"> component n
(5) <script> data() => ({ size: 'sm', items: [{text: 'Extra small(2px)', value: 'xs'},...]}) 
--> change size with the selection an apply it the v-container as a grid-list
- We can make math with url (src for example : url=${Math.floor(Math.random() * 100) + 1})
-{{ lorem.slice(0, 40)}} -> .slice cut the content of the sentence as needed
-always put a xs(n) sm(n/2) md(n/2) -> resize of components because of other layout / flex ?

-Add linear gradient :
<v-jumbotron :gradient="grad>

data() =>
    grad: 'direction, hex1, hex2'
