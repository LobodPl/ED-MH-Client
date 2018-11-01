const $ = require('jquery');
const { remote } =require('electron');
var ipc = require('electron').ipcRenderer;
var win = remote.getCurrentWindow();
$("#close").click(function(){
    win.close();
})
$("#min").click(function(){
    win.minimize();
})
ipc.on('location-reply', function (event, arg) {
    var loc = JSON.parse(arg);
        $(".location")[loc.id].innerText = loc.loc;
  })
ipc.on('update-reply', function (event, arg) {
    update(arg);
    event.sender.send("test","");
    event.sender.send("lb",document.body.clientHeight);
    setTimeout(() => {
        update(arg);
    }, 200);
  })
  ipc.on('pos-reply', function (event, arg) {
    event.sender.send("ltest","");
  })
  ipc.on('wing-reply', function (event, arg) {
    $(arg[0])[0].src="./app/icon_"+arg[1]+"_"+arg[2]+".svg";
  })
  ipc.on('wing-name', function (event, arg) {
    $(arg[0])[0].title=arg[1];
  })
  ipc.on('wing-status', function (event, arg) {
      if(arg[1]=="on")$(arg[0])[0].style.display="inline";
      else $(arg[0])[0].style.display="none";
  })
  ipc.on('pos-reply', function (event, arg) {
    event.sender.send("ltest","");
  })
function update(arg){
    var html = "";
    var elements = ""
    list = JSON.parse(arg);
    if (list.length>0){
        for(var i =0;i<list.length;i++){
            elements+=`<p>${list[i].name} : ${list[i].count}</p><p class="location" style="font-size:45%;">Loading...</p>`
        }
        var html=`<b>${elements}</b>`;
    }
    else var html=`<b>No data to display</b>`;

    $('.card-title')[0].innerHTML = html;
}
