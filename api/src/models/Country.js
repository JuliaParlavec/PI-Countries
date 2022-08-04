const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "countries",
    {
      id: {
        //fifa
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flags: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        //continente
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.FLOAT,
      },
      population: {
        type: DataTypes.FLOAT,
      },
    },
    { timestamps: false }
  );
};

// - [ ] País con las siguientes propiedades:
//   - ID (Código de 3 letras) *
//   - Nombre *
//   - Imagen de la bandera *
//   - Continente *
//   - Capital *
//   - Subregión
//   - Área
//   - Población
