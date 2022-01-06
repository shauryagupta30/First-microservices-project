const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
//we need only 1 reoute handler
app.post('/events', async (req, res) => {
//this is where we recieve the event form the broker
//event in req
const {type,data} = req.body;
if(type === 'CommentCreated')
{
    const status = data.content.include('orange') ? 'rejected' : 'approved';
    await axios.post('http://localhost:4005/events',{
        type:'CommnetModerated',
        data:{
            id: data.id,
            postId: data.postId,
            status,
            content: data.cotent
            //we might need documentaiton of comment properties
        }
    });
}

res.send({});
//this code processes/mdoerates the comment  and send the reques back to the event bus 

});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
