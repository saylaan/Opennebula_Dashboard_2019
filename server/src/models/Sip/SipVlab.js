module.exports = (sequelize, DataTypes) => {
  const SipVlab = sequelize.define('SipVlab', {})

  SipVlab.associate = function (models) {
    SipVlab.belongsTo(models.Sip)
    SipVlab.belongsTo(models.Vlab)
  }
  return SipVlab
}
