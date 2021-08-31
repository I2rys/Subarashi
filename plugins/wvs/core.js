//Dependencies
const Debugger = require("./utils/debugger.js")
const Request = require("request")
const Delay = require("delay")
const Fs = require("fs")

//Variables
const Modules = Fs.readdirSync(`${__dirname}/modules`, "utf8")

//Functions
function Random_Numbers(){
    return Math.floor(Math.random() * 999999999999)
}

//Main
function self(ReadLine, bf, callback){
    var callback_data = {
        cli_path: ""
    }

    Debugger.debug("INFO", "Do NOT put / on the last part of the url.(e.g https://example.com )")
    setTimeout(function(){
        ReadLine.question("Website Url: ", url =>{
            if(url != ""){
                Request(url, function(err, res, body){
                    if(err){
                        Debugger.debug("ERROR", "Invalid url, please type a valid url.")
                        Debugger.debug("WARNING", "Going back to menu, please wait.")
                        setTimeout(function(){
                            callback_data.cli_path = "/home"
                            console.clear()
                            
                            callback(callback_data)
                        }, 2500)

                        return
                    }
    
                    var plugin_index = 0

                    const domain = url.split("//")[1]
                    const dir_name = `${domain}_${Random_Numbers()}`
                    Fs.mkdirSync(`${bf}/results/${dir_name}`)
                    console.log("")
                    Debugger.debug("INFO", "Website vulnerabilities scanning has started.")
                    Plugin_Handler()
                    async function Plugin_Handler(){
                        await Delay(100)
                                        
                        if(plugin_index == Modules.length){
                            Debugger.debug("INFO", `Website vulnerabilities scanning is finished. The results has been saved to ${bf}/results/${dir_name}`)
                            setTimeout(function(){
                                Debugger.debug("INFO", "Going back to the menu, please wait.")
                                setTimeout(function(){
                                    callback_data.cli_path = "/home"
                                    
                                    callback(callback_data)
                                }, 1000)
                            }, 10000)

                            return
                        }
        
                        require(`./modules/${Modules[plugin_index]}`).self(url, `${bf}/results/${dir_name}`, function(callback){
                            plugin_index += 1
                            Plugin_Handler()
                        })
                    }
                })
            }else{
                Debugger.debug("ERROR", "Invalid url, please type a valid url.")
                Debugger.debug("WARNING", "Going back to menu, please wait.")
                setTimeout(function(){
                    callback_data.cli_path = "/home"
                    
                    callback(callback_data)
                }, 2500)

                return
            }
        })
    }, 1000)
}

//Exporter
module.exports = {
    self: self
}