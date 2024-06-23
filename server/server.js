require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const Groq = require("groq-sdk");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.post("/api/chatbot", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Ambil data menu dari database
    db.query("SELECT * FROM menu", async (error, results) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({
          reply: "Maaf, terjadi kesalahan saat mengambil data dari database.",
        });
        return;
      }

      // Cek apakah ada hasil dari query
      if (results.length === 0) {
        res.json({
          reply: "Maaf, tidak ada item menu yang tersedia di database.",
        });
        return;
      }

      console.log("Data menu:", results); // Log untuk memastikan data diambil dengan benar

      // Gabungkan data menu ke dalam pesan pengguna untuk mempengaruhi respons AI
      const menuData = results
        .map(
          (item) =>
            `Nama: ${item.namaMenu}, Harga: Rp ${item.harga}, Gambar: ${item.gambar}`
        )
        .join("\n");
      const fullMessage = `Restoran Kampung Rasa\n\nMenu yang tersedia adalah:\n${menuData}\n\nPengguna: ${userMessage}`;

      console.log("Full message:", fullMessage); // Log untuk memastikan format pesan benar

      // Kirim permintaan ke API Groq
      const chatCompletion = await groq.chat.completions.create({
        model: "llama3-8b-8192", // Tambahkan properti model di sini
        messages: [
          {
            role: "system",
            content:
              "Anda adalah asisten yang berbicara dalam bahasa Indonesia dan memberikan informasi tentang menu di Restoran Kampung Rasa.",
          },
          {
            role: "user",
            content: fullMessage,
          },
        ],
      });

      const botResponse =
        chatCompletion.choices[0]?.message?.content ||
        "Tidak ada respons dari model.";

      res.json({ reply: botResponse });
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);

      res.status(500).json({
        reply: "Maaf, terjadi kesalahan saat memproses permintaan Anda.",
      });
    } else if (error.request) {
      console.error("Request data:", error.request);
      res.status(500).json({ reply: "Maaf, tidak ada respons dari API." });
    } else {
      console.error("Error message:", error.message);
      res.status(500).json({
        reply: "Maaf, terjadi kesalahan saat menyiapkan permintaan.",
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
