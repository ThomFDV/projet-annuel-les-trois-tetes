const mongoose = require('mongoose');

const userThemeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    themeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    orderId: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("userTheme", userThemeSchema);
