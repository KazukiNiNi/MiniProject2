const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
roomName:{
    type: String,
    required: true, 
    max: 150,
    min: 6
},
roomPic:{
    type: String, 
    required: true, 
    max: 350, 
    min: 6
},
roomLimit:{
    type: Number, 
    required: true, 
    max: 50, 
    min: 1
},
roomPrice:{
    type: Number, 
    required: true, 
    max: 50000, 
    min: 1
},
date:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Room', roomSchema);
