//Dependencies
const Chalk = require("chalk")

//Main
function debug(type, message){
    if(type == "INFO"){
        console.log(`${Chalk.blue("Subarashi Debugger:")} ${message}`)
    }else if(type == "ERROR"){
        console.log(`${Chalk.red("Subarashi Debugger:")} ${message}`)
    }else if(type == "WARNING"){
        console.log(`${Chalk.yellow("Subarashi Debugger:")} ${message}`)
    }else if(type == "CRITICAL"){
        console.log(`${Chalk.red("Subarashi Debugger:")} ${message}`)
    }
}

//Exporter
module.exports = {
    debug: debug
}