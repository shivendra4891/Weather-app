const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCodeUtil = require('./w-utils')
const request = require('request')

const app = express();
const port = process.env.PORT || 3000

const pathDirectory = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')
console.log(viewPath)
// handle bar engine and commands
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// set up express directory 
app.use(express.static(pathDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        author:'Shiv'
    });
})


app.get('/about',(req,res)=>{
    res.render('about',{
        pageFrom:'i am from about page',
        title:'about page kp',
        author:'Shivendra'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        author:'Shivendra'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'Please provide the address for knowing the weather'
        })
    }
    const address = req.query.address
    geoCodeUtil.getGeoCode(address, (error,{longitute, latitute} ={}) =>{
        if(error){
            return console.log('Please provide the valid location')
        }
        console.log('longitute'+ longitute)
        console.log('latitute'+ latitute)
        
        geoCodeUtil.forecast(longitute , latitute, (error, data)=>{
            console.log('data==='+ data)
            res.send({
                forecast:data.current.weather_descriptions.join(','),
                temperature:data.current.temperature,
                address: req.query.address
            })

        } )

    })
   

    
})

app.get('/product', (req, res)=>{
    if(!req.query.search) {
        return res.send({
            error:'Please provide the serach value'
        })
    }

    res.send({
        product:[]
    })
})
app.get('*',(req, res)=>{
    res.render('error',{
        errorMessage:'404: Page not found',
        title:'error page',
        author:'Shivendra Kishore'
    })
})

app.get('help/*', (req,res)=>{
    res.render('error',{
        errorMessage:'404: Help page content not found',
        title:'error page',
        author:'Shivendra Kishore'
    })
})

app.listen(port,()=>{
    console.log('Server is running...')
})