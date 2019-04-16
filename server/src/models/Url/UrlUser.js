module.exports = (sequelize, DataTypes) => {
  const UrlUser = sequelize.define('UrlUser', {})

  UrlUser.associate = function (models) {
    UrlUser.belongsTo(models.User)
    UrlUser.belongsTo(models.Vlab)
  }
  return UrlUser
}
