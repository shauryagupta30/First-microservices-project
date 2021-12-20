import React, { useState, useEffect } from "react";
import axios from "axios";

//Recieve {postId} as a property
const CommentList = ({ postId }) => {
    //piece of state
  const [comments, setComments] = useState([]);

  //function to fetch data
  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data);
  };
  
  //call the above function form here
  useEffect(() => {
    fetchData();// eslint-disable-next-line
  }, []);

  //mapping the data
  const renderedComments = comments.map((comment) => {
      //returning the data
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
