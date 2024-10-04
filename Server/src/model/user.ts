
    import mongoose,{ Document, Schema } from "mongoose";

    interface UserInfo extends Document {
        username : string,
        email : string,
        password : string,
        profilePicture: string
    }

    const userSchema : Schema = new mongoose.Schema({

        username : {
            type:String,
            required: true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        profilePicture : {
            type : String,
            default : 'https://www.iihm.ac.in/wp-content/uploads/2019/01/Mubeena.jpg'
        } 
    },{timestamps:true});

    const User = mongoose.model<UserInfo> ("UserModel" , userSchema);

    export default User;