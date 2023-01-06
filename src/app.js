import server from "./backend/server.js"

let users = [];
let tweets = [];


server.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    const user = {
        username: username,
        avatar: avatar
    }

    // for (let index = 0; index < users.length; index++) {
    //     if (users[index].username === user.username) {
    //         console.log('ja existe!')
    //         return
    //     }
    // }

    users.push(user);
    console.log(users);

    res.send(users);
});

server.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    const tweetPost = {
        username: 'jose',
        tweet: tweet
    }

    for (let index = 0; index < users.length; index++) {
        if (users[index].username === tweetPost.username) {
            tweets.push(tweetPost);
            console.log(tweets)
            return
        }
    }

    console.log('UNAUTHORIZED!')

    res.send(tweetPost);

});

server.get("/tweets", (req, res) => {
    res.send(tweets)
})
