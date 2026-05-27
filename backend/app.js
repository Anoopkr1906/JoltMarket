require("dotenv").config()
require("./config/database").connect()
const cors = require('cors'); // Import cors

const express = require('express')
const cookieParser=require('cookie-parser')
const app = express()

const allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests and local development when no origin is set.
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error("Not allowed by CORS"))
  },
  credentials: true,
}
// to allow json format data
app.use(cors(corsOptions));
app.use(express.json());
// to get data from forms
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send("<h1>Welcome to Jolt Market</h1> ")
})

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

app.use("/user", require("./Routes/user.routes"))
app.use("/product", require("./Routes/product.routes"))




  module.exports=app