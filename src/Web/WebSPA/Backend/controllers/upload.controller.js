const config = require('config');

const UploadModel = require('./../models/upload.model');

const insertFile = (req, res) => {    
    let userId = req.body.userId;
    let listFile = req.body.listFile;
    if (userId) {
        UploadModel.insertFile(userId, listFile).then(data => {
            if (data) {
                res.json({
                    status: config.get('SUCCESS_STATUS'),
                })
            } else {
                res.json({
                    status: config.get('ERROR_STATUS'),
                    message: "Something went wrong"
                })
            }
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
            message: "UserId is requirred"
        })
    }
}

const deleteFile = (req, res) => {    
    let userId = req.body.userId;
    let listFile = req.body.listFile;
    if (userId) {
        UploadModel.deleteFile(userId, listFile).then(data => {
            if (data) {
                res.json({
                    status: config.get('SUCCESS_STATUS'),
                })
            } else {
                res.json({
                    status: config.get('ERROR_STATUS'),
                    message: "Something went wrong"
                })
            }
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
            message: "UserId is requirred"
        })
    }
}

const getListFileByUserId = (req, res) => {
    let userId = req.params.userId;
    if (userId) {
        UploadModel.getListFileByUserId(userId).then(data => {
            if (data) {
                res.json({
                    status: config.get('SUCCESS_STATUS'),
                    data: data
                })
            } else {
                res.json({
                    status: config.get('ERROR_STATUS'),
                    message: "Something went wrong"
                })
            }
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
            message: "UserId is requirred"
        })
    }
}

const insertBucket = (req, res) => {    
    let userId = req.body.userId;
    let bucket = req.body.bucket;
    if (userId) {
        UploadModel.insertBucket(userId, bucket).then(data => {
            if (data) {
                res.json({
                    status: config.get('SUCCESS_STATUS'),
                    data: data
                })
            } else {
                res.json({
                    status: config.get('ERROR_STATUS'),
                    message: "Something went wrong"
                })
            }
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
            message: "UserId is requirred"
        })
    }
}

const getBucketById = (req, res) => {
    let bucketId = req.params.bucketId;
    if (bucketId) {
        UploadModel.getBucketById(bucketId).then(data => {
            if (data) {
                res.json({
                    status: config.get('SUCCESS_STATUS'),
                    data: data
                })
            } else {
                res.json({
                    status: config.get('ERROR_STATUS'),
                    message: "Something went wrong"
                })
            }
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
            message: "BucketId is requirred"
        })
    }
}

module.exports = {
    insertFile,
    getListFileByUserId,
    deleteFile,
    insertBucket,
    getBucketById
}