const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: 
        { 
            type: String, 
            required: true 
        },
    age: Number,
    favoriteFoods: [String]
});

module.exports = mongoose.model('Person', personSchema);