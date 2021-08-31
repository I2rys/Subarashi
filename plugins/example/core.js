//Dependencies
const Debugger = require("./utils/debugger.js")

//Main
function self(ReadLine, bf, callback){
    var callback_data = {
        cli_path: ""
    }

    Debugger.debug("INFO", "Example plugin.")
    Debugger.debug("INFO", "Going back to the menu, please wait.")
    setTimeout(function(){
        callback_data.cli_path = "/home"
                    
        callback(callback_data)
    }, 5000)
}

//Exporter
module.exports = {
    self: self
}