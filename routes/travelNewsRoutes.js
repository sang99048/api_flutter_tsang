const express = require('express');
const router = express.Router();
const travelNewsController = require('../controllers/travelNewsController');

// Middleware kiểm tra đăng nhập, ngoại trừ route /api
router.use((req, res, next) => {
  // Kiểm tra nếu người dùng chưa đăng nhập và truy cập các route không phải /api
  if (!req.session.user && req.path !== '/api') {
    return res.redirect('/login'); // Chuyển hướng về trang login nếu chưa đăng nhập
  }
  next(); // Nếu đã đăng nhập hoặc truy cập /api, tiếp tục với các route tiếp theo
});

// Route cho giao diện HTML
router.get('/', travelNewsController.getAllTravelNewsHTML);

// Route cho API trả về JSON (không yêu cầu đăng nhập)
router.get('/api', travelNewsController.getAllTravelNewsJSON);

// Các route khác cho việc thêm, chỉnh sửa, xóa tin tức (yêu cầu đăng nhập)
router.get('/add', travelNewsController.addTravelNewsForm);
router.post('/add', travelNewsController.addTravelNews);
router.get('/edit/:id', travelNewsController.editTravelNewsForm);
router.post('/edit/:id', travelNewsController.updateTravelNews);
router.post('/delete/:id', travelNewsController.deleteTravelNews);

module.exports = router;
