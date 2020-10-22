const request = require("postman-request")
const forecast = (longitude,latitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=151f4d917c53c10c5e1ee4db4fe242a1&query="+longitude+","+latitude+"&units=m"
    request({url,json:true},(error,{body}) => {
        if(error){
            callback("Unable to connect network",undefined)
        }else if(body.message){
            callback("Unable to find location.Please try other location",undefined)
        } else{
            callback(undefined,{
                Location:body.location.region,
                Tampruter:body.current.temperature,
                FellLike:body.current.feelslike
            })
        }
    })
}

module.exports = forecast