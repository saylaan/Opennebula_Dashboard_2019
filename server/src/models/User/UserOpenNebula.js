module.exports = (sequelize, DataTypes) => {
  const UserOpenNebula = sequelize.define('UserOpenNebula', {
    idopennebula: DataTypes.INTEGER,
    groupname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    tokenpwd: DataTypes.STRING
  })
  return UserOpenNebula
}