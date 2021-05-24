const express = require('express')
const cors = require('cors');
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({
    extend: false
}));
app.use(express.json());
app.use(cors());

const rooms = [];

app.get('/', (req, res) => {
   res.render("index", {rooms: rooms});
})

app.get('/api/rooms', (req, res) => {
    console.log('got request')
    res.json(rooms);
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

app.post('/addroom', (req, res) => {
    if(!req.body.roomName){
        return res.send('invalid input')
    }
    var checkExists = rooms.filter(room => {
        return room.roomName == req.body.roomName
    });
    if(checkExists.length > 0){
        return res.send('room already exists')
    }
    const roomid = uuidV4();
    const room = {
        roomName: req.body.roomName,
        roomId: roomid
    };
    rooms.push(room);
    res.redirect(`/${roomid}`);
});

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)