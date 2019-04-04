module.exports = (sequelize, DataTypes) => {
    const VlabUserLog = sequelize.define('VlabUserLog', {})

    VlabUserLog.associate = function (models) {
      VlabUserLog.belongsTo(models.User)
      VlabUserLog.belongsTo(models.Vlab)
    }
    return VlabUserLog
  }
