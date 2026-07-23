const express = require("express")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const app = express()
const imagePath = path.join(__dirname,"./uploads/images")
// console.log("current dir: ",imagePath)
const storage = multer.diskStorage({

    destination:(req,file,next) => {
        if(!fs.existsSync(imagePath)){
            fs.mkdirSync(imagePath,{recursive:true})
        }   
        return next(null,imagePath)
    },
    filename:(req,file,next) => {
        return next(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

app.post("/create-student",upload.single("profile"),(req,res) => {
    try {
        return res.status(200).json({
            success:true,
            message:"file upload successfull"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        
    }
})

app.listen(40,() => console.log("server start"))