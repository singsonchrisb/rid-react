import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import Button from "@mui/material/Button";
// import { Box, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";

import { FaRegWindowClose } from "react-icons/fa";

// import { handlePageTransition } from "../../utils/functions/General";

const chrichContainer = { 
  position: 'absolute', // Change position to absolute for centering
  // display: 'none',
  // position: 'fixed',
  // top: '50%', // Move top edge to the middle of the screen
  // left: '50%', // Move left edge to the middle of the screen
  top: '5px',
  left:'5px',
  // transform: 'translate(-50%, -50%)', // Center the element both horizontally and vertically
  textAlign: 'center',
  background: '#fff',
  borderRadius: '6px',
  padding: '5px 5px 5px 5px',
  border: '1px solid #999',
  height: '90%',
  width: '98%', 
  // maxWidth: '100%', 
};




const FirebaseVideoViewer = () => {
  let Navigate = useNavigate()  
  const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/oro-business-group.appspot.com/o/tutorials%2FJewelry%20POS%20Tutorial.mp4?alt=media';
  const playerRef = useRef(null);

  // const handlePlay = () => {
  //   playerRef.current && playerRef.current.seekTo(0); // Seek to the beginning
  //   playerRef.current && playerRef.current.play();
  // };

  // const handlePause = () => {
  //   playerRef.current && playerRef.current.pause();
  // };

  // const handleStop = () => {
  //   playerRef.current && playerRef.current.seekTo(0); // Seek to the beginning
  //   playerRef.current && playerRef.current.pause();
  // };


  const handleClose = () => {
    // handlePageTransition(history, "/login");   
    Navigate('/')
  }
  return (
    // <div>
    <div id='main' style={chrichContainer}>
  {/* <Paper elevation={3} style={{ padding: '20px 500px 20px 20px', height: '90%', maxHeight: '90%' }}> Adjust padding as needed */}
      {/* <FaWindowClose className='windowclose-button' style={{MarginTop: '00px',marginRight: '5px'}} onClick={handleClose}/>     */}
      <FaRegWindowClose className='windowclose-button' style={{MarginTop: '00px',marginRight: '5px'}} onClick={handleClose}/>    
      <h2 style={{textAlign:'center', color: 'darkblue'}} > POS Jewelry Tutorials </h2>
      {/* <Button
            size="meduim"
            // className="login-button"
            onClick={() => handleClose()}
          >
            Close
          </Button> */}
          
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        controls={true}
        playing={true} // Auto start the playback
        width='100%'
        // height='auto'
        height='100%'
        style={{
          // border: '2px solid gray', // Border line with specified color
          // borderRadius: '6px', // Border radius
          height: '92%', 
          maxHeight: '92%',
          maxWidth: '100%'
        }} // Adjusted height using inline style
      />

      {/* <div>
        <button onClick={()=> handlePlay}>Play</button>
        <button onClick={()=>handlePause}>Pause</button>
        <button onClick={()=>handleStop}>Stop</button>
      </div> */}
      
      <Button
            size="meduim"
            className="login-button"
            onClick={() => handleClose()}
          >
            Close
          </Button>
    {/* </div> */}
    
{/* </Box> */}
</div>
  );
};

export default FirebaseVideoViewer;
