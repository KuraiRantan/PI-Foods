const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    stepByStep: {
      type: DataTypes.JSON,
      get(){
        return JSON.parse(this.getDataValue("stepByStep"));
      },
      set(value){
        return this.setDataValue("stepByStep", JSON.stringify(value));
      }
    },
    image:{
      type: DataTypes.TEXT
    }
  });
};
