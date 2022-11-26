const express = require('express')
const router = express.Router()
const path = require('path');

const ProductController = require('../controllers/productController')

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });


router.get('/get',ProductController.index)
router.post('/store',ProductController.store)
router.post('/update/:id',ProductController.update)

module.exports= router