const { ipcRenderer } = require('electron');


cmd = document.querySelector('#cmd');
stdout = document.querySelector('#stdout');

ipcRenderer.on('msg', (e, msg) => console.log(msg))
ipcRenderer.on('alert', (e, msg) => console.log(msg))
ipcRenderer.on('stl-stdout', (e, msg) => console.log(msg))

function stl(cmd){
	ipcRenderer.send('stl', cmd)
}

var con= document.getElementById("connect");
con.onclick = function(){

}

var reg= document.getElementById("register");
reg.onclick = function(){

}

