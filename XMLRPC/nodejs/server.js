// const xmlrpc = require('xmlrpc')
//
// const server = xmlrpc.createServer({host: 'localhost', port: 8084})
//
// console.log('wtf')
//
// server.on('NotFound', function(method, params) {
//   console.log('Method ' + method + ' does not exist');
// })

var OpenNebula = require('opennebula');
var one = new OpenNebula('geoffroy:2961Sailaan1992!', 'http://vlab.ale-aapp.com:2633/RPC2');

one.version(function(err, data) {
  console.log('wtf')
  console.log(data);
});
