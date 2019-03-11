# SandboxALE-AAPP_2019
Create an webAAP for managing OpenNebula VMs

**cd client :
npm install -g vue-cli
vue list
vue init webpack client

? Project name client
? Project description A Vue.js project
? Author Geoffroy Huck <geoffroy.huck@al-enterprise.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Set up unit tests Yes
? Pick a test runner karma
? Setup e2e tests with Nightwatch? Yes
? Should we run `npm install` for you after the project has been created? (r
ecommended) npm

npm install -> install all module
npm run dev -> launch project

npm install --save axios (request http for backend)

cd /src : create folder service and file Api.js into it + AuthenticationService.js

--> Readme (client)
***
***cd server :
npm init -f
npm install --save nodemon eslint

"start": "./node_modules/nodemon/bin/nodemon.js src/app.js --exec 'npm run lint && node'",
"lint": "./node_modules/.bin/eslint **/*.js"

--> usefull for start server

Error ? wtf?
node ./node_modules/eslint/bin/eslint.js --init (script for config)
sudo npm i eslint-plugin-vue@latest --save-dev = problem

npm start
Going through install:
npm install --save express body-parser cors morgan
create src/app.js
delete ipaddr.js = working
then do config src/app.js for making the server

****
**Build front :
1. folder router in client : (how do you it different URL) --> implement new route who has a certain template / component.
2. go to components folder and create the new component(make sur to import the component into the index.js! ITS REALLY IMPORTANT)

v-model = find property for data into like a input HTMl and bind it
Into script in component you can watch all data modification ( watch...)
You can put a timeout with mounted() who modify the content of the placeholder after a certain time.
--> good example to show how work binding data in vue.js
3. put a listener to the button to use the backend (post)

Esling is really there to help you with syntax error into auto-compilation of vue.js
