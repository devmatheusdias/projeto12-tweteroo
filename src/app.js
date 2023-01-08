import server from "./backend/server.js"

let users = [];
let tweets = [];


server.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    loginValidator(username, avatar, res);

    const user = {
        username: username,
        avatar: avatar
    }

    users.push(user);

    res.send('OK');
});

server.post("/tweets", (req, res) => {
    const {username, tweet} = req.body

    postValidation(username, tweet, res)

    tweets.push(req.body)

    res.send('OK')
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
            if (users[i].username == newTweets[j].username) {
                newTweets[j].avatar = users[i].avatar
            }
        }
    }


    console.log(newTweets)
    res.send(newTweets)
})

server.get("/tweets/:username", (req, res) => {
    const user = req.params.username;

    userValidation(user);

    const userPosts = [];

    tweets.map((tweet) => {
        if (tweet.username == user) {
            let userPost = {
                'username': user,
                'avatar': '',
                'tweet': tweet.tweet
            }
            userPosts.push(userPost)
        }

    })

    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < userPosts.length; j++) {
            if (users[i].username == user) {
                userPosts[j].avatar = users[i].avatar
            }
        }
    }
    console.log(userPosts)
    res.send(userPosts)
});



function loginValidator(username, avatar, res) {
    if (username === '' || avatar === '') {
        res.sendStatus(400)
    }

    try {
        let url = new URL(avatar);
        console.log('valid URL')
    } catch (err) {
        res.sendStatus(400)
        console.log('invalid URL');
    }
}

function postValidation(username, tweet, res) {

    userValidation(username, res)

    if (username === '' || tweet === '') {
        res.sendStatus(400)
    }
}

function userValidation(username, res) {
    let user = users.find(user => user.username === username);

    if (!user) {
        res.send('UNAUTHORIZED')
        return;
    }
}