//Dependencies
const Debugger = require("../utils/debugger")
const Request = require("request")
const Fs = require("fs")

//Main
async function self(url, result_dir, callback){
    Debugger.debug("INFO", "In scan type: Reconnaissance | Website wayback links")
    Debugger.debug("WARNING", "This scanning might take a while, depends.")
    const domain = url.split("//")[1]

    Request(`http://web.archive.org/cdx/search/cdx?url=${domain}*&output=txt&fl=original&collapse=urlkey&page=/`, { timeout: 5000 },function(err, res, body){
        if(err){
            Debugger.debug("WARNING", "Website wayback links are too big.")
            Debugger.debug("WARNING", "Skipping, please wait.")
            callback()
            return
        }

        if(body == ""){
            Debugger.debug("WARNING", "Wayback links are too big.")
            Debugger.debug("WARNING", "Skipping, please wait.")
            callback()
            return
        }

        Debugger.debug("INFO", `${body.split("\n").length} wayback links found.`)
        if(body.length != 0){
            Fs.writeFile(`${result_dir}/wayback_links.txt`, body, "utf8", function(err){
                Debugger.debug("INFO", `Gathered wayback links has been saved to ${result_dir}/wayback_links.txt`)
                callback()
            })
        }else{
            Debugger.debug("WARNING", `No wayback links found.`)
            Debugger.debug("INFO", "Continuing.")
            callback()
        }
    })
}

//Exporter
module.exports = {
    self: self
}