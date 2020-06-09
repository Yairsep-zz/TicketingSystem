import React, {useState} from 'react';
import {createApiClient} from '../api';
import '../comment.css';
const api = createApiClient()

function Comment(props){

    const [status , setStatus] = useState(props.comment !== undefined);
    const [reply , setReply] = useState(status);
    const [comment , setComment] = useState(props.comment)

    function handleSubmit() {
        const respo = api.comment(props.ticket_Id ,comment)
        setStatus(true);
    }

    function handleReply() {
        setReply(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setComment(value)
    }

    return (<div>
        {!reply ? <button className='comment' onClick={() => handleReply()}>Reply</button> : !status ? <div><input type='text' name="comment" onChange={handleChange} placeholder="Write your comment:"/><button className='comment' onClick={handleSubmit}>Comment</button></div>: <div><h3>Comment:</h3>{comment}</div> }
    </div>)
}

export default Comment;