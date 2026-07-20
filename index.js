const http = require("http")

const server = http.createServer((req,res) => {
        if(req.url === "/"){

            res.end("home page")
        }
        else if(req.url === "/about"){

            res.end("about page")
        }
        else if(req.url === "/contact"){

            res.end("contact page")
        }else{
            res.end("page not found 404")

        }
})

server.listen(600,() => console.log("server is running on 600 port"))