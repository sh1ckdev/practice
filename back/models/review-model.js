
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    id: {type: String},
    username: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
