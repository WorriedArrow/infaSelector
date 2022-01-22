const { app, BrowserWindow } = require("electron");
const electron = require("electron");
const remote = electron.remote;
var win;
const createWindow = () => {
	const win = new BrowserWindow({
		width: electron.screen.getPrimaryDisplay().bounds.width - 120,
		height: electron.screen.getPrimaryDisplay().bounds.height - 120,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		resizable: false,
		icon: "./img/icon-128x.ico",
	});

	win.loadFile("./src/index.html");
	win.setMenu(null);
	return win;
};

app.whenReady().then(() => {
	win = createWindow();
	console.log("app started up");
});

class ExitApplication {
	exit() {
		console.log("exiting");
		remote.getCurrentWindow().close();
	}
}
