const express = require('express');

const app = express();

const Post = require('./post.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

let cors = require('cors');

const corsConfi = {
  origin: "http://localhost:3002",
  credentials: true
}
app.use(cors(corsConfi));

app.get('/post', (req, res)=>{
    // res.header("Access-Control-Allow-Origin", "*");
    res.json(Post.getALLIDs());
    return;
});

app.get('/post/:id',(req, res)=> {
    let l = Post.findByID(req.params.id);
    if (l == null){
        res.status(404).send("No such post");
        return;
    }
    res.json(l);

});

app.post('/post', (req, res) => {
    let {date, locationID, review} = req.body;

    let l = Post.create(date, locationID, review);
    if(l == null){
        res.status(400).send("Bad request");
        return;
    }
    return res.json(l);

})

app.put('/post/:id', (req,res)=> {
    let l = Post.findByID(req.params.id);
    if (l == null){
        res.status(404).send("No such location");
        return;
    }
    
    let {date, locationID, review} = req.body;
    l.date = date;
    l.locationID = locationID;
    l.review = review;

    l.update();

    res.json(l);

});

app.delete('/post/:id', (req, res) => {
    let l = Post.findByID(req.params.id);
    if(l==null){
        res.status(404).send("location not found");
        return;
    }
    l.delete();
    res.json(true);
});
const port = 3005;

app.listen(port, ()=>{
    console.log("app running on port " + port);
});