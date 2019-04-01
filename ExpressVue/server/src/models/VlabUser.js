module.exports = (sequelize, DataTypes) => {
  // creation of the table into the DB
  const VlabUser = sequelize.define('VlabUser', {})

  VlabUser.associate = function (models) {
    VlabUser.belongsTo(models.User)
    VlabUser.belongsTo(models.Vlab)
  }
  return VlabUser
}
