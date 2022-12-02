const { Server } = require('socket.io')
const io = new Server(3002);

var Socket = {
    emit: function (event, data) {
        console.log(event, data);
        io.sockets.emit(event, data);
    }
};


io.on("connection", socket => {
    console.log(socket.id);
    
    //Private Chat
    const id = socket.handshake.query.id
    socket.join(id)

    // socket.on('send-message', ({ recipients, text }) => {
    //     recipients.forEach(recipient => {
    //         const newRecipients = recipients.filter(r => r !== recipient)
    //         newRecipients.push(id)
    //         socket.broadcast.to(recipient).emit('receive-message', {
    //             recipients: newRecipients, sender: id, text
    //         })
    //     })
    // })
    // Group Chat
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User Joined Room: " + data);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data.content);
    });



    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
    });
    
    //private
    // socket.on('subscribe', function(room) {
    //     console.log('joining room', room);
    //     socket.join(room);
    // });

    // socket.on('send message', function(data) {
    //     console.log('sending room post', data.room);
    //     socket.broadcast.to(data.room).emit('conversation private post', {
    //         message: data.message
    //     });
    // });
    //
    // chatID = socket.handshake.query.chatID
    //     socket.join(chatID)
    //     console.log(chatID,"chatID");

    //     //Leave the room if the user closes the socket
    //     socket.on('disconnect', () => {
    //         socket.leave(chatID)
    //     })

    //     //Send message to only a particular user
    //     socket.on('send_message', message => {
    //         receiverChatID = message.receiverChatID
    //         senderChatID = message.senderChatID
    //         content = message.content

    //         //Send message to only that particular room
    //         socket.in(receiverChatID).emit('receive_message', {
    //             'content': content,
    //             'senderChatID': senderChatID,
    //             'receiverChatID':receiverChatID,
    //         })
    //     })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});


exports.Socket = Socket;

exports.io = io;
