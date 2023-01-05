import server from "./backend/server.js"

let users = [];

server.get("/", (req, res) => {
    res.send(users)
})

server.post("/sign-up", (req, res) => {
    const user = {
        nome: req.body.username,
        avatar: req.body.avatar
    }
    console.log(user);
    users.push(user);

    res.send(users);
});

server.get("/tweets", (req,res) => {

    res.send('ok!')
})
