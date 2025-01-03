const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const compression = require('compression');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const Bull = require('bull');
const { Configuration, OpenAIApi } = require("openai"); // Added for improved OpenAI interaction


const app = express();
const prisma = new PrismaClient();

// OpenAI Configuration (Replace with your actual key)
const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);


// Security middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors()); // Added CORS middleware


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

// AI processing endpoint with improved error handling
app.post('/api/process-creative', async (req, res) => {
  try {
    const { prompt, model } = req.body; // Assuming prompt and model are sent
    if (!prompt || !model) {
      return res.status(400).json({ error: "Prompt and model are required" });
    }

    const response = await openai.createCompletion({
      model: model, // Use the specified model
      prompt: prompt,
      max_tokens: 50, // Adjust as needed
    });

    res.json({ result: response.data.choices[0].text });

  } catch (error) {
    console.error("Error processing creative request:", error);
    res.status(500).json({ error: "Failed to process creative request" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});