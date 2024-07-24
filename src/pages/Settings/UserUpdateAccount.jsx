import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, IconButton, Box, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

import { decryptPWord, MyServerAPIHost,MyServerHostPicture, mySubstr } from '../../functions/ChrisFunctions';
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

 
let urlAPI = MyServerAPIHost();
let gPhotoDirectory =MyServerHostPicture("ticketing-booking");

const initInputState= {
   role: 0,
   dashboard: 0,
   setting: 0,
   ticketing: 0,
   booking: 0,
   inactive: 0,
}


const UserEditAccount = () => {
  let loginName = decryptPWord(sessionStorage.getItem("loginName"));
  let loginAuth = decryptPWord(sessionStorage.getItem('loginAuth')); 
  let gAccessToken = decryptPWord(sessionStorage.getItem('accessToken'));
  let isDesktop = useMediaQuery('(min-width: 780px)');
  let gColumnNo = isDesktop ? 6 : 12;
  
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

  const [imageUser, setImageUser] = useState(imgUser);
  
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
       navigate('/login');
    } else {
       loadData();
       loadPicture();
    }
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
    const tFile = URL.createObjectURL(e.target.files[0]);
    const timer = setTimeout(() => {
      setFile(e.target.files[0]);
      setImageUser(tFile);
    }, 50);
    return () => clearTimeout(timer);
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
        toast.error('Login or user name must be filled out!');
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
   

  const handleEdit = () => {
    setIsEdit(true);
    empnoRef.current.focus();
  }

  
  const handleWindowClose = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
    navigate('/dashboard');
  };
  
const handleLoad = () => {
    hiddenFileInput.current.click();
};

async function handleUpload() {
  if (!file) {
     alert("Please choose a file first!")
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
         UpdatePicture(userName,url,false);
         setImageUser(url);
        //  alert(url)
         // console.log('picture',url);
             // imgUser= url;
         });
         loadPicture();
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

  // const filePict = loginName.toLowerCase();
  // const fileRef = ref(storage, `users/${filePict}.png`);
  // const photoURL = await getDownloadURL(fileRef);
  // setImageUser(photoURL);
};

function GetPicture(tImageFile)  { 
  //  alert(tImageFile);
  let cRetval= imgUser;
  if (tImageFile==='') {
      // ok
  } else {
      cRetval= gPhotoDirectory + tImageFile;
  }
  return cRetval;
}




// ---- Model ----

