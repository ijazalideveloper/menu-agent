# AI Restaurant Menu Assistant

A light, responsive web application featuring an Express backend linked to the Hugging Face Inference API (`Qwen/Qwen2.5-72B-Instruct`) to answer user inquiries dynamically based on structured context.

🔗 **Live Demo:** [https://menu-agent-one.vercel.app/](https://menu-agent-one.vercel.app/)

## 🚀 Features
- **Express Backend:** Minimalist Node.js routing and JSON payload processing.
- **Hugging Face AI Drivers:** Implements direct chat completion using high-density Qwen LLM.
- **Dynamic Context Injection:** Automatically loads local menu databases into the LLM system prompt.
- **Vanilla Frontend UI:** Sleek CSS variables, clean message injection, and responsive user feedback loops.

---

## 📁 Directory Structure
Ensure your files match this layout so Express can serve the webpage correctly:
```text
launching-dev/
├── public/
│   └── index.html      # Frontend chat interface
├── .env                # API Keys (Keep this private!)
├── package.json        # Node configuration
└── server.js           # Express/AI core entrypoint
```

---

## 🛠️ Installation & Setup

### 1. Clone & Install Dependencies
Navigate into your local directory and run:
```bash
npm install
```

### 2. Configure Environment Variables
Create a file named `.env` in the root of your folder and supply your Hugging Face Access Token:
```env
HUGGINGFACEHUB_API_KEY=your_huggingface_token_here
```

### 3. Update Project Type
Because `server.js` uses ES module imports (`import express...`), ensure your `package.json` contains `"type": "module"` if it is missing.

---

## 💻 Running the App Locally

### Production Mode
Launches the server statically at `http://localhost:4000`:
```bash
npm start
```

### Development Mode (Recommended)
Starts the application using `nodemon` to watch and reload on code updates automatically:
```bash
npm run dev
```

### Build Pipeline (Mock script)
Provided to prevent errors inside automated deployment pipelines (like Vercel or Render):
```bash
npm run build
```

---

## 🧪 Tech Stack
- Backend: **Express v5**, **NodeJS**
- Validation: **Zod**
- AI Framework: **@huggingface/inference**
- Large Language Model: **Qwen2.5-72B-Instruct**
