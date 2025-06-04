import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, IconButton, Box, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { decryptPWord } from '../../functions/ChrisFunctions';
// import imgUserl from '../../images/user.jpg';
import imgUser from '../../images/user.jpg';
// import imgWebCam  from "../../images/camera1.ICO";
// import WebcamPicture from '../Functions/WebcamPicture'

// import {ref, uploadBytes,  getDownloadURL,  listAll,} from "firebase/storage";
// import  storage from '../../api/firebase.js';
import { storage }  from '../../firebase/firestore.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import useMediaQuery from "../../hooks/useMediaQuery";
import { ClearStorage } from '../../functions/UtilFunction';

import { getUsers, updateUserPhotoAndName, updateUserProfile } from '../../api/userApi';

 
// let urlAPI = MyServerAPIHost();
// let gPhotoDirectory =MyServerHostPicture("ticketing-booking");

const initInputState= {
   role: 0,
   dashboard: 0,
   setting: 0,
   ticketing: 0,
   booking: 0,
   inactive: 0,
}


const UserEditAccount = () => {
  // alert('test')
  let loginName = decryptPWord(sessionStorage.getItem("loginName"));
  // let loginName = decryptPWord(sessionStorage.getItem("userName"));
  let loginAuth = decryptPWord(sessionStorage.getItem('loginAuth')); 
  let gAccessToken = decryptPWord(sessionStorage.getItem('accessToken'));
  let gUserType = decryptPWord (sessionStorage.getItem('accessType'));
  let loginImage = sessionStorage.getItem("loginImage");

  let isDesktop = useMediaQuery('(min-width: 780px)');
  let gColumnNo = isDesktop ? 6 : 12;

  // console.log(loginName,loginAuth);

  // alert('loginName: ' + loginName)
  
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoding]=useState(false);
  const [id, setIDKey] = useState('');
  const [userName, setUserName] = useState('');
  const [empno, setEmpNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [inputState, setInputState] = useState(initInputState);

  // const [imageUser, setImageUser] = useState(imgUser);
  const [imageUser, setImageUser] = useState(loginImage ? loginImage : imgUser);
  
  const userNameRef = useRef(null);
  const empnoRef = useRef(null);
  const lastNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const emailRef = useRef(null);
  const contactNoRef = useRef(null);

  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();
  const [percent, setPercent] = useState(0);
    

  useEffect(() => {
    if (loginAuth !=='khaki') {
      //  navigate(gUserType==='admin' ? '/admin':'/login');
    } else {
    }
    loadData();
    // loadPicture();
  }, []);

  
  const handleInputChange = (e) => {
    // alert("e " + e.target.value)
    if (e.target.name==="userName") {
        setUserName(e.target.value.toUpperCase());
    } else if (e.target.name==="empno")  {
        setEmpNo(e.target.value);    
    } else if (e.target.name==="lastName")  {
        setLastName(e.target.value);
    } else if (e.target.name==='firstName') {
        setFirstName(e.target.value);
    } else if (e.target.name==="email")  {
        setEmail(e.target.value);
    } else if (e.target.name==="contactNo")  {
        setContactNo(e.target.value);
    }
  };

  
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
  
    setFile(selectedFile); // make sure `setFile` saves the File object
  
    const previewUrl = URL.createObjectURL(selectedFile);
    setImageUser(previewUrl); // (if you are showing a preview)
    
  };
  

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      if (event.target.name === 'userName') {
        if (!checkGet(1)) {
          userNameRef.current.focus();
          return false;
        }
        empnoRef.current.focus();
      } else if (event.target.name === 'empno') {
        // if (!checkGet(2)) {
          // empnoRef.current.focus();
          // return false;
        // }
        firstNameRef.current.focus();  
      } else if (event.target.name === 'firstName') {
        if (!checkGet(2)) {
          firstNameRef.current.focus();
          return false;
        }
        lastNameRef.current.focus();
      } else if (event.target.name === 'lastName') {
        if (!checkGet(3)) {
          lastNameRef.current.focus();
          return false;
        }
        emailRef.current.focus();
      } else if (event.target.name === 'email') {
        if (!checkGet(4)) {
          emailRef.current.focus();
          return false;
        }
        contactNoRef.current.focus();
      } else if (event.target.name === 'contactNo') {
        if (!checkGet(5)) {
          contactNoRef.current.focus();
          return false;
        }
        handleSave();
      }
      event.preventDefault();
    }
  };

  const checkGet = (nMode) => {
    if (nMode === 1) {
      if (userName === '') {
        toast.error('User ID must be filled out!');
        userNameRef.current.focus();
        return false;
      }
    } else if (nMode === 2) {
      if (firstName === '') {
        toast.error('First name must be filled out!');
        firstNameRef.current.focus();
        return false;
      }
    } else if (nMode === 3) {
      if (lastName === '') {
        toast.error('Last name must be filled out!');
        lastNameRef.current.focus();
        return false;
      }
    } else if (nMode === 4) {
      if (email === '') {
        toast.error('Email address must be filled out!');
        emailRef.current.focus();
        return false;
      }
    }
    return true;
  };
   

   
  const handleWindowClose = () => {
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
    navigate('/');
  };

  const handleEdit = () => {
    setIsEdit(true);
    empnoRef.current.focus();
  }

  const handleCancel = () => {
    setIsEdit(false);
  }
  
