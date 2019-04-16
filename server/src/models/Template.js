module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define('Template', {
    name: DataTypes.STRING,
    template: DataTypes.STRING,
    type: DataTypes.STRING
  })

  return Template
}
