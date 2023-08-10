const express = require("express")
const cors = require('cors');
const { notFound , errorHandler} = require("./middleware/errorMiddleware")


const dotenv = require("dotenv")
const connectMongoDb = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes=require("./routes/messageRoutes")
const color=require("colors");
const path = require("path");
dotenv.config()
connectMongoDb()
const app = express()
app.use(cors());
//app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json())
app.get("/", (req,res) => {
   res.send("Api is running ") 
})



app.use('/api/user', userRoutes)

app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)
app.use(notFound)
app.use(errorHandler)



const __dirname2 = path.resolve()

if (process.env.NODE_ENV === "production") {
   
app.use(express.static(path.join(__dirname2,"/frontend/build")))
 app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname2, "frontend", "build", "index.html"))
  );
} else {
   app.get("/", (req, res) => {
      console.log("Api is running ");
   })
}


const PORT=process.env.PORT || 5000
   const server=app.listen(5000,console.log(`server is running on port ${PORT}`.yellow.bold))
const io = require("socket.io")(server, {
   pingTimeout: 60000
,   cors:'http://localhost:3000'
})
io.on("connection", (socket) => {
   

   socket.on('setup', (userData) => {
      socket.join(userData._id)
      console.log(userData._id);
      socket.emit('connected')
})


   socket.on("join chat", (room) => {
   
      socket.join(room)

})
socket.on("typing",(room)=>socket.in(room).emit("typing"))
  socket.on("stop typing",(room)=>socket.in(room).emit("stop typing")) 
   
     socket.on("new message", (newMessageRecieved) => {
    
        var chat = newMessageRecieved.chat
        if (!chat.users) return console.log(
           " chat .users not define"
        );
chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
   

}) 
   
   
   socket.off("setup", () => {
      socket.leave(userData._id)
   })
})