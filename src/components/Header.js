import { React } from 'react'
import logo from '../icons/photogram_logo.jpeg'
import { Button } from '@material-ui/core'
import { auth } from '../firebase'
import NewPost from './NewPost'

function Header ({username}) {

    return(
        <div className = "header">
            <img
                className = "header_logo"
                src = {logo}
                alt=""
            />
            <div className = 'header_fields'>
                <NewPost username = {username}/>
                <Button  onClick = {() => auth.signOut()}>Sign out</Button>
            </div>
        </div>
    )
}
export default Header