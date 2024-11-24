import {Schema} from 'mongoose';
import mongoose from 'mongoose';


const bot = new Schema({
    token: {
        type: String,
        required: true,
    }
});


const Bot = mongoose.model('Bot', bot);
export default Bot;