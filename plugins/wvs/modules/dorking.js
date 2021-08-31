//Dependencies
const Debugger = require("../utils/debugger")
const Puppeteer = require("puppeteer")
const Fs = require("fs")

//Main
async function self(url, result_dir, callback){
    Debugger.debug("INFO", "In scan type: Reconnaissance | Website sensitive stuff dorking")
    const domain = url.split("//")[1]

    var self_data = {
        dork_payloads: ""
    }

    const browser = await Puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    const page = await browser.newPage()

    Debugger.debug("INFO", "Checking if the website exposed some of It's sensitive directories.")
    Exposed_Directories()
    async function Exposed_Directories(){
        await page.goto(`https://www.bing.com/search?q=site:${domain} intitle:index.of`, { waitUntil: "domcontentloaded" })

        const page_content = await page.content()

        if(page_content.indexOf("no results") == -1){
            if(self_data.dork_payloads.length == 0){
                self_data.dork_payloads = `Sensitive directories - site:${domain} intitle:index.of`
            }else{
                self_data.dork_payloads += `\nSensitive directories - site:${domain} intitle:index.of`
            }

            Debugger.debug("INFO", "Exposed sensitive directories found.")
        }else{
            Debugger.debug("INFO", "No exposed sensitive directories found.")
        }

        Debugger.debug("INFO", "Checking if the website exposed some of It's sensitive configuration files.")
        Exposed_ConfigFiles()
    }

    async function Exposed_ConfigFiles(){
        await page.goto(`https://www.bing.com/search?q=site:${domain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini`, { waitUntil: "domcontentloaded" })

        const page_content = await page.content()

        if(page_content.indexOf("no results") == -1){
            if(self_data.dork_payloads.length == 0){
                self_data.dork_payloads = `Sensitive config files - site:${domain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini`
            }else{
                self_data.dork_payloads += `\nSensitive config files - site:${domain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini`
            }

            Debugger.debug("INFO", "Exposed sensitive config files found.")
        }else{
            Debugger.debug("INFO", "No exposed sensitive config files found.")
        }

        Debugger.debug("INFO", "Checking if the website exposed some of It's sensitive databases files.")
        Exposed_Databases()
    }

    async function Exposed_Databases(){
        await page.goto(`https://www.bing.com/search?q=site:${domain} ext:sql | ext:dbf | ext:mdb`, { waitUntil: "domcontentloaded" })

        const page_content = await page.content()

        if(page_content.indexOf("no results") == -1){
            if(self_data.dork_payloads.length == 0){
                self_data.dork_payloads = `Sensitive databases files - site:${domain} ext:sql | ext:dbf | ext:mdb`
            }else{
                self_data.dork_payloads += `\nSensitive databases files - site:${domain} ext:sql | ext:dbf | ext:mdb`
            }

            Debugger.debug("INFO", "Exposed databases files found.")
        }else{
            Debugger.debug("INFO", "No exposed databases files found.")
        }

        Debugger.debug("INFO", "Checking if the website exposed some of It's sensitive log files.")
        Exposed_Log_Files()
    }

    async function Exposed_Log_Files(){
        await page.goto(`https://www.bing.com/search?q=site:${domain} ext:log`, { waitUntil: "domcontentloaded" })

        const page_content = await page.content()

        if(page_content.indexOf("no results") == -1){
            if(self_data.dork_payloads.length == 0){
                self_data.dork_payloads = `Sensitive log files - site:${domain} ext:log`
            }else{
                self_data.dork_payloads += `\nSensitive log files - site${domain} ext:log`
            }

            Debugger.debug("INFO", "Exposed log files found.")
        }else{
            Debugger.debug("INFO", "No exposed log files found.")
        }

        if(self_data.dork_payloads.length != 0){
            await browser.close()
            
            Fs.writeFile(`${result_dir}/google_dorking.txt`, self_data.dork_payloads, "utf8", function(err){
                Debugger.debug("INFO", `Website google dorking results has been saved to ${result_dir}/google_dorking.txt`)
                callback()
            })
        }else{
            Debugger.debug("WARNING", "No google dorking vulnerable found.")
            Debugger.debug("INFO", "Continuing.")

            await browser.close()
            callback()
        }

    }
}

//Exporter
module.exports = {
    self: self
}