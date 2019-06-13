module.exports = (sequelize, DataTypes) => {
  const UserUserOn = sequelize.define('UserUserOn', {})

  UserUserOn.associate = function (models) {
    UserUserOn.belongsTo(models.User)
    UserUserOn.belongsTo(models.UserOpenNebula)
  }
  return UserUserOn
}
