module.exports = (sequelize, DataTypes) => {
  const SipUser = sequelize.define('SipUser', {})

  SipUser.associate = function (models) {
    SipUser.belongsTo(models.Sip)
    SipUser.belongsTo(models.User)
  }
  return SipUser
}