const UpdatePicture = async (tFileName,urlFile, lDirectSave ) => { 
  let tImageFile =mySubstr(urlFile,gPhotoDirectory.trim().length);
  // let tImageFile2 =mySubstr(urlFile, gPhotoDirectory.trim() || ''.length);
  if (lDirectSave===true) {
      tImageFile =urlFile.trim();
  }
      try {
        const response = await fetch( urlAPI + "/updateUserImage", {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${gAccessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: tFileName.toUpperCase(),
            image: tImageFile,
          }),
        });
        const json = await response.json();
        //  console.log('json: ',json)

        if (Number(json.status) === 200) {
            toast.success('Successfully update picture...');
        } else if (Number(json.status) === 401) {  
            toast.error(json.msg + ", Session Expired!");
            ClearStorage();
            window.location.reload(); 
            navigate('login');

        } else {
            toast.error(json.msg);
        }
      } catch (error) {
        if (error.response) {
            toast.error(error.response.data.msg );
        }
      }

   
  }
  
  const loadData = async () => {
    
    try {
      
      //   const response = await fetch(urlAPI + "/userAccountsByUser/" + loginName, {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${gAccessToken}`,
      //   },
      // });

      // const json = await response.json();
      // console.log('json: ',json)
      

       const response = await axios.get(urlAPI + "/userAccountsByUser/" + loginName, {
        headers: {'access-token': gAccessToken}
        })
        if (!response) {  
            toast.error("Can't open User Accounts table. API Server error!")  
        } else {

            let loadInputState ={
                role: response.data.data.role,
                dashboard: response.data.data.dashboard,
                setting: response.data.data.setting,
                ticketing: response.data.data.ticketing,
                booking: response.data.data.booking,
                inactive: response.data.data.inactive,
            }
            // alert('ID: ' + json.data.uuid);

            // <img src={GetPicture(jsonRec.image)} className='logo'  alt="" style={{height:'21px', width:'21px', marginLeft: '0rem', color: 'darkblue', content: 'View Picture...' }} onClick={() => handleViewDetails(jsonRec)}/>  
            // let filePict="/o/users%2Fadmin.png?alt=media&token=88dfc491-f1d5-430c-9fe5-3e5b77ab4d8d";
            setImageUser(GetPicture(response.data.data.image));

            setIDKey(response.data.data.uuid);
            setUserName(response.data.data.userName);
            setEmpNo(response.data.data.empno);
            setFirstName(response.data.data.firstName);
            setLastName(response.data.data.lastName);
            setEmail(response.data.data.email);
            setContactNo(response.data.data.contactNo);
            setInputState(loadInputState)
          }  

    } catch (error) {
          if (error.response) {
            toast.error(error.response.data.msg);
            if (error.response.status===401) {
              alert(error.response.data.msg)
              ClearStorage();
              window.location.reload();
              navigate("/login");
          }
     }
    }


  };

  
  const handleSave = async () => {
    if (!checkGet(5)) {
      contactNoRef.current.focus();
      return false;
    }

    const confirmAction = window.confirm('Update changes ?');
    if (confirmAction) {
      try {
        // let res = await axios.patch(urlAPI + `/userAccounts/${self}`, optionBody);
        const response = await fetch(`${urlAPI}/updateUserAccounts/${id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${gAccessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userName.toUpperCase(),
            empno: empno,
            firstName: firstName,
            lastName: lastName,
            email: email,
            contactNo: contactNo,
            role: inputState.role,
            dashboard: inputState.dashboard,
            setting: inputState.setting,
            ticketing: inputState.ticketing,
            booking: inputState.booking,
            inactive: inputState.inactive,
            loginName: loginName

          }),
        });
        const json = await response.json();
        // console.log('json: ',json) // json.self === id

        if (Number(json.status) === 200) {
          toast.success('Successfully changed...');
          // handleWindowClose();
          setIsEdit(false);
        } else if (Number(json.status) === 401) {  
            toast.error(json.msg + ", Session Expired!");
            ClearStorage();
            window.location.reload(); 
            navigate('login');

        } else {
            toast.error(json.msg);
            firstNameRef.current.focus();
        }
      } catch (error) {
        if (error.response) {
          // setError(error.response.data.msg);
            toast.error(error.response.data.msg );
        }
        firstNameRef.current.focus();
      }
    } else {
          toast.error('Cancelled entry...');
    }
  };
 

  return (
    <main id= {isDesktop ? 'main':'mobile'}>
      {/* maxWidth="xs" */}
      <Container style={{width: isDesktop ? '600px' : '355px',height : isDesktop ? '520px' : '98%'}} >
        <Box border={1} borderRadius={2} borderColor="primary.main" p={2} position="relative">
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
         <Grid item xs={4}>
            <Box style={{ marginTop:'10px', width: isDesktop ? '150px':'120px', height: isDesktop ? '150px':'120px', overflow: 'hidden' }}>
                <img src={imageUser} className="logo" style={{ width: '100%', height: 'auto' }} alt="" onClick={handleLoad} />
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
              label="User Name"
              name="userName"
              variant="outlined"
              required
              type="text"
              fullWidth
              maxLength={20}
              value={userName}
              inputRef={userNameRef}
              // disabled={!isEdit}
              disabled={true}
              onKeyDown={handleEnter}
              onChange ={(e) => handleInputChange(e)}
              
              // onChange={(e) => setuserName(e.target.value)}
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
          />
        </Grid>
        <Grid item xs={gColumnNo}>
          <TextField
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
            disabled={!isEdit}
            onKeyDown={handleEnter}
            onChange={(e) => setEmail(e.target.value)}
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
                  <Button style ={{width:'100px', textTransform:'none'}} type="button" variant="contained" color="primary" onClick={() => handleEdit()}>Edit</Button>
                  :
                  <Button style ={{width:'100px', textTransform:'none'}} type="button" variant="contained" color="success" onClick={() => handleSave()}>Save</Button>
              }
              <Button style ={{marginLeft: isDesktop ? '40px' :'15px', width:'100px',textTransform: 'none', backgroundColor: '#DC4C64'}} variant="contained" onClick={() => handleWindowClose()}>
                Cancel
              </Button>
          {/* </div> */}
        </Grid>
      </Grid>
      </Box>
    </Container>
    </main>
  );
};

export default UserEditAccount;
