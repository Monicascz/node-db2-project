// DO YOUR MAGIC
exports.up = function(knex){
    return knex.schema.createTable("cars", table=>{
        table.increments() //primary key, id
        table.text("vin",20).unique().notNullable()
        table.text("make",100).notNullable()
        table.text("model",100).notNullable()
        table.integer("mileage", 999999).notNullable()
        table.text("title", 100)
        table.text("transmission", 100)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars")
}


