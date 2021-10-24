const { ipcRenderer } = require('electron');


cmd = document.querySelector('#cmd');
stdout = document.querySelector('#stdout');

ipcRenderer.on('msg', (e, msg) => console.log(msg))
ipcRenderer.on('alert', (e, msg) => console.log(msg))
ipcRenderer.on('stl-stdout', (e, msg) => console.log(msg))

function stl(cmd){
	console.log(cmd)
	ipcRenderer.send('stl', cmd)
}

window.on('ready', () => {
	var con= document.getElementById("connect");
	console.log(con)
	con.onclick = function(){

	}

	var reg= document.getElementById("register");
	reg.onclick = function(){

	}
})
