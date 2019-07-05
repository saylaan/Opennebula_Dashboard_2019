const Bluebird = require('bluebird')
const bcrypt = Bluebird.promisifyAll(require('bcrypt-nodejs')) // store password using bcrypt

module.exports = (sequelize, DataTypes) => {
  // creation of the table into the DB
  const User = sequelize.define('User', {
    companyname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true // really important for one data / no more
    },
    password: DataTypes.STRING,
    active_hash: DataTypes.STRING,
    purpose: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayleft: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  })

  User.prototype.comparePassword = function (password) {
    return (password === this.password)
    // return bcrypt.compare(password, this.active_hash)
  }
  // User.prototype.hashPassword = function (password) {
  //   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  // }
  return User
}