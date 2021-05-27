import React from 'react'
import {navigate} from '@reach/router'
import axios from 'axios';
const DeleteButton = (props) => {
    const {pid} = props;
    const deleteEvent = e => {
        axios.delete('http://localhost:8000/api/post/'+pid,{
            withCredentials: true
          } )
            .then(res=>{
                console.log(pid);
                navigate ('http://localhost:3000/')
            })
    }
    return (
        <button id="delete-button" onClick={(e)=> deleteEvent()} className="btn btn-light btn-outline-primary">
            Delete
        </button>
    )
}
export default DeleteButton;