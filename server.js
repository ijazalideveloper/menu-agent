import express from "express";
import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Fix 1: Eliminate unreliable chat wrappers and stick to stable base tools
import { HfInference } from "@huggingface/inference";

dotenv.config();

const port = 4000;
const app = express();
app.use(express.json());

const __dirname = path.resolve();

// Fix 2: Initialize the raw underlying Inference driver directly
const hf = new HfInference(
  process.env.HUGGINGFACEHUB_API_KEY
);

// Menu database
const menus = {
  breakfast: "Aloo Paratha, Poha, Masala Chai",
  lunch: "Dal Rice, Sabzi Roti, Ice Cream",
  dinner: "Chicken Curry, Naan, Gulab Jamun",
};

// IMPROVEMENT: Enforced strict rules to stop the Islamabad hallucination template
const systemPrompt = `
      You are a strict, helpful restaurant menu assistant. Keep responses short and highly accurate.
      
      CRITICAL INSTRUCTIONS:
      1. Do NOT mention places to visit, tourism, cities, or Islamabad under any circumstances.
      2. Do NOT use introductory filler phrases about what you can or cannot do.
      3. ONLY answer using the specific menu data provided below. 
      4. If the user asks about something completely unrelated to this menu, politely say: "I can only help you with questions about our restaurant menu."

      MENU DATA:
      - Breakfast: ${menus.breakfast}
      - Lunch: ${menus.lunch}
      - Dinner: ${menus.dinner}
    `;

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/chat", async (req, res) => {
  const userInput = req.body.input;
  if (!userInput) return res.status(400).json({ error: "Input is required" });

  try {
    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput }
      ],
      max_tokens: 500,
      temperature: 0.1, // Low temperature keeps it strictly bound to the instructions
    });

    const reply = response.choices[0]?.message?.content || "No response generated.";
    return res.json({ result: reply });

  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
