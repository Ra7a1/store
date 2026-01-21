import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const WEBHOOK_URL = "https://discordapp.com/api/webhooks/1463416370719887445/_5Ert4TH4oI46gSMVwxYzC14CaRE35efyA6zuHX-thEH62z-UR6g59CaP-v3NfQCUl8A";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../public"));

app.post("/api/order", async (req, res) => {
  const { service, name, discord, phone, description } = req.body;
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "RA7A Store",
        embeds: [
          {
            title: "📩 طلب خدمة جديد",
            color: 0x4a2f5a,
            fields: [
              { name: "🔧 نوع الطلب", value: service || "لا يوجد", inline: false },
              { name: "👤 الاسم", value: name || "لا يوجد", inline: true },
              { name: "💬 ديسكورد", value: discord || "لا يوجد", inline: true },
              { name: "📱 الجوال", value: phone || "لا يوجد", inline: false },
              { name: "📝 الوصف", value: description || "لا يوجد", inline: false }
            ],
            footer: { text: "RA7A Store" },
            timestamp: new Date()
          }
        ]
      })
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
