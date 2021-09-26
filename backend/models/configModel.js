import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
    type: { type: String, required: true },
    value: { type: Number, required: true },
    useIt: { type: Boolean, required: true },
    strArr: { type: Array },
});

const Config = mongoose.model('Config', configSchema);
export default Config;