const express = require('express');
const router = express.Router();
const tourNewsController = require('../controllers/tourNewsController');

// Hiển thị danh sách tour (HTML)
router.get('/', tourNewsController.getAllTourNewsHTML);

// Hiển thị danh sách tour (JSON)
router.get('/api', tourNewsController.getAllTourNewsJSON);

// Hiển thị form thêm tour mới
router.get('/add', tourNewsController.addTourNewsForm);

// Xử lý thêm tour mới
router.post('/add', tourNewsController.addTourNews);

// Hiển thị form chỉnh sửa tour
router.get('/edit/:id', tourNewsController.editTourNewsForm);

// Xử lý cập nhật tour
router.post('/edit/:id', tourNewsController.updateTourNews);

// Xử lý xóa tour
router.get('/delete/:id', tourNewsController.deleteTourNews);

module.exports = router;
