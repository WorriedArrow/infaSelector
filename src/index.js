//const consolef1 = document.getElementById("consolef1");
const settingsf1 = document.getElementById("settingsf1");
const preferences = document.getElementById("preferences");
// settingsf1.style.document = "none"
preferences.style.document = "none";
// consolef1.style.display = "none";
const { Client } = require("minecraft-launcher-core");
const cligate = require("./cli-gate");
let fileOpened = false;
let aboutOpened = false;

document.getElementById("settings-btn-apply-and-close").onclick = exitSettings;
document.getElementById("settings-btn-close").onclick = exitSettings;

document.getElementById("can").onclick = function () {
	consolef1.style.display = "none";
};

function startTestf1() {
	consolef1.style.display = "block";
	sgame();
}

function openMenu(menu) {
	const fileMenu = document.getElementById("file-content");
	const aboutMenu = document.getElementById("about-content");
	if (menu == "file") {
		if (!fileOpened) {
			fileMenu.style.pointerEvents = "all";
			fileMenu.style.opacity = 1;
			fileOpened = true;
			if (aboutOpened) openMenu("about");
			console.log("fileOpened");
		} else {
			fileMenu.style.pointerEvents = "none";
			fileMenu.style.opacity = 0;
			fileOpened = false;
			console.log("fileClosed");
		}
	} else if (menu == "about") {
		if (!aboutOpened) {
			aboutMenu.style.pointerEvents = "all";
			aboutMenu.style.opacity = 1;
			aboutOpened = true;
			if (fileOpened) openMenu("file");
			console.log("aboutOpened");
		} else {
			aboutMenu.style.pointerEvents = "none";
			aboutMenu.style.opacity = 0;
			aboutOpened = false;
			console.log("aboutClosed");
		}
	}
}

function openSettings() {
	document.getElementById("pref-parent").style.display = "block";
	document.getElementById("pref-parent").style.opacity = 1;
	document.getElementById("pref-parent").style.pointerEvents = "all";
}

function exit() {
	console.log("exit");
	app.exit();
}

function exitSettings() {
	document.getElementById("pref-parent").style.display = "none";
	document.getElementById("pref-parent").style.opacity = 0;
	document.getElementById("pref-parent").style.pointerEvents = "none";
}

function editTypef1() {
	settingsf1.style.display = "block";
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
			min: "4G",
		},
	};
	AuthMSwithplay(opts);
}

function AuthMSwithplay(opts) {
	const msmc = require("msmc");
	const fetch = require("node-fetch");
	const launcher = new Client();
	//msmc's testing enviroment sometimes runs into this issue that it can't load node fetch
	msmc.setFetch(fetch);
	msmc.fastLaunch("raw", (update) => {
		//A hook for catching loading bar events and errors, standard with MSMC
		console.log(update);
	})
		.then((result) => {
			//Let's check if we logged in?
			if (msmc.errorCheck(result)) {
				console.log(result.reason);
				return;
			}
			//If the login works
			opts.authorization = msmc.getMCLC().getAuth(result);
			console.log("Starting!");
			launcher.launch(opts);
			launcher.on("debug", (e) => {
				var consolelabel = document.createElement("a");
				consolelabel.innerHTML = e;
				document.getElementById("consoletextf1").appendChild(consolelabel);
				document.getElementById("consoletextf1").appendChild(document.createElement("br"));
			});
			launcher.on("data", (e) => {
				var consolelabel = document.createElement("a");
				consolelabel.innerHTML = e;
				document.getElementById("consoletextf1").appendChild(consolelabel);
				document.getElementById("consoletextf1").appendChild(document.createElement("br"));
			});
		})
		.catch((reason) => {
			//If the login fails
			console.log("We failed to log someone in because : " + reason);
		});
}
