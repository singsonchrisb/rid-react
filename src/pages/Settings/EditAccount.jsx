import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, IconButton, Box, Grid } from '@mui/material';
import { FaWindowClose } from 'react-icons/fa';
import { decryptPWord, MyServerHostJava } from '../Functions/MyFunctions';
import imgUser from '../../images/user.jpg';
import storage from '../../api/firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { isMobile } from 'react-device-detect';

const styleBoxCenter = {
  margin: 'auto',
  marginTop: '5px',
  width: isMobile ? '100%' : '460px',
  // width: '460px',
  height: '500px',
  border: '1px solid #448AFF',
  borderRadius: '4px',
  boxShadow: '1px 2px 14px #F4AAB9',
};

const styleHeadline = {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 25,
  marginTop: '.9px',
  marginBottom: '30px',
  borderRadius: '2px',
  marginLeft: '-20px',
  width: '110%',
  // color: 'blue',
   color: 'white',
   backgroundColor: '#448AFF',
};

const styleImageBox = {
  position: 'absolute',
  marginLeft: '220px',
  marginRight: '1px',
  width: '210px',
  height: '150px',
};

const styleImageFace = {
  marginLeft: '70px',
  marginRight: '0px',
  marginTop: '10px',
  width: '120px',
  height: '105px',
  border: '2px solid green',
  borderRadius: '8px',
  boxShadow: '1px 2px 14px #F4AAB9',
};

