module.exports = (sequelize, DataTypes) => {
  const TemplateVm = sequelize.define('TemplateVm', {})

  TemplateVm.associate = function (models) {
    TemplateVm.belongsTo(models.Template)
    TemplateVm.belongsTo(models.Vm)
  }
  return TemplateVm
}
