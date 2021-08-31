//Dependencies
const Debugger = require("../utils/debugger")
const Puppeteer = require("puppeteer")
const Fs = require("fs")

//Main
async function self(url, result_dir, callback){
    Debugger.debug("INFO", "In scan type: Reconnaissance | Website subdomains")
    const domain = url.split("//")[1]

    var self_data = {
        subdomains: ""
    }

    const browser = await Puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    const page = await browser.newPage()

    await page.goto("https://subdomainfinder.c99.nl/", { waitUntil: "domcontentloaded" }).catch(()=>{
        try{
            Debugger.debug("CRITICAL", "Something went wrong while requesting to the website, please try again later. #Website subdomains")
            Debugger.debug("WARNING", "Aborting... Exiting, please wait.")
            Fs.rmdirSync(result_dir)
            console.clear()
            browser.close()
            process.exit()
        }catch{
            Debugger.debug("CRITICAL", "Something went wrong while requesting to the website, please try again later. #Website subdomains")
            Debugger.debug("WARNING", "Aborting... Exiting, please wait.")
            Fs.rmdirSync(result_dir)
            console.clear()
            process.exit()
        }
    })

    await page.type("#domain", domain)
    await page.click("#privatequery")
    await page.waitForTimeout(1000)
    await page.click("#scan_subdomains")
    await page.waitForSelector("body > div > div.col-md-12 > div:nth-of-type(1) > center > div.row > div > a", { timeout: 10000 }).catch(()=>{
        try{
            browser.close()
            Debugger.debug("WARNING", "Something went wrong, please try again later.")
            Debugger.debug("WARNING", "Skipping, please wait.")
            callback()
            return
        }catch{
            Debugger.debug("WARNING", "Something went wrong, please try again later.")
            Debugger.debug("WARNING", "Skipping, please wait.")
            callback()
            return
        }
    })
    
     try{
        const subdomains = await page.$$eval("td:nth-of-type(2) > a", elems =>{
            return elems.map(elem => elem.getAttribute("href") )
        })

        for( i in subdomains ){
            if(self_data.subdomains.length == 0){
                self_data.subdomains = subdomains[i].replace("//", "")
            }else{
                self_data.subdomains += `\n${subdomains[i].replace("//", "")}`
            }
        }

        await browser.close()
    
        Debugger.debug("INFO", `${self_data.subdomains.split("\n").length} subdomains found.`)
        if(self_data.subdomains.length != 0){
            Fs.writeFile(`${result_dir}/subdomains.txt`, self_data.subdomains, "utf8", function(err){
                Debugger.debug("INFO", `Gathered subdomains has been saved to ${result_dir}/subdomains.txt`)
                callback()
            })
        }else{
            Debugger.debug("WARNING", `No subdomains found.`)
            Debugger.debug("INFO", "Continuing.")
            callback()
        }
    }catch{
        try{
            browser.close()
            Debugger.debug("WARNING", "Something went wrong, please try again later.")
            Debugger.debug("WARNING", "Skipping, please wait.")
            callback()
            return
        }catch{
            Debugger.debug("WARNING", "Something went wrong, please try again later.")
            Debugger.debug("WARNING", "Skipping, please wait.")
            callback()
            return
        }
    }
}

//Exporter
module.exports = {
    self: self
}