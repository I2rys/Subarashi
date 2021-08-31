//Dependencies
const Debugger = require("./utils/debugger.js")
const Puppeteer = require("puppeteer")
const Fs = require("fs")

//Variables
const Modules = Fs.readdirSync(`${__dirname}/modules`, "utf8")

var results = ""
var module_index = 0

var callback_data = {
    cli_path: ""
}

//Functions
function Random_Numbers(){
    return Math.floor(Math.random() * 999999999999)
}


async function Initiate_A_Checker(bf, callback, website, parsed_name, selector_for_account_exist, browser){
    const page = await browser.newPage()

    try{
        await page.goto(`${website}${parsed_name}`, { waitUntil: "domcontentloaded" }).catch(()=>{
            if(results.length == 0){
                results = `[WEBSITE DOWN] ${website}`
            }else{
                results += `\n[WEBSITE DOWN] ${website}`
            }

            module_index += 1

            if(module_index == Modules.length){
                browser.close()

                Fs.writeFile(`${bf}/results/scmh_${Random_Numbers()}.txt`, results, "utf8", function(err){
                    if(err){}

                    Debugger.debug("INFO", `The results have been saved to ${bf}/results/scmh_${Random_Numbers()}.txt`)

                    Debugger.debug("INFO", "Going back to the menu, please wait.")
                    setTimeout(function(){
                        callback_data.cli_path = "/home"
                            
                        callback(callback_data)
                    }, 5000)
                })
            }

            page.close()
            return
        })

        await page.waitForSelector(selector_for_account_exist).then(()=>{
            if(results.length == 0){
                results = `[USER EXIST] ${website}${parsed_name}}`
            }else{
                results += `\n[USER EXIST] ${website}${parsed_name}`
            }

            module_index += 1

            if(module_index == Modules.length){
                browser.close()

                Fs.writeFile(`${bf}/results/scmh_${Random_Numbers()}.txt`, results, "utf8", function(err){
                    if(err){}

                    Debugger.debug("INFO", `The results have been saved to ${bf}/results/scmh_${Random_Numbers()}.txt`)

                    Debugger.debug("INFO", "Going back to the menu, please wait.")
                    setTimeout(function(){
                        callback_data.cli_path = "/home"
                            
                        callback(callback_data)
                    }, 5000)
                })
            }

            page.close()
            return
        }).catch(()=>{
            if(results.length == 0){
                results = `[USER DOES NOT EXIST] ${website}${parsed_name}}`
            }else{
                results += `\n[USER DOES NOT EXIST] ${website}${parsed_name}`
            }

            module_index += 1

            if(module_index == Modules.length){
                browser.close()

                Fs.writeFile(`${bf}/results/scmh_${Random_Numbers()}.txt`, results, "utf8", function(err){
                    if(err){}

                    Debugger.debug("INFO", `The results have been saved to ${bf}/results/scmh_${Random_Numbers()}.txt`)

                    Debugger.debug("INFO", "Going back to the menu, please wait.")
                    setTimeout(function(){
                        callback_data.cli_path = "/home"
                            
                        callback(callback_data)
                    }, 5000)
                })
            }

            return
        })
    }catch{
        if(results.length == 0){
            results = `[USER DOES NOT EXIST/WEBSITE DOWN] ${website}${parsed_name}}`
        }else{
            results += `\n[USER DOES NOT EXIST/WEBSITE DOWN] ${website}${parsed_name}`
        }

        module_index += 1

        if(module_index == Modules.length){
            browser.close()

            Fs.writeFile(`${bf}/results/scmh_${Random_Numbers()}.txt`, results, "utf8", function(err){
                if(err){}

                Debugger.debug("INFO", `The results have been saved to ${bf}/results/scmh_${Random_Numbers()}.txt`)

                Debugger.debug("INFO", "Going back to the menu, please wait.")
                setTimeout(function(){
                    callback_data.cli_path = "/home"
                        
                    callback(callback_data)
                }, 5000)
            })
        }
    }
}

//Main
function self(ReadLine, bf, callback){
    ReadLine.question("Username/First Name/Last Name/Middle Name(So On)(Check https://github.com/I2rys/SherNode for more info): ", stuff =>{
        if(stuff == ""){
            Debugger.debug("ERROR", `Invalid First Name/Last Name and so on.`)

            Debugger.debug("INFO", "Going back to the menu, please wait.")
            setTimeout(function(){
                callback_data.cli_path = "/home"
                    
                callback(callback_data)
            }, 5000)
            return
        }else{
            Debugger.debug("INFO", "Hunting the user, please wait.")
            Main()
            async function Main(){
                const browser = await Puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] })

                for( i in Modules ){
                    require(`${__dirname}/modules/${Modules[i]}`).self(stuff.split(" "), function(callback2){
                        Initiate_A_Checker(bf, callback, callback2.website, callback2.parsed_name, callback2.sfae, browser)
                    })
                }
            }
        }
    })
}

//Exporter
module.exports = {
    self: self
}