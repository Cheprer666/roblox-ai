require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    try {
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/google/flan-t5-base",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: message
                })
            }
        );

        const text = await response.text();
        console.log("Respuesta RAW:", text);

        let reply = "La IA no respondió correctamente";

        try {
            const data = JSON.parse(text);
            if (Array.isArray(data) && data.length > 0) {
                reply = data[0].generated_text || reply;
            }
        } catch (e) {
            reply = "Error procesando respuesta";
        }

        res.json({ reply });

    } catch (error) {
        console.error("ERROR GENERAL:", error);
        res.json({ reply: "Error con la IA" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor activo con IA en puerto " + PORT + " 🚀");
});
