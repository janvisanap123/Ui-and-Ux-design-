import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI if API key exists
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// REST endpoint for AI refinement
app.post("/api/ai-refine", async (req: any, res: any) => {
  const { title, genre, synopsis } = req.body;
  if (!title || !genre || !synopsis) {
    return res.status(400).json({ error: "Missing required fields: title, genre, synopsis" });
  }

  if (!ai) {
    console.log("GEMINI_API_KEY is not defined. Falling back to simulated suggestion.");
    const simulatedResponse = {
      coverColor: "#1e293b",
      textColor: "#ffe08f",
      fontStyle: "Playfair Display",
      suggestedTitle: `${title}: Resonances`,
      blurb: `In this gripping exploration of ${genre}, ${title} delivers an unputdownable narrative that balances intricate characters with sweeping thematic depth. A masterful journey through the heart of human experience.`,
      chapterTitles: [
        "Chapter 1: The Threshold of Ambition",
        "Chapter 2: Echoes in the Corridor",
        "Chapter 3: The Architecture of Desire",
        "Chapter 4: Beyond the Grid"
      ],
      coverStyle: "Minimalist Editorial Modernist with Gold accents",
      layoutGuidelines: "Set with wide outer margins, drop cap on the opening paragraph of each chapter, and elegant serif typography."
    };
    return res.json(simulatedResponse);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Book Details to Refine:
        Original Title: ${title}
        Genre: ${genre}
        Synopsis: ${synopsis}`,
      config: {
        systemInstruction: "You are a professional book cover designer and editor for Zenjaura Publishing House. Provide premium aesthetic cover style recommendations and copy refinements in JSON format. Use deep elegant colors for HEX values like deep blues, plums, slate, forest green, or dark terracotta.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coverColor: { type: Type.STRING, description: "HEX background color, e.g., '#0F172A', '#1C1917', '#450A0A', '#14532D'" },
            textColor: { type: Type.STRING, description: "HEX text contrast color, e.g., '#F8FAFC', '#FEF08A', '#E2E8F0'" },
            fontStyle: { type: Type.STRING, description: "Font pairing, e.g., 'Space Grotesk & Inter', 'Playfair Display & Lora', 'JetBrains Mono'" },
            suggestedTitle: { type: Type.STRING, description: "A polished and powerful version of the title" },
            blurb: { type: Type.STRING, description: "A fascinating 2-3 sentence book jacket back-cover marketing blurb" },
            chapterTitles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Four engaging chapter titles"
            },
            coverStyle: { type: Type.STRING, description: "Cover visual style direction, e.g., 'Clean Swiss Design with gold accents', 'High-contrast Brutalist Typography'" },
            layoutGuidelines: { type: Type.STRING, description: "Inner book typesetting layout style" }
          },
          required: ["coverColor", "textColor", "fontStyle", "suggestedTitle", "blurb", "chapterTitles", "coverStyle", "layoutGuidelines"]
        }
      }
    });

    if (response.text) {
      const parsedData = JSON.parse(response.text.trim());
      return res.json(parsedData);
    } else {
      throw new Error("Empty response from Gemini API");
    }
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate design suggestions" });
  }
});

// Setup Vite Dev Server / Static Files
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: any, res: any) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

initServer();
