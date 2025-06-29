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

// GET API Route
app.get('/clientdetG', async (req, res) => {
  try {
    const data = await ClientModel.find();
    res.json(data);
  } catch (err) {
    console.log("❌ Error fetching client details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create
app.post('/clientdetC', async (req, res)=>{
  try{
    const data = new ClientModel(req.body);
    const SavedData= await data.save();
    res.json(SavedData);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

// Update
app.put('/clientdetU/:id',async(req, res)=>{
  try{
    const updatedData = await ClientModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    if(!updatedData) return res.status(404).json({error: 'Item not found'});
    res.json(updatedData);  
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

// Delete
app.delete('/clientdetD/:id', async(req,res)=>{
  try{
    const deletedData = await ClientModel.findByIdAndDelete(req.params.id);
    if(!deletedData) return res.status(404).json({error:'Item not found'});
    res.json({message:'Item deleted'});
  }catch(err){
    res.status(500).json({error: err.message});
  }
});


// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
