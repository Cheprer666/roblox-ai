const express = require("express");
const app = express();

app.use(express.json());

// Ruta para probar si el servidor funciona
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

// Ruta para el chat
app.post("/chat", (req, res) => {
    const message = req.body.message;

    const reply = "Hola 👋 dijiste: " + message;

    res.json({ reply: reply });
});

app.listen(3000, () => {
    console.log("Servidor activo en http://localhost:3000");
});
