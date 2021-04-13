// DO YOUR MAGIC
const express = require("express")
const router = express.Router()
const mw = require('./cars-middleware.js')

const Cars = require('./cars-model.js')

router.get('/', async(req, res, next)=>{
    try{
        const data = await Cars.getAll()
        res.json(data)
    }catch(err){
        next(err)
    }
})

router.get('/:id', mw.checkCarId, async (req, res, next)=>{
    try{
        const data = await Cars.getById(req.params.id)
        res.json(data)
    }catch(err){
        next(err)
    }
})

// router.post('/')

router.use((err,req,res, next)=>{
    res.status(err.status || 500).json({
        message: err.message,
    })
})

module.exports = router;