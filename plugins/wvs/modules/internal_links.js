//Dependencies
const Debugger = require("../utils/debugger")
const Request = require("request")
const Fs = require("fs")

//Main
async function self(url, result_dir, callback){
    Debugger.debug("INFO", "In scan type: Reconnaissance | Website internal links")
    const domain = url.split("//")[1]
    
    var self_data = {
        internal_links: ""
    }

    Request(url, function(err, res, body){
        if(err){
            Debugger.debug("CRITICAL", "Something went wrong while requesting to the website, please try again later. #Website internal links")
            Debugger.debug("WARNING", "Aborting... Exiting, please wait.")
            Fs.rmdirSync(result_dir)
            console.clear()
            process.exit()
        }

        const internal_links = body.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g).filter(function(l){ return l.indexOf(domain) != -1 })

        Debugger.debug("INFO", `${internal_links.length} internal links found.`)
        if(internal_links.length != 0){
            for( i in internal_links ){
                if(self_data.internal_links.length == 0){
                    self_data.internal_links = internal_links[i]
                }else{
                    self_data.internal_links += `\n${internal_links[i]}`
                }
            }

            Fs.writeFile(`${result_dir}/internal_links.txt`, self_data.internal_links, "utf8", function(err){
                Debugger.debug("INFO", `Gathered internal links has been saved to ${result_dir}/internal_links.txt`)
                callback()
            })
        }else{
            Debugger.debug("WARNING", `No internal links found.`)
            Debugger.debug("INFO", "Continuing.")
            callback()
        }
    })
}

//Exporter
module.exports = {
    self: self
}