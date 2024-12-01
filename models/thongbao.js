const mongoose = require('mongoose');

const travelNewsSchema1 = new mongoose.Schema({
  tieude: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true }, // Thay đổi kiểu thành Date
  image: { type: String, required: false }, // Thêm trường hình ảnh
});

// Tạo model với schema
const TravelNews1 = mongoose.model('Thongbao', travelNewsSchema1);

// Export model
module.exports = TravelNews1;
