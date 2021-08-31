//Dependencies
const Debugger = require("../utils/debugger")
const Request = require("request")
const Fs = require("fs")

//Main
async function self(url, result_dir, callback){
    Debugger.debug("INFO", "In scan type: Reconnaissance | Website external links")
    const domain = url.split("//")[1]
    
    var self_data = {
        external_links: ""
    }

    Request(url, function(err, res, body){
        if(err){
            Debugger.debug("CRITICAL", "Something went wrong while requesting to the website, please try again later. #Website external links")
            Debugger.debug("WARNING", "Aborting... Exiting, please wait.")
            Fs.rmdirSync(results_dir)
            console.clear()
            process.exit()
        }

        const external_links = body.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g).filter(function(l){ return l.indexOf(domain) == -1 })

        Debugger.debug("INFO", `${external_links.length} external links found.`)
        if(external_links.length != 0){
            for( i in external_links ){
                if(self_data.external_links.length == 0){
                    self_data.external_links = external_links[i]
                }else{
                    self_data.external_links += `\n${external_links[i]}`
                }
            }

            Fs.writeFile(`${result_dir}/external_links.txt`, self_data.external_links, "utf8", function(err){
                Debugger.debug("INFO", `Gathered external links has been saved to ${result_dir}/external_links.txt`)
                callback()
            })
        }else{
            Debugger.debug("WARNING", `No external links found.`)
            Debugger.debug("INFO", "Continuing.")
            callback()
        }
    })
}

//Exporter
module.exports = {
    self: self
}