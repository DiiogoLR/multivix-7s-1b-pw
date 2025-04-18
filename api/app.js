const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Endpoint para retornar os produtos
app.get("/produtos", (req, res) => {
  const filePath = path.join(__dirname, "data", "produtos.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ erro: "Erro ao ler o arquivo" });

    try {
      const produtos = JSON.parse(data);
      res.json(produtos);
    } catch (parseError) {
      res.status(500).json({ erro: "Erro ao interpretar os dados" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
