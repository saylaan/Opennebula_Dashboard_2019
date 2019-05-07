module.exports = (sequelize, DataTypes) => {
  const VmUser = sequelize.define('VmUser', {})

  VmUser.associate = function (models) {
    VmUser.belongsTo(models.Vm)
    VmUser.belongsTo(models.User)
  }
  return VmUser
}
