import mongoose,{Schema} from 'mongoose';

const user_schema = new Schema({
    name : {
        type : String,
        required : true,
    },
    chatId: {
        type: Number,
        required : true,
    },
    status: {
        type: Boolean,
        default : true,
    }
});

const User = mongoose.model('User',user_schema);
export default User;