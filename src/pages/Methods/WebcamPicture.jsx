// https://medium.com/@razibul.ahmed/a-quick-and-dirty-primer-on-using-react-webcam-d3e65faa1a3

import storage  from '../../api/firebase.js';
import { ref, uploadString, getDownloadURL } from "firebase/storage";

import { GetMyHeaders } from './GetAPIToken';
import { mySubstr, MyServerHostJava }  from './MyFunctions';
// Num2Code, CheckNumber, formatNumber, removeCommas,
import React, {useState} from 'react';
// import { useNavigate } from "react-router-dom";

// import React, { useState } from 'react'
import Webcam from 'react-webcam'
// import { alertTitleClasses } from '@mui/material';
import Swal from 'sweetalert2';

let dbServerHostJava = MyServerHostJava();


// const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 360,
  height: 300,
  facingMode: 'user',
}


const MyWebCam = (product) => {
  // const Navigate = useNavigate();
  // alert('tere');
  const webcamRef = React.useRef(null)

  const [imgSrc, setImgSrc] = useState('')
  // const [counter, setCounter] = useState(0);
  const imageFilename = product.data[0].self;
  const gPhotoDirectory = product.data[0].photoDirectory
  // const gPhotoDirectory ="https://firebasestorage.googleapis.com"  //open 2/12/24
                       // https://firebasestorage.googleapis.com/v0/b/oro-business-group.appspot.com
  // const gAcceesBranch = product.data[0].gAcceesBranch;
  const gAcceesBranch = product.data[0].acceesBranch;
  const gAccessToken = product.data[0].accessToken; // AccessToken;
  // alert(gPhotoDirectory)
  // alert('gAcceesBranch: ')

  // const [startCam, setStartCam] = useState(false);


  const capture = React.useCallback(() => {
      const pictureSrc = webcamRef.current.getScreenshot();
      //  setPicture(pictureSrc)
      setImgSrc(pictureSrc);
      // alert(pictureSrc);
      // save to storage
      
   }, [webcamRef]);
  // })

  

  // const startCamera = () => {
  //   setStartCam(true);
  // };

  // const stopCamera = () => {
  //   setStartCam(false);
  //   setImgSrc(null);
  // };

  const handleUpload = async () => {
    console.log("Upload to firebase 1");
    // alert("Upload to firebase 1");
    if (imgSrc) {
      try {
        // alert("Upload to firebase 2");
        const storageRef = ref(
          storage,
          "jewelry/" + imageFilename +".jpg"
        );
        // alert(storageRef);
        // console.log("Upload to firebase 2");
        await uploadString(storageRef, imgSrc, "data_url").then((snapshot) => {
         console.log("Uploaded a data_url string!");
         // save to storage file
          // alert(imgSrc);
          // alert(storageRef);

        // getfirebase link picture
          // alert('imageFilename:' + imageFilename);
          //  close 2/12/24 
          loadPicture(imageFilename);

          // let tBarcode=imageFilename;
          // let filePict  = tBarcode.toUpperCase();  
          // let fileRef = ref(storage, 'jewelry/'+filePict + '.jpg');
          // let photoURL = getDownloadURL(fileRef);
          // //  alert(photoURL); 

          // UpdatePicture(tBarcode,photoURL,false);
       
        // setImageUser(photoURL);
        // alert(photoURL);  from take picture
        // UpdatePicture(tBarcode,photoURL,false);

         setImgSrc(null);
        });
        // alert('imageFilename:' + imageFilename);
        // open new code 2/12/24 
        //  await loadPicture(imageFilename);

      } catch (e) {
        console.log('error1: ',e);
      }

      // setImgSrc(null);
      // setCounter(counter + 1);
      // Navigate('/jewelryproducts');
        // alert ("Done upload to firebase storage.., click close button to return previous screen")
        Swal.fire({
          icon: "success",
          title: "Done upload to firebase storage.. ",
          text: "click close button to return previous screen",
          confirmButtonText: 'Close',
       }); 
    } else {
        // alert ("Empty capture screen, please take picture again before uploading!")
        Swal.fire({
          icon: "error",
          title: "Empty capture screen",
          text: "Please take picture again before uploading!",
          confirmButtonText: 'Close',
       }); 
    }
  }

  const loadPicture = async (tBarcode) => { 
    const filePict  = tBarcode.toUpperCase();    // {username}; 
    const fileRef = ref(storage, 'jewelry/'+filePict + '.jpg');
    const photoURL = await getDownloadURL(fileRef);
    //  alert(photoURL); 
     await UpdatePicture(tBarcode,photoURL,false);

  }

  // https://firebasestorage.googleapis.com/v0/b/oro-business-group.appspot.com/o/jewelry%2FJ267587.jpg?alt=media&token=b927b1fc-140d-4348-858d-0d0a5edb2170
  // 1. https://firebasestorage.googleapis.com/v0/b/oro-business-group.appspot.com
  // 2. save to image: /o/jewelry%2FJ267587.jpg?alt=media&token=b927b1fc-140d-4348-858d-0d0a5edb2170
  const UpdatePicture = async (tBarcode,urlFile, lDirectSave ) => { 
    //  alert('Barcode' + tBarcode   +', lDirectSave: ' + lDirectSave + ',urlFile: ' + urlFile)
    //  alert('gPhotoDirectory: ' + gPhotoDirectory);

    let tImageFile =mySubstr(urlFile,gPhotoDirectory.trim().length);
    // alert('tImageFile2: ' + tImageFile)

    if (lDirectSave===true) {
        tImageFile =urlFile.trim();
        // alert('tImageFile4: ' + tImageFile)
    }
        try {
            // alert('tImageFile3: ' + tImageFile);
            // alert('gAcceesBranch: ' + gAcceesBranch);
            // alert(dbServerHostJava + "/api/j/profile/products/" + gAcceesBranch + "/image")

            
            await fetch(dbServerHostJava + "/api/j/profile/products/" + gAcceesBranch + "/image" , {
            method: 'PUT',
            headers: GetMyHeaders(gAccessToken),
            body: JSON.stringify({barcode: tBarcode, image: tImageFile})
            }).then((response) => {
                response.json().then((json) => {
                // console.log('response: ',response.json)  
                if (Number(json.status)===200) {
                  // alert('tImageFile4: ' + tImageFile)
                    // toast.success("Successfully update imaage.. 200")
                    // alert('urlFile: ' + urlFile)
                    sessionStorage.setItem('imgProduct',urlFile);
                    
                } else {
                    // toast.error("Unccessfully update imaage " +  json.status)
                    return false;
                }
            })    
            }).catch(Error => {
                alert("catch Error: " + Error )             
            })
            
            return true;
        } catch (error) {
            console.error("Error:", error);
            // toast.error("Unccessfully update imaage " +  error)
        }
     
    
    
}

  const style1={
    alignSelf: "center",
    // paddingHorizontal: "10%",
    fontFamily: "monospace",
    fontSize: 15,
    fontWeight: "bold",
    // letterSpacing: "2px",
    backgroundColor: "#020202",
    paddingLeft: "8px",
    paddingTop: "5px",
    paddingBottom: "5px",
    width:'400px',
    height:'320px'
  }

  return (
    <div>
      {/* <h2> Data {product.data[0].self} </h2> */}
      {/* <div className="container"> */}
    <div style={style1}> 
        {imgSrc === '' || imgSrc === null || imgSrc === 'null' ? (
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            width={360}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={imgSrc} alt=''/>
        )}
        
      </div>
      {/* <button disabled={imgSrc ? false : true}  onClick={(e) => { handleUpload() }} className="btn btn-primary"  > Upload</button> */}
      <div>
        <br></br>
        
        {imgSrc !== '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              // setPicture()
              setImgSrc('');

            }}
            className="btn-neo1-primary" 
            style={{height:'35px',width:'120px'}}
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn-neo1-danger" 
            style={{height:'35px',width:'120px'}}
          >
            Capture
          </button>
          
        )}
        {/* <button className={imgSrc ? "btn-neo1-success" : "btn btn-disabled"} style={{ marginLeft:'20px'}} disabled={imgSrc ? false : true}  onClick={(e) => { handleUpload() }}> Save Image</button> */}
      <button className={"btn-neo1-success"} style={{ marginLeft:'20px',height:'35px',width:'120px'}} disabled={imgSrc ? false : true}  onClick={(e) => { handleUpload() }}> Save Image</button>
      </div>
    </div>
  )
}
export default MyWebCam