const handleLoad = () => {
    hiddenFileInput.current.click();
};

async function handleUpload() {
  if (!file) {
    Swal.fire("Please choose a file first!");
    return false;
  }

  setIsLoding(true); // keep as isLoading if it's a typo
  const storageRef = ref(storage, `/users/${loginName.toLowerCase()}.png`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent1 = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setPercent(percent1);
    },
    (err) => {
      console.error(err);
      Swal.fire("Upload failed!", err.message, "error");
      setIsLoding(false);
    },
    async () => {
      try {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const doc = await updateUserPhotoAndName(userName, url);

        if (doc.success) {
          Swal.fire("Success", doc.message || "Photo updated.", "success");
        } else {
          Swal.fire("Error", doc.message || "Update failed.", "error");
        }

        setImageUser(url);
        sessionStorage.setItem("loginImage", url);
        setFile("");
        toast.success("Upload successful!");
      } catch (err) {
        console.error("Error updating user photo:", err);
        Swal.fire("Update failed!", err.message, "error");
      } finally {
        setIsLoding(false);
      }
    }
  );
}


async function handleUploadORG() {
  if (!file) {
     Swal.fire("Please choose a file first!")
     return false;
  }

  setIsLoding(true);

 // const storageRef = ref(storage, `/files/${file.name}`);
 // const storageRef = ref(storage, `/users/${username}.png`);
 const storageRef = ref(storage, `/users/${userName.toLowerCase()}.png`);

 // progress can be paused and resumed. It also exposes progress updates.
 // Receives the storage reference and the file to upload.
 const uploadTask = uploadBytesResumable(storageRef, file);

 uploadTask.on(
     "state_changed",
     (snapshot) => {
         const percent1 = Math.round(
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         );

         // update progress
        setPercent(percent1);
     },
     
     (err) => console.log(err),
     () => {
         // download url
         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
         let doc = updateUserPhotoAndName(userName, url); 
         Swal.fire(doc.success);
        //  alert(doc.message)
         setImageUser(url);
        //  loginImage=url;
         sessionStorage.setItem("loginImage",url);
        //  alert(url)
         // console.log('picture',url);
             // imgUser= url;
         });
        //  loadPicture();
         // setTimeout(()=>{
         //   window.location.reload(); 
         // }, 500);
     }
 );
 setFile(''); 
 if (percent >0) {
  toast.success("Upload Successfully picture...")
 }  
 setIsLoding(false);

}

