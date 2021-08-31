//Dependencies
const Debugger = require("./utils/debugger.js")
const Puppeteer = require("puppeteer")
const Fs = require("fs")

//Variables
var dorker_links = ""

var callback_data = {
    cli_path: ""
}

//Functions
function Random_Numbers(){
    return Math.floor(Math.random() * 999999999999)
}

//Functions
async function Main(bf, max_page, dork_payload, callback){
    const browser = await Puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    const page = await browser.newPage()

    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36")
    await page.goto(`https://www.bing.com/search?q=${dork_payload}`)

    const page_content = await page.content()

    if(page_content.indexOf("There are no results for") != -1){
        browser.close()
        Debugger.debug("ERROR", "Something went wrong, please try again later.")
        Debugger.debug("INFO", "Going back to the menu, please wait.")
        setTimeout(function(){
            callback_data.cli_path = "/home"
                        
            callback(callback_data)
        }, 1000)
        return
    }

    var page_index = 1

    await page.waitForSelector("#b_results > li> h2 > a").catch(()=>{
        Debugger.debug("ERROR", "Something went wrong, please try again later.")
        Debugger.debug("INFO", "Going back to the menu, please wait.")
        setTimeout(function(){
            callback_data.cli_path = "/home"
                        
            callback(callback_data)
        }, 1000)
        return
    })

    const links = await page.$$eval("#b_results > li> h2 > a", elems =>{
        return elems.map(elem => elem.getAttribute("href"))
    })

    for( i in links ){
        if(dorker_links.length == 0){
            dorker_links = links[i]
        }else{
            dorker_links += `\n${links[i]}`
        }
    }

    page_index += 1

    Repeater()
    async function Repeater(){
        await page.click(`#b_results > li.b_pag > nav > ul > li:nth-of-type(${page_index}) > a`).catch(()=>{
            Debugger.debug("INFO", `${dorker_links.split("\n").length} links has been gathered.`)
            Fs.writeFile(`${bf}/results/dorker_${Random_Numbers()}.txt`, dorker_links, "utf8", function(err){
                Debugger.debug("INFO", `Gathered internal links has been saved to ${bf}/results/dorker_${Random_Numbers()}.txt`)

                Debugger.debug("INFO", "Going back to the menu, please wait.")
                setTimeout(function(){
                    callback_data.cli_path = "/home"
                        
                    callback(callback_data)
                }, 1000)
            })
            return
        })
        await page.waitForSelector("#b_results > li> h2 > a")

        const links = await page.$$eval("#b_results > li> h2 > a", elems =>{
            return elems.map(elem => elem.getAttribute("href"))
        })
    
        for( i in links ){
            if(dorker_links.length == 0){
                dorker_links = links[i]
            }else{
                dorker_links += `\n${links[i]}`
            }
        }

        if(page_index == max_page){
            browser.close()
            Debugger.debug("INFO", `${dorker_links.split("\n").length} links has been gathered.`)
            Fs.writeFile(`${bf}/results/dorker_${Random_Numbers()}.txt`, dorker_links, "utf8", function(err){
                Debugger.debug("INFO", `Gathered internal links has been saved to ${bf}/results/dorker_${Random_Numbers()}.txt`)

                Debugger.debug("INFO", "Going back to the menu, please wait.")
                setTimeout(function(){
                    callback_data.cli_path = "/home"
                        
                    callback(callback_data)
                }, 1000)
            })
            return
        }
    
        page_index += 1

        Repeater()
        return
    }
}

//Main
function self(ReadLine, bf, callback){
    Debugger.debug("INFO", "The seperation is thingy is | First is the max page to get the links and the second is your dork payload.(e.g 2|product.php )")
    ReadLine.question("Max Page|Dork: ", dork =>{
        if(dork == ""){
            Debugger.debug("ERROR", "Invalid dork.")

            Debugger.debug("INFO", "Going back to the menu, please wait.")
            setTimeout(function(){
                callback_data.cli_path = "/home"
                    
                callback(callback_data)
            }, 1000)
            return
        }else{
            const max_page = dork.split("|")[0]
            const dork_payload = dork.split("|")[1]

            if(max_page == 1){
                Debugger.debug("ERROR", "Invalid max_page, max_page is too low.")

                Debugger.debug("INFO", "Going back to the menu, please wait.")
                setTimeout(function(){
                    callback_data.cli_path = "/home"
                        
                    callback(callback_data)
                }, 1000)
                return
            }

            Main(bf, max_page, dork_payload, callback)
        }
    })
}

//Exporter
module.exports = {
    self: self
}