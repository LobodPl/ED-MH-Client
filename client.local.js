var io = require('socket.io-client');
const socket = io("ws://localhost:8080");
socket.on('connected',(socket)=>{
    console.log("Connecting Success");
});
socket.emit("Auth-r","Bazyliszek")
socket.on("Wing-Online",(data)=>{
    console.log(data);
});
socket.on("Wing-Status",(data)=>{
    console.log(data)
})
socket.on("Wing-Mission",(data)=>{
    console.log(data)
});
setTimeout(() => {
    socket.emit("Wing-Mission-prop",[ [ 'Lobod' ],
    { name: 'Robotics',
      count: 880,
      delivered: 0,
      id: 427813006,
      Wing: true } ])
}, 1500);