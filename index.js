const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connection Successful!"))
  .catch((error) => console.log(`❌ MongoDB Connection Error: ${error}`));

// Schema Definition
const ClientSchema = new mongoose.Schema({
  Cname: String,         // Client Name
  Cmobile: String,       // Client Mobile Number
  Cmail: String,         // Client Email Id
  Pname: String,         // Project Name
  Date: String,          // Date (you may want to store this as Date type instead)
  Url: String,           // Project URL
  Backup_url: String     // Backup URL
});

// Model
const ClientModel = mongoose.model("ClientDetails", ClientSchema, "ClientDetails");


app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
});
// GET API Route
app.get('/clientdet', async (req, res) => {
  try {
    const data = await ClientModel.find();
    res.json(data);
  } catch (err) {
    console.log("❌ Error fetching client details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
