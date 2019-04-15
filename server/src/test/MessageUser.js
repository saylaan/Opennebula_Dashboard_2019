module.exports = (sequelize, DataTypes) => {
  const MessageUser = sequelize.define('MessageUser', {})

  MessageUser.associate = function (models) {
    MessageUser.belongsTo(models.User)
    MessageUser.belongsTo(models.Message)
  }
  return MessageUser
}
