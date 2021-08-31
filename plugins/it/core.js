//Dependencies
const Debugger = require("./utils/debugger.js")
const Request = require("request")

//Main
function self(ReadLine, bf, callback){
    var callback_data = {
        cli_path: ""
    }

    ReadLine.question("IP: ", ip =>{
        if(ip == ""){
            Debugger.debug("ERROR", "Invalid IP.")

            Debugger.debug("INFO", "Going back to the menu, please wait.")
            setTimeout(function(){
                callback_data.cli_path = "/home"
                    
                callback(callback_data)
            }, 1000)
            return
        }

        Request(`https://freegeoip.app/json/${ip}`, function(err, res, body){
            if(err){
                Debugger.debug("FATAL", "Something went wrong while requesting to the API, please try again later.")

                Debugger.debug("INFO", "Going back to the menu, please wait.")
                setTimeout(function(){
                    callback_data.cli_path = "/home"
                        
                    callback(callback_data)
                }, 1000)
                return
            }

            body = JSON.parse(body)

            Debugger.debug("INFO", `IP: ${body.ip}
Country Name: ${(body.country_name != "" ? body.country_name : "Unable to find the IP country name.")}
Country Code: ${(body.country_code != "" ? body.country_code : "Unable to find the IP country code.")}
Region Name: ${(body.region_name != "" ? body.region_name : "Unable to find the IP region name.")}
Region Code: ${(body.region_code != "" ? body.region_code : "Unable to find the IP region code.")}
City: ${(body.city != "" ? body.city : "Unable to find the IP city.")}
Timezone: ${(body.time_zone != "" ? body.time_zone : "Unable to find the IP timezone.")}
ZipCode: ${(body.zip_code != "" ? body.zip_code : "Unable to find the IP zipcode.")}
Metro Code: ${(body.metro_code != "" ? body.metro_code : "Unable to find the IP metro code.")}
Latitude: ${(body.latitude != "" ? body.latitude : "Unable to find the IP latitude.")}
Longitude: ${(body.longitude != "" ? body.longitude : "Unable to find the IP longitude.")}`)    

            console.log("")
            ReadLine.question("Press enter to go back to the menu: ", waiter =>{
                Debugger.debug("INFO", "Going back to the menu, please wait.")
                setTimeout(function(){
                    callback_data.cli_path = "/home"
                        
                    callback(callback_data)
                }, 1000)
            })
        })
    })
}

//Exporter
module.exports = {
    self: self
}