'use-strict';

const { app, BrowserWindow } = require('electron')
const path = require('path')

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

function createWindow () {
    const ctfrWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    })

    ctfrWindow.setMenuBarVisibility(false)
    ctfrWindow.loadFile('./html/index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})