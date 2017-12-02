'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 1600, height: 800});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    // on mac, close explicitly win Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('active', function() {
    // on mac, recreate window on dock click, when none is open
    if (mainWindow === null) {
        createWindow();
    }
});