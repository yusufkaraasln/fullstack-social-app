const io = require('socket.io')(8900,{
    cors : {
        origin : 'http://localhost:3000'
    }

});

let users =[]

const sendUser = (userId,socketId)=>{
    !users.some(user=>user.userId === userId) && users.push({userId,socketId})
}

    const getUser = (userId)=>{
        return users.find(user=>user.userId === userId)
    }




io.on("connection",(socket)=>{
    //connect a user
    console.log("a user connected");

    socket.on("sendUser",(userId)=>{
            sendUser(userId,socket.id)
            io.emit("getUsers",users)
    })

    //send a message 
    socket.on("sendMessage",({senderId,text,receiverId})=>{
            const user = getUser(receiverId)
            io.to(user.socketId).emit("getMessage",{senderId,text})
    })


    //disconnect a user
    socket.on("disconnect",()=>{
        console.log("user disconnected");
        users = users.filter(user=>user.socketId !== socket.id)
        io.emit("getUsers",users)
    } )

})