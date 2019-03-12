module.exports = (sequelize, DataTypes) => // creation of the table into the DB
    sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true // really important for one data / no more
        },
        password: DataTypes.STRING
    })
