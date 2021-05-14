const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  device: {
    type: String,
    required: true,
    max: 2050,
  },
  os: {
    type: String,
    required: true,
    max: 2050,
  },
  manufacturer: {
    type: String,
    required: true,
    max: 1050,
  },
  lastCheckedOutDate: {
    type: Date,
    default: Date.now,
  },
  lastCheckedOutBy: {
    type: String,
    required: true,
    max: 1050,
  },
  isCheckedOut: {
    type: Boolean,
    default: false,
  },
});

const deviceModel = mongoose.model('Devicess', deviceSchema);
module.exports = deviceModel;

/**
 * "id":3, 
"device":"MotoG", 
"os":"Android4.3", 
"manufacturer":"Motorola", 
"lastCheckedOutDate":"2016-02-21T09:10:00-05:00", 
"lastCheckedOutBy":"ChrisEvans", 
"isCheckedOut":false 
 */
