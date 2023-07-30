const express = require("express")
const cors = require('cors');
const { notFound , errorHandler} = require("./middleware/errorMiddleware")


const dotenv = require("dotenv")
const connectMongoDb = require("./config/db")
const userRoutes=require("./routes/userRoutes")
const color=require("colors")
dotenv.config()
connectMongoDb()
const app = express()
app.use(cors());
//app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json())
app.get("/", (req,res) => {
   res.send("Api is running ") 
})



app.use('/api/user',userRoutes)
app.use(notFound)
app.use(errorHandler)


const PORT=process.env.PORT || 5000
app.listen(5000,console.log(`server is running on port ${PORT}`.yellow.bold))
