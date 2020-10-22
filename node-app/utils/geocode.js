const request = require("postman-request")
const geoCode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoidml2ZWtwYXRlbDAwNyIsImEiOiJja2Q4emIzdngwa3FlMnJrNmhiOHV2ZDliIn0.LvcKztlx1n6VKXgPcshdbw&limit=1"
   request({url,json:true},(error,{body}) => {
       if(error){
           callback("Unable to connect network",undefined)
       }else if (body.features.length === 0){
           callback("Unable to find location.Try other search",undefined)
       }else{
           callback(undefined,{
               latitude:body.features[0].center[0],
               longitude:body.features[0].center[1],
               location:body.features[0].place_name
           })
       }

   }) 
}

module.exports = geoCode