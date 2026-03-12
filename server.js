require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")
const bookRoutes = require("./routes/bookRoutes")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api", bookRoutes)

const PORT = process.env.PORT || 5000
app.get("/", (req, res) => {
  res.send("Library Management API Running ")
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})