//Dependencies
const ReadLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})
const Debugger = require("./utils/debugger.js")
const Request = require("request")
const Delay = require("delay")
const Chalk = require("chalk")
const Fs = require("fs")

//Variables
const Plugins = Fs.readdirSync("./plugins", "utf8")
const Settings = require("./settings.json")

var Subarashi_Data = {}
Subarashi_Data.cli_path = "/home"
Subarashi_Data.hacking_options = []

///Configurations
//Subarashi Data
for( i = 0; i <= Plugins.length-1; i++ ){
    const name = require(`./plugins/${Plugins[i]}/settings.json`).name

    Subarashi_Data.hacking_options.push({ name: name, index: `${i+1})` })
}

//Functions
function Menu(){
    console.log(`${Chalk.blueBright(`+ -------------------------------------------------------------------------------------------------------------- +
    ▄████████ ███    █▄  ▀█████████▄     ▄████████    ▄████████    ▄████████    ▄████████    ▄█    █▄     ▄█  
    ███    ███ ███    ███   ███    ███   ███    ███   ███    ███   ███    ███   ███    ███   ███    ███   ███  
    ███    █▀  ███    ███   ███    ███   ███    ███   ███    ███   ███    ███   ███    █▀    ███    ███   ███▌ 
    ███        ███    ███  ▄███▄▄▄██▀    ███    ███  ▄███▄▄▄▄██▀   ███    ███   ███         ▄███▄▄▄▄███▄▄ ███▌ 
  ▀███████████ ███    ███ ▀▀███▀▀▀██▄  ▀███████████ ▀▀███▀▀▀▀▀   ▀███████████ ▀███████████ ▀▀███▀▀▀▀███▀  ███▌ 
           ███ ███    ███   ███    ██▄   ███    ███ ▀███████████   ███    ███          ███   ███    ███   ███  
     ▄█    ███ ███    ███   ███    ███   ███    ███   ███    ███   ███    ███    ▄█    ███   ███    ███   ███  
   ▄████████▀  ████████▀  ▄█████████▀    ███    █▀    ███    ███   ███    █▀   ▄████████▀    ███    █▀    █▀   

+ -------------------------------------------------------------------------------------------------------------- +
`)}
                ${Chalk.whiteBright("Subarashi is still ") + Chalk.blueBright("BETA") + Chalk.whiteBright(" so expect to encounter bugs, glitches & less features.")}

    ${Chalk.redBright("1)")} ${Chalk.blueBright("Hacking")}
    ${Chalk.redBright("2)")} ${Chalk.blueBright("Other Hacking Tools")}
    ${Chalk.redBright("3)")} ${Chalk.blueBright("Credits")}
    ${Chalk.redBright("4)")} ${Chalk.blueBright("Exit")}`)

    console.log("")
    ReadLine.question(`${Chalk.blueBright(`${Settings.cli_name}@${Subarashi_Data.cli_path}`)}: `, option =>{
        if(option == 1){
            console.log("")
            Subarashi_Data.cli_path += "/hacking"

            for( i in Subarashi_Data.hacking_options ){
                console.log(`    ${Chalk.redBright(Subarashi_Data.hacking_options[i].index)} ${Chalk.blueBright(Subarashi_Data.hacking_options[i].name)}`)
            }

            console.log(`    ${Chalk.redBright("98)")} ${Chalk.blueBright("Go back to menu")}`)
            console.log(`    ${Chalk.redBright("99)")} ${Chalk.blueBright("Exit")}`)
            console.log("")

            ReadLine.question(`${Chalk.blueBright(`${Settings.cli_name}@${Subarashi_Data.cli_path}`)}: `, option =>{
                if(option != 98 && option != 99){
                    console.log("")
                    var valid_option = false
                    var plugin_index = 0

                    for( i = 0; i <= Plugins.length; i++ ){
                        if(option == i+1){
                            valid_option = true
                            plugin_index = i
                        }
                    }

                    if(valid_option){
                        require(`./plugins/${Plugins[plugin_index]}/core.js`).self(ReadLine, __dirname, function(callback){
                            Subarashi_Data.cli_path = callback.cli_path
                            console.clear()

                            Menu()
                        })
                    }else{
                        Debugger.debug("ERROR", "Invalid option, please type a valid option.")
                        Debugger.debug("WARNING", "Going back to menu, please wait.")
                        setTimeout(function(){
                            console.clear()
            
                            Menu()
                        }, 2500)
                    }  
                }else if(option == 98){
                    console.log("")
                    Debugger.debug("INFO", "Going back to the menu, please wait.")
                    setTimeout(function(){
                        Subarashi_Data.cli_path = "/home"
                        console.clear()
        
                        Menu()
                    }, 1000)
                }else if(option == 99){
                    console.log("")
                    Debugger.debug("INFO", "Exiting, please wait.")
                    setTimeout(function(){
                        console.clear()
                        process.exit()
                    }, 1000)
                }else{
                    Debugger.debug("ERROR", "Invalid option, please type a valid option.")
                    Debugger.debug("WARNING", "Going back to menu, please wait.")
                    setTimeout(function(){
                        console.clear()
        
                        Menu()
                    }, 2500)
                }
            })
        }else if(option == 2){
            console.log("")
            console.log(`${Chalk.magenta("+ --------- Other Hacking Tools ------------ +")}
${Chalk.blue(`    -- Website Vulnerabilities Scanners --
 https://github.com/skavngr/rapidscan - The Multi-Tool Web Vulnerability Scanner.
 https://github.com/OWASP/joomscan - OWASP Joomla Vulnerability Scanner Project.
 https://github.com/the-c0d3r/sqli-scanner - A tool to mass scan SQL Injection Vulnerable websites from a file.
 https://github.com/sqlmapproject/sqlmap -- Automatic SQL injection and database takeover tool.
 https://github.com/Bitwise-01/SQL-scanner - A tool that finds and scan sites for sql injection vulnerability.
 https://github.com/Cvar1984/sqlscan - Quick SQL Scanner, Dorker, Webshell injector PHP.
 https://www.acunetix.com/ - Acunetix is an application security testing solution for securing your websites, web applications, and APIs.
 https://www.netsparker.com/ - Powerful version of Acunetix but really slow in checking.
 https://spyse.com/ - Data gathering service that collects web info using OSINT. Provided info: IPv4 hosts, domains/whois, ports/banners/protocols, technologies, OS, AS, maintains huge SSL/TLS DB, and more... All the data is stored in its own database allowing get the data without scanning.
 https://github.com/codingo/NoSQLMap - Automated NoSQL database enumeration and web application exploitation tool.
 https://github.com/projectdiscovery/subfinder - Subfinder is a subdomain discovery tool that discovers valid subdomains for websites. Designed as a passive framework to be useful for bug bounties and safe for penetration testing.
 https://github.com/kpcyrd/authoscope - Scriptable network authentication cracker(formerly 'badtouch')
 https://github.com/nil0x42/phpsploit - Full-featured C2 framework which silently persists on webserver with a single-line PHP backdoor.
 https://cspscanner.com/ - Get a full analysis of your Content-Security-Policy, and understand how to easily improve it.
 https://github.com/KajanM/DirBuster - DirBuster is a multi threaded java application designed to brute force directories and files names on web/application servers.

    -- Deobfuscators/Beautifiers/Pretier --
 https://github.com/de4dot/de4dot - .NET deobfuscator and unpacker.
 https://github.com/beautify-web/js-beautify Beautifier for javascript.
 http://jsnice.org/ - Javascript beautifier.

    -- Logging/Tracing --
 https://www.wireshark.org/ - Wireshark is the world’s foremost and widely-used network protocol analyzer. It lets you see what’s happening on your network at a microscopic level and is the de facto (and often de jure) standard across many commercial and non-profit enterprises, government agencies, and educational institutions.
 https://github.com/mitmproxy/mitmproxy - An interactive TLS-capable intercepting HTTP proxy for penetration testers and software developers.
 https://www.charlesproxy.com/ - Charles is an HTTP proxy / HTTP monitor / Reverse Proxy that enables a developer to view all of the HTTP and SSL / HTTPS traffic between their machine and the Internet. This includes requests, responses and the HTTP headers (which contain the cookies and caching information).
 https://github.com/desowin/usbpcap - USB packet capture for Windows.
 https://github.com/mxmssh/drltrace - shared library calls tracing.

    -- Reverse Engineering Tools --
 http://www.ntcore.com/exsuite.php - a freeware suite of tools including a PE editor called CFF Explorer and a process viewer. The PE editor has full support for PE32/64.
 https://www.mzrst.com/ - PPEE (puppy) is a Professional PE file Explorer for reversers, malware researchers and those who want to statically inspect PE files in more details.
 https://horsicq.github.io/ - Detect It Easy, or abbreviated “DIE” is a program for determining types of files.
 https://ghidra-sre.org/ - A software reverse engineering (SRE) suite of tools developed by NSA's Research Directorate in support of the Cybersecurity mission.
 https://binary.ninja/- Fast & Easy to use reverse engineering tool.
 https://derevenets.com/ - Snowman is a native code to C/C++ decompiler, see the examples of generated code. This talk gives a brief explanation of how it works.
 https://hex-rays.com/ida-pro/ - A powerful disassembler and a versatile debugger.
 https://mh-nexus.de/en/hxd/ - HxD is a carefully designed and fast hex editor which, additionally to raw disk editing and modifying of main memory (RAM), handles files of any size.
 http://www.winhex.com/winhex/ - WinHex is in its core a universal hexadecimal editor, particularly helpful in the realm of computer forensics, data recovery, low-level data processing, and IT security.
 https://github.com/EUA/wxHexEditor - wxHexEditor official GIT repo.

   -- Analysis Tools --
 https://github.com/ReFirmLabs/binwalk Firmware Analysis Tool.
 https://github.com/kaitai-io/kaitai_struct - Kaitai Struct: declarative language to generate binary data parsers in C++ / C# / Go / Java / JavaScript / Lua / Perl / PHP / Python / Ruby.
 http://wjradburn.com/software/ - PEview provides a quick and easy way to view the structure and content of 32-bit Portable Executable (PE) and Component Object File Format (COFF) files. This PE/COFF file viewer displays header, section, directory, import table, export table, and resource information within EXE, DLL, OBJ, LIB, DBG, and other file types.

    -- Malware Assessment Tools --
 https://www.winitor.com/ - The goal of pestudio is to spot artifacts of executable files in order to ease and accelerate Malware Initial Assessment. The tool is used by Computer Emergency Response (CERT) teams, Security Operations Centers (SOC) and Labs worldwide.
 
    -- Post Exploitation Tools --
 https://github.com/Genetic-Malware/Ebowla - Framework for Making Environmental Keyed Payloads (NO LONGER SUPPORTED).
 https://github.com/PowerShellMafia/PowerSploit - PowerSploit - A PowerShell Post-Exploitation Framework.
 https://github.com/byt3bl33d3r/SILENTTRINITY - An asynchronous, collaborative post-exploitation agent powered by Python and .NET's DLR.
 https://github.com/EmpireProject/Empire - Empire is a PowerShell and Python post-exploitation agent.
 
    -- Dynamic Analysis --
 https://processhacker.sourceforge.io/ - A free, powerful, multi-purpose tool that helps you monitor system resources, debug software and detect malware.
 https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer - The Process Explorer display consists of two sub-windows. The top window always shows a list of the currently active processes, including the names of their owning accounts and more.
 https://docs.microsoft.com/en-us/sysinternals/downloads/procmon - Process Monitor is an advanced monitoring tool for Windows that shows real-time file system, Registry and process/thread activity.
 https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns - Autoruns' Hide Signed Microsoft Entries option helps you to zoom in on third-party auto-starting images that have been added to your system and it has support for looking at the auto-starting images configured for other accounts configured on a system.
 https://github.com/Rurik/Noriben - Noriben Portable, Simple, Malware Analysis Sandbox.
 http://www.rohitab.com/apimonitor - API Monitor is a free software that lets you monitor and control API calls made by applications and services. Its a powerful tool for seeing how applications and services work or for tracking down problems that you have in your own applications.`)}
${Chalk.magenta("+ ------------------------------------------ +")}`)
            console.log("")
            ReadLine.question("Press enter to go back to the menu: ", command =>{
                if(command == ""){
                    console.clear()
                    Menu()
                }else{
                    console.clear()
                    Menu()
                }
            })
        }else if(option == 3){
            console.log("")
            console.log(`${Chalk.magenta("+ --------- Hall of Developers ---------- +")}
${Chalk.blue(` Developer: I2rys
 Tester & Code Monitorer: JeremyLARDENOIS`)}
${Chalk.magenta("+ --------------------------------------- +")}`)
            console.log("")
            ReadLine.question("Press enter to go back to the menu: ", command =>{
                if(command == ""){
                    console.clear()
                    Menu()
                }else{
                    console.clear()
                    Menu()
                }
            })
        }else if(option == 4){
            console.log("")
            Debugger.debug("INFO", "Exiting, please wait.")
            setTimeout(function(){
                console.clear()
                process.exit()
            }, 1000)
        }else{
            console.log("")
            Debugger.debug("ERROR", "Invalid option, please type a valid option.")
            setTimeout(function(){
                console.clear()

                Menu()
            }, 2500)
        }
    })
}

//Main
Start()
function Start(){
    console.clear()
    Menu()
}

process.on("SIGINT", function(){
    console.log("")
    Debugger.debug("INFO", "Exiting, please wait.")
    setTimeout(function(){
        console.clear()
        process.exit()
    }, 1000)
})