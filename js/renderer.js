const { Client } = require("minecraft-launcher-core");
const { ipcRenderer } = require("electron");

let loggedIn = false;

const defaultTitle = "infaSelector v1.5ᴮᴱᵀᴬ";
let settings = false,
	add = false,
	consolef = false;

// Hide/show buttons

function hideButtons() {
	document.getElementById("exit-button").style.display = "none";
	document.getElementById("exit-button").style.pointerEvents = "none";

	document.getElementById("settings-button").style.display = "none";
	document.getElementById("settings-button").style.pointerEvents = "none";
}

function showButtons() {
	document.getElementById("exit-button").style.display = "block";
	document.getElementById("exit-button").style.pointerEvents = "all";

	document.getElementById("settings-button").style.display = "block";
	document.getElementById("settings-button").style.pointerEvents = "all";
}

// Settings button
function openSettings() {
	blur();
	setTimeout(() => {
		document.getElementById("pref-parent").style.opacity = 1;
	});
	document.getElementById("pref-parent").style.pointerEvents = "all";
	updateTitle("Settings | infaSelector v1.5ᴮᴱᵀᴬ");
	hideButtons();
	settings = true;
}

function exitSettings() {
	setTimeout(() => {
		document.getElementById("pref-parent").style.opacity = 0;
	});
	document.getElementById("pref-parent").style.pointerEvents = "none";
	updateTitle(defaultTitle);
	showButtons();
	settings = false;
}

function exitConsole() {
	document.getElementById("console-parent").style.opacity = 0;
	document.getElementById("console-parent").style.pointerEvents = "none";
	showButtons();
	consolef = false;
}

// Add button
function openAdd() {
	setTimeout(() => {
		document.getElementById("add-parent").style.opacity = 1;
	});
	document.getElementById("add-parent").style.pointerEvents = "all";
	updateTitle("Add installation | infaSelector v1.5ᴮᴱᵀᴬ");
	hideButtons();
	add = true;
}

function exitAdd() {
	setTimeout(() => {
		document.getElementById("add-parent").style.opacity = 0;
	});
	document.getElementById("add-parent").style.pointerEvents = "none";
	updateTitle(defaultTitle);
	showButtons();
	add = false;
}

document.getElementById("exit-btn").addEventListener("click", () => {
	ipcRenderer.send("app-quit");
});

document.getElementById("win-title").innerText = document.getElementById("title").innerHTML;

function updateTitle(newTitle) {
	document.getElementById("title").innerHTML = newTitle;
	document.getElementById("win-title").innerText = document.getElementById("title").innerHTML;
}

function sgame() {
	let opts = {
		root: require("os").homedir() + "/AppData/Roaming/.minecraft",
		version: {
			number: "1.18.1",
			type: "release",
		},
		memory: {
			max: "4G",
			min: "2G",
		},
		javaPath: "javaw",
	};
	document.getElementById("console-parent").style.opacity = 1;
	document.getElementById("console-parent").style.pointerEvents = "all";
	hideButtons();
	consolef = true;
	AuthMSwithplay(opts);
}

function AuthMSwithplay(opts) {
	// ipc ftw <3
	// ipcRenderer.send("mc-play", opts, document);
	const msmc = require("msmc");
	const fetch = require("node-fetch");
	const launcher = new Client();
	// msmc's testing enviroment sometimes runs into this issue that it can't load node fetch
	msmc.setFetch(fetch);
	msmc.fastLaunch(
		"raw",
		(update) => {
			//A hook for catching loading bar events and errors, standard with MSMC
			console.log(update);
		},
		loggedIn ? "none" : "select_account",
		{
			width: 960,
			height: 590,
		}
	)
		.then((result) => {
			const consoleBody = document.getElementById("console-body");
			//Let's check if we logged in?
			if (msmc.errorCheck(result)) {
				console.log(result.reason);
				return;
			}
			//If the login works
			loggedIn = true;
			opts.authorization = msmc.getMCLC().getAuth(result);
			console.log("Starting!");
			launcher.launch(opts);
			launcher.on("data", (msg) => {
				let msge = document.createElement("console-msg");
				if (msg.toLowerCase().includes("error")) msge.setAttribute("type", "error");
				if (msg.toLowerCase().includes("warn")) msge.setAttribute("type", "warn");
				msge.innerText = msg;
				consoleBody.appendChild(msge);
				consoleBody.scrollTop = consoleBody.scrollHeight;
			});
			launcher.on("debug", (msg) => {
				let msge = document.createElement("console-msg");
				msge.setAttribute("type", "debug");
				msge.innerText = msg;
				consoleBody.appendChild(msge);
				consoleBody.scrollTop = consoleBody.scrollHeight;
			});
		})
		.catch((reason) => {
			//If the login fails
			console.log("We failed to log someone in because : " + reason);
		});
}

// Adding installations
const $ = require("jquery");
const fs = require("fs");
const { randomUUID } = require("crypto");
const filename = "installations.json";

$("#add-btn-add").on("click", () => {
	const name = $("#name").val();
	const jarpath = $("#path").val();

	fs.mkdirSync(require("path").join(require("os").homedir(), ".infa"), { recursive: true }, (err, path) => {
		if (err) console.error(err);
	});
	fs.readFile(require("os").homedir() + "/.infa/" + filename, (err, data) => {
		if (err) console.error(err);
		let dat = JSON.parse(data.toString()) || [];
		dat.push({
			id: randomUUID(),
			name: name,
			jarpath: jarpath,
		});

		fs.writeFile(require("os").homedir() + "/.infa/" + filename, JSON.stringify(dat), () => {});
	});
});

const os = require("os");

$(document).on("keydown", (e) => {
	if (e.key == "Escape" && (settings || add || consolef)) {
		exitSettings();
		exitAdd();
		exitConsole();
	}
});

document.getElementById("ram").setAttribute("max", Math.round(parseInt(os.totalmem()) / 1048576 / 1024 / 4) * 3);
document.getElementById("ram").setAttribute("value", Math.round(parseInt(os.totalmem()) / 1048576 / 1024 / 4));
