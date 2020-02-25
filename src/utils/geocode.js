//CALLBACK
const request=require('request');
const geocode=(address,callback)=>{
   const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoidWpqd2Fsc2siLCJhIjoiY2s2czFyMmJpMGI0MjNmcGdhd3M3emZ1eSJ9.Ma7_o5mUry8kNZpeQekylw'
   request({url:url,json:true},(error,response)=>{
       if(error){
           callback('Unable to connect to N/W',undefined)
       }else if(response.body.features.length===0){
           callback('Unable to find location',undefined)
       }else{
           callback(undefined,{
              latitude: response.body.features[0].center[0],
              longitude: response.body.features[0].center[1],
              location: response.body.features[0].place_name
           })
       }
   })
}
module.exports=geocode