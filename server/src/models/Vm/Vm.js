module.exports = (sequelize, DataTypes) => {
  const Vm = sequelize.define('Vm', {
    idopennebula: DataTypes.INTEGER,
    ownername: DataTypes.STRING,
    groupname: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  })

  return Vm
}
