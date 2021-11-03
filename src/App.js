import './App.css';
import React, { useState, useEffect } from 'react'
import SigininPage from './components/SigninPage'
import MainPage from './components/MainPage'
import Header from './components/Header'
import { auth } from './firebase'

function App() {
  const [user, setUser] = useState(null)
  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
      }
      else{
        setUser(null);
      }
    })
    return () =>{
      unsubscribe();
    }
  }, [user])
  return (
        <div className="App">
        {
          user != null ? 
          <div className = 'Logged'>
            <Header username = {user.displayName}/>
            <MainPage/>
          </div>
          :
          <div className = 'unLogged'>
            <SigininPage/>
          </div>
        }
        
        </div>
  );
}

export default App;
