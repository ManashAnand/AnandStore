import mongoose from "mongoose"

let isConnected = false

export const connectDB = async () => {
    try {
        if(process.env.MONGO_URI == undefined){
            console.log("undefined mongodb string")
            return
        }

        if(isConnected){
            console.log("Using connected DB");
            return
        }
        // console.log(process.env.MONGO_URI)
        
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true
        console.log("Connected to DB")
        
    } catch (error) {
        console.log(error);
        isConnected = false
    }

}