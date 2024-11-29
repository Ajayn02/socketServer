const expres=require("express")
const http=require('http')
const {Server}=require('socket.io')


const server=expres()

const socketServer=http.createServer(server)
const io=new Server (socketServer,{
    cors:{
        origin:"https://realspace-ajays-projects-0d4c86c6.vercel.app"
    },

})
io.on("connection",(socket)=>{
    // console.log(`socket io connected to ${socket.id}`);
    // console.log(socket);
    
    // socket.on("roomId",(id)=>{
    //     socket.join(id)
    //     console.log(`user-${socket.id} joined room-${id}`);
    //     // socket.emit("res",msg)
    // })

    socket.on("newmsg",(data)=>{
        // console.log(data);
        socket.broadcast.emit("receive_msg",data)
        // socket.emit("receive_msg",data)

    })

    socket.on("disconnect",()=>{
        // console.log(`user disconnected ${socket.id}`);
        
    })
    
})

const PORT=3001 || process.env.PORT

socketServer.listen(PORT,()=>{
    console.log("socket server running ");
    
})
