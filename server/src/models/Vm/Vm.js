module.exports = (sequelize, DataTypes) => {
  const Vm = sequelize.define('Vm', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  return Vm
}
