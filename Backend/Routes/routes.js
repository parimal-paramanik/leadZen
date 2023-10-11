const express= require("express")
const { getAllAddress } = require("../Controller/controller")

const Router= express.Router()

Router.get("/users",getAllAddress)
module.exports = {Router}
