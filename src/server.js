
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: 'public/uploads/avatars',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Campaign routes
app.post('/api/campaigns', async (req, res) => {
  try {
    const campaign = await prisma.campaign.create({
      data: req.body
    });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/campaigns', async (req, res) => {
  const campaigns = await prisma.campaign.findMany({
    include: { creatives: true }
  });
  res.json(campaigns);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


app.post('/api/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    
    // Update user's avatar in database
    // Note: You'll need to implement user authentication and get the user ID
    await prisma.user.update({
      where: { id: req.user.id },
      data: { avatarUrl }
    });

    res.json({ avatarUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
