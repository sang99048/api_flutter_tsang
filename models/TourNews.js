const mongoose = require('mongoose');

// Định nghĩa schema cho TourNews
const tourNewsSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true }, // Có thể sử dụng Date type nếu bạn muốn lưu trữ ngày tháng
  price: { type: String, required: true }, // Giá tour
  days: { type: String, required: true }, // Số ngày của tour
});

// Tạo model cho TourNews
const TourNews = mongoose.model('TourNews', tourNewsSchema);

// Xuất model để sử dụng ở các module khác
module.exports = TourNews;
