const app=require("express")();
const server=require("http").createServer(app);

const io=require("socket.io")(server,{
    cors: {
      origin: "http://localhost:5173"
    }
})

app.get("/",(req,res)=>{
    res.send("Server is running");
})

socketToRoom={}
rooms={};

io.on('connection',(socket)=>{ 
    socket.on('join',data=>{ 
        const roomId=data.roomid;
        if(!rooms[roomId]){
            rooms[roomId]=[{name:data.name,id:roomId}]
        }
        else{
            rooms[roomId].push({name:data.name,id:roomId})
        }
        socketToRoom[socket.id]=roomId
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-joined");
    })

    // offer broadcast
    socket.on("offer", (offer) => {
        const roomId = socketToRoom[socket.id];
        socket.broadcast.to(roomId).emit('getoffer', offer);
    });

    // answer broadcast
    socket.on("answer", (answer) => {
        const roomId = socketToRoom[socket.id];
        socket.broadcast.to(roomId).emit('getanswer', answer);
    });

    socket.on('candidates', candidate => {
        const roomId = socketToRoom[socket.id];
        socket.broadcast.to(roomId).emit('getcandidates', candidate);s
    });

    socket.on('close',()=>{
        socket.emit('closed')
    })

    socket.on("disconnect", () => {
        const roomId = socketToRoom[socket.id];
        if (rooms[roomId]) {
            rooms[roomId] = rooms[roomId].filter(user => user.id !== socket.id);
        }
    });
})

server.listen(8000,()=>{
    console.log("Server started");
})