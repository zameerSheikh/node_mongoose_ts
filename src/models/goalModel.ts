import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'GoalUser'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true
});

export const goalModel = mongoose.model('Goal', goalSchema);