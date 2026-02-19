const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const HF_TOKEN = process.env.HF_TOKEN;

// Modelo gratuito de Hugging Face
const MODEL_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";

app.get("/", (req, res) => {
    res.send("Servidor con IA funcionando 🤖🔥");
});

app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        const response = await fetch(MODEL_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: message
            })
        });

        const data = await response.json();

        let reply = "No entendí 😅";

        if (Array.isArray(data) && data[0]?.generated_text) {
            reply = data[0].generated_text;
        }

        res.json({ reply: reply });

    } catch (error) {
        console.error(error);
        res.json({ reply: "Error con la IA 😢" });
    }
});

app.listen(3000, () => {
    console.log("Servidor activo con IA en puerto 3000 🚀");
});
