const fs = require('fs');
const path = require('path') // app and path, relative path

const folderRoutes = [
    "Authen",
    "Message",
    "Template",
    "Url",
    "User",
    "Vlab",
    "Vm"
]

const isDirRoutes = file => {
    for (let i = 0; i < folderRoutes.length; i++) {
        if (folderRoutes[i] == file) {
            return (false)
        }
    }
    return(true)
}

console.log('\n\n####n################ START INIT ROUTES ###################')
module.exports = function(app){
    fs
    .readdirSync(__dirname)
    .filter((file) => file !== 'index.js')
    .forEach((file) => {
        console.log('###############  File or Folder : ', file)
        const name = file.substr(0, file.indexOf('.'));
        if (isDirRoutes(file)) {
            require('./' + name)(app);
        }
        for (let i = 0; i < folderRoutes.length; i++) {
            if (!isDirRoutes(file)) {
                fs
                .readdirSync(path.join( __dirname, file))
                .filter((tmp) => tmp !== 'index.js')
                .forEach((tmp) => {
                    const nameBis = tmp.substr(0, tmp.indexOf('.'));
                    require('./' + file + '/' + nameBis)(app);
                })
                break;
            }
        }
    });
    console.log('##################### END INIT ROUTES #####################\n\n')
    console.log('##################### START INIT DB #######################')
}