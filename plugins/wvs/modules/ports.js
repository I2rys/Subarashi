//Dependencies
const Debugger = require("../utils/debugger")
const Request = require("request")
const Fs = require("fs")

//Variables
const Ports = require("../assets/ports.json")

var port_index = 0
var self_data = {
    valid_ports: ""
}

//Functions
function Initiate_A_Request(url, name, result_dir, callback){
    Request(url, function(err, res, body){
        if(err){
            port_index += 1

            if(port_index == Ports.length ){
                Debugger.debug("INFO", `${self_data.valid_ports.split("\n").length} valid ports found.`)

                if(self_data.valid_ports.length != 0){
                    Fs.writeFile(`${result_dir}/valid_ports.txt`, self_data.valid_ports, "utf8", function(err){
                        Debugger.debug("INFO", `Gathered valid ports has been saved to ${result_dir}/valid_ports.txt`)
                        callback()
                    })
                }else{
                    Debugger.debug("WARNING", `No valid ports found.`)
                    Debugger.debug("INFO", "Continuing.")
                    callback()
                }
            }

            return
        }

        if(res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 202 || res.statusCode == 203 || res.statusCode == 204 || res.statusCode == 205 || res.statusCode == 206 || res.statusCode == 207 || res.statusCode == 208 || res.statusCode == 226){
            if(self_data.valid_ports.length == 0){
                self_data.valid_ports = `${url} - ${name}`
            }else{
                self_data.valid_ports += `\n${url} - ${name}`
            }

            port_index += 1

            if(port_index == Ports.length ){
                Debugger.debug("INFO", `${self_data.valid_ports.split("\n").length} valid ports found.`)

                if(self_data.valid_ports.length != 0){
                    Fs.writeFile(`${result_dir}/valid_ports.txt`, self_data.valid_ports, "utf8", function(err){
                        Debugger.debug("INFO", `Gathered valid ports has been saved to ${result_dir}/valid_ports.txt`)
                        callback()
                    })
                }else{
                    Debugger.debug("WARNING", `No valid ports found.`)
                    Debugger.debug("INFO", "Continuing.")
                    callback()
                }
            }
            return
        }else{
            port_index += 1

            if(port_index == Ports.length ){
                Debugger.debug("INFO", `${self_data.valid_ports.split("\n").length} valid ports found.`)

                if(self_data.valid_ports.length != 0){
                    Fs.writeFile(`${result_dir}/valid_ports.txt`, self_data.valid_ports, "utf8", function(err){
                        Debugger.debug("INFO", `Gathered valid ports has been saved to ${result_dir}/valid_ports.txt`)
                        callback()
                    })
                }else{
                    Debugger.debug("WARNING", `No valid ports found.`)
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
    Debugger.debug("INFO", "In scan type: Reconnaissance | Website ports")
    
    for( i in Ports ){
        Initiate_A_Request(`${url}:${Ports[i].port}`, Ports[i].name, result_dir, callback)
    }
}

//Exporter
module.exports = {
    self: self
}