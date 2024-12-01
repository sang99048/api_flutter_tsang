const Thongbao = require('../models/thongbao');

// Hiển thị danh sách thông báo dưới dạng HTML
exports.getAllThongbaosHTML = async (req, res) => {
  try {
    const thongbaos = await Thongbao.find();
    res.render('thongbaoList', { thongbaos });
  } catch (error) {
    res.status(500).send('Lỗi khi hiển thị thông báo');
  }
};

// Hiển thị danh sách thông báo dưới dạng JSON
exports.getAllThongbaosJSON = async (req, res) => {
  try {
    const thongbaos = await Thongbao.find();
    res.json(thongbaos);  // Trả về dữ liệu dưới dạng JSON
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi hiển thị thông báo' });
  }
};

// Hiển thị form thêm thông báo
exports.addThongbaoForm = (req, res) => {
  res.render('addThongbao');
};

// Thêm thông báo
exports.addThongbao = async (req, res) => {
  const { tieude, title, date } = req.body;
  const image = req.file ? req.file.path : null; // Lấy đường dẫn hình ảnh nếu có

  try {
    const newThongbao = new Thongbao({ tieude, title, date, image });
    await newThongbao.save();
    res.redirect('/thongbao');
  } catch (error) {
    res.status(500).send('Lỗi khi thêm thông báo');
  }
};

// Hiển thị form chỉnh sửa thông báo
exports.editThongbaoForm = async (req, res) => {
  try {
    const thongbaoItem = await Thongbao.findById(req.params.id);
    if (!thongbaoItem) {
      return res.status(404).send('Không tìm thấy thông báo');
    }
    res.render('editThongbao', { thongbao: thongbaoItem });
  } catch (error) {
    res.status(500).send('Lỗi khi tải form chỉnh sửa');
  }
};

// Cập nhật thông báo
exports.updateThongbao = async (req, res) => {
  const { tieude, title, date } = req.body;
  const image = req.file ? req.file.path : null; // Lấy đường dẫn hình ảnh nếu có

  try {
    const updateData = { tieude, title, date };
    if (image) updateData.image = image; // Cập nhật trường hình ảnh nếu có

    await Thongbao.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/thongbao');
  } catch (error) {
    res.status(500).send('Lỗi khi cập nhật thông báo');
  }
};

// Xóa thông báo
exports.deleteThongbao = async (req, res) => {
  try {
    await Thongbao.findByIdAndDelete(req.params.id);
    res.redirect('/thongbao');
  } catch (error) {
    res.status(500).send('Lỗi khi xóa thông báo');
  }
};
