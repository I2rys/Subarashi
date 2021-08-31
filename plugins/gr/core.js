//Dependencies
const Debugger = require("./utils/debugger.js")
const JSON_Hood = require("json-hood")
const Request = require("request")
const Fs = require("fs")

//Variables
var callback_data = {
    cli_path: ""
}

//Functions
function Random_Numbers(){
    return Math.floor(Math.random() * 999999999999)
}

function Main(gusr, bf, callback){
    const rf = `${bf}/results/gitracon_${Random_Numbers()}`
    Fs.mkdirSync(rf)

    a()
    function a(){
        Request(`https://api.github.com/search/users?q=${gusr}`, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
            }
        }, function(err, res, body){
            const result = JSON_Hood.getJSONasArrowDiagram(body)
    
            Fs.writeFileSync(`${rf}/main.txt`, result, "utf8")
    
            b()
        })
    }

    function b(){
        Request(`https://api.github.com/users/${gusr}`, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
            }
        }, function(err, res, body){
            const result = JSON_Hood.getJSONasArrowDiagram(body)
    
            Fs.writeFileSync(`${rf}/information1.txt`, result, "utf8")
    
            c()
        })
    }

    function c(){
        Debugger.debug("INFO", "Getting the user followers, this might take a while.")
        Request(`https://api.github.com/users/${gusr}/followers`, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
            }
        }, function(err, res, body){
            if(err){
                Debugger.debug("WARNING", "User followers is too big.")
                Debugger.debug("WARNING", "Continuing.")
                e()
                return
            }

            const result = JSON_Hood.getJSONasArrowDiagram(body)
    
            Fs.writeFileSync(`${rf}/followers.txt`, result, "utf8")
    
            d()
        })
    }

    function d(){
        Debugger.debug("INFO", "Getting the user repositories, this might take a while.")
        Request(`https://api.github.com/users/${gusr}/repos`, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
            }
        }, function(err, res, body){
            if(err){
                Debugger.debug("WARNING", "User repos is too big.")
                Debugger.debug("WARNING", "Continuing.")
                e()
                return
            }

            const result = JSON_Hood.getJSONasArrowDiagram(body)
    
            Fs.writeFileSync(`${rf}/repos.txt`, result, "utf8")
    
            e()
        })
    }

    function e(){
        Debugger.debug("INFO", "Getting the user subscriptions.")
        Request(`https://api.github.com/users/${gusr}/subscriptions`, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
            }
        }, function(err, res, body){
            const result = JSON_Hood.getJSONasArrowDiagram(body)
    
            Fs.writeFileSync(`${rf}/subscriptions.txt`, result, "utf8")
    
            f()
        })
    }

    function f(){
        Debugger.debug("INFO", "Getting the user organizations.")
        Request(`https://api.github.com/users/${gusr}/orgs`, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
            }
        }, function(err, res, body){
            const result = JSON_Hood.getJSONasArrowDiagram(body)
    
            Fs.writeFileSync(`${rf}/orgs.txt`, result, "utf8")
    
            done()
        })
    }

    function done(){
        Debugger.debug("INFO", `The results have been saved to ${rf}`)
        Debugger.debug("INFO", "Going back to the menu, please wait.")
        setTimeout(function(){
            callback_data.cli_path = "/home"
                
            callback(callback_data)
        }, 5000)
    }
}

//Main
function self(ReadLine, bf, callback){
    ReadLine.question("Github username: ", gusr =>{
        if(gusr == ""){
            Debugger.debug("ERROR", "Invalid Github username.")

            Debugger.debug("INFO", "Going back to the menu, please wait.")
            setTimeout(function(){
                callback_data.cli_path = "/home"
                    
                callback(callback_data)
            }, 1000)
            return
        }else{
            Request(`https://api.github.com/search/users?q=${gusr}`, {
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
                }
            }, function(err, res, body){
                body = JSON.parse(body)

                if(body.total_count != 0){
                    Debugger.debug("INFO", "Getting the Github user information, please wait.")

                    Main(gusr, bf, callback)
                }else{
                    Debugger.debug("ERROR", "Invalid Github username.")

                    Debugger.debug("INFO", "Going back to the menu, please wait.")
                    setTimeout(function(){
                        callback_data.cli_path = "/home"
                            
                        callback(callback_data)
                    }, 1000)
                    return
                }
            })
        }
    })
}

//Exporter
module.exports = {
    self: self
}