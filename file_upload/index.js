//third party modules
const express = require("express")
const multer = require("multer")
//built-in modules
const fs = require("fs")
const path = require("path")
const app = express()

const imagePath = path.join(__dirname,"./uploads/images")
// console.log("directory: ",__dirname)
// console.log("new location: ",imagePath)

const storage = multer.diskStorage({
    destination:(req,file,next) => {
        if(!fs.existsSync(imagePath)){
            fs.mkdirSync(imagePath,{recursive:true})
        }
        return next(null,imagePath)
    },
    filename:(req,file,next) => {
        const allow = [".png",".jpg",".jpeg",".gif"]
        const ext = path.extname(file.originalname)
        if(!allow.includes(ext)){
            return next(new Error(`${ext} are not allow  Only these extension are allow ${allow.join(" ")}`))

        }
        return next(null,`${Date.now()}_${file.originalname}`)
    },

})

const upload = multer({storage})
app.post("/create",upload.single("profile"),(req,res) => {
    try {
        return res.status(200).json({
            success:true,
            message:"file upload successfull"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        
    }
})


app.listen(80,() => console.log("server run on 80 port"))

