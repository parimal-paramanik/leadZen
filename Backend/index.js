const express= require("express")
const app = express()
const Port= 4000
const {Router} =require("./Routes/routes")

app.get("/",(req,res)=>{
     res.send("everything is fine")
})

app.use("/address", Router)
// https://jsonplaceholder.typicode.com/users
app.listen(Port,()=>{
    console.log(`server is listen at port ${Port}`)
})