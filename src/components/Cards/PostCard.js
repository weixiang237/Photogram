import { React, useState, useEffect} from 'react'
import '../../PostCard.css'
import Avatar from "@material-ui/core/Avatar"
import Button from '@material-ui/core/Button'
import { auth, db } from '../../firebase'
import firebase from "firebase/compat/app";

function PostCard ({postId, username, image, text}) {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() =>{
        const unsubscribe = db.collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot)=>{
          setComments(snapshot.docs.map(doc => ({
              id: doc.id,
              comment: doc.data()
          })))
        })
        return () =>{
          unsubscribe();
        }
    }, [postId])

    function handlePost (e) {
        e.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: auth.currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }

    return (
        <div className = "post">
            <div className = 'post_header'>
                <Avatar
                    className = 'post_avatar'
                    alt = 'Way'
                    src = '/static/images/avatar/1.jpg'
                />
                <h3 className = 'post_username'>{username}</h3>
            </div>
            <img 
                className = 'post_image'
                src = {image}
                alt =''
            />
            <h4 className = 'post_text'>
                <strong>{username} </strong>
                {text}               
            </h4>
            <div className = 'comments'>
                {comments.map(
                    ({id, comment}) =>(
                        <p key = {id}>
                            <strong>{comment.username} </strong>
                            {comment.text}
                        </p>
                    )
                )}
            </div>
            <form className = 'post_fields'>
                <input
                    className = 'post_input'
                    type = 'text'
                    placeholder = 'Add a comment...'
                    value = {comment}
                    onChange = {(e) => setComment(e.target.value)}
                />
                <Button 
                className = 'post_button' 
                disabled = {!comment}
                type = 'submit'
                onClick = {handlePost}
                >Post</Button>
            </form>
        </div>
    )
}
export default PostCard