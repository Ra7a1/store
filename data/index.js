const express = require("express");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/admin", express.static("admin"));

const DATA_FILE = path.join(__dirname,"data/orders.json");
const WEBHOOK_URL = "https://discordapp.com/api/webhooks/1463438750737629300/nXKd_cBVM0DiPl8hR3405MluCNVww6dMDvwW4d1570HgsussHJz2FpF_RidhqSXwN373";

if(!fs.existsSync(DATA_FILE)){
  fs.writeFileSync(DATA_FILE,"[]");
}

app.post("/api/order", async (req,res)=>{
  const order = {...req.body, timestamp: new Date()};
  const orders = JSON.parse(fs.readFileSync(DATA_FILE));
  orders.push(order);
  fs.writeFileSync(DATA_FILE,JSON.stringify(orders,null,2));

  try {
    await fetch(WEBHOOK_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        username:"RA7A Store",
        embeds:[{
          title:"📩 طلب خدمة جديد",
          color:0x4a2f5a,
          fields:[
            {name:"🔧 نوع الطلب", value:order.type, inline:false},
            {name:"👤 الاسم", value:order.name, inline:true},
            {name:"💬 ديسكورد", value:order.discord, inline:true},
            {name:"📱 الجوال", value:order.phone, inline:false},
            {name:"📝 الوصف", value:order.description||"لا يوجد", inline:false}
          ],
          timestamp: order.timestamp
        }]
      })
    });
  } catch(err){ console.error(err); }

  res.sendStatus(200);
});

// API لجلب الطلبات للوحة
app.get("/api/getOrders",(req,res)=>{
  const orders = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(orders);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log("Server running on port",PORT));
