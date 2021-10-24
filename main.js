const {
	app,
	BrowserWindow,
	ipcMain
} = require('electron');
const path = require('path');
const exec = require('util').promisify(require('child_process').exec);
const http = require('https');
const fs = require('fs');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
		autoHideMenuBar: true

	});

	win.loadFile("./index.html");
	win.webContents.on('did-finish-load', () => win.webContents.send('msg', {'SAVED': 'File Saved'}))
	return win
}

app.whenReady().then(() => {
	win = createWindow();

	const send = (...msg) => win.webContents.send(...msg)

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	});

	win.webContents.on('did-finish-load', () => {
		send('alert', 'start download stl')
		downloadSTL(stlURL[process.platform])
			.then(() => send('alert', 'download conplete'))
	})
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('stl', (e, cmd) => {
	console.log('stl:', cmd)
})

function downloadSTL(url){
	return new Promise((resl, rej) => {
		if (!url){
			resl('stl not found')
			process.exit(1)
		}
		const filePath = path.join(process.cwd(), '.stl')
		const file = fs.createWriteStream(filePath)
		const request = http.get(url, res => {
			res.pipe(file)
			file.on('finish', () => {
				file.close()
				fs.chmod(filePath, 0755, () => {})
				resl(filePath)
			})
			file.on('error', rej)
		})
	})
}

const stlURL = {
	linux: "https://raw.githubusercontent.com/meow55555/stl/main/dist/stl-linux-amd64",
	win32: "https://raw.githubusercontent.com/meow55555/stl/main/dist/stl-windows-amd64",
	darwin: "https://raw.githubusercontent.com/meow55555/stl/main/dist/stl-macOS-amd64",
}

