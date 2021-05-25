import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ListUsers from '../components/ListUsers'
import PostFeed from '../components/PostFeed'
const Main = (props) => {



    return (
        <div>
            <h1>Welcome CodingDojo Alum!</h1>
            <p>This application is designed to be a center for CodingDojo alumni to communicate about upcoming job opportunities, to continue assisting eachother on code questions, and to share fun and new information!</p>
            <div className="container">
                <div className="row align-items-start">
                    
                    <PostFeed className="col-3"/>
                </div>
            </div>
        </div>
    )
}
export default Main;
