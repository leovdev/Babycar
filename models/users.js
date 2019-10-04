const sequelize= require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        fecha: type.DATEONLY,
        email:type.STRING,
        mes:type.STRING
    })
}
