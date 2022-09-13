const express = require('express');
const app = express();
const cors = require('cors')
const port = 8000;

const io = require('socket.io')(5000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    return res.json({
        "message": "Sever formed successfully",
        "by": "Navneet"
    })
})

io.on("connection", socket => {
    socket.emit('me', socket.id);  // when I joined the chat server

    socket.on('disconnect', () => {
        socket.broadcast.emit("callended");
    })
    socket.on('calluser', ({ usertocall, signaldata, from, name }) => {
        io.to(usertocall).emit("calluser", { signal: signaldata, from, name })
    })
    socket.on('answercall', (data) => {
        io.to(data.to).emit("callaccepted", data.signal)
    })
})
app.listen(port, () => {
    console.log(`Server started at port http://localhost:${port}`);
})
