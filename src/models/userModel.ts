import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password'], 
        }
}, {
    timestamps: true
});

// A new collection will be added to database with name goalusers(lowercase plural) as soon as we perform some queries on the model like
// userModel.find() etc
export const userModel = mongoose.model('GoalUser', userSchema);