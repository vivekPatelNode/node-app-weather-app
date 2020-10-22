const express = require("express")
const request  = require("postman-request")
const geoCode = require("./utils/geocode")
const foreCast = require("./utils/forecast")
const path = require("path")
const hbs = require("hbs")
const app = express()
const staticPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"./templates/views")
const partialsPath = path.join(__dirname,"./templates/partials")
app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))
app.get("",(req,res) =>{
    res.render("index",{
        title:"Weather",
        name:"vivek patel"
    })
})
app.get("/about",(req,res) =>{
    res.render("about",{
        title:"About",
        name:"vivek patel"
    })
})
app.get("/help",(req,res) =>{
    res.render("help",{
        title:"Help",
        helpText:"This is some helpful text"
    })
})
app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send({
            error
        })
    }
        geoCode(req.query.address,(error,{longitude,latitude,location} = {})=>{
            if(error){
                return res.send({error})
            }
            foreCast(longitude,latitude, (error,{Tampruter,FellLike}) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    location,
                    Tampruter,
                    FellLike
                })
               
              })
        })
    
})

app.get("/help/*",(req,res) => {
    res.send("Help artical not found")
})

app.get("*",(req,res) => {
    res.render("404",{
        title:"404",
        name:"vivek Patel",
        errorMassage:"Page not found"
    })
})

app.listen(3000,()=>{
    console.log("Your port running on 3000");
})