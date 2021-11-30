'use-strict';

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

require('./server.js')
const User = require('./models/user.js')

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

function createWindow () {
    const ctfrWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        center: true,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
    })

    ctfrWindow.setMenuBarVisibility(false)
    ctfrWindow.loadFile('./views/index.html')
}

ipcMain.on('get-users', async (e, arg) => {
    const users = await User.find()
    e.reply('get-users', JSON.stringify(users))
})

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})