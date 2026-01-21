import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Webhook URL =====
const WEBHOOK_URL = "https://discordapp.com/api/webhooks/1463416370719887445/_5Ert4TH4oI46gSMVwxYzC14CaRE35efyA6zuHX-thEH62z-UR6g59CaP-v3NfQCUl8A";

// ===== API Endpoint =====
app.post("/api/order", async (req, res) => {
  try {
    const { service, name, discord, phone, description } = req.body;

    if (!service || !name || !discord) {
      return res.status(400).json({ error: "Fields missing" });
    }

    const payload = {
      username: "RA7A Store",
      embeds: [
        {
          title: "📩 طلب خدمة جديد",
          color: 0x7a4cff,
          fields: [
            { name: "🔧 نوع الطلب", value: service, inline: false },
            { name: "👤 الاسم", value: name, inline: true },
            { name: "💬 ديسكورد", value: discord, inline: true },
            { name: "📱 الجوال", value: phone || "غير متوفر", inline: false },
            { name: "📝 الوصف", value: description || "لا يوجد", inline: false }
          ],
          timestamp: new Date()
        }
      ]
    };

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Error sending webhook:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
