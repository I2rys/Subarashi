//Dependencies
const Debugger = require("../utils/debugger")
const Whois_JSON = require("whois-json")
const JSON_Hood = require("json-hood")
const Fs = require("fs")

//Main
async function self(url, result_dir, callback){
    Debugger.debug("INFO", "In scan type: Reconnaissance | Website Whois")
    const domain = url.split("//")[1]
    
    try{
        const results = await Whois_JSON(domain)

        Fs.writeFile(`${result_dir}/whois.txt`, JSON_Hood.getJSONasArrowDiagram(results), "utf8", function(err){
            Debugger.debug("INFO", `Whois information has been saved to ${result_dir}/whois.txt`)
            callback()
        })
    }catch{
        Debugger.debug("CRITICAL", "Something went wrong while trying to get the website whois information. #Website Whois")
        Debugger.debug("WARNING", "Aborting... Exiting, please wait.")
        Fs.rmdirSync(result_dir)
        console.clear()
        process.exit()
    }
}

//Exporter
module.exports = {
    self: self
}