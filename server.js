const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const HF_TOKEN = process.env.HF_TOKEN;

const MODEL_URL = "https://router.huggingface.co/v1/models/microsoft/DialoGPT-medium";

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

        const text = await response.text();

        console.log("Respuesta RAW:", text);

        let reply = "Error con la IA 😢";

        try {
            const data = JSON.parse(text);
            if (Array.isArray(data) && data.length > 0) {
                reply = data[0].generated_text || reply;
            }
        } catch (e) {
            reply = "La IA no respondió correctamente 😢";
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
