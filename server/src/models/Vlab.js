module.exports = (sequelize, DataTypes) => {
  // creation of the table into the DB
  const Vlab = sequelize.define('Vlab', {
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    time: DataTypes.STRING,
    vlabImage: DataTypes.STRING
  })

  return Vlab
}