const loadPicture = async () => {
  // --- download style display picture ---

  //  const filePict = loginImage; 
  //  const fileRef = ref(storage, `users/${filePict}.png`);
  //  const photoURL = await getDownloadURL(fileRef);
  //  setImageUser(loginImage);
};

function GetPicture(tImageFile)  { 
    alert(tImageFile);
  let cRetval= imgUser;
  if (tImageFile==='') {
      // ok 
  } else {
      // cRetval= gPhotoDirectory + tImageFile;
      cRetval= tImageFile;
  }
  return cRetval;
}




// ---- Model ----
  
  const loadData = async () => {
    try {
      // alert(loginName);
      const response = await getUsers(loginName,'userName');
      
      // Check if response is an array and not empty
      if (!response || response.length === 0) {
        Swal.fire("Can't open User Accounts table. API Server error!");
        return;
      }
      console.log('email:',email);
  
      // Assuming getUsers returns an array of users
      const user = response[0]; // pick the first matched user
  
      let loadInputState = {
        role: user.role,
        dashboard: user.dashboard,
        setting: user.setting,
        ticketing: user.ticketing,
        booking: user.booking,
        inactive: user.inactive,
      };
  
      // Set states from user data
      setImageUser(user.photoURL);
      setIDKey(user.uuid);
      setUserName(user.userName);
      setEmpNo(user.companyId);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setContactNo(user.phoneNumber);
      setInputState(loadInputState);
      
    } catch (error) {
      // Catch block for handling errors
      if (error.response && error.response.data && error.response.data.msg) {
        Swal.fire(error.response.data.msg);
      } else {
        Swal.fire("Unexpected error occurred.");
      }
    }
  };

    
  const handleSave = async () => {
    if (!checkGet(5)) {
      contactNoRef.current.focus();
      return false;
    }
    
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save or update this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Save",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // ✅ Proper object assignment
        const optionBody = {
          userName: userName.toUpperCase(),
          lastName: lastName,
          firstName: firstName,
          email: email,
          companyId: empno,
          photoURL: "",
          phoneNumber: contactNo,
          // role: inputState.role,
          // dashboard: inputState.dashboard,
          // setting: inputState.setting,
          // ticketing: inputState.ticketing,
          // booking: inputState.booking,
          // inactive: inputState.inactive,
          // loginName: loginName
        };
    
        try {
          console.log('trace1',optionBody)
          const doc = await updateUserProfile(optionBody); // ✅ async call
          Swal.fire(doc.message);
          if (doc.success) {
              // handleWindowClose();
              handleCancel();
          } else {
              userNameRef.current.focus();
            return false;
          }
          //  "Success!", "User information has been saved.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to save user. " + (error.message || ""), "error");
        }
      } else {
        Swal.fire("Cancelled", "No changes were saved.", "info");
      }
    });
    
  };
 

  return (
    <main id= {isDesktop ? 'main':'mobile'}>
      {/* maxWidth="xs" */}
      <Container style={{width: isDesktop ? '600px' : '355px',height : isDesktop ? '520px' : '98%'}} >
        <Box boxShadow={5} border={1} borderRadius={2} borderColor="lightgray" p={2} position="relative">
              <IconButton onClick={handleWindowClose} aria-label="close" sx={{ position: 'absolute', top: 0, right: 0 }}> 
              <CloseIcon /> 
              </IconButton>
              {/* <IconButton className="windowclose-button" onClick={handleWindowClose}></IconButton>  */}

      {/* <Typography variant="h6" style={styleHeadline}>
        Edit Account of {loginName} [{empID}]
      </Typography> */}
      <Typography variant="h5" align="center" gutterBottom>
            Edit Account of {loginName} 
      </Typography>
      {/* [{empno}] */}
      <Grid container spacing={2} gutterBottom >
         {/* <Grid item xs={4}>
            <Box style={{ marginTop:'10px', width: isDesktop ? '150px':'120px', height: isDesktop ? '150px':'120px', overflow: 'hidden' }}>
                <img src={imageUser} className="logo" style={{ width: '100%', height: 'auto' }} alt="" onClick={handleLoad} />
            </Box>
        </Grid> */}
        <Grid item xs={4}>
          <Box
            style={{
              marginTop: '10px',
              width: isDesktop ? '150px' : '120px',
              height: isDesktop ? '150px' : '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #ccc', // <-- frame color and thickness
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              key={loginImage} 
              src={imageUser ? imageUser: loginImage}
              alt=""
              onClick={handleLoad}
              className="logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={6}>
            <input
              style={{ display: 'none', marginTop: '-100px', marginLeft: '-140px', fontSize: '14px' }}
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              accept="/users/*"
            />
            <Button style={{ marginTop: '5px', marginLeft: isDesktop ? '0px':'25px', width: isDesktop ? '160px':'100%' }} onClick={handleLoad}>
            {/* <Button style={{float: 'left'}} onClick={handleLoad}>  */}
              Select Picture
            </Button>
            {/* <Button style={{ marginTop: '5px', marginLeft: '70px', width: '121px' }} onClick={handleUpload}> */}
            <Button style={{ marginTop: '0px',marginLeft: isDesktop ? '0px':'25px', width: isDesktop ? '160px':'100%' }} onClick={handleUpload}>
              Upload Picture
            </Button>
            {percent >0 && percent <100 ? 'processing...' + percent +'%' : ""}
            
        </Grid>
        {isLoading ? ( <CircularProgress />   ) : ''}
        
        
        {/* <p style={{ marginTop: '5px', marginLeft: '70px' }}>{percent} % done </p> */}
      {/* </Box> */}
      </Grid>
      {isDesktop ? <br></br>:""}
      <br></br>
      {/* style={{ marginLeft: '00px', width: '280px'}} */}
      <Grid container spacing={2} >
        {/* <Grid item xs={12}> */}
        <Grid item xs={gColumnNo}>
            <TextField
              label="User ID"
              name="userName"
              variant="outlined"
              required
              type="text"
              fullWidth
              maxLength={20}
              value={userName}
              inputRef={userNameRef}
              disabled={!isEdit}
              // disabled={true}
              onKeyDown={handleEnter}
              onChange ={(e) => handleInputChange(e)}
              
              // onChange={(e) => setuserName(e.target.value)}
              InputProps={{
                sx: {
                  input: {
                    fontWeight: 'bold',
                    color: '#000',
                    WebkitTextFillColor: '#000', // For Chrome autofill and disabled
                  },
                  // backgroundColor: !isEdit ? '#f5f5f5' : 'white',
                },
              }}
            />
        </Grid>
        <Grid item xs={gColumnNo}>
            <TextField
              label="Company ID"
              name="empno"
              variant="outlined"
              type="text"
              required
              fullWidth
              autoFocus
              maxLength={20}
              value={empno}
              inputRef={empnoRef}
              disabled={!isEdit}
              onKeyDown={handleEnter}
              onChange ={(e) => handleInputChange(e)}
              // onChange={(e) => setuserName(e.target.value)}
              InputProps={{
                sx: {
                  input: {
                    fontWeight: 'bold',
                    color: '#000',
                    WebkitTextFillColor: '#000', // For Chrome autofill and disabled
                  },
                  // backgroundColor: !isEdit ? '#f5f5f5' : 'white',
                },
              }}
            />
        </Grid>
        <Grid item xs={gColumnNo}>
          <TextField
            // style={{ width: '100%' }}
            label="First Name"
            type="text"
            placeholder="Enter first name"
            name="firstName"
            required
            fullWidth
            value={firstName || ''}
            inputRef={firstNameRef}
            disabled={!isEdit}
            onKeyDown={handleEnter}
            onChange={(e) => setFirstName(e.target.value)}
            InputProps={{
              sx: {
                input: {
                  fontWeight: 'bold',
                  color: '#000',
                  WebkitTextFillColor: '#000', // For Chrome autofill and disabled
                },
                // backgroundColor: !isEdit ? '#f5f5f5' : 'white',
              },
            }}
          />
        </Grid>
        <Grid item xs={gColumnNo}>
          {/* <TextField
            // style={{ width: '100%' }}
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            name="lastName"
            required
            fullWidth
            value={lastName || ''}
            inputRef={lastNameRef}
            disabled={!isEdit}
            onKeyDown={handleEnter}
            onChange={(e) => setLastName(e.target.value)}
          /> */}
          <TextField
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            name="lastName"
            required
            fullWidth
            value={lastName || ''}
            inputRef={lastNameRef}
            disabled={!isEdit}
            onKeyDown={handleEnter}
            onChange={(e) => setLastName(e.target.value)}
            InputProps={{
              sx: {
                input: {
                  fontWeight: 'bold',
                  color: '#000',
                  WebkitTextFillColor: '#000', // For Chrome autofill and disabled
                },
                // backgroundColor: !isEdit ? '#f5f5f5' : 'white',
              },
            }}
          />


        </Grid>
        <Grid item xs={gColumnNo}>
          <TextField
            // style={{ width: '100%' }}
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            name="email"
            required
            fullWidth
            value={email || ''}
            inputRef={emailRef}
            // disabled={!isEdit}
            disabled={true}
            onKeyDown={handleEnter}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              sx: {
                input: {
                  fontWeight: 'bold',
                  color: '#000',
                  WebkitTextFillColor: '#000', // For Chrome autofill and disabled
                },
                // backgroundColor: !isEdit ? '#f5f5f5' : 'white',
              },
            }}
          />
        </Grid>
        <Grid item xs={gColumnNo}>
          <TextField
            // style={{ width: '100%' }}
            label="Contact Number"
            type="text"
            placeholder="Enter contact number"
            name="contactNo"
            required
            fullWidth
            value={contactNo || ''}
            inputRef={contactNoRef}
            disabled={!isEdit}
            onKeyDown={handleEnter}
            onChange={(e) => setContactNo(e.target.value)}
            InputProps={{
              sx: {
                input: {
                  fontWeight: 'bold',
                  color: '#000',
                  WebkitTextFillColor: '#000', // For Chrome autofill and disabled
                },
                // backgroundColor: !isEdit ? '#f5f5f5' : 'white',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} style={{ width: "100%", marginTop:'15px',marginBottom:'8px', textAlign: 'center'}}> 
          {/* <Button onClick={handleSave} style={{ width: '100px' }} variant="contained">
            Submit
          </Button>
          <Button onClick={handleWindowClose} style={{ marginLeft: '2rem', width: '100px' }} variant="contained">
            Cancel
          </Button> */}
          {/* <div className="controls" style={{ width: "100%", textAlign: 'center'}}> */}
              {/* <Button style ={{width:'100px', textTransform: 'none'}} type="button" variant="contained" color="success" onClick={() => handleSave()}>
                Save
              </Button> */}
              {!isEdit ?
                <>
                   <Button style ={{width:'100px', textTransform:'none'}} type="button" variant="contained" color="primary" onClick={() => handleEdit()}>Edit</Button>
                   <Button style ={{marginLeft: isDesktop ? '40px' :'15px', width:'100px',textTransform: 'none', backgroundColor: '#DC4C64'}} variant="contained" onClick={() => handleWindowClose()}>Close</Button>                   
                </>
                  
                  :
                  <>
                    <Button style ={{width:'100px', textTransform:'none'}} type="button" variant="contained" color="success" onClick={() => handleSave()}>Save</Button>
                    <Button style ={{marginLeft: isDesktop ? '40px' :'15px', width:'100px',textTransform: 'none', backgroundColor: '#DC4C64'}} variant="contained" onClick={() => handleCancel()}>Cancel</Button>                   
                  </>
              }
              
          {/* </div> */}
        </Grid>
      </Grid>
      </Box>
    </Container>
    </main>
  );
};

export default UserEditAccount;
