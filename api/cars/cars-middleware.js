const Cars = require('./cars-model.js')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const carExists = await Cars.getById(req.params.id)
      if(!carExists){
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
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports={
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}