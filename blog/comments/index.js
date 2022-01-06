const express = require('express');
const cors = require('cors');
const bodyParser = require('body-Parser');
const {randomBytes} = require('crypto');
const app = express();const axios = require('axios')
app.use(bodyParser.json());
app.use(cors()); //use this as a middleware
//storage
const commentsByPostId = {};

//route handler
app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req,res)=>{
//creation of a comment
    const commentId = randomBytes(4).toString('hex');
    //incoming post id
    const {content}  = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id:commentId,content,status:'pending'});
    commentsByPostId[req.params.id] = comments;
    await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status:'pending'
    }
  });
    res.status(201).send(comments);
});

app.post('/events',(req,res)=>{
    console.log('recevied Event',req.body.type);

    res.send({});
})

app.listen(4001,(req,res)=>{
    console.log('Listening on 4001');
});