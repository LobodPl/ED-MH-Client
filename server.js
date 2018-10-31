const io = require('socket.io')(3000, {
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });
  var userConnected = [];
io.on("connect", (socket)=>{
    var user = "";
    console.log("Client connected");
    socket.on("Auth-r",(data,err)=>{
        console.log("User Authorited as: "+data);
        userConnected.push(data);
        console.log("Connected users: "+userConnected);
        user = data;
        socket.broadcast.emit("Wing-Status",{"name":user,"status" : "Online"})
    })
    socket.on("check-wing",(data)=>{
        var wingOnline=[];
        for(var i = 0;i<data.length;i++){
            if(userConnected.indexOf(data[i])!=-1) socket.broadcast.emit("Wing-Status",{"name":data[i],"status" : "Online"});
        }
        socket.emit("Wing-Online",wingOnline)
    });
    socket.on('disconnect', function () { 
        index = userConnected.indexOf(user);
        userConnected.splice(index,1);
        socket.broadcast.emit("Wing-Status",{"name":user,"status" : "Offline"})
        console.log("Client disconnected: "+user);
    });
    socket.on("Wing-Mission-prop",(data)=>{
        console.log(data)
        socket.broadcast.emit("Wing-Mission",data);
    });
})

