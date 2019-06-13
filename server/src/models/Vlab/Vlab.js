module.exports = (sequelize, DataTypes) => {
  const Vlab = sequelize.define('Vlab', {
    idopennebula: DataTypes.INTEGER,
    ownername: DataTypes.STRING,
    groupname: DataTypes.STRING,
    name: DataTypes.STRING,
    nameparse: DataTypes.STRING,
    vlanid: DataTypes.INTEGER,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dayleft: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  })

  return Vlab
}
