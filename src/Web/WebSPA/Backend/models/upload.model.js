const ObjectID = require('mongodb').ObjectID;

const connection = require('./connection');

const insertFile = (userId, list) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('upload').findOne({
                userId: userId,
            }, (err, exist) => {
                if (!exist) {
                    db.collection('upload').insert({
                        userId: userId,
                        listFile: list
                    }, (err, data) => {
                        db.close();
                        resolve(err ? false : true);
                    })
                } else {
                    db.collection('upload').findOneAndUpdate({
                        userId: userId,
                    }, {
                        $push: {
                            listFile: {
                               $each: list,
                            }
                        }
                    }, (err, data) => {
                        db.close();                        
                        resolve(err ? false : true);
                    })
                }
            })
        })
    })
}

const deleteFile = (userId, list) => {
    return new Promise((resolve, reject) => {
        connection(db => {            
            db.collection('upload').findOneAndUpdate({
                userId: userId,
            }, {
                $pull: {
                    listFile: {
                            fileId: {$in:list} } } },
                { multi: true }
            , (err, data) => {
                db.close();                        
                resolve(err ? false : true);
            })
        })
    })
}

const getListFileByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('upload').findOne({
                userId: userId,
            }, (err, data) => {
                db.close();
                resolve(err ? false : data);
            })
        })
    })
}

module.exports = {
    insertFile,
    getListFileByUserId,
    deleteFile
}