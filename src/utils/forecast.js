const request =require('request')
const forecast=(longitude,latitude,calllback)=>{
const url='https://api.darksky.net/forecast/808557ade189b32843858c45b340c515/'+ longitude + ',' + latitude
request({url:url,json:true},(error,response)=>{
    if(error){
        calllback('Unable to connect to N/W',undefined)
    }else if(response.body.error){
        calllback('Unable to find Location',undefined)
    }else{
      calllback(undefined,
        `${response.body.daily.data[0].summary} It is currently  ${response.body.currently.temperature} degree out. There is a ${response.body.currently.precipProbability}% chance of rain`)  
    }
})
}
module.exports=forecast
