const TourNews = require('../models/TourNews');

// Hiển thị danh sách tour dưới dạng HTML
exports.getAllTourNewsHTML = async (req, res) => {
  try {
    const news = await TourNews.find();
    res.render('tourNewsList', { news });  // Trả về HTML
  } catch (error) {
    res.status(500).send('Lỗi khi hiển thị danh sách tour');
  }
};

// Hiển thị danh sách tour dưới dạng JSON
exports.getAllTourNewsJSON = async (req, res) => {
  try {
    const news = await TourNews.find();
    res.json(news);  // Trả về JSON
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi hiển thị danh sách tour' });
  }
};

// Render form thêm tour mới
exports.addTourNewsForm = (req, res) => {
  res.render('addTourNews');  // Make sure the view name matches the actual file name
};

// Xử lý thêm tour mới
exports.addTourNews = async (req, res) => {
  const { title, imageUrl, date, price, days } = req.body;
  
  try {
    const newTourNews = new TourNews({ title, imageUrl, date, price, days });
    await newTourNews.save();
    res.redirect('/tour-news');  // Sau khi thêm xong, quay lại danh sách tin tức
  } catch (error) {
    res.status(500).send('Lỗi khi thêm tour');
  }
};

// Hiển thị form chỉnh sửa tour
exports.editTourNewsForm = async (req, res) => {
  try {
    const tourItem = await TourNews.findById(req.params.id);
    if (!tourItem) {
      return res.status(404).send('Không tìm thấy tour');
    }
    res.render('editTourNews', { tourNews: tourItem });  // Render form chỉnh sửa
  } catch (error) {
    res.status(500).send('Lỗi khi tải form chỉnh sửa');
  }
};

// Xử lý cập nhật tour
exports.updateTourNews = async (req, res) => {
  try {
    const { title, imageUrl, date, price, days } = req.body;
    await TourNews.findByIdAndUpdate(req.params.id, { title, imageUrl, date, price, days });
    res.redirect('/tour-news');  // Quay lại danh sách tour sau khi cập nhật
  } catch (error) {
    res.status(500).send('Lỗi khi cập nhật tour');
  }
};

// Xử lý xóa tour
exports.deleteTourNews = async (req, res) => {
  try {
    await TourNews.findByIdAndDelete(req.params.id);
    res.redirect('/tour-news');  // Quay lại danh sách sau khi xóa
  } catch (error) {
    res.status(500).send('Lỗi khi xóa tour');
  }
};
