var socket = io.connect('http://localhost:3000')
var input = document.querySelector('#test')
var button = document.querySelector('#send')
var messages = document.querySelector('#messages')
var submit = document.querySelector('#submit')
var messageArea = document.querySelector('#messageArea')
var userFormArea = document.querySelector('#userFormArea')
var userForm = document.querySelector('#userForm')
var username = document.querySelector('#username')
var users = document.querySelector('users')

socket.on('connection', function(data){
    console.log(data)

})

button.addEventListener('click', function(e){
    e.preventDefault()
    var val = input.value

    socket.emit('addMessage', val)
})

socket.on('messageAdded', function(data){
    messages.innerHTML += data + '</br>'
})


submit.addEventListener('click', function(e){
    console.log('logged in here...')
    e.preventDefault()
    var name= username.value

    socket.emit('addUser', name, function(data){
        if(data) {
            userFormArea.hide()
            messageArea.show()
        }
    })
    socket.on('get users', function(data){
        for(i = 0; i < data.length; i++){
        users.innerHTML += '<li class="onlineUsers">' + data[i] + '</li>'
        }
        // users.innerHTML(html)
    })
})
   
