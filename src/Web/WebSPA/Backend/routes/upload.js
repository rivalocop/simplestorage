const express = require('express');
const router = express.Router();

const UploadController = require('./../controllers/upload.controller');

router.post('/insertFile', UploadController.insertFile);
router.post('/deleteFile', UploadController.deleteFile);
router.get('/getListFileByUserId/:userId', UploadController.getListFileByUserId);


module.exports = router;