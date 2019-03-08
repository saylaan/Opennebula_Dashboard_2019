# SandboxALE-AAPP_2019
Create an webAAP for managing OpenNebula VMs

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

cd client :
npm install -> install all module
npm run dev -> launch project

--> Readme (client)

cd server :
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

delete ipaddr.js = working

then do config src/app.js for making the server
