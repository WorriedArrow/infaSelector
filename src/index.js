const consolef1 = document.getElementById("consolef1")
consolef1.style.display ="none"
const { Client } = require('minecraft-launcher-core')
const cligate = require("./cli-gate")

document.getElementById("can").onclick = function() {
    consolef1.style.display ="none"
}

function startTestf1() {
    var con = document.createElement('button')
    var typef1 = document.getElementById("typef1")
    var editprop = document.getElementById("editPropertiesf1")
    var starttest = document.getElementById("startTf1")
    
    con.innerHTML = "View Console"
    con.className = "py-2 px-3 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
    document.getElementById("f1").appendChild(con)
    
    con.onclick = function() {
        consolef1.style.display ="block"
    }

    var stop = document.createElement('button')
    stop.innerHTML = "Stop"
    stop.className = "py-2 px-3 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
    document.getElementById("f1").appendChild(stop)
    stop.onclick = function() {
        document.getElementById("f1").appendChild(starttest)
        document.getElementById("f1").appendChild(editprop)
        document.getElementById("f1").appendChild(typef1)
        document.getElementById("f1").removeChild(con)
        document.getElementById("f1").removeChild(stop)
    }
    typef1.remove()
    editprop.remove()
    starttest.remove()
    sgame()
}

function editTypef1() {
    var typef1 = document.getElementById("typef1")
    var editprop = document.getElementById("editPropertiesf1")
    var startbutton = document.getElementById("startTf1")
    var label = document.createElement('a')
    label.innerHTML = "Settings for 'test 1': "
    document.getElementById("settingsf1").appendChild(label)
    var edittypef1 = document.createElement('button')
    edittypef1.innerHTML = "Edit type"
    editTypef1.className = "py-2 px-3 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
    document.getElementById("settingsf1").appendChild(edittypef1)
    var closesettingsf1 = document.createElement('button')
    closesettingsf1.innerHTML = "Close Settings"
    closesettingsf1.className = "py-2 px-3 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
    closesettingsf1.onclick = function() {
        document.getElementById("f1").appendChild(startbutton)
        document.getElementById("f1").appendChild(editprop)
        document.getElementById("f1").appendChild(typef1)
        document.getElementById("settingsf1").removeChild(label)
        document.getElementById("settingsf1").removeChild(edittypef1)
        document.getElementById("settingsf1").removeChild(closesettingsf1)
    }
    document.getElementById("settingsf1").appendChild(closesettingsf1)
    typef1.remove()
    startbutton.remove()
    editprop.remove()
}

function sgame() {
    let opts = {
        clientPackage: null,
        root: "../infaSelector/cli/test",
        version: {
            number: "1.16.1",
            type: "release",
        },
        
        memory: {
            max: "6G",
            min: "4G"
        },
    }
    AuthMSwithplay(opts)
    

}

function AuthMSwithplay(opts) {
    const msmc = require("msmc");
    const fetch = require("node-fetch");
    const launcher = new Client();
    //msmc's testing enviroment sometimes runs into this issue that it can't load node fetch
    msmc.setFetch(fetch)
    msmc.fastLaunch("raw",
        (update) => {
            //A hook for catching loading bar events and errors, standard with MSMC
            console.log(update)
        }).then(result => {
            //Let's check if we logged in?
            if (msmc.errorCheck(result)){
                console.log(result.reason)
                return;
            }
            //If the login works
            opts.authorization = msmc.getMCLC().getAuth(result)
            console.log("Starting!")
            launcher.launch(opts);
            launcher.on('debug', (e) => {
                var consolelabel = document.createElement('a')
                consolelabel.innerHTML = e
                document.getElementById("consoletextf1").appendChild(consolelabel)
                document.getElementById("consoletextf1").appendChild(document.createElement('br'))
            });
            launcher.on('data', (e) => {
                var consolelabel = document.createElement('a')
                consolelabel.innerHTML = e
                document.getElementById("consoletextf1").appendChild(consolelabel)
                document.getElementById("consoletextf1").appendChild(document.createElement('br'))
            });
        }).catch(reason => {
            //If the login fails
            console.log("We failed to log someone in because : " + reason);
        })
}