const mongoose = require('mongoose');
/***
 *  Mongodb connection, 
 *  credentials read from the env file
 * **/
const connectDb = async() => {
    try{
        await mongoose.connect( `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
            { useNewUrlParser: true,useUnifiedTopology:true});;
        console.log('Database connected succesfully!')
    }catch(err){
        console.error('DB connection failed!');
        process.exit(0);
    }
}
module.exports = connectDb;