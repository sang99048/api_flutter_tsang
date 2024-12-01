// /server.js
require('dotenv').config(); // Đọc các biến môi trường từ file .env
const session = require('express-session');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRouters'); // Import các route đăng nhập
const travelNewsRoutes = require('./routes/travelNewsRoutes'); // Import route tin tức du lịch
const tourNewsRoutes = require('./routes/tourNewsRoutes'); // Import route tin tức tour
const notificationRoutes = require('./routes/notificationRoutes'); // Import route thông báo

const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình EJS làm view engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Chỉ định thư mục chứa các view (mặc định là ./views)

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình Express để phục vụ hình ảnh từ thư mục assets
app.use('/assets', express.static('assets')); // Dòng này sẽ phục vụ hình ảnh từ thư mục assets

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));  // For form submissions
app.use(express.json());  // For JSON requests

// Middleware cho session
app.use(session({
  secret: process.env.SECRET_KEY, // Dùng secret key từ .env
  resave: false,
  saveUninitialized: true,
}));


// Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Sử dụng các route đã tách ra
app.use('/', authRoutes); // Route cho đăng nhập và quản lý admin
app.use('/travel-news', travelNewsRoutes); // Route cho travel-news
app.use('/tour-news', tourNewsRoutes); // Route cho tour-news
app.use('/thongbao', notificationRoutes); // Route cho thongbao
app.use('/users', authRoutes); // Route cho users

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
