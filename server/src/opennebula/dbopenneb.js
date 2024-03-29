const openneb = require('./openneb')

const delay = (time, callback) => {
  setInterval(callback, time*1000)
}

const populateDB = async () => {
  delay(3, () => {
    openneb.checkLicence()
    openneb.getInfoUsers()
    openneb.getInfoVms()
    openneb.getInfoVNets()
  })
}

const dbopenneb = {
  populateDB: populateDB,
}

module.exports = dbopenneb
