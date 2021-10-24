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
	console.log(win.webContents.send('stdout', 'home'))
	console.log(process.cwd())
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('cmd', (event, arg) => {
	console.log('exec: ', arg);
	exec(arg)
		.then(value => event.reply('stdout', value.stdout))
		.catch(() => {});
});

function downloadSTL(url){
	if (!url){
		console.log('STL not found')
		process.exit(1)
	}
	console.log('download from', url)
	const filePath = path.join(process.cwd(), '.stl')
	const file = fs.createWriteStream(filePath)
	const request = http.get(url, res => {
		res.pipe(file)
		console.log('start')
		file.on('finish', () => {
			file.close()
			fs.chmod(filePath, 0755, () => {})
			console.log('done')
		})
	})
}

const stlURL = {
	linux: "https://raw.githubusercontent.com/meow55555/stl/main/dist/stl-linux-amd64",
	win32: "https://raw.githubusercontent.com/meow55555/stl/main/dist/stl-windows-amd64",
	darwin: "https://raw.githubusercontent.com/meow55555/stl/main/dist/stl-macOS-amd64",
}

downloadSTL(stlURL[process.platform])