const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    status: {
        type: String
    }
},{timestamps: true})

const Products = mongoose.model('Products',productSchema)
module.exports = Products