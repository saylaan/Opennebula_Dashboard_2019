module.exports = (sequelize, DataTypes) => {
  const UrlUser = sequelize.define('UrlUser', {})

  UrlUser.associate = function (models) {
    UrlUser.belongsTo(models.Url)
    UrlUser.belongsTo(models.User)
  }
  return UrlUser
}
