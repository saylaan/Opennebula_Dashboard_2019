# SandboxALE-AAPP_2019
Create an webAAP for managing OpenNebula VMs
(node.js is a really good language for parsing all the folder...)

To open the database on sqlite :
1. launch sqliteman or sqlitebrowser
2. open de filename.sqlite from the server into the app
3. Done (you can modify etc)
--> Not sure to use that, better mysql for PhpMyAdmin
## MAKING THE MVC ARCHI
--> connect to a database (sequelize (ORM) -> MySQL)
npm install --save sequelize sqlite3@3.1.8 (local instance of sqlite db with the need to setting up)

1.This part is really to do a proper struct for the server. Such as a config.js (for the port) or even a
routes.js to put all the different cmd (post, get....)
Everything works like module export.

2. Build ./models
--> Make a User.js for define the sequelize (table for BDD)
--> index.js for linking the Database(config DB) =  looking the file to understand the process.

Put the DB config into the config.js (database/user/password/options)

3. Making the ./controllers
--> AuthenticationController.js (parsing all the route very easy for a certain type of action)
- put data into the database
- make a error handling for avoid duplicate account or wrong account

npm install --save joi ## // framework for validating request (body.req)
Joy != joi LOL
4. Making the ./policies
--> AuthenticationControllerPolicy.js (add joy and make the module to export)
--> Add this to the route such as the AuthenticationController
--> Make the schema for the pattern check (regex) : JOY IS FUCKING USEFULL -> look the file for understand.
5. Hash the password is really important

## LINK THE BACK END REGISTRATION AND THE FRONT
1. Change the method register to make the error occur and work well with the proper data in the backend
2. Interact with the vue.js (div class="v-html="error"")

In vue.js :
1. Template => for html part "items" (v-... = v-specific alt)
2. Script => obj :
- data() = bind to the Template
- method = method Template can access
3. Style scoped => only in this Template

npm install --save vuetify ##
Include into main.js
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
It like materialize but you can have new tag like html <v-btn> etc


npm install --save node-pre-gryp
Repaire Sqlite3
npm uninstall sqlite3
npm cache clean
sudo npm install sqlite3
