const fs = require('fs');
const DxfParser = require('dxf-parser');
const parser = new DxfParser();

function parseDxfFile(filePath) {
  try {
    const dxfText = fs.readFileSync(filePath, 'utf-8');
    const dxf = parser.parseSync(dxfText);
    return extractBlocks(dxf);
  } catch (error) {
    console.error('Error parsing DXF file:', error);
    throw error;
  }
}

function extractBlocks(dxf) {
  const blocks = [];
  
  if (dxf.blocks) {
    Object.keys(dxf.blocks).forEach(blockName => {
      const block = dxf.blocks[blockName];
      
      // Simple extraction - you can expand this based on your needs
      blocks.push({
        name: blockName,
        layer: block.layer,
        type: block.type,
        x_coordinate: block.position?.x || 0,
        y_coordinate: block.position?.y || 0,
        z_coordinate: block.position?.z || 0,
        properties: {
          entities: block.entities?.length || 0
        }
      });
    });
  }
  
  return blocks;
}

module.exports = { parseDxfFile };