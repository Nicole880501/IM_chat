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

    // 分辨發送者和接收者的訊息
    if (user === document.getElementById("userInput").value) {
        li.classList.add("my-message"); // 使用自定義的樣式類別
        li.innerHTML = `<strong>You</strong>: ${message}`;

    } else {
        li.classList.add("other-message"); // 使用另一個樣式類別
        li.innerHTML = `<strong>${user}</strong>: ${message}`;

    }

    // li.innerHTML = `<strong>${user}</strong>: ${message}`;
    document.getElementById("messagesList").appendChild(li);

    // 自動滾動到訊息列表的最底部
    var messagesList = document.getElementById("messagesList");
    messagesList.scrollTop = messagesList.scrollHeight;
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
