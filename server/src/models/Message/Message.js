module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    email: DataTypes.STRING,
    message: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  return Message
}
