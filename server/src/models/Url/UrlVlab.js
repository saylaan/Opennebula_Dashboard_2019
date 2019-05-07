module.exports = (sequelize, DataTypes) => {
  const UrlVlab = sequelize.define('UrlVlab', {})

  UrlVlab.associate = function (models) {
    UrlVlab.belongsTo(models.Url)
    UrlVlab.belongsTo(models.Vlab)
  }
  return UrlVlab
}
