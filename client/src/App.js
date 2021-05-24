import React, {useState, useEffect} from 'react';
import { Router } from '@reach/router';
import './App.css';
import axios from 'axios';
import Main from './views/Main';
import LogReg from './views/LogReg';
import NavBar from './components/NavBar';
import UpdatePost from './components/UpdatePost';
import NewPost from './components/NewPost'
import ListUsers from './components/ListUsers';
import UserProfile from './components/UserProfile';

function App() {
  const [status, setStatus] = useState("logged-out")
  const updateStatus=(status)=>{
    setStatus(status)
  }

  // Get all users for list users, and single user for the profile page
  const [currentUser, setCurrentUser] = useState();
  useEffect(()=> {
    axios.get('http://localhost:8000/api/user/currentUser',{withCredentials:true})
    .then(res=>{
        setCurrentUser(res.data[0]);
        console.log(res.data[0])
    });
  },[])

  return (
    <div className="App">
      <div className="container-flex">
        <NavBar status={status} updateStatus={updateStatus} user={currentUser} setUser={setCurrentUser}/>
      </div>
      <Router>
        <Main status={status} updateStatus={updateStatus} path="/home" default/>
        <ListUsers path="/users" />
        <UserProfile user={currentUser} path="/users/profile" />
        <LogReg path="/login" user={currentUser} setUser={setCurrentUser} updateStatus={updateStatus}/>
        <UpdatePost path="post/update/:id"/>
        <NewPost path="post/new" />
      </Router>
    </div>
  );
}

export default App;
