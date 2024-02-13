const socket = io();

const inputName = document.getElementById('name');
const buttonSubmitName = document.getElementById('submitName');
const divAllMessages = document.getElementById('messages');
const inputNewMessage = document.getElementById('newMessage');
const buttonSubmitMessage = document.getElementById('submitMessage');
let user = "";

buttonSubmitName.addEventListener('click',()=>{
    if(inputName.value.trim().length > 0){
        user = inputName.value;
        buttonSubmitName.firstChild.data = "✓"
    }
    else {
        user = "";
        buttonSubmitName.firstChild.data = "x"
    }
});


socket.on('chat', ({messages})=>{
    divAllMessages.innerHTML = "<div id='messages'></div>";
    messages.forEach(e => {
        const message = document.createElement("div");
        message.innerHTML = "<div><h4>" + e.user + ":</h4><p>" + e.message+ "</p></div>";
        divAllMessages.appendChild(message);
    });
});

const sendMessage = () => {
    if(user.length > 0 && inputNewMessage.value.trim().length > 0){
        socket.emit('newMessage', {
            user: user,
            message: inputNewMessage.value
        });
        inputNewMessage.value = "";
    }
};

buttonSubmitMessage.addEventListener('click', sendMessage);

inputNewMessage.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter') sendMessage();
});






