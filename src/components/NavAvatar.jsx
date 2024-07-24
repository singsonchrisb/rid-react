import React, { useState, useEffect } from 'react';
import { Avatar, Menu, MenuItem, ListItemIcon, Divider, Typography, IconButton } from '@mui/material';
import { Person, Settings, HelpOutline, Logout, RefreshOutlined, ExpandMore } from '@mui/icons-material';
import { DiamondOutlined, LaptopChromebookRounded } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

import './nav.css';

// import {storage}  from '../api/firebase.js';
// import { ref, getDownloadURL } from 'firebase/storage'; 

// import profileImg from '../images/user.jpg';
// import imgLogo from "../images/ORO.png";
import imgUser  from "../images/user.jpg";

// import { encryptPWord } from '../pages/Functions/MyFunctions';
import { decryptPWord, encryptPWord } from '../pages/Functions/MyFunctions.jsx';
// import { GetAPITokenJava, GetMyHeaders } from '../pages/Functions/GetAPIToken.jsx';

// let dbServerHostJava = MyServerHostJava();


function HelpSubmenu({ anchorEl, open, onClose }) {
  let Navigate = useNavigate();  

  const handlePOSTutorial = ()=> {
    Navigate('/POSTutorial');
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
          <DiamondOutlined fontSize="small" />
        </ListItemIcon>
        Jewelry Tutorial
      </MenuItem>
      <MenuItem component="a" onClick={()=>handlePOSTutorial() }>
        <ListItemIcon>
          <LaptopChromebookRounded fontSize="small" />
        </ListItemIcon>
        POS Tutorial
      </MenuItem>
    </Menu>
  );
}

function NavAvatar() {
  let Navigate = useNavigate();  
  // let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
  let loginName = decryptPWord(sessionStorage.getItem("loginName"));
  let loginEmail = decryptPWord(sessionStorage.getItem("email"));
  let loginUser = decryptPWord(sessionStorage.getItem("userName"));
  
  // alert(loginName)
  // let auth =loginName;

  const [anchorEl, setAnchorEl] = useState(null);
  const [helpAnchorEl, setHelpAnchorEl] = useState(null); // State for Help submenu
  const open = Boolean(anchorEl);
  const helpOpen = Boolean(helpAnchorEl);

  const [imageUser, setImageUser] = useState(imgUser);


  useEffect(() => {
    // if (gEmpNo !=='' && gLogIn ==='True' && !sessionStorage.getItem("RolesDetail")) {
    //     //  alert(gEmpNo);
    //     loadAccountsDetail(gEmpNo);
    // }
     loadPicture();
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
    sessionStorage.clear();
    sessionStorage.removeItem("loginName");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("accountType");
    sessionStorage.removeItem("assignBranch");
    sessionStorage.removeItem("accessToken"); 
    sessionStorage.setItem("homeOpen",encryptPWord("HomeOpen"));
    sessionStorage.setItem("login",encryptPWord("False"));
   //  window.location.reload();
    Navigate("/home");
 }

 const refreshPage = ()=>{
    window.location.reload();
 }

 const loadPicture = async () => { 
  return ;
  const filePict  =loginName.toLowerCase();  
  const fileRef = ref(storage, 'users/'+filePict + '.png');
  // console.log("fileww pic1", filePict)
  // console.log("fileww pic2", filePict.toLowerCase())
  // console.log("loadww fb pic", fileRef)
  const photoURL = await getDownloadURL(fileRef);
  setImageUser(photoURL);
 //  console.log("test pic", photoURL)

}


  return (
    <li className='nav-item'>
      <div className='nav-link nav-profile d-flex align-items-center pe-0' onClick={handleClick}>
        {/* <Avatar src={ profileImg} alt='Profile' className='nav-avatar' /> */}
        {/* <img src={imageUser} className='logo' width= {isMobile ? "15":"26"} height={isMobile ? "25":"26"}  alt="" onClick={() => imageClick()}/>   */}
      {/* <Avatar src={imageUser} alt='Profile' className='nav-avatar' />
        <span className='d-none d-md-block ps-2'>{loginName}</span>
      </div> */}
      <Avatar src={imageUser} alt='Profile' className='nav-avatar' sx={{ width: 35, height: 35}} />
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
            <Typography variant='subtitle1' noWrap>
              {loginUser}
            </Typography>
            <Typography variant='body2' color="textSecondary" noWrap>
            {loginEmail}
            </Typography>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem component="a" onClick={()=> Navigate('/UserEditAccount')}>
          <ListItemIcon>
            <Person fontSize='small' />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem component="a" onClick={()=> Navigate('/UserChangePassword')} >
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <Divider />
        {/* <MenuItem component='a' href='pages-faq.html'> */}
        <MenuItem onClick={handleHelpClick}>
          <ListItemIcon>
            <HelpOutline fontSize='small' />
          </ListItemIcon>
          Jewelry Tutorial
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
