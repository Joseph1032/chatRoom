const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
users = [];


app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
    extended:true
}))

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html')
// })

app.use(express.static('static'))

io.on('connection', function(socket){
    console.log('Connected... ')

    socket.on('addMessage', function(data){
        io.emit('messageAdded', data)
    })

      // users
    socket.on('addUser', function(data, callback){
        console.log(data)
        if (users.indexOf(data) !== -1){
            callback(false)
        } else {
            callback(true)
            socket.username = data
            users.push(socket.username)
            updateUsernames()
        }
    })

    function updateUsernames(){
        io.emit('get users', users)
    }
})

     

server.listen(3000, function(){
    console.log('listening on port 3000')
})