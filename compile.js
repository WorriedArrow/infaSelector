const electronInstaller = require('electron-winstaller');
start()

async function start() {
    try {
        await electronInstaller.createWindowsInstaller({
          appDirectory: './',
          outputDirectory: './installer64',
          authors: 'InfaSelector Authors via Electron-WinInstaller',
          exe: 'infaselector-64installer.exe'
        });
        console.log('It worked!');
      } catch (e) {
        console.log(`No dice: ${e.message}`);
      }
}