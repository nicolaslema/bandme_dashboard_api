const mongoose = require('mongoose');


const connectDB = () =>{
    try {
        mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      )
      console.log('\x1b[32m%s\x1b[0m', "🚀 ~ file: db.js ~ line 11 ~ connectDB ~ Database connected ")  
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
}


module.exports= {connectDB}