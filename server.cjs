var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
function getAiClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
    console.warn("WARNING: GEMINI_API_KEY has not been configured in Secrets. Inquiries draft & smart blog writer will use sandbox presets.");
    return null;
  }
  return new import_genai.GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "15mb" }));
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "BANE Aero service alive", environment: process.env.NODE_ENV });
  });
  app.post("/api/blogs/generate", async (req, res) => {
    try {
      const { topic, category } = req.body;
      if (!topic) {
        res.status(400).json({ error: "Topic is required to write content." });
        return;
      }
      console.log(`Generating AI blog post on topic: ${topic}, category: ${category}`);
      const ai = getAiClient();
      if (!ai) {
        const fallbackTitle = `Sustainable Digital Transformation in Modern Airfield Operations: ${topic}`;
        const fallbackSlug = fallbackTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        res.json({
          title: fallbackTitle,
          slug: fallbackSlug,
          summary: `Exploring how aeronautical services, advanced flight tracking systems, and automated billing optimize operational productivity and resource efficiencies.`,
          content: `## Executive Overview on ${topic}

In modern air traffic networks and global hub terminals, legacy procedures are increasingly replaced by integrated cloud billing and dynamic revenue orchestration platforms. As airfields undergo comprehensive digital modernizations, organizations require reliable IT partners to navigate flight telemetry processing, passenger baggage flows, and landing fee collection operations.

### Key Aeronautical Efficiency Indicators

1. **Aeronautical Revenue Billing Automation (ARMS)**: Eliminating manual flight logs in favor of direct ADS-B telemetry capturing.
2. **Real-time Situational Awareness**: Visual dispatch monitors showcasing flight routes, weight-and-balance metrics, and block-time reports.
3. **Multi-tenant Cloud Security**: Restricting information access to authorized ground agents, civil authorities, and flight dispatch teams.

### Operational Optimization Strategies

Implementing automated IT solutions mitigates administrative backlogs, increases the turnaround billing velocity on apron areas, and introduces secure auditable billing pathways for international carriers. By combining responsive IT consulting support with robust, compliant data storage infrastructure, authorities can unlock up to 22% higher billing precision.

*Contact BANE Aeronautical consulting division today to schedule an airfield technology review and learn how ARMS digitization optimizes airport assets.*`,
          author: "BANE Aero Systems",
          category: category || "Technology",
          image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop"
        });
        return;
      }
      const prompt = `Compose a comprehensive, high-quality, professional, SEO-friendly aviation business blog post about this topic: "${topic}".
The target category is "${category || "Technology"}". 
Format your output strictly as a JSON object containing five fields:
1. "title": A catchy, professional headline.
2. "slug": An SEO-friendly lowercase URL-safe version of the title (e.g. "future-of-arms-aviation").
3. "summary": A compelling 1-2 sentence description summarizing the article.
4. "content": The full blog post, highly researched, with extensive sections, lists, and markdown headers (## and ###). Ensure it is extensively detailed and informative (at least 3-4 paragraphs of top-shelf insights). Use professional tone and relate it to BANE Aero's expertise (consultancy, IT support, Aeronautical Revenue Management System - ARMS, flight tracking).
5. "image": Give a standard aviation image URL. Choose one from Unsplash:
   - "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=600&auto=format&fit=crop" (Aviation Tech/Space)
   - "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop" (Jet airplane runway)
   - "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop" (Airport terminal gate/airplane)
   - "https://images.unsplash.com/photo-1483450388369-9ed95738483c?q=80&w=600&auto=format&fit=crop" (Cockpit dashboard controls)`;
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              title: { type: import_genai.Type.STRING },
              slug: { type: import_genai.Type.STRING },
              summary: { type: import_genai.Type.STRING },
              content: { type: import_genai.Type.STRING },
              image: { type: import_genai.Type.STRING }
            },
            required: ["title", "slug", "summary", "content", "image"]
          },
          systemInstruction: "You are an elite aviation technology expert and copywriter at BANE Aero. Write highly detailed, SEO-friendly blogs that describe airport revenue billing, digital airfields, secure systems, and aeronautical consultant support."
        }
      });
      const resultText = response.text || "{}";
      const blogData = JSON.parse(resultText);
      res.json({
        title: blogData.title,
        slug: blogData.slug,
        summary: blogData.summary,
        content: blogData.content,
        author: "BANE Aero AI Guest Writer",
        category: category || "Technology",
        image: blogData.image
      });
    } catch (error) {
      console.error("Failed to generate AI blog content: ", error);
      res.status(500).json({ error: "Failed to generate AI blog", details: error instanceof Error ? error.message : String(error) });
    }
  });
  app.post("/api/inquiries/draft-reply", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!message || !email) {
        res.status(400).json({ error: "Email and original message are required to draft a response." });
        return;
      }
      console.log(`Generating auto-response draft for inquiry from: ${name} (${email})`);
      const ai = getAiClient();
      if (!ai) {
        res.json({
          draft: `Dear ${name || "Aviation Colleague"},

Thank you for reaching out to BANE Aero regarding your inquiry: "${subject || "Aviation Services Information"}".

We appreciate your interest in our industry-standard Aeronautical Revenue Management System (ARMS), flight tracking cloud solutions, and consultant services. 

One of our senior aviation solution architects is reviewing your requirements and will reach out to schedule a live video demonstration or phone briefing shortly. In the meantime, feel free to inspect our technical documentations or review our case studies on bane.aero.

Best Regards,

Customer Operations Team
BANE Aero Systems
habib@asl.aero`
        });
        return;
      }
      const prompt = `Draft a highly professional, secure, and helpful email reply to this client inquiry:
Client Name: "${name || "Unknown Sender"}"
Client Email: "${email}"
Subject: "${subject || "Aviation Inquiries"}"
Message Content: "${message}"

Write as 'BANE Aero Customer Operations'. Emphasize our expertise in Aeronautical Revenue Systems (ARMS), flight tracking, and systems IT consultancy. Prompt them politely to specify a convenient scheduling slot or ask follow up questions about their aircraft fleet size or airport operational billing requirements. Keep the draft friendly, authoritative, and perfectly polished.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the head of Global Support of BANE Aero, an advanced aviation digital solutions firm. You reply with extreme precision, professional elegance, and aeronautics intelligence."
        }
      });
      res.json({ draft: response.text });
    } catch (error) {
      console.error("Failed to draft smart inquiry reply: ", error);
      res.status(500).json({ error: "Failed to draft reply", details: error instanceof Error ? error.message : String(error) });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started and listening on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
