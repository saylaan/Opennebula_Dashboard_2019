const Bluebird = require('bluebird')
const bcrypt = Bluebird.promisifyAll(require('bcrypt-nodejs')) // store password using bcrypt

module.exports = (sequelize, DataTypes) => {
  // creation of the table into the DB
  const User = sequelize.define('User', {
    companyname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true // really important for one data / no more
    },
    password: DataTypes.STRING,
    active_hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    purpose: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    assign: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayleft: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    startlicence: {
      type: DataTypes.STRING,
      defaultValue: "XX-XX-XX"
    },
    endlicence: {
      type: DataTypes.STRING,
      defaultValue: "XX-XX-XX"
    },
    archive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  return User
}