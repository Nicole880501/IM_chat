"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

// // 接收伺服器傳來的連線人數更新
// connection.on("UpdateConnectionCount", function (count) {
//     document.getElementById("connectionCount").textContent = count;
// });

// 當收到更新連線人數的事件時，更新顯示的訊息
connection.on("UpdateConnectionCount", function (count) {
    // 更新畫面上顯示的人數
    document.getElementById("connectionCount").textContent = count;
});

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
