const { ipcRenderer } = require('electron');


cmd = document.querySelector('#cmd');
stdout = document.querySelector('#stdout');

ipcRenderer.on('msg', (e, msg) => console.log(msg))
ipcRenderer.on('alert', (e, msg) => stdout.value += msg + '\n')

function stl(cmd){
	ipcRenderer.send('stl', cmd)
}
