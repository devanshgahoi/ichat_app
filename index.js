// Node server which will handle socket io connections

const http = require('http');
const httpServer = http.createServer();


const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:5500",
      methods: ["GET", "POST"]
    }
  });
  
  httpServer.listen(8000);

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        //console.log("New User", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });


    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})

