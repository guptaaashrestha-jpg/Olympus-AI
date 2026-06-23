import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connectDB } from './db';
import { startMockStream } from './workers/mockStream';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS allowing our Vite frontend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

// API Route for Gemini (Placeholder for now)
app.post('/api/synthesis', async (req, res) => {
  // We will implement the Gemini API call here
  res.json({ message: "Synthesis endpoint ready" });
});

io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  console.log(`\n========================================`);
  console.log(`🌌 Olympus.AI Backend Engine Active`);
  console.log(`========================================`);
  console.log(`📡 Listening on port ${PORT}`);
  
  // Connect to DB
  await connectDB();
  
  // Start the background worker for synthetic traffic
  startMockStream(io);
});
