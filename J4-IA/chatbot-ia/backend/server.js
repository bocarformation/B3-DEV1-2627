import express from "express";
import cors from "cors";
import "dotenv/config";
import OpenAI from "openai";

const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(cors({ origin: "http://localhost:5173" }));

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
})

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
    try {


        const body = req.body || {};

        let messages = [];

        if (Array.isArray(body.messages)) {
            messages = body.messages;
        } else {
            const message = body.message ?? body.prompt;

            if (!message.trim() || typeof message !== "string") {
                return res.status(400).json({
                    error: "Message invalide"
                });
            }

            if (Array.isArray(body.history)) {
                messages = [...body.history];
            }

            messages.push({
                role: "user",
                content: message
            })
        }
        // Validation
        if (
            messages.length === 0
            || !messages.every(m => m && ["system", "user", "assistant"].includes(m.role)
                && typeof m.content === "string"
            )) {
            return res.status(400).json({
                error: "Format des messages invalides"
            })
        }


        const completion = await client.chat.completions.create({
            model: process.env.GROQ_MODEL,
            messages: [
                {
                    role: "system",
                    content: "Vous êtes un assistant pédagogique" + "Répondez clairement en français"
                },
                ...messages
            ],
            max_tokens: 500
        });

        const answer = completion.choices[0]?.message.content || "";

        res.json({
            reply: answer,
            answer: answer,
            response: answer
        })

    } catch (error) {
        console.log("Erreur GROQ", {
            status: error.status,
            code: error.code,
            message: error.message
        });
        res.status(502).json({
            error: "Le serveur IA est indisponible"
        })

    }
});

app.listen(3001, () => console.log("API dispo sur http://localhost:3001"));