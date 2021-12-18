//get access to express
//setup 2 different route handlers
const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
//////////////////////////
//object incharge to store the data generated (We use no DB for this toy app)
//We save data/info 

const posts = {}; //repository


////////////////////////////
//make 2 different routes to the app we created12

app.get('/posts',(req,res)=>{
//implementation of route handlers
    res.send(posts);
});

app.post('/posts',(req,res)=>{
//implementation of route handlers

//randomly generate an id and atatch it to the object sent by the user
const id =  randomBytes(4).toString('hex');

//post is sent with title and body

const {title} = req.body;
posts[id]={id,title};

//send a response to the user
res.status(201).send(posts[id]);

});


//listening on a port
app.listen(4000,()=>{
    console.log('Listening on 4000');
});


/*
We need to uniquely identify the posts

*/ 