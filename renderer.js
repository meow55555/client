const { ipcRenderer } = require('electron');
cmd = document.querySelector('#cmd');
stdout = document.querySelector('#stdout');
document.querySelector("#exec").onclick = (event) => {
	stdout.value += `$ ${cmd.value}\n`;
	ipcRenderer.send('cmd', cmd.value);
};

ipcRenderer.on('stdout', (e, arg) => {
	console.log(arg)
	stdout.value += arg
});

ipcRenderer.on('msg', (e, arg) => console.log(arg))
