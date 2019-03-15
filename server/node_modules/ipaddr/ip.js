var http = require("http");
var bl = require("bl");
var exec = require('child_process').exec;

exports.getCurrentIp = function(){
    /**
     * 系统模块
     * @type {Object}
     */
    var os = require('os');
    /**
     * 获得系统的网卡列表
     * @type {Object}
     */
    var ipObj = os.networkInterfaces();
    var result = [];

    for(var i in ipObj) {
        // 获得某个网卡下面的ip列表
        var ipList = ipObj[i];
        for(var j = 0; j < ipList.length; j += 1) {
            // 某个网卡的某个ip
            var ip = ipList[j];
            if(ip.family === 'IPv4') {
                result.push(ip.address);
            }
        }
    }
    return result;
};

exports.getAddress = function (ip, callback) {
    http.get('http://ip.taobao.com/service/getIpInfo.php?ip=' + ip, function (res) {
        res.pipe(bl(function (err, data) {
            if (err) {
                console.log('error:', err);
                return;
            }
            data = JSON.parse(data).data;
            if (callback) {
                callback(data.country + ' ' + data.region + ' ' + data.isp);
            } else {
                console.log(ip, data.country || '', data.region || '', data.isp || '');
            }
        }));
    }).on('error', function(e) {
        if (callback) {
            callback('Unknow');
        } else {
            console.log("Got error: " + e.message);
        }
    });
};

var getAddressPromise = function (ip) {
    // console.log('get', ip);
    return new Promise((resolve, reject) => {
        exports.getAddress(ip, function (address) {
            // console.log('addr', address, ip);
            resolve(address);
        });
    });
};


var IP_REG = /((?:\d+\.){3}\d+)\s+\(\1\)/;
exports.traceRoute = function (domain) {
    var trace = exec('traceroute ' + domain);

    var seq = Promise.resolve();

    trace.stdout.on('data', function (data) {
        // 220.181.17.90 (220.181.17.90)
        if (IP_REG.test(data)) {
            seq = seq.then(() => {
                return getAddressPromise(RegExp.$1).then((addr) => {
                    data = data.replace(IP_REG, '$1 (' + addr + ')');
                    process.stdout.write(data);
                });
            });
        } else {
            seq = seq.then(() => process.stdout.write(data));
        }
    });
    trace.stderr.on('data', function (data) {
        process.stdout.write(data);
    });
};