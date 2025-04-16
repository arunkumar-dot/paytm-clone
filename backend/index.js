const express = require("express");

const cors = require("cors")

const mainRouter = require("./routes/index")

const app = express()

app.use(cors())

app.use(express.json()) // body parser

app.use("/api/v1",mainRouter)

app.get("/",(req,res) => {
    res.json({
        message : "Yellow"
    })
})

app.listen(3000, () => {
    console.log("listening at port 3000")
})

