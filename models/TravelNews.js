const mongoose = require('mongoose');

const travelNewsSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true }, // hoặc có thể sử dụng Date type
});

const TravelNews1 = mongoose.model('TravelNews', travelNewsSchema);

module.exports = TravelNews1;
