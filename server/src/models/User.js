const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs')) // store password using bcrypt

function hashPassword(user, options) {
  const SALT_FACTOR = 8
  if (!user.changed('password')) {
    return;
  }
  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  const hash = bcrypt.hashSync(user.password, salt)

  // return user.setDataValue('password', hash)
  // .then(salt => bcrypt.hashSync(user.password, salt))
  // .then(hash => {
  //   user.setDataValue('password', hash)
  // })
}

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
    need: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  User.prototype.comparePassword = function (password) {
    console.log(password)
    console.log(this.password)
    return (password === this.password)
    // return bcrypt.compareSync(password, this.password)
  }

  return User
}

// , {
//   hooks: {
//     beforeCreate: hashPassword,
//     beforeUpdate: hashPassword,
//     beforeSave: hashPassword
//   }
// })