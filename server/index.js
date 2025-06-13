import express from 'express'
import {Server} from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500
const room = "heist"

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: "*"
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
    socket.on('join', room => {
        console.log(`Joined room ${room}`)
        socket.join(room)
        socket.on('message', data => {
            io.emit('message',`${data}`)
        })
        socket.on('image', data => {
            io.emit('image', data)
        })
    })
})