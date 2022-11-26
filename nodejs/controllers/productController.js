const Products = require('../models/productsModel')

const index = (req,res,next) =>{

    if(req.query.status){
        Products.aggregate([
            {$match: {status: req.query.status}}
        ])
        .then(response =>{
            res.json({
                response
            })
        })
        .catch(error =>{
            res.json({
                message: error
            })
        })
    }
    else if(req.query.category && !req.query.price){
        Products.aggregate([
            {$match: {category: req.query.category}}
        ])
        .then(response =>{
            res.json({
                response
            })
        })
        .catch(error =>{
            res.json({
                message: error
            })
        })
    }
    else if(req.query.category && req.query.price){
        var number=req.query.price;
        var match1= {$match: {category: req.query.category}}
        var match2={$match: { price: { $lt: parseInt(number) }  } }
        console.log("number is:"+JSON.stringify(match2));
        Products.aggregate([
            match1,
            match2
        ])
        .then(response =>{
            res.json({
                response
            })
        })
        .catch(error =>{
            res.json({
                message: error
            })
        })
    }
    else{
        Products.find()
            .then(response =>{
                res.json({
                    response
                })
            })
            .catch(error =>{
                res.json({
                    message: error
                })
            })
    }
}

const store = (req,res,next)=>{
    let product = new Products({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        status: req.body.status
    })
    product.save()
        .then(response =>{
            res.json({
                 response
            })
        })
        .catch(error =>{
            res.json({
                message: error
            })
        })
}

const update = (req,res,next) =>{
    let id=req.params.id
    console.log('the id is: '+id);
    let updateData={
        status: req.body.status
    }
    Products.findByIdAndUpdate(id,{$set: updateData})
        .then((resp)=>{
            res.json({
                resp
            })
        })
        .catch(error=>{
            res.json({
                message: error
            })
        })
}


module.exports = {
    index,store,update
}