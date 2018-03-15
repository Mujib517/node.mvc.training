const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book.ctrl');


router.get('/', bookCtrl.get);
router.get('/new', bookCtrl.save);
router.post('/new', bookCtrl.saveBook);
router.get('/:id', bookCtrl.getById);
router.post('/delete/:id', bookCtrl.delete);

module.exports = router;