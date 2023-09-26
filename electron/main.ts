import { app, BrowserWindow, ipcMain, Menu, MenuItem } from 'electron'
import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']



function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  })
  
  // const menu = new Menu();

  // menu.append(new MenuItem({
  //   label: 'Electron',
  //   submenu: [{
  //     role: 'help',
  //     accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
  //     click: () => { console.log('Electron rocks!') }
  //   }]
  // }))
  
  // Menu.setApplicationMenu(menu)


  win.webContents.openDevTools()

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }


  // USB
  let grantedDeviceThroughPermHandler

  win.webContents.session.on('select-usb-device', (event, details, callback) => {
    // Add events to handle devices being added or removed before the callback on
    // `select-usb-device` is called.
    win.webContents.session.on('usb-device-added', (event, device) => {
      console.log('usb-device-added FIRED WITH', device)
      // Optionally update details.deviceList
    })

    win.webContents.session.on('usb-device-removed', (event, device) => {
      console.log('usb-device-removed FIRED WITH', device)
      // Optionally update details.deviceList
    })

    event.preventDefault()
    if (details.deviceList && details.deviceList.length > 0) {
      const deviceToReturn = details.deviceList.find((device) => {
        return !grantedDeviceThroughPermHandler || (device.deviceId !== grantedDeviceThroughPermHandler.deviceId)
      })
      if (deviceToReturn) {
        callback(deviceToReturn.deviceId)
      } else {
        callback()
      }
    }
  })

  win.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    if (permission === 'usb' && details.securityOrigin === 'file:///') {
      return true
    }
  })

  win.webContents.session.setDevicePermissionHandler((details) => {
    if (details.deviceType === 'usb' && details.origin === 'file://') {
      if (!grantedDeviceThroughPermHandler) {
        grantedDeviceThroughPermHandler = details.device
        return true
      } else {
        return false
      }
    }
  })

  win.webContents.session.setUSBProtectedClassesHandler((details) => {
    return details.protectedClasses.filter((usbClass) => {
      // Exclude classes except for audio classes
      return usbClass.indexOf('audio') === -1
    })
  })

}

app.on('window-all-closed', () => {
  // win = null
  app.quit();
})

app.whenReady().then(createWindow)


ipcMain.on('login-info', (event, args) => {
  console.log(args);
  
})
