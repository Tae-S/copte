import express, { response } from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
import cors from 'cors'
import puppeteer from 'puppeteer'


const app = express()

//middlewares and templating 
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.end('Hello Server')
})

app.get('/api/:id',async (req,res)=>{
    const search = req.params.id
    console.log(search)
    
    const url = `https://www.schemecolor.com/${search}.php`
    const broswer = await puppeteer.launch()
    const page = await broswer.newPage()
    page.on('response', async(response)=>{
        console.log(response.url,'url')
    })


    await page.goto(url)
    await broswer.close()
})

/**
 * convert Hope world to https://www.schemecolor.com/hope-world.php hope-world
 */

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})