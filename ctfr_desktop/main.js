const { app, BrowserWindow } = require('electron')
const path = require('path')
const { stdout } = require('process')

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
    const { exec } = require('child_process')

    exec('taskkill /f /t /im app.exe', (err, stdout, stderr) => {
        if (err) {
            console.log(err)

            return
        }

        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
    })
    app.quit()
})