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
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const {data} = await axios.get('http://localhost:8000/api/user/list')

      setUsers(data)
    }

    fetchUsers()
  }, [])

  return (
    <div className="App">
      <div className="container-flex">
        <NavBar status={status} updateStatus={updateStatus}/>
      </div>
      <Router>
        <Main status={status} updateStatus={updateStatus} path="/home" default/>
        <ListUsers users={users} userId={userId} setUserId={setUserId} path="/users" />
        <UserProfile users={users} userId={userId} setUserId={setUserId} path="/users/profile" />
        <LogReg path="/login"  updateStatus={updateStatus}/>
        <UpdatePost path="post/update/:id"/>
        <NewPost path="post/new" />
      </Router>
    </div>
  );
}

export default App;
