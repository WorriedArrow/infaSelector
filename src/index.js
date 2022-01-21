//const consolef1 = document.getElementById("consolef1");
const settingsf1 = document.getElementById("settingsf1");
const preferences = document.getElementById("preferences");
// settingsf1.style.document = "none"
preferences.style.document = "none";
// consolef1.style.display = "none";
//const { Client } = require("minecraft-launcher-core");
const cligate = require("./cli-gate");

document.getElementById("settings-btn-apply-and-close").onclick = exitSettings;
document.getElementById("settings-btn-close").onclick = exitSettings;

document.getElementById("can").onclick = function () {
	consolef1.style.display = "none";
};

function startTestf1() {
	consolef1.style.display = "block";
	sgame();
}

function exitSettings() {
	document.getElementById("pref-parent").style.opacity = 0;
	document.getElementById("pref-parent").style.pointerEvents = "none";
	// preferences.style.display = "none";
	// document.getElementById("pref-overlay").style.display = "none";
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
