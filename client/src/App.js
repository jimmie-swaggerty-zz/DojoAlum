import React, {useState} from 'react';
import { Router } from '@reach/router';
import './App.css';
import Main from './views/Main';
import LogReg from './views/LogReg';
import NavBar from './components/NavBar';
import UpdatePost from './components/UpdatePost';
import NewPost from './components/NewPost'

function App() {
  const [status, setStatus] = useState("logged-out")
  const updateStatus=(status)=>{
    setStatus(status)
  }

  return (
    <div className="App">
      <div className="container-flex">
        <NavBar status={status} updateStatus={updateStatus}/>
      </div>
      <Router>
        <Main status={status} updateStatus={updateStatus} path="/home" default/>
        <LogReg path="/login"  updateStatus={updateStatus}/>
        <UpdatePost path="post/update/:id"/>
        <NewPost path="post/new" />
      </Router>
    </div>
  );
}

export default App;
