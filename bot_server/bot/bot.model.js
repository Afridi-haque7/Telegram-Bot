import {Schema} from 'mongoose';

const bot = new Schema({
    token: {
        type: 'string',
    }
});

const Bot = mongoose.model('Bot', bot);
export default Bot;