'use-strict';

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

require('./server.js')
const User = require('./models/user.js')
const UserInfo = require('./models/userInfo.js')

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

    User.aggregate([
        {
            $lookup: {
                from: 'userinfos',
                localField: '_id',
                foreignField: 'userId',
                as: 'info'
            }
        }
    ]).then(res => {
        res.forEach(user => e.reply('get-users', JSON.stringify(user)));
    })

    //e.reply('get-users', JSON.stringify([users, userInfo]))
})

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})