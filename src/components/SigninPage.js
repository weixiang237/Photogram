import React, { useState, useEffect }from 'react'
import { Button, Input } from '@material-ui/core'
import logo from '../icons/photogram_logo.jpeg'
import '../SigninPage.css'
import { auth } from '../firebase'

function SigninPage (){

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showRegister, setShowRegister] = useState(false)

    useEffect(() =>{
        setUsername('')
        setPassword('')
        setEmail('')
      }, [showRegister])


    function handleShowRegister (e){
        e.preventDefault();
        console.log('you clicked register')
        setShowRegister(!showRegister)
    }

    function handleSignin (e){
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .catch((error)=> alert(error.message))
    }

    function handleRegister (e){
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((result) =>{
            result.user.updateProfile({
                displayName: username
            })
        })
        .catch((error)=> alert(error.message))
        setShowRegister(!showRegister)
    }

    return (
        <form className = 'signin_form'>
            <center>
                <img
                    className = "sigin_logo"
                    src = {logo}
                    alt=""
                />
            </center>
            <div className = 'form_fields'>
                {showRegister ?
                <div className = 'register_fields'>
                    <Input
                        placeholder = 'username'
                        type = 'text'
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder = 'email'
                        type = 'text'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder = 'password'
                        type = 'password'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    <Button type = 'submit' className = 'register_button' onClick = {handleRegister}>Register</Button>
                    <div className = 'reigiser_fields'>
                        <h4>Have an account? <span className='reigster_button' onClick ={handleShowRegister}>Sign in</span></h4>
                    </div>
                </div>
                :
                <div className = 'signin_fields'>
                    <Input
                        placeholder = 'email'
                        type = 'text'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder = 'password'
                        type = 'password'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    <Button type = 'submit' className = 'signin_button' onClick = {handleSignin}>Sign in</Button>
                    <div className = 'reigiser_fields'>
                        <h4>Need an account? <span className='reigster_button' onClick ={handleShowRegister}>Register</span></h4>
                    </div>
                </div>
             }
            </div>
        </form>
    )  
}

export default SigninPage