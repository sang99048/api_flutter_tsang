const express = require('express');
const multer = require('multer');
const thongbaoController = require('../controllers/thongbaoController');
const upload = multer({ dest: 'uploads/' });  // Cấu hình thư mục lưu trữ tệp tải lên

const router = express.Router();

// Hiển thị danh sách thông báo dưới dạng HTML
router.get('/', thongbaoController.getAllThongbaosHTML);

// Hiển thị danh sách thông báo dưới dạng JSON
router.get('/api', thongbaoController.getAllThongbaosJSON);

// Các route khác (add, edit, update, delete) không thay đổi...
router.get('/add', thongbaoController.addThongbaoForm);
router.post('/add', upload.single('image'), thongbaoController.addThongbao);
router.get('/edit/:id', thongbaoController.editThongbaoForm);
router.post('/edit/:id', upload.single('image'), thongbaoController.updateThongbao);
router.get('/delete/:id', thongbaoController.deleteThongbao);

module.exports = router;
