module.exports = (sequelize, DataTypes) => {
  const VmVlab = sequelize.define('VmVlab', {})

  VmVlab.associate = function (models) {
    VmVlab.belongsTo(models.Vm)
    VmVlab.belongsTo(models.Vlab)
  }
  return VmVlab
}
