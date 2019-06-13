module.exports = (sequelize, DataTypes) => {
  const Sip = sequelize.define('Sip', {
    name: DataTypes.STRING,
    login: DataTypes.STRING,
    passwd: DataTypes.STRING,
    vlabname: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  return Sip
}
