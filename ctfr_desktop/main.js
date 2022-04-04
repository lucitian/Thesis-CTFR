const { app, BrowserWindow } = require('electron')
const path = require('path')
const { stdout } = require('process')

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})


function createWindow () {
    const ctfrDesktop = new BrowserWindow({
        width: 1366,
        height: 768,
        center: true,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    
    ctfrDesktop.setMenuBarVisibility(false)
    ctfrDesktop.loadFile('./views/index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})