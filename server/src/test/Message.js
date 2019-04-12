module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    email: DataTypes.STRING,
    message: DataTypes.STRING
  })

  return Message
}
