const app = require("express");
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {

    socket.on("line", (msg) => {
        console.log(msg);
    });

});

http.listen(3000, () => {
  console.log("listening on *:3000");
});