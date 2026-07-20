const express = require("express")
const app = express()

//route level
function isLogin(req,res,next) {
    const login = true
    if(!login) return res.send("login require")
    next()
}

function isAdmin(req,res,next) {
    const user = "admin"
    if(user === "client") return res.send("only admin can access")
    next()
}

//app level middleware
app.use(isLogin)

app.get("/",(req,res) => {
    return res.send("<h1>Home page </h1>")
})
app.get("/about",(req,res) => {
    return res.send("<h1>About page </h1>")
})
app.get("/contact",(req,res) => {
    return res.send("<h1>Contact page </h1>")
})
app.get("/service",(req,res) => {
    return res.send("<h1>Service page </h1>")
})

app.get("/admin/dashboard",isAdmin,(req,res) => {
    return res.send("<h1>welcome admin </h1>")
})


app.listen(40,() => console.log("server running on port 40"))