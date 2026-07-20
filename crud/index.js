const express = require("express")
const mongoose = require("mongoose")
const app = express()

// mongodb://localhost:27017
app.use(express.json())
async function dbcon(params) {
    try {        
        await mongoose.connect("mongodb://127.0.0.1:27017/skill_grid")
        console.log("db connect successfull")
    } catch (error) {
        console.log(error)
    }    
}

dbcon()


const schema = new mongoose.Schema({
    name:{
        type:String
    },
    course:{
        type:String
    },
    fees:{
        type:Number
    }
})

const Student = mongoose.model("students",schema)


app.post("/create-student",async (req,res) => {
   try {
    
    const student = await Student.create(req.body)
    console.log(student)
    if(!student){
        return res.status(400).json({
            success:false,
            message:"student create failed"
        })
    }

    return res.status(200).json({
        success:true,
        message:"student create success",
        data:student
    })
} catch (error) {
    console.log(error)
       return res.status(500).json({
           success:false,
           message:"internal server error",
           
       })
    
   }
})




app.listen(40,() => console.log("server run"))