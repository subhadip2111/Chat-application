const mongoose = require("mongoose")


const connectMongoDb = async () => {
    

    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
          
           useNewUrlParser: true,
      useUnifiedTopology: true,
    
        })

        console.log(`MongoDB Connected `.cyan.underline)
    } catch (err) {
       console.log(`Error is ${err.message}`.red.bold); 
   process.exit()
   
    }


}

module.exports=connectMongoDb