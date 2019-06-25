const express = require("express");
const app = express();
/*
const server = require('http').Server(app);
const io = require('socket.io')(server);*/

const http = require('http');

const server = http.createServer(app);
const io = require('socket.io').listen(server);
 

app.get('/', (req, res)=>{
 //  res.send('Hello, World');
  console.log(__dirname);
  res.sendFile(__dirname + '/view/index.html');
})
/*
io.on('connection', (socket)=>{
  console.log('Hello');
  onlineCount ++;
  io.emit("online", onlineCount);
  socket.on("greet", ()=>{
    socket.emit("greet", onlineCount);
  });
  socket.on('disconnect', ()=>{
   
    onlineCount = (onlineCount < 0)? 0:onlineCount -=1;
    io.emit("online", onlineCount);
    console.log('Bye~');
  });
});
*/

// 加入線上人數計數
let onlineCount = 0;
 
// 修改 connection 事件
io.on('connection', (socket) => {
    // 有連線發生時增加人數
    onlineCount++;
    // 發送人數給網頁
    io.emit("online", onlineCount);
 
    socket.on("greet", () => {
        socket.emit("greet", onlineCount);
    });
   
    socket.on("send", (msg) => {
       //console.log(msg);
        io.emit("msg", msg);
    });

    socket.on('disconnect', () => {
        // 有人離線了，扣人
        onlineCount = (onlineCount < 0) ? 0 : onlineCount-=1;
        io.emit("online", onlineCount);
    });
   
});



server.listen(3000, ()=>{

  console.log("Server Stared. http://localhost:3000");

});
