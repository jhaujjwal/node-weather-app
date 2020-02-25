const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//console.log(__dirname)
//console.log(path.join(__dirname,"../public"))
//console.log(__filename)

//Define Path for Express config
const publicDirectoryPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const app=express()

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')

//Registering Partials
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        author:'Ujjwal'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        author: 'Ujjwal'
    })
})
// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Ujjwal',
//         age:25
//     }) 
// })
// app.get('/about',(req,res)=>{
//     res.send('This is aabout page...!')
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:location,
                //location
                address:req.query.address
            })
        })
    })

    // res.send('Fantastic Weather...!')
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})

//help
//about
//weather