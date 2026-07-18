import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client
  let ai: GoogleGenAI;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } else {
    console.warn('GEMINI_API_KEY is missing.');
  }

  // --- API Routes ---

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!ai) {
        return res.status(500).json({ error: 'Gemini AI not initialized (Missing API key)' });
      }

      // Convert history for Gemini
      const formattedHistory = history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      const systemInstruction = `You are a highly professional, empathetic, and knowledgeable AI legal assistant for a law firm.
Your primary goals are to:
1. Answer client FAQs accurately based on general legal knowledge and firm policies.
2. Direct complex legal questions or advice-seeking to schedule a consultation, as you cannot give binding legal advice.
3. Assist in gathering initial case intake information (name, contact, brief description of the issue).
4. Be concise, polite, and trustworthy.

(Simulated behavior: When a user asks about legal precedents, pretend you are querying the firm's vector database to find relevant internal documents and case law, and mention that you found some related precedents before summarizing the general legal principles.)`;

      const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction,
          temperature: 0.3, // keep it professional
        },
      });

      // If we had a mechanism to set history directly on the chat object in this SDK, 
      // we would. Instead we can pass it all in a single contents array.
      // Wait, in genai SDK, ai.chats.create can take `history` in `config`? No, let's just use `generateContent` with the full history if we want a stateless call.
      
      const contents = [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.3
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Chat error:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  app.post('/api/intake', async (req, res) => {
    // Simulate Gravity Forms / Clio Grow integration
    try {
      const formData = req.body;
      console.log('Received intake form:', formData);
      
      // Here you would normally push to Gravity Forms webhook or Clio API
      // e.g. await fetch('https://app.clio.com/api/v4/leads', { ... })
      
      // Simulate API latency
      await new Promise(r => setTimeout(r, 1000));

      res.json({ success: true, message: 'Intake submitted to Clio Grow & Gravity Forms.' });
    } catch (error) {
      console.error('Intake error:', error);
      res.status(500).json({ error: 'Failed to submit intake' });
    }
  });

  app.post('/api/schedule', async (req, res) => {
    // Simulate Calendar sync
    try {
      const scheduleData = req.body;
      console.log('Scheduling consultation:', scheduleData);
      
      await new Promise(r => setTimeout(r, 800));

      res.json({ success: true, message: 'Appointment scheduled and synced with Calendar.' });
    } catch (error) {
      console.error('Scheduling error:', error);
      res.status(500).json({ error: 'Failed to schedule' });
    }
  });


  // --- Vite Middleware (Development) ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
