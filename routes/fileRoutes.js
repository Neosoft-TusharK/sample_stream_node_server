const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadFile, downloadFile } = require('../controllers/fileController');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ Use multer middleware for file upload
router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:filename', downloadFile);

module.exports = router;
