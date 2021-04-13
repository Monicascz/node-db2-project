const Cars = require('./cars-model.js')
const db = require('../../data/db-config.js')

var vinValidator = require('vin-validator');
// var isValidVin = vinValidator.validate('11111111111111111'); // true

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const car = await Cars.getById(req.params.id)
      if(!car){
        res.status(404).json({message: `car with id ${req.params.id} is not found`})
      }else{
        next()
      }
  }catch(err){
    next(err)
  }

}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const error = {status: 400}
  // const car = req.body
  const {vin, make, model, mileage,} = req.body
  if (!vin){
    error.message=`vin is missing`
  }else if (!make){
    error.message=`make is missing`
  }else if (!model){
    error.message=`model is missing`
  }else if (!mileage){
    error.message=`mileage is missing`
  }
  //if (!car){
    //error.message=`${car} is missing`
  //}
  
  if(error.message){
    next(error)
  }else{
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin} = req.body
  if(!vinValidator.validate(vin)){
    res.status(400).json({message:`vin ${vin} is invalid`})
  }else{
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const {vin} = req.body
  //filter all data for vin if array comes back with more than 1, reject, if only one next
  try{
    const existingVin = await db("cars").where('vin', vin)
    if(existingVin){
      res.status(400).json({message: `vin ${vin} already exists` })
    }
    else{
      next()
    }
  }catch(err){
    next(err)
  }
}

module.exports={
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}