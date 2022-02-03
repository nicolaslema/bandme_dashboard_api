const mongoose = require('mongoose');


const connectDB = () =>{
    try {
        mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      )
      console.log("🚀 ~ file: db.js ~ line 21 ~ connectDB ~ Database connected ")  
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
}


module.exports= {connectDB}