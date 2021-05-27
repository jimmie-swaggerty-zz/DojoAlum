import React from 'react';
import ListUsers from '../components/ListUsers'
import PostFeed from '../components/PostFeed'
import NewPost from '../components/NewPost'
const Main = (props) => {



    return (
        <div>
                <h1>Welcome CodingDojo Alum!</h1>
            <div className="headerbody">
                <p className="welcome">This application is designed to be a center for CodingDojo alumni to communicate about upcoming job opportunities, to continue assisting eachother on code questions, and to share fun and new information!</p>
            </div>
            <div className="container-fluid">
                <div className="row align-top">
                    <div className="col">       
                        <ListUsers/>
                    </div>
                    <div className="col-8">
                        <NewPost/>  
                        <PostFeed user={props.user}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main;
