//Dependencies
const Debugger = require("../utils/debugger")
const Request = require("request")
const Fs = require("fs")

//Variables
const Login_Panels = Fs.readFileSync(`${__dirname.replace("\\modules", "")}/assets/web_login_panels.txt`, "utf8").split("\n")

var url_index = 0
var self_data = {
    login_panels: ""
}

//Function
function Initiate_A_Request(url, result_dir, callback){
    url = url.replace("\\r", "")

    Request(url, function(err, res, body){
        if(err){
            url_index += 1

            if(url_index == Login_Panels.length ){
                Debugger.debug("INFO", `${self_data.login_panels.split("\n").length} login panels found.`)

                if(self_data.login_panels.length != 0){
                    Fs.writeFile(`${result_dir}/login_panels.txt`, self_data.login_panels, "utf8", function(err){
                        Debugger.debug("INFO", `Gathered login panels has been saved to ${result_dir}/login_panels.txt`)
                        callback()
                    })
                }else{
                    Debugger.debug("WARNING", `No login panels found.`)
                    Debugger.debug("INFO", "Continuing.")
                    callback()
                }
            }

            return
        }

        if(res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 202 || res.statusCode == 203 || res.statusCode == 204 || res.statusCode == 205 || res.statusCode == 206 || res.statusCode == 207 || res.statusCode == 208 || res.statusCode == 226){
            if(self_data.login_panels.length == 0){
                self_data.login_panels = url
            }else{
                self_data.login_panels += `\n${url}`
            }

            url_index += 1

            if(url_index == Login_Panels.length ){
                Debugger.debug("INFO", `${self_data.login_panels.split("\n").length} login panels found.`)

                if(self_data.login_panels.length != 0){
                    Fs.writeFile(`${result_dir}/login_panels.txt`, self_data.login_panels, "utf8", function(err){
                        Debugger.debug("INFO", `Gathered login panels has been saved to ${result_dir}/login_panels.txt`)
                        callback()
                    })
                }else{
                    Debugger.debug("WARNING", `No login panels found.`)
                    Debugger.debug("INFO", "Continuing.")
                    callback()
                }
            }
            return
        }else{
            url_index += 1

            if(url_index == Login_Panels.length ){
                Debugger.debug("INFO", `${self_data.login_panels.split("\n").length} login panels found.`)

                if(self_data.login_panels.length != 0){
                    Fs.writeFile(`${result_dir}/login_panels.txt`, self_data.login_panels, "utf8", function(err){
                        Debugger.debug("INFO", `Gathered login panels has been saved to {result_dir}/login_panels.txt`)
                        callback()
                    })
                }else{
                    Debugger.debug("WARNING", `No login panels found.`)
                    Debugger.debug("INFO", "Continuing.")
                    callback()
                }
            }
            return
        }
    })
}

//Main
async function self(url, result_dir, callback){
    Debugger.debug("INFO", "In scan type: Reconnaissance | Website login panels")
    Debugger.debug("WARNING", "This might take a while due to big param payload thingy.")

    for( i in Login_Panels ){
        if(Login_Panels[i] != ""){
            Initiate_A_Request(`${url}${Login_Panels[i]}`, result_dir, callback)
        }
    }
}

//Exporter
module.exports = {
    self: self
}