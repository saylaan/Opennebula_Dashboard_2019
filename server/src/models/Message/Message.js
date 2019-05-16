module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    userid: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lastname: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    firstname: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    email: DataTypes.STRING,
    message: DataTypes.STRING,
    purpose: { 
      type: DataTypes.STRING,
      defaultValue: null
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    faq: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }, 
    user: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    date: DataTypes.STRING
  })

  return Message
}
