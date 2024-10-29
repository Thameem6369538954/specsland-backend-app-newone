const mongoose = require('mongoose');

const CreateproductSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mineImage: {
        type: String,
        required: true
    },
    subImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Createproduct', CreateproductSchema)