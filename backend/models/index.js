
const { Sequelize } = require('sequelize');
const config = require('../db/config');

const sequelize = new Sequelize(config.development);

const File = sequelize.define('File', {
    filename: { type: Sequelize.STRING, allowNull: false },
    originalname: { type: Sequelize.STRING, allowNull: false },
    filepath: { type: Sequelize.STRING, allowNull: false },
    upload_date: { 
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW 
    }
  }, {
    timestamps: false // Disable automatic createdAt/updatedAt
  });

  const Block = sequelize.define('Block', {
    name: { type: Sequelize.STRING, allowNull: false },
    layer: { type: Sequelize.STRING },
    type: { type: Sequelize.STRING },
    x_coordinate: { type: Sequelize.FLOAT },
    y_coordinate: { type: Sequelize.FLOAT },
    z_coordinate: { type: Sequelize.FLOAT },
    properties: { type: Sequelize.JSONB }
  }, {
    timestamps: false // Disable automatic timestamps
  });
File.hasMany(Block, { foreignKey: 'file_id' }); // Consistent naming
Block.belongsTo(File, { foreignKey: 'file_id' });

module.exports = { sequelize, File, Block };