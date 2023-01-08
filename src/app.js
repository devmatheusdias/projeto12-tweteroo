import server from "./backend/server.js"

let users = [];
let tweets = [];
let av;


server.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    av = avatar

    const user = {
        username: username,
        avatar: avatar
    }

    users.push(user);

    res.send(users);
});


server.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    let usuario = users.find(usuario => usuario.username === username);

    if (!usuario) {
        res.send('UNAUTHORIZED')
        return;
    }

    tweets.push(req.body)

    res.send(tweets)
});

server.get("/tweets", (req, res) => {
    
    const newTweets = [];

    tweets.map((tweet) => {
        let newTweet = {
            'username': tweet.username,
            'avatar': '',
            'tweet': tweet.tweet
        };
        newTweets.push(newTweet)
    })

    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < newTweets.length; j++) {
            if(users[i].username == newTweets[j].username){
                newTweets[j].avatar = users[i].avatar
            }
        }
    }


    console.log(newTweets)
    res.send(newTweets)
})
