module.exports = (sequelize, DataTypes) => {
  const RespMessage = sequelize.define('RespMessage', {})

  RespMessage.associate = function (models) {
    RespMessage.belongsTo(models.Resp)
    RespMessage.belongsTo(models.Message)
  }
  return RespMessage
}
