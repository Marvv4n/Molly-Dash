
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('src'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/images/users/');
  },
  filename: function (req, file, cb) {
    cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Handle avatar upload
app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const filePath = `/assets/images/users/${req.file.filename}`;
  res.json({ success: true, avatarUrl: filePath });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
