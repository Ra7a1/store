const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK = "https://discordapp.com/api/webhooks/1463438750737629300/nXKd_cBVM0DiPl8hR3405MluCNVww6dMDvwW4d1570HgsussHJz2FpF_RidhqSXwN373";

app.post("/order", async (req,res)=>{
  const { type, name, discord, phone, description } = req.body;
  if(!type||!name||!discord||!phone) return res.status(400).json({ message:"جميع الحقول مطلوبة!" });
  try{
    await axios.post(DISCORD_WEBHOOK,{
      username:"RA7A Store",
      embeds:[{
        title:"📩 طلب خدمة جديد",
        color:0x4a2f5a,
        fields:[
          {name:"🔧 نوع الطلب", value:type, inline:false},
          {name:"👤 الاسم", value:name, inline:true},
          {name:"💬 ديسكورد", value:discord, inline:true},
          {name:"📱 الجوال", value:phone, inline:false},
          {name:"📝 الوصف", value:description||"لا يوجد", inline:false}
        ],
        footer:{ text:"RA7A Store" },
        timestamp: new Date()
      }]
    });
    res.json({ message:"تم إرسال طلبك بنجاح ✅" });
  } catch(err){ console.error(err); res.status(500).json({ message:"حدث خطأ أثناء إرسال الطلب" }); }
});

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
