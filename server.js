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
    res.render('index.ejs')
})

app.get('/api/:id',async (req,res)=>{
    const search = req.params.id
    console.log(search)
    
    const url = `https://www.schemecolor.com/${search}.php`
    const broswer = await puppeteer.launch()
    const page = await broswer.newPage()
    // page.on('response', async(response)=>{
        
    // })


    await page.goto(url)
    // page.waitForSelector('li')
    // const textContent = await page.evaluate(() => {
    //     return document.querySelectorAll('li');
    // })
    // console.log(textContent)
    // for(let i=0; i<textContent.length; i++){
    //     console.log(textContent[i].textContent)
    // }
    // let list = await page.$$('.capi')
    // let list = await page.$$eval('.capi', li => li.textContent)
    // for(let i=0; i<list.length; i++){
    //     console.log(list[i].jsonValue())
    // }
    // await page.evaluate(() => 
    //    Array.from(document.querySelectorAll('.capi'), 
    //    e =>console.log(e.textContent)));
    // await broswer.close()
    const hexCodes = await page.evaluate(_ => {
        return Array.from(document.querySelectorAll('.capi'),span=>span.textContent)
    })
    const nameEx = /Name: ?/g
    console.log(hexCodes)
    let reg = await page.evaluate(_=>{
        return Array.from(document.querySelectorAll('li'),li=>{
            const t = li.textContent
            if(t.match(/Name: ?/g)) return t
            
        })
    })
    reg = reg.filter(r=>r!=null)
    console.log(reg)
    // console.log(reg)
    const palette = []
    for(let i=0; i<reg.length; i++){
        palette.push({name: reg[i], hexCode:hexCodes[i]})
    }
    console.log(palette)
    res.end(JSON.stringify(palette))
})

/**
 * convert Hope world to https://www.schemecolor.com/hope-world.php hope-world
 */

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})