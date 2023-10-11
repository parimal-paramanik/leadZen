const express= require("express")
const app = express()
const Port= 8080
const {Router} =require("./Routes/routes")
const cors= require("cors")

app.use(cors())

app.get("/",(req,res)=>{
     res.send("everything is fine")
})

app.use("/address", Router)
// https://jsonplaceholder.typicode.com/users
app.listen(Port,()=>{
    console.log(`server is listen at port ${Port}`)
})