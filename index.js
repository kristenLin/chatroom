const express = require("express");

const app = express();
const es6Renderer = require('express-es6-template-engine');


/*
const server = require('http').Server(app);
const io = require('socket.io')(server);*/
const fs = require('fs');
const https = require('https');
const http = require('http');



//const server = http.createServer(app);
//const io = require('socket.io').listen(server);

// Certificate
const privateKey = fs.readFileSync('./ssl_key/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./ssl_key/cert.pem', 'utf8');
const ca = fs.readFileSync('./ssl_key/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const server = http.createServer(app);
const io = require('socket.io').listen(server);
const httpsServer = https.createServer(credentials, app);

app.engine('html', es6Renderer);
app.set('views', 'dist');
app.set('view engine', 'html');


/*****
 * To do : ingore html file
 */
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: false,
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    /**** not work */
    if (path.indexOf(".htm") > 0){
      console.log(path.indexOf(".htm"))
      return false;
    }else{
      res.set('x-timestamp', Date.now());
    }
    
  }
}



app.use(express.static('dist',options))


app.get('/', (req, res)=>{
  //  res.send('Hello, World');
   console.log(__dirname);
  
 res.render('chat-1', {locals: {
   
  title: 'Welcome!',
  chats: {
    title: "聊天室"
  },
  friend: {
    title: "朋友名單"
  },
  create_group: {
    title: "建立群組"
  },
  profile: {
    title: "個人資料"
  },
  demo: {
    title: "ＤＥＭＯ"
  }

  }});
 })


app.get('/chch', (req, res)=>{
 //  res.send('Hello, World');
  console.log(__dirname);
  res.sendFile(__dirname + '/view/index.html');
//res.send(`I'm listening Index A. Please access with POST.`);
})

app.get('/chat', (req, res)=>{
  //  res.send('Hello, World');
 
   res.sendFile(__dirname + '/view/chat-1.html');
 //res.send(`I'm listening Index A. Please access with POST.`);
 })

app.get('/i', (req, res)=>{
 //  res.send('Hello, World');
  console.log(__dirname);
  res.sendFile(__dirname + '/dist/index.html');
})

app.get('/a', (req, res) => { 
   //res.send(`I'm listening Index A. Please access with POST.`);
   res.sendFile(__dirname + '/dist/index.html');
});

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



server.listen(3010, ()=>{

  console.log("Server Stared. http://localhost:3010");

});

/*
httpsServer.listen(4499, () => {
    console.log('HTTPS Server running on port 443');
});*/
