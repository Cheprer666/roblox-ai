require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Eres un NPC amable dentro de un juego de Roblox." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        console.log("Respuesta OpenAI:", data);

        const reply =
            data.choices?.[0]?.message?.content ||
            "La IA no respondió correctamente";

        res.json({ reply });

    } catch (error) {
        console.error("ERROR:", error);
        res.json({ reply: "Error con la IA" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor activo con IA en puerto " + PORT + " 🚀");
});
