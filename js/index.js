const electron = require("electron");
const { Client } = require("minecraft-launcher-core");
const { app, BrowserWindow, ipcMain, Tray } = electron;
let win;

const createWindow = () => {
	const win = new BrowserWindow({
		width: electron.screen.getPrimaryDisplay().bounds.width - 150,
		height: electron.screen.getPrimaryDisplay().bounds.height - 150,
		webPreferences: {
			enableRemoteModule: true,
			nodeIntegration: true,
			contextIsolation: false,
		},
		resizable: false,
		title: "infaSelector v1.5ᴮᴱᵀᴬ",
		frame: false,
		opacity: 0,
	});
	win.loadFile("./src/index.html");
	win.setMenu(null);
	win.webContents.openDevTools();
	return win;
};

app.whenReady().then(() => {
	win = createWindow();
	// Workaround for weird win7 aero-looking frame effect on launch.
	setTimeout(() => {
		win.setOpacity(1);
	}, 1102);
});

app.addListener("renderer-process-crashed", () => {
	createErr("Error: Renderer process has crashed.");
});

ipcMain.on("app-quit", (_evt, _arg) => {
	app.quit();
});

function createErr(message) {
	electron.dialog.showErrorBox("Error - infaSelector v1.5ᴮᴱᵀᴬ", message);
}

ipcMain.on("mc-play", (_evt, arg) => {
	let opts = arg[0];
	const document = arg[1];
	const msmc = require("msmc");
	require("msmc");
	const fetch = require("node-fetch");
	const launcher = new Client();
	// msmc's testing enviroment sometimes runs into this issue that it can't load node fetch
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
			launcher.on("data", (msg) => {
				let msge = document.createElement("console-msg");
				if (msg.toLowerCase().includes("error]")) msge.setAttribute("type", "error");
				if (msg.toLowerCase().includes("warn]")) msge.setAttribute("type", "warning");
				msge.innerText = msg;
				document.getElementById("console-body").appendChild(msge);
			});
			launcher.on("debug", (msg) => {
				let msge = document.createElement("console-msg");
				msge.setAttribute("type", "debug");
				msge.innerText = msg;
				document.getElementById("console-body").appendChild(msge);
			});
		})
		.catch((reason) => {
			//If the login fails
			console.log("We failed to log someone in because : " + reason);
		});
});