const UserEditAccount = () => {
  const Navigate = useNavigate();
  const [id, setIDKey] = useState('');
  const [empID, setEmpID] = useState('');
  const [username, setUserName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactno, setContactNo] = useState('');
  const [imageUser, setImageUser] = useState(imgUser);
  const userNameFocus = useRef(null);
  const firstNameFocus = useRef(null);
  const lastNameFocus = useRef(null);
  const emailFocus = useRef(null);
  const contactNoFocus = useRef(null);
  const hiddenFileInput = useRef(null);
  const varAuth = decryptPWord(sessionStorage.getItem('loginName'));
  const gAccessToken = decryptPWord(sessionStorage.getItem('accessToken'));
  const dbServerHostJava = MyServerHostJava();

  const [file, setFile] = useState();
  const [percent, setPercent] = useState(0);
  

  useEffect(() => {
    if (!varAuth) {
      Navigate('/');
    }
  }, []);

  useEffect(() => {
    loadData();
    loadPicture();
  }, []);

  const loadPicture = async () => {
    const filePict = varAuth.toLowerCase();
    const fileRef = ref(storage, `users/${filePict}.png`);
    const photoURL = await getDownloadURL(fileRef);
    setImageUser(photoURL);
  };

  const loadData = async () => {
    try {
      const response = await fetch(`${dbServerHostJava}/api/accounts/${varAuth}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${gAccessToken}`,
        },
      });
      const json = await response.json();
      setIDKey(json.data.self);
      setEmpID(json.data.empno);
      setUserName(json.data.username);
      setFirstName(json.data.firstName);
      setLastName(json.data.lastName);
      setEmail(json.data.email);
      setContactNo(json.data.contactNumber);
    } catch (err) {
      toast.error(`NO data to fetch,  ${err}`);
    }
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      if (event.target.name === 'username') {
        if (!checkGet(1)) {
          userNameFocus.current.focus();
          return false;
        }
        firstNameFocus.current.focus();
      } else if (event.target.name === 'firstname') {
        if (!checkGet(2)) {
          firstNameFocus.current.focus();
          return false;
        }
        lastNameFocus.current.focus();
      } else if (event.target.name === 'lastname') {
        if (!checkGet(3)) {
          lastNameFocus.current.focus();
          return false;
        }
        emailFocus.current.focus();
      } else if (event.target.name === 'email') {
        if (!checkGet(4)) {
          emailFocus.current.focus();
          return false;
        }
        contactNoFocus.current.focus();
      } else if (event.target.name === 'contactno') {
        if (!checkGet(5)) {
          contactNoFocus.current.focus();
          return false;
        }
        handleSave();
      }
      event.preventDefault();
    }
  };

  const handleSave = async () => {
    if (!checkGet(5)) {
      contactNoFocus.current.focus();
      return false;
    }

    const confirmAction = window.confirm('Update changes ?');
    if (confirmAction) {
      try {
        const response = await fetch(`${dbServerHostJava}/api/accounts/update/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${gAccessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            firstName: firstname,
            lastName: lastname,
            email: email,
            contactNumber: contactno,
          }),
        });
        const json = await response.json();
        if (json.self === id) {
          toast.success('Successfully changed...');
          handleWindowClose();
        }
      } catch (error) {
        alert(error.message);
        firstNameFocus.current.focus();
      }
    } else {
      toast.error('Canceled entry...');
    }
  };

  const handleWindowClose = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
    Navigate('/dashboard');
  };

  const handleChange = (e) => {
    const tFile = URL.createObjectURL(e.target.files[0]);
    const timer = setTimeout(() => {
      setFile(e.target.files[0]);
      setImageUser(tFile);
    }, 50);
    return () => clearTimeout(timer);
  };

  const handleLoad = () => {
    hiddenFileInput.current.click();
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please choose a file first!');
      return false;
    }

    const storageRef = ref(storage, `/users/${username.toLowerCase()}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUser(url);
        });
        loadPicture();
      }
    );
    setFile('');
  };

  const checkGet = (nMode) => {
    if (nMode === 1) {
      if (username === '') {
        toast.error('Login or user name must be filled out!');
        userNameFocus.current.focus();
        return false;
      }
    } else if (nMode === 2) {
      if (firstname === '') {
        toast.error('First name must be filled out!');
        firstNameFocus.current.focus();
        return false;
      }
    } else if (nMode === 3) {
      if (lastname === '') {
        toast.error('Last name must be filled out!');
        lastNameFocus.current.focus();
        return false;
      }
    } else if (nMode === 4) {
      if (email === '') {
        toast.error('Email address must be filled out!');
        emailFocus.current.focus();
        return false;
      }
    }
    return true;
  };

  return (
    <Container style={styleBoxCenter}>
    {/* <Container> */}
      <IconButton className="windowclose-button" onClick={handleWindowClose}>
        <FaWindowClose />
      </IconButton>
      <Typography variant="h6" style={styleHeadline}>
        Edit Account of {varAuth} [{empID}]
      </Typography>

      <Box style={styleImageBox}>
        <Box style={styleImageFace}>
          <img src={imageUser} className="logo" width="115" height="94" alt="" onClick={handleLoad} />
        </Box>
        <input
          style={{ display: 'none', marginTop: '5px', marginLeft: '70px', fontSize: '14px' }}
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          accept="/users/*"
        />
        <Button style={{ marginTop: '5px', marginLeft: '25px', width: '100%' }} onClick={handleLoad}>
        {/* <Button style={{float: 'left'}} onClick={handleLoad}>  */}
          Select Picture
        </Button>
        {/* <Button style={{ marginTop: '5px', marginLeft: '70px', width: '121px' }} onClick={handleUpload}> */}
        <Button style={{ marginTop: '0px', marginLeft: '25px', width: '100%' }} onClick={handleUpload}>
          Upload Picture
        </Button>
        <p style={{ marginTop: '5px', marginLeft: '70px' }}>{percent} % done </p>
      </Box>


      <Grid container spacing={2} style={{ marginLeft: '-10px', width: '280px' }}>
        <Grid item xs={12}>
          <TextField
            style={{ width: '100%' }}
            label="Login Name"
            type="text"
            placeholder="Enter login name"
            name="username"
            required
            value={username || ''}
            onKeyDown={handleEnter}
            ref={userNameFocus}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ width: '100%' }}
            label="First Name"
            type="text"
            placeholder="Enter first name"
            name="firstname"
            required
            value={firstname || ''}
            onKeyDown={handleEnter}
            ref={firstNameFocus}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ width: '100%' }}
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            name="lastname"
            required
            value={lastname || ''}
            onKeyDown={handleEnter}
            ref={lastNameFocus}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ width: '100%' }}
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            name="email"
            required
            value={email || ''}
            onKeyDown={handleEnter}
            ref={emailFocus}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ width: '100%' }}
            label="Contact Number"
            type="text"
            placeholder="Enter contact number"
            name="contactno"
            required
            value={contactno || ''}
            onKeyDown={handleEnter}
            ref={contactNoFocus}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSave} style={{ width: '100px' }} variant="contained">
            Submit
          </Button>
          <Button onClick={handleWindowClose} style={{ marginLeft: '2rem', width: '100px' }} variant="contained">
            Cancel
          </Button>
          
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserEditAccount;
