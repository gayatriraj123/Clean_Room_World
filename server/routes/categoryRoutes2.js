const express = require('express');
const multer = require('multer'); // For file upload handling
const path = require('path');
const { addCategory, getCategories, getCategoryById, deleteCategory, updatedCategory  } = require('../controllers/categoryController');
const { route } = require('./consumerRoutes');

const router = express.Router();

// Set up multer storage for file uploads (if you want to handle images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name conflicts
  },
});
const upload = multer({ storage });

// Route to add a category (with file upload handling)
router.post('/add', upload.single('image'), addCategory);

// Route to get all categories
router.get('/get', getCategories);

router.get('/:id', getCategoryById);

// Delete category by id
router.delete('/delete/:id', deleteCategory);

router.put('/update/:id', updatedCategory )

module.exports = router;
