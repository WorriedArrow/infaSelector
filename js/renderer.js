const { Client } = require("minecraft-launcher-core");
const { ipcRenderer } = require("electron");

const defaultTitle = "infaSelector v1.4ᴮᴱᵀᴬ";

function openSettings() {
	setTimeout(() => {
		document.getElementById("pref-parent").style.opacity = 1;
	});
	document.getElementById("pref-parent").style.pointerEvents = "all";
}

function exitSettings() {
	setTimeout(() => {
		document.getElementById("pref-parent").style.opacity = 0;
	});
	document.getElementById("pref-parent").style.pointerEvents = "none";
}

document.getElementById("exit-btn").addEventListener("click", () => {
	ipcRenderer.send("app-quit");
});

function hideButtons() {
	document.getElementById("exit-btn").style.display = "none";
	document.getElementById("exit-btn").style.pointerEvents = "none";

	document.getElementById("exit-btn").style.display = "none";
	document.getElementById("exit-btn").style.pointerEvents = "none";
}

// Add button
function openAdd() {
	setTimeout(() => {
		document.getElementById("add-parent").style.opacity = 1;
	});
	document.getElementById("add-parent").style.pointerEvents = "all";
	updateTitle("Add installation | infaSelector v1.4ᴮᴱᵀᴬ");
}

function exitAdd() {
	setTimeout(() => {
		document.getElementById("add-parent").style.opacity = 0;
	});
	document.getElementById("add-parent").style.pointerEvents = "none";
	updateTitle(defaultTitle);
}

document.getElementById("win-title").innerText = document.getElementById("title").innerHTML;

function updateTitle(newTitle) {
	document.getElementById("title").innerHTML = newTitle;
	document.getElementById("win-title").innerText = document.getElementById("title").innerHTML;
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
