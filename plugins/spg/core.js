//Dependencies
const Secure_Random_Password = require("secure-random-password")
const Debugger = require("./utils/debugger.js")

//Main
function self(ReadLine, bf, callback){
    var callback_data = {
        cli_path: ""
    }

    ReadLine.question("Password length: ", pl =>{
        if(isNaN(pl)){
            Debugger.debug("ERROR", "Password length is not an Int.")

            Debugger.debug("INFO", "Going back to the menu, please wait.")
            setTimeout(function(){
                callback_data.cli_path = "/home"
                    
                callback(callback_data)
            }, 1000)
            return
        }

        if(pl < 1){
            Debugger.debug("ERROR", "Password length is too small.")

            Debugger.debug("INFO", "Going back to the menu, please wait.")
            setTimeout(function(){
                callback_data.cli_path = "/home"
                    
                callback(callback_data)
            }, 1000)
        }else{
            pl = parseInt(pl)

            Debugger.debug("INFO", `Your strong password is ${Secure_Random_Password.randomPassword({ avoidAmbiguous: false, length: pl, characters: "abcdefghijklmnopqrstuvwxyz!@#$%^&*_+}:?>" })}`)

            setTimeout(function(){
                Debugger.debug("INFO", "Going back to the menu, please wait.")
                setTimeout(function(){
                    callback_data.cli_path = "/home"
                    
                    callback(callback_data)
                }, 1000)
            }, 8000)
        }
    })

}

//Exporter
module.exports = {
    self: self
}