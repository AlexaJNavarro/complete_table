const express = require("express")
const route = express.Router()
const controller = require("../controller/data")

route
    .get("/data/:ID", controller.getAll)
    .post("/data", controller.create)
    .put("/data/:ID", controller.update)

module.exports = route