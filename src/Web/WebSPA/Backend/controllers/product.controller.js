const config = require('config');

const ProductModel = require('./../models/product.model');

const insert = (req, res) => {
    let name = req.body.name;
    if (name) {
        ProductModel.insert(name).then(data => {
            res.json({
                status: config.get('SUCCESS_STATUS'),
            })
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
        })
    }
}

module.exports = {
    insert
}