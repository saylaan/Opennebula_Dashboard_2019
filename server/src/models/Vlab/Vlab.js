module.exports = (sequelize, DataTypes) => {
  const Vlab = sequelize.define('Vlab', {
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    time: DataTypes.STRING,
    vlabImage: DataTypes.STRING
  })

  return Vlab
}
