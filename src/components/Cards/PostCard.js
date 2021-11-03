import React from 'react'
import '../../PostCard.css'
import Avatar from "@material-ui/core/Avatar"

function PostCard ({username, image, text}) {
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
                <strong>{username}</strong>
                {text}               
            </h4>
            <div className = 'post_comments'>
            </div>
        </div>
    )
}
export default PostCard