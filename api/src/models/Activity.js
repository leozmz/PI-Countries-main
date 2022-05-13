const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo
// Luego le injectamos la conexión a sequelize.
module.exports = (sequelize) => {
    // definimos el modelo:
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        season: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
            allowNull: false
        },
        //createdInDb: {
        //    type: DataTypes.BOOLEAN,
        //    allowNull: false,
        //    defaultValue: true
        //}
    }, { timestamps: false });
};