import React, { useState, useEffect } from 'react';
import { Avatar, Menu, MenuItem, ListItemIcon, Divider, Typography, IconButton } from '@mui/material';
import { Person, Settings, HelpOutline, Logout, RefreshOutlined, ExpandMore, VideoCameraBackOutlined } from '@mui/icons-material';
import { DiamondOutlined, LaptopChromebookRounded } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

import './nav.css';

import storage  from '../firebase/firestore.js';
import { ref, getDownloadURL } from 'firebase/storage'; 

// import profileImg from '../images/user.jpg';
// import imgLogo from "../images/ORO.png";
import imgUser  from "../images/user.jpg";

// import { encryptPWord } from '../pages/Functions/MyFunctions';
// import { decryptPWord, encryptPWord } from '../pages/Functions/MyFunctions.jsx';
import { decryptPWord, encryptPWord } from '../functions/ChrisFunctions';
// import { GetAPITokenJava, GetMyHeaders } from '../pages/Functions/GetAPIToken.jsx';

// let dbServerHostJava = MyServerHostJava();

// let gPhotoDirectory ="https://firebasestorage.googleapis.com/v0/b/ticketing-booking-9cc08.appspot.com";
// let gPhotoDirectory = MyServerHostPicture("ticketing-booking");


// main routine below function NavAvatar() {

function HelpSubmenu({ anchorEl, open, onClose }) {
  let navigate = useNavigate();  
  

  const handlePOSTutorial = ()=> {
    navigate('/POSTutorial');
    window.location.reload();
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem component="a" onClick={()=> alert('not yet done...') }>
        <ListItemIcon>
          <VideoCameraBackOutlined fontSize="small" />
        </ListItemIcon>
        RID Clearance
      </MenuItem>
      <MenuItem component="a" onClick={()=>handlePOSTutorial() }>
        <ListItemIcon>
          <LaptopChromebookRounded fontSize="small" />
        </ListItemIcon>
        Admin
      </MenuItem>
    </Menu>
  );
}


// ------------------------------------//

function NavAvatar() {
  let navigate = useNavigate();  
  // let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
  
  let gUserType = decryptPWord (sessionStorage.getItem('accessType'));  
  let loginName = decryptPWord(sessionStorage.getItem("loginName"));
  let loginEmail = decryptPWord(sessionStorage.getItem("email"));
  let loginUser = decryptPWord(sessionStorage.getItem("userName"));
  let loginImage = sessionStorage.getItem("loginImage");
  
  // alert('loginImage: ' + loginImage)
  // alert(loginName)
  // let auth =loginName;

  const [anchorEl, setAnchorEl] = useState(null);
  const [helpAnchorEl, setHelpAnchorEl] = useState(null); // State for Help submenu
  const open = Boolean(anchorEl);
  const helpOpen = Boolean(helpAnchorEl);

  const [imageUser, setImageUser] = useState(imgUser);


   useEffect(() => {
//     // if (gEmpNo !=='' && gLogIn ==='True' && !sessionStorage.getItem("RolesDetail")) {
//     //     //  alert(gEmpNo);
//     //     loadAccountsDetail(gEmpNo);
//     // }
      // loadPicture();
 }, []);

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHelpClick = (event) => {
    setHelpAnchorEl(event.currentTarget);
  };

  const handleHelpClose = () => {
    setHelpAnchorEl(null);
  };


  const handleLogOut = () => {
    sessionStorage.removeItem("loginImage");
    sessionStorage.clear();
    sessionStorage.removeItem("loginName");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("accountType");
    sessionStorage.removeItem("assignBranch");
    sessionStorage.removeItem("accessToken"); 
    sessionStorage.removeItem("accountType");
    sessionStorage.setItem("homeOpen",encryptPWord("HomeOpen"));
    sessionStorage.setItem("login",encryptPWord("False"));
   //  window.location.reload();
   {gUserType === 'admin' ?
      navigate("/admin")
    :
      navigate("/home")
    }

 }

 const refreshPage = ()=>{
    window.location.reload();
 }

 const loadPicture = async () => { 
  const filePict= loginName.toLowerCase();  
  const fileRef = ref(storage, 'users/'+filePict + '.png');
  // console.log("fileww pic1", filePict)
  // console.log("fileww pic2", filePict.toLowerCase())
  // console.log("loadww fb pic", fileRef)
  const photoURL = await getDownloadURL(fileRef);
  setImageUser(photoURL);
 //  console.log("test pic", photoURL)

}

// function GetPicture(tImageFile)  { 
//   //  alert(tImageFile);
//   let cRetval= imgUser;
//   if (tImageFile==='') {
//       // ok
//   } else {
//       cRetval= gPhotoDirectory + tImageFile;
//   }
//   return cRetval;
// }


  return (
    <li className='nav-item'>
      <div className='nav-link nav-profile d-flex align-items-center pe-0' onClick={handleClick}>
        {/* <Avatar src={ profileImg} alt='Profile' className='nav-avatar' /> */}
        {/* <img src={imageUser} className='logo' width= {isMobile ? "15":"26"} height={isMobile ? "25":"26"}  alt="" onClick={() => imageClick()}/>   */}
      {/* <Avatar src={imageUser} alt='Profile' className='nav-avatar' />
        <span className='d-none d-md-block ps-2'>{loginName}</span>
      </div> */}
      {/* <img src={loginImage} alt="" className='rounded-circle'/> */}
      <img 
        key={loginImage} 
        src={loginImage} 
        alt="" 
        className='rounded-circle' 
      />

      {/* <img 
        src={`${loginImage}?t=${new Date().getTime()}`} 
        alt="" 
        className='rounded-circle' 
      /> */}

      {/* <img src={GetPicture(loginImage)} alt="" className='rounded-circle'/> */}
       {/* <Avatar src={GetPicture(loginImage)} alt='Profile' className='nav-avatar' sx={{ width: 35, height: 35}} />  */}
      {/* <Avatar src={imageUser} alt='Profile' className='nav-avatar' sx={{ width: 35, height: 35}} /> */}
        <span className='d-none d-md-block ps-2'>{loginName}</span>
      </div>


              {/* Box mt={2}>
              <Avatar src={URL.createObjectURL(picture)} alt="User Picture" sx={{ width: 100, height: 100 }} />
            </Box> */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <div className='dropdown-header'>
            <Typography variant='h6'  noWrap>
            Hi! {loginUser}
            </Typography>
            {/* <Typography variant='body2' color="textSecondary" noWrap>
            {loginEmail}
            </Typography> */}
            <Typography variant='subtitle1' color="textSecondary" noWrap>
            {loginEmail}
            </Typography>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem component="a" onClick={()=> navigate('/UserUpdateAccount')}>
          <ListItemIcon>
            <Person fontSize='small' />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem component="a" onClick={()=> navigate('/UserChangePassword')} >
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem component="a" onClick={()=> navigate('/faq')} >
          <ListItemIcon>
            <HelpOutline fontSize='small' />
          </ListItemIcon>
          FAQ?
        </MenuItem>
        <Divider />



        {/* <MenuItem component='a' href='pages-faq.html'> */}
        <MenuItem onClick={handleHelpClick}>
          <ListItemIcon>
            <HelpOutline fontSize='small' />
          </ListItemIcon>
          Tutorial
          <IconButton
            edge="end"
            aria-label="expand"
            style={{ marginLeft: 'auto', transition: 'transform 0.3s' }}
            className={helpOpen ? 'chevron-rotate' : ''}
          >
            <ExpandMore fontSize='small' />
          </IconButton>
        </MenuItem>
        <Divider />
        <MenuItem component='a' onClick={()=> handleLogOut()}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Sign out
        </MenuItem>
        <Divider />
        <MenuItem component='a' onClick={()=> refreshPage()}>
          <ListItemIcon>
            <RefreshOutlined fontSize='small' />
          </ListItemIcon>
          Refresh Page
        </MenuItem>
        
      </Menu>
      <HelpSubmenu anchorEl={helpAnchorEl} open={helpOpen} onClose={handleHelpClose} />
    </li>
  );
}

export default NavAvatar;
