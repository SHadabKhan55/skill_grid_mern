const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
async function dbcon() {
    try {
        
        await mongoose.connect("mongodb://127.0.0.1:27017/skill_grid")// mongodb url 
        console.log("database connect")
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
        
        const student =  await Student.create(req.body)
        if(!student){
            return res.status(400).json({
                success:false,
                message:"student create failed"
            })

        }
        return res.status(200).json({
            success:true,
            message:"student create success",
            student
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})

app.get("/get-student",async (req,res) => {
    try {
        
        const student =  await Student.find()
        if(!student){
            return res.status(400).json({
                success:false,
                message:"student fetch failed"
            })

        }
        return res.status(200).json({
            success:true,
            message:"student fetch success",
            student
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})

app.delete("/delete-student/:id",async (req,res) => {
    try {
        const {id} = req.params
        const student =  await Student.findByIdAndDelete(id)
        if(!student){
            return res.status(400).json({
                success:false,
                message:"student delete failed"
            })

        }
        return res.status(200).json({
            success:true,
            message:"student delete success"
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})

app.put("/update-student/:id",async (req,res) => {
    try {
        const {id} = req.params
        const student =  await Student.findByIdAndUpdate(id,req.body)
        if(!student){
            return res.status(400).json({
                success:false,
                message:"student update failed"
            })

        }
        return res.status(200).json({
            success:true,
            message:"student update success",
            student
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})



app.listen(30,() => console.log("server run"))