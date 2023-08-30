const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../src/preload/preload.js') // Will run this script before
            //To "attach"both renderer globals, window and document
        },
        center: true,
        autoHideMenuBar: true,
        title: 'POS'
    })

    // win.loadFile('./public/index.html')
    win.loadFile(`${path.join(__dirname, '../public/index.html')}`)
}

app.whenReady().then(() => {
    createWindow()
})