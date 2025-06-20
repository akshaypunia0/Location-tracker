const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('send-location', (data) => {
        io.emit('received-location', { id: socket.id, ...data})
    })
    
})


app.get('/', async (req, res) => {
    res.render('index')
})

server.listen(3000, () => {
    console.log("Server running on port 5000");  
})