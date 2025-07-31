const path = require('path');
const fs = require('fs');

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Access file info using req.file
  res.status(200).json({ 
    message: 'File uploaded successfully', 
    filename: req.file.originalname,
    path: req.file.path 
  });
};

const downloadFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.sendFile(filePath);
};

module.exports = { uploadFile, downloadFile };
