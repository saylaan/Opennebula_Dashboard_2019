module.exports = (sequelize, DataTypes) => {
  const Resp = sequelize.define('Resp', {
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

  return Resp
}
