const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const DEEPSEEK_API_KEY = "Tsk-85735fd25b014a75936b1d04dc4ade88"; // ← Reemplaza con tu clave real

app.post("/api/deepseek", async (req, res) => {
  const messages = req.body.messages;

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Error al contactar DeepSeek:", err);
    res.status(500).json({ reply: "Error interno del servidor." });
  }
});

app.listen(3000, () => console.log("Servidor DeepSeek activo en http://localhost:3000"));
