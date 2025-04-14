const express = require('express');
const multer = require('multer');
const path = require('path');
const { File, Block, sequelize } = require('../models');
const { parseDxfFile } = require('../services/dxfParser');
const { Op } = require('sequelize');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload and process DXF file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (path.extname(req.file.originalname).toLowerCase() !== '.dxf') {
      return res.status(400).json({ error: 'Only DXF files are allowed' });
    }

    const file = await File.create({
        filename: req.file.filename,
        originalname: req.file.originalname,
        filepath: req.file.path
        // Don't include upload_date - it will use the default value
      });

    const blocks = await parseDxfFile(req.file.path);
    await Block.bulkCreate(blocks.map(block => ({ ...block, file_id: file.id })));

    res.status(201).json({ 
      message: 'File processed successfully', 
      fileId: file.id,
      blockCount: blocks.length
    });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
});

// Get all files
router.get('/files', async (req, res) => {
    try {
        const files = await File.findAll({
            order: [['upload_date', 'DESC']] // Now using the correct column name
          });
      res.json(files);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching files' });
    }
  });
  


router.get('/files/:fileId/blocks', async (req, res) => {
    try {
      const { fileId } = req.params;
      const blocks = await Block.findAll({
        where: { file_id: fileId }, // Make sure this matches your DB column
        order: [['name', 'ASC']],
      });
      
      res.json({
        success: true,
        data: blocks, // The actual blocks array
        count: blocks.length
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching blocks' });
    }
  });

// Get block details
router.get('/blocks/:blockId', async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.blockId);
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching block details' });
  } 
});
// Add this before module.exports
router.delete('/cleanup', async (req, res) => {
  try {
    // Delete all blocks first (due to foreign key constraint)
    await Block.destroy({ where: {}, truncate: true });
    
    // Then delete all files
    await File.destroy({ where: {}, truncate: true });
    
    // Reset primary key sequences (PostgreSQL specific)
    await sequelize.query('ALTER SEQUENCE "Files_id_seq" RESTART WITH 1');
    await sequelize.query('ALTER SEQUENCE "Blocks_id_seq" RESTART WITH 1');
    
    res.json({ message: 'All data deleted successfully' });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ error: 'Cleanup failed' });
  }
});

module.exports = router;