const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
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
		icon: "./img/icon-128x.ico",
		title: "infaSelector v1.4ᴮᴱᵀᴬ",
		frame: false,
	});

	win.loadFile("./index.html");
	win.setMenu(null);
	win.setTitle("infaSelector v1.4ᴮᴱᵀᴬ");
	return win;
};

app.whenReady().then(() => {
	win = createWindow();
	require("@electron/remote/main").initialize();
	require("@electron/remote/main").enable(win.webContents);
});

ipcMain.on("app-quit", (_evt, _arg) => {
	app.quit();
	console.log("quit app");
});
