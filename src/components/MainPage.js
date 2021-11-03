import React, { useState, useEffect } from 'react'
import PostCard from './Cards/PostCard'
import { db } from '../firebase'


function MainPage () {
    const [posts, setPosts]  = useState([])

    useEffect(() =>{
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
          setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
          })))
        })
      }, [])

    return(
        <div className = 'mainPage'>
          <div className ='mainPage_posts'>
            {
            posts.map(({id, post}) => (
            <PostCard key={id} username = {post.username} image = {post.imageUrl} text = {post.caption}/>
            ))
            }
          </div>
        </div>
        
    )
}

export default MainPage