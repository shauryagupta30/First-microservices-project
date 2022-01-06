/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
//2 route handlers

const posts = {};
/*
structure of post

posts === {
    '12345':{
        id:'12345',
        title:'post123',
        comments: [{id:'456',content:'This is the comment'},{},{}]
    },
    '09864':{
        id:'09864',
        title:'post123',
        comments: [{id:'456',content:'This is the comment'},{},{}]
    }
}

*/ 


/*


//anyone who wants to get the entire collection of posts hits this endpoint to get the whole post object
app.get('/posts', (req, res) => {
    res.send(posts);
});

//endpoint that recieves events from event bus
app.post('/events', (req, res) => {
    const {type,data} = req.body;
    if(type==='PostCreated'){
        const {id,title} = data;
        posts[id] = {title, comments:[]}
    }
    else if(type==='CommentCreated'){
        const {id,content,postId} = data;
        const post = posts[postId];
        post.comments.push({id, content });
    }
    console.log(posts);
    res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
//syncing the creaton of coment at query
  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }
  //updating the comment after moderation changes from comment srvice
  if(type === 'CommentUpdated'){
    const {id,content,postId,status} = data;
    const comment = post.comment.find(comment => {
      return comment.id == id;
    });
    comment.status = status;
    comment.content = content;
  }

  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
