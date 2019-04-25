module.exports = (sequelize, DataTypes) => {
  const VlabUser = sequelize.define('VlabUser', {})

  VlabUser.associate = function (models) {
    VlabUser.belongsTo(models.User)
    VlabUser.belongsTo(models.Vlab)
  }
  return VlabUser
}
