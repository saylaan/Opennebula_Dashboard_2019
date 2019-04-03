module.exports = (sequelize, DataTypes) => {
    const VlabLogUser = sequelize.define('VlabLogUser', {})
    // creation of the table into the DB
    VlabLogUser.associate = function (models) {
      VLabLogUser.belongsTo(models.User)
      VlabLogUser.belongsTo(models.Vlab)
    }
  
    return LogUser
  }
