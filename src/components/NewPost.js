import { React, useState } from 'react'
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import '../NewPost.css'
import { storage, db, auth} from '../firebase';
import firebase from "firebase/compat/app";
import LinearProgress from '@material-ui/core/LinearProgress'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function NewPost () {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0)

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setCaption('')
    setImage(null)
    setProgress(0)
  }
  
  function handleChange (e) {
    if (e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }

  function handleUpload (){
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      (snapshot) =>{
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes)*100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error)
      },
      () =>
      storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(url =>{
        db.collection("posts").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          caption: caption,
          imageUrl: url,
          username: auth.currentUser.displayName
        });
        setOpen(false)
        setCaption('')
        setImage(null)
        setProgress(0)
      })
    )
  }

  return (
    <div>
    <Button onClick={handleOpen}>New Post</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <LinearProgress variant="determinate" value={progress} max='100'/>
        <div className = 'newPost_fields'>
          <input type = 'text' placeholder='Enter a caption...' onChange = {e => setCaption(e.target.value)} value = {caption}/>
          <input type = 'file' onChange={handleChange}/>
          {image == null ? null:<Button className = 'uploade_button' onClick = {handleUpload}>upload</Button>}
        </div>
      </Box>
    </Modal>
  </div>
)

}

export default NewPost