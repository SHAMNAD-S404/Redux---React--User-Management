    import mongoose from "mongoose";
    import dotenv from 'dotenv'
    dotenv.config()

    const ConnectDB = async ()=>{
        try {

             mongoose.connect(`${process.env.MONGODB}`)
            .then(() => console.log(`Connected to mongodb`))
            .catch((err) => console.log(err) )
            
        } catch (error) {
            console.error(error);
            
        }
    }

    export default ConnectDB;