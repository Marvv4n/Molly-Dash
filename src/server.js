
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { OpenAI } = require('openai');
const { VertexAI } = require('@google-cloud/vertex-ai');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const Bull = require('bull');

const app = express();
const prisma = new PrismaClient();
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const vertexAI = new VertexAI();

// Security middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Queue for processing AI tasks
const aiQueue = new Bull('ai-tasks', {
  redis: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

// AI processing endpoint
app.post('/api/process-creative', async (req, res) => {
  try {
    const job = await aiQueue.add(req.body);
    res.json({ jobId: job.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
