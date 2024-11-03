const mongoose = require('mongoose');

const CreateproductSchema =  new mongoose.Schema({
    name: {
        type: String,
        
    },
    price: {
        type: Number,
        
    },
    description: {
        type: String,
        
    },
    mineImage: {
        type: String,
        
    },
    subImage: {
        type: String,
        
    },
    category: {
        type: String,
        
    }
});

module.exports = mongoose.model('Createproduct', CreateproductSchema)