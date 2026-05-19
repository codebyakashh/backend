const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const authRoute = require("./routes/auth");
// 1. ऊपर रूट्स इम्पोर्ट करने वाले सेक्शन में यह जोड़ो:
const orderRoute = require("./routes/order");

// 2. नीचे जहाँ बाकी app.use() लिखे हैं (जैसे app.use("/api/auth", ...)), उसके ठीक नीचे यह लिख दो:
app.use("/api/order", orderRoute);

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});