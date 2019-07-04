const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    orderId: {
        type: Number,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
}, {timestamps: true});

const themeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    courses: [courseSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Theme", themeSchema);
