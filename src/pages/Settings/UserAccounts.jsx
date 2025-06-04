// , useMediaQuery
import React, { useState, useEffect, useRef } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from '@mui/material';
import {Box, Typography, Button,Grid, TextField,FormControlLabel, Checkbox } from '@mui/material';
// import { Container, Typography, TextField, Button, IconButton, Box, Grid } from '@mui/material';
import { } from '@mui/material';
// Button, Typography, Grid, 
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress'
// import { styled, alpha } from '@mui/system';

import { styled, alpha } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Form, FloatingLabel} from 'react-bootstrap';
// Row, Col,


import { AiFillEdit, AiFillDelete, AiOutlinePrinter} from "react-icons/ai";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { CheckBoxBoalen2Num, CheckBoxNum2Boalen, decryptPWord, MyServerAPIHost, MyServerHostPicture, mySubstr } from "../../functions/ChrisFunctions"
import useMediaQuery from "../../hooks/useMediaQuery";
import { ClearStorage } from "../../functions/UtilFunction";
import imgUser from '../../images/user.jpg';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage }  from '../../firebase/firestore.js';
import Swal from "sweetalert2";

let urlAPI = MyServerAPIHost();
let gPhotoDirectory = MyServerHostPicture("ticketing-booking");

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: lightgray; // Change to your desired hover background color
  }
`;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: useMediaQuery('(min-width: 780px)') ? 18 : 10,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


const popupBox = {
  position: 'fixed',
  background: '#00000050',
  margin: 'auto',
  width: '100%',
  height: '100vh',
  top: '0',
  textAlign: 'center',
  zIndex: '8888',  
}

const stylePicture = {
  height: '28px',
  width: '28px',
  marginLeft: '0rem',
  color: 'darkblue',
  borderRadius: '50%', // Apply border-radius to make it round
  cursor: 'pointer', // Add cursor style for better UX
}

const styleActionEdit = {
  height: '18px',
  width: '18px',
  marginLeft: '0rem',
  color: 'darkblue',
  borderRadius: '50%', // Apply border-radius to make it round
  cursor: 'pointer', // Add cursor style for better UX
}

const styleActionDelete = {
  height: '15px',
  width: '15px',
  marginLeft: '5px',
  color: 'darkred',
  borderRadius: '50%', // Apply border-radius to make it round
  cursor: 'pointer', // Add cursor style for better UX
}


const UserAccounts = () => {
  let loginName = decryptPWord(sessionStorage.getItem("loginName"));
  let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
  let gUserType = decryptPWord (sessionStorage.getItem('accessType'));
  let isDesktop = useMediaQuery('(min-width: 780px)');
  
  const navigate = useNavigate();
  
  const [isAdd, setIsAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading]=useState(false);

  const [datRows, setDataRows] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const [userNameFilter, setUserNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [firstNameFilter, setFirstNameFilter] = useState('');

  // const [filteredRows, setFilteredRows] = useState([]);
  // const [filter, setFilter] = useState('');

  const [self, setSelf] =useState([]); 
  const [userName, setUserName] = useState('');
  const [empno, setEmpNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  // const [password, setPassword] = useState("");
  // const [confPassword, setConfPassword] = useState("");
  const [checkedArray, setCheckedArray] = useState(new Array(2).fill(false));

  // const [checkedState, setCheckedState] = useState({
  //   dashboard: false,
  //   settings: false,
  //   ticketing: false,
  //   booking: false
  // });
  
  
  const [codeSav, setCodeSave] =useState([]); // data array set from karats num
  const [lNameSav, setLNameSave] =useState([]); // data array set from karats num
  const [fNameSav, setFNameSave] =useState([]); // data array set from karats num

  // const [msg, setMsg] = useState("");

  const optRole = [
    {value: 0, text: 'User'},
    {value: 1, text: 'Cashier'},
    {value: 2, text: 'Supervisor'},
    // {value: 3, text: 'CEO/VP/Bosses'},
    {value: 8, text: 'Administrator'},
  ];
  const optStatus = [
    {value: 0, text: 'Active'},
    {value: 1, text: 'In-active'},
  ];  

  
  const userNameRef = useRef(null);
  const empnoRef = useRef(null);
  const lastNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const emailRef = useRef(null);
  const contactNoRef = useRef(null);
  const roleRef = useRef(null);
  const statusRef = useRef(null);
  // const passwordRef = useRef(null);
  // const confPasswordRef = useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();
  const [percent, setPercent] = useState(0);
  const [imageUser, setImageUser] = useState(imgUser);

  
  let varIsAdd = isAdd ? "Add" : "Edit";
  let gColumnNo = isDesktop ? 6 : 12;
  // let labelDays=['Dashboard','Settings','Ticketing','Booking']
  let labelDays=['Dashboard','Settings']

  const chrichContainer = { 
    position: 'absolute', // Change position to absolute for centering
    top: isDesktop ? '50%' : '0', // Move top edge to the middle of the screen
    left: isDesktop ? '50%' : '0', // Move left edge to the middle of the screen
    transform: isDesktop ? 'translate(-50%, -50%)' : 'none', // Center the element both horizontally and vertically
    textAlign: 'center',
    background: '#fff',
    borderRadius: '6px',
    padding: '2px 10px 5px 5px',
    border: '1px solid #999',
    overflow: 'auto',
    // width: isDesktop ? '370px' : '350px',
    width: isDesktop ? '570px' : '350px',
    height : isDesktop ? '520px' : '98%',
  };

  const classHeaderButton ={
    width: isDesktop ? '110px' :'85px', 
    marginLeft: isDesktop ? '20px' : '10px', 
    fontSize: isDesktop ? '14px' : '10px', 
    marginBottom:'5px', 
    textTransform: 'none'
  }
  const classBackGroundColor = {
    // backgroundColor: 'gray',
    // backgroundColor: '#5bc0de', // Light blue
    // backgroundColor: '#5cb85c', // Green
    backgroundColor: '#f0f0f0', // Light gray
    color: 'black',
  };
  // const combinedStyles = { ...classHeaderButton, ...classBackGroundColor };



        
  useEffect(() => {
      getData();
  }, []);

  
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const handleSort = (property) => {
        const isAscending = sortBy === property && sortOrder === 'asc';
        setSortBy(property);
        setSortOrder(isAscending ? 'desc' : 'asc');
      };
    
      const sortedRows = [...datRows].sort((a, b) => {
      // const sortedRows2 = [...filteredData].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] < b[sortBy] ? -1 : 1;
        } else {
          return a[sortBy] > b[sortBy] ? -1 : 1;
        }
      });

      // const handleFilterChange = (event) => {
      //   setFilter(event.target.value);
      // };
      

      const handleReports = (itemPath) => {
        // setAnchorEl(null);
        alert('N/a ' + itemPath)
      };

      const handleReportsClose = () => {
        setAnchorEl(null);
      };
    
      const handleCancel = async (e) => {
        getData();
        setIsOpen(false);
      }

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
        } else if (e.target.name==="role")	{	
            setRole(e.target.value)    
        } else if (e.target.name==="status")	{	
            setStatus(e.target.value)        
        }
      };

      const handleCheckboxChange = (index) => {
        const updatedCheckedArray = [...checkedArray];
        updatedCheckedArray[index] = !updatedCheckedArray[index];
        setCheckedArray(updatedCheckedArray);
        // console.log('indexe: ',index,checkedArray)
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
        if (event.key.toLowerCase() === "enter") {
            if (event.target.name==="userName") {
              if (CheckCode(event.target.value))  {
                  empnoRef.current.focus(); 
                  return true;
              }
            } else if (event.target.name==="empno") {
                  lastNameRef.current.focus();
                  return true;
              
            } else if (event.target.name==="lastName") {
                if (CheckDesc(event.target.value))  {
                    firstNameRef.current.focus();
                    return true;
                }  
            } else if (event.target.name==="firstName") {
                if (CheckDesc(event.target.value))  {
                    emailRef.current.focus();
                    return true;
                }      
            } else if (event.target.name==="email") {
                    contactNoRef.current.focus();
                    return true;
            } else if (event.target.name==="contactNo") {
                 roleRef.current.focus();
                 return true;       
            } else if (event.target.name==="role") {
                  statusRef.current.focus();
                  return true;              
            }
            event.preventDefault();  
        } else if (event.key.toLowerCase() === "arrowup") {
            if (event.target.name==="userName") {
                lastNameRef.current.focus(); 
                return true;
            } else if (event.target.name==="lastName") {
                userNameRef.current.focus();
                return true;
            } else if (event.target.name==="firstName") {
                lastNameRef.current.focus();
                return true;
            }
            event.preventDefault();  
          
        } 
      }
            
      const handleAddNew = () => {
        // setMsg('');
        setSelf('');
        setUserName('');
        setLastName('');
        setFirstName('');

        setLNameSave('');
        setFNameSave('');
        setCodeSave('');
        
        setIsOpen(true);
        setIsAdd(true);
      }
 
      const handleEdit = (dtRead) => {
        // setMsg('');
        setSelf(dtRead.uuid);
        setUserName(dtRead.userName);
        setEmpNo(dtRead.empno);
        setLastName(dtRead.lastName);
        setFirstName(dtRead.firstName);
        setEmail(dtRead.email);
        setContactNo(dtRead.contactNo);
        setRole(dtRead.role);
        setStatus(dtRead.inactive);
        // alert(dtRead.inactive)

        setCodeSave(dtRead.userName);
        setLNameSave(dtRead.lastName);
        setFNameSave(dtRead.firstName);
        checkedArray.forEach((checked, index) => {
          if (index === 0) {
            checkedArray[index] = CheckBoxNum2Boalen(dtRead.dashboard);
          } else if (index === 1) {
            checkedArray[index] = CheckBoxNum2Boalen(dtRead.setting);
          } else if (index === 2) {
            checkedArray[index] = CheckBoxNum2Boalen(dtRead.ticketing);
          } else if (index === 3) {
            checkedArray[index] = CheckBoxNum2Boalen(dtRead.booking);
          }
          // UpdateCheckArray([...checkedArray]); // Update the state with the new array
          setCheckedArray([...checkedArray]);
        });

        setImageUser(GetPicture(dtRead.image));

        // setCheckedState(prevState => ({
        //   ...prevState,
        //   dashboard: true
        // }));
        
        // alert(dtRead.vessels_code)
        setIsAdd(false);
        setIsOpen(true);
      }

      // const UpdateCheckArray = (checked,index) => {
      //   const updatedCheckedArray = [...checkedArray];
      //   updatedCheckedArray[index] = checked;
      //   setCheckedArray(updatedCheckedArray);
      //   // console.log('indexe: ',index,checkedArray)
      // };

      const handleRefresh = () => {
          getData();
          toast.info("Refresh Data...");
      }

      const handleSave = async () => {
        
        if (!CheckCode()) {
           return false;
        }
        if (!CheckDesc()) {
          return false;
        }
        if(empno==='') {
          toast.error("Company ID must be filled up!");
          return false;
        }
        if(lastName==='') {
          toast.error("Last Name must be filled up!");
          return false;
        }
        if(firstName==='') {
          toast.error("First Name must be filled up!");
          return false;
        }

        await saveData();
      }

      function CheckCode() {
        // if (isAdd===false || nameDescSav===nameDesc)  {
          // alert('Code Save: '+ codeSav + ", code: "+code)

        if(userName==='') {
          toast.error("User Name must be filled up!");
          return false;
        }
        if (codeSav===userName)  {
            return true;
        }

        let copyState = [...datRows];
        const exists = copyState.find((p) => p.userName.toUpperCase() === userName.toUpperCase());
        if (exists) {
            alert("Duplicate User Name: " + userName) ;
            userNameRef.current.focus(); 
            return false;
        } else  { 
             return true;
        };
        
      }

      function CheckDesc() {
        // alert('Desc Save: '+ descSav + ", desc: "+name)
        // if (isAdd===false || nameDescSav===nameDesc)  {
        
        if (lNameSav===lastName && fNameSav===firstName)  {
            return true;
        }

        let copyState = [...datRows];
        const exists = copyState.find((p) => p.lastName === lastName && p.firstName === firstName);
        if (exists) {
            alert("Duplicate Name: " + lastName + ", " + firstName) ;
            lastNameRef.current.focus(); 
            return false;
        } else  { 
             return true;
        };
        
      }
    
      
      // ---MODEL ------
      const getData = async () => {
          setIsLoading(true);
        //  alert('get vess: '+ urlAPI)
        // console.log('get routes profile:0',urlAPI)

        try {
             const response = await axios.get(urlAPI + "/userAccounts", {
              headers: {'access-token': gAccessToken}
              })
              if (!response) {  
                  toast.error("Can't open User Accounts table. API Server error!")  
              } else {
                  // alert('get vess')
                // console.log('get Port Piers:',response.data)
                setDataRows(response.data.data);
              }
              setIsLoading(false);
          } catch (error) {
              if (error.response) {
                 toast.error(error.response.data.msg);
                 if (error.response.status===401) {
                    Swal.fire(error.response.data.msg)
                    ClearStorage();
                    window.location.reload();
                    navigate(gUserType==='admin' ? '/admin':'/login');
                 }
              }
          }      
      };

      
      const saveData = async () => {
        let dashboard=0;
        let settings=0;
        let ticketing=0;
        let booking=0;


        // console.log('checkedArray:',checkedArray)
        checkedArray.forEach((checked, index) => {
          //  alert('index: ' + index +",  results: "+ checked);
          // console.log('index: ' + index +",  results: "+ checked);
          if (index===0) {
              dashboard = CheckBoxBoalen2Num(checked);
          } else if (index===1) {
              settings = CheckBoxBoalen2Num(checked);
          } else if (index===2) {
              ticketing = CheckBoxBoalen2Num(checked);    
          } else if (index===3) {
              booking = CheckBoxBoalen2Num(checked);    
          }
        });

        let optionBody = {
            userName: userName.toUpperCase(),
            empno: empno,
            lastName: lastName,
            firstName: firstName,
            email: email,
            contactNo: contactNo,
            role: role ? role: 0,
            dashboard: dashboard,
            setting: settings,
            ticketing: ticketing,
            booking: booking,
            inactive: status ? status: 0,
            loginName: loginName,
            password: 'password',

        }
        // console.log('optionBody:',optionBody)
        if (isAdd===true) {
           
            try {
                let response= await axios.post( urlAPI + "/createUserAccounts",optionBody, {
                         headers: {'access-token': gAccessToken}
                        });
                // console.log(res.status,res.data)
                if (response.status ===200) {
                    toast.success(response.data.msg);
                    // getData()
                    handleCancel();
                } else {
                  // setMsg(res);
                  toast.error(response.status + ", " + response.data.msg);
                  userNameRef.current.focus();
                  return false;
                }
            } catch (error) {
                if (error.response) {
                  // setMsg(error.response.data.msg);
                  toast.error(error.response.data.msg);
                  if (error.response.status===401) {
                    ClearStorage();
                    window.location.reload();
                    navigate(gUserType==='admin' ? '/admin':'/login');
                  }
                }
            }
        } else {
            // edit save
            try {
              let response= await axios.patch(urlAPI + `/updateUserAccounts/${self}`, optionBody, {
                  headers: {'access-token': gAccessToken}
                  });
                if (response.status ===200) {
                  toast.success(response.data.msg);
                  // getData()
                  handleCancel();
                } else {
                  userNameRef.current.focus();
                  return false;
                }
            } catch (error) {
                if (error.response) {
                    // setMsg(error.response.data.msg);
                    toast.error(error.response.data.msg);
                    if (error.response.status===401) {
                        ClearStorage();
                        window.location.reload();
                        navigate(gUserType==='admin' ? '/admin':'/login');
                    }
                }    
            }
          }
        
      };

const UpdatePicture = async (tFileName,urlFile, lDirectSave ) => { 
  let tImageFile = mySubstr(urlFile,gPhotoDirectory.trim().length);
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

      const deleteRecord = async (uuid, id, cDesc) => {
        //   if (CheckAccessRights(nModule,'Delete-IT')===false) {
        //     alert("Sorry! no access to delete/remove karats..");
        //     return false;
        // }  else {
        //     alert("Sorry! no access to delete/remove karats..\n please contact I.T. Department...");
        //     // return false;
        // }
        if (
          window.confirm("Are you sure that you wanted to delete the record,  "+ cDesc +" with ID: " + id +" ?")
          ) {
  
              let res = await axios.delete( urlAPI + `/deleteUserAccounts/${uuid}`, {  
                        headers: {'access-token': gAccessToken}
                        });
              getData();
              if (res.status ===200) {
                toast.success(res.data.msg);
              }
          } 
        };
    
    const handleResetPassword = async () => {
        if (window.confirm( "Account Name: " +lastName + ", " + firstName +"\nUser Name: " + userName + "\nAre you sure that you wanted to reset password ? ")) {
            // let res = await axios.delete( urlAPI + `/userAccounts/${uuid}`);
            // if (res.status ===200) {
            //   toast.success(res.data.msg);
            // }
            let optionBody ={
              userName: userName,
              password :'password'
            }
            let res = await axios.patch(urlAPI + "/resetUserPassword", optionBody);
            if (res.status ===200) {
              toast.success(res.data.msg);
            } else {
              toast.error(res.data.msg);
              return false;
            }
        };
    }

    function showRole(tRoleNum) {
      let retValue="User";
      optRole.forEach((checked) => {
        if (tRoleNum===checked.value) {
          retValue= checked.text;
        }
      })
      return retValue;

    }
 // View  add edit popup box
  function popupAddEdit() {        
        return (
          <div style = {popupBox}>
            <div style ={chrichContainer}>
                <IconButton onClick={handleCancel} aria-label="close" sx={{ position: 'absolute', top: 0, right: 0 }}> 
                <CloseIcon /> 
                </IconButton>
                <br/>
                <div>
                    <Typography variant="h6" align="center" color="blue" gutterBottom style={{marginTop: "-10px"}}>
                        {varIsAdd} User Accounts
                    </Typography>
                    {!isAdd ? EditImage() :""}
                    <br/>

                    <form style={{marginLeft:'30px', marginRight:'30px'}}>
                        <Grid container spacing={2}>
                        <Grid item xs={gColumnNo}>
                              <TextField
                              label="User Name"
                              name="userName"
                              variant="outlined"
                              required
                              type="text"
                              fullWidth
                              value={userName}
                              inputRef={userNameRef}
                              onKeyDown={handleEnter}
                              onChange ={(e) => handleInputChange(e)}
                              maxLength={20}
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
                                value={empno}
                                inputRef={empnoRef}
                                onKeyDown={handleEnter}
                                onChange ={(e) => handleInputChange(e)}
                                maxLength={20}
                                // onChange={(e) => setuserName(e.target.value)}
                              />
                          </Grid>
                          <Grid item xs={gColumnNo}>
                              <TextField
                              label="Last Name"
                              name="lastName"
                              variant="outlined"
                              type="text"
                              required
                              fullWidth
                              value={lastName}
                              inputRef={lastNameRef}
                              onKeyDown={handleEnter}
                              onChange ={(e) => handleInputChange(e)}
                              maxLength={45}
                              />
                          </Grid>
                          <Grid item xs={gColumnNo}>
                              <TextField
                              label="First Name"
                              name='firstName'
                              variant="outlined"
                              type="text"
                              required
                              fullWidth
                              value={firstName}
                              inputRef={firstNameRef}
                              onKeyDown={handleEnter}
                              onChange ={(e) => handleInputChange(e)}
                              maxLength={45}
                              />
                          </Grid>
                          <Grid item xs={gColumnNo}>
                              <TextField
                              label="Email"
                              name='email'
                              variant="outlined"
                              type="text"
                              fullWidth
                              value={email}
                              inputRef={emailRef}
                              onKeyDown={handleEnter}
                              onChange ={(e) => handleInputChange(e)}
                              maxLength={45}
                              />
                          </Grid>
                          <Grid item xs={gColumnNo}>
                              <TextField
                              label="Contact Number"
                              name='contactNo'
                              variant="outlined"
                              type="text"
                              fullWidth
                              value={contactNo}
                              inputRef={contactNoRef}
                              onKeyDown={handleEnter}
                              onChange ={(e) => handleInputChange(e)}
                              maxLength={45}
                              />
                          </Grid>
                          <Grid item xs={gColumnNo}>
                            <FloatingLabel className="mb-0" label="Role">
                                <Form.Select  
                                  name="role"
                                  ref={roleRef}
                                  value={role || 0} 
                                  onKeyDown={handleEnter}
                                  //  onFocus={handleFocus}
                                  onChange ={(e) => handleInputChange(e)}
                                  // onClick={handleOnClickGroup}
                                  // disabled={isAddEditModule ? false:true}
                                  >
                                  {optRole.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.text}
                                    </option>
                                  ))}
                                </Form.Select>
                              </FloatingLabel>
                            </Grid>
                            <Grid item xs={gColumnNo}>
                            <FloatingLabel className="mb-1" label="Status">
                                <Form.Select  
                                  name="status"
                                  ref={statusRef}
                                  value={status || 0} 
                                  onKeyDown={handleEnter}
                                  //  onFocus={handleFocus}
                                  onChange ={(e) => handleInputChange(e)}
                                  // onClick={handleOnClickGroup}
                                  // disabled={isAddEditModule ? false:true}
                                  >
                                  {optStatus.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.text}
                                    </option>
                                  ))}
                                </Form.Select>
                              </FloatingLabel>
                            </Grid>

                            <Grid item xs={isDesktop ? 12:2}>    
                                {checkedArray.map((checked, index) => (
                                  <FormControlLabel
                                    style={{marginTop:'-10px'}}
                                    key={index}
                                    control={
                                      <Checkbox
                                        checked={checked}
                                        onChange={() => handleCheckboxChange(index)}
                                        style={{
                                          color: checked ? '#4CAF50' : undefined, // Green color when checked
                                        }}
                                        // disabled={checkRecord(index)}
                                      />
                                  }
                                  label={labelDays[index]}
                              />
                            ))}
                          </Grid>
                        </Grid>
                        
                        <br/>
                 
                        <div className="controls" style={{ width: "100%", textAlign: 'center'}}>
                            <Button style ={{width:'100px', textTransform:'none'}} type="button" variant="contained" color="success" onClick={() => handleSave()}>Save</Button>
                            <Button style ={{marginLeft:'40px', width:'100px', textTransform:'none', backgroundColor: '#DC4C64'}} variant="contained" onClick={() => handleCancel()}>Cancel</Button>
                            {!isAdd ?
                               <Button style ={{width: isDesktop ? '140px' :'90%', textTransform:'none',  marginLeft: isDesktop ? '100px':'0px' ,marginTop: isDesktop ? '0px' : '10px' }} type="button" variant="contained" color="warning" onClick={() => handleResetPassword()}>Rest Password</Button> 
                               : ""
                            }
                            
                        </div>
                        
                        
                        <br/>
                    </form>
                 </div>
              </div>
           </div>
           
        )
  };
  
  function EditImage() {
    return (
      <>
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
      </>
    );
  }

  const handleLoad = () => {
    hiddenFileInput.current.click();
  };

  async function handleUpload() {
    if (!file) {
      alert("Please choose a file first!")
      return false;
    }

    setIsLoading(true);

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
          // getDownloadURL(uploadTask.snapshot.ref).then((url) => {(userName,url,false);
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
  setIsLoading(false);

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
  

  function HeaderButtons() {
    return (
      <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
            <TextField
                label="User Name Filter"
                variant="outlined"
                type="text"
                fullWidth
                value={userNameFilter}
                onChange={(e) => setUserNameFilter(e.target.value)}
              />
          </Grid>
          <Grid item xs={4}>
          <TextField
            label="Last Name Filter"
            variant="outlined"
            type="text"
            fullWidth
            value={lastNameFilter}
            onChange={(e) => setLastNameFilter(e.target.value)}
            // disabled={isOpen ? true : false}
            // style={{ fontSize: '8px' }} 
          />
          </Grid>
          <Grid item xs={4}>
          <TextField
            label="First Name Filter"
            variant="outlined"
            type="text"
            fullWidth
            value={firstNameFilter}
            onChange={(e) => setFirstNameFilter(e.target.value)}
          />
          </Grid>
        </Grid>
        <br></br>
        {/* <Grid container spacing={2}> */}
            <Button style ={classHeaderButton} type="button" variant="contained" color="info" onClick={() => handleAddNew()}>Add New</Button>
            {ReportsButton()}
            <Button style ={{...classHeaderButton, ...classBackGroundColor}} type="button" variant="contained" color='secondary' onClick={() => handleRefresh()}>Refresh</Button>
            {/* <Button style ={combinedStyles} type="button" variant="contained" color='secondary' onClick={() => handleRefresh()}>Refresh</Button> */}
        {/* </Grid> */}
      </>
    )
  }
  
  function ReportsButton() {
      return (
        <>
          <Button
            style={{fontSize: isDesktop ? '14px' :'10px', marginLeft:'18px',marginTop:'-5px', textTransform:"none"}}
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Reports
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleReportsClose}
          >
            <MenuItem onClick={() => handleReports()} disableRipple>
              <AiOutlinePrinter  style={{marginRight:'15px'}}/>
              Print User Accounts
            </MenuItem>
            {/* <MenuItem onClick={handleClose} disableRipple>
              <FileCopyIcon />
              Duplicate
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              <ArchiveIcon />
              Archive
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <MoreHorizIcon />
              More
            </MenuItem> */}
          </StyledMenu>
        </>
      )

  };
    
  return (
    <main id= {isDesktop ? 'main':'mobile'}>
      {/* <IconButton onClick={handleCancel} aria-label="closew" sx={{ position: 'absolute', top:10, right: 0, color: 'red' }}> 
          <CloseIcon /> 
        </IconButton>*/}
      <div> 
        
        
        <h1 className="title" style={{fontSize:'25px'}} >List of User Accounts</h1>
        
        {HeaderButtons()}
        

        {/* <table className="table is-striped is-fullwidth"> */}
        {isLoading ? ( <CircularProgress />   ) : ''}
        <TableContainer component={Paper}>
             
            <Table >
              {/*  linear-gradient(to right, #ff9966, #ff5e62)*/}
              <TableHead style={{ background: 'lightblue', fontWeight:'bolder' }}>
                <TableRow >
                  <TableCell>No</TableCell>
                  <TableCell>Pict</TableCell>
                  
                  <TableCell>
                    <TableSortLabel
                        active={sortBy === 'userName'}
                        direction={sortBy === 'userName' ? sortOrder : 'asc'}
                        onClick={() => handleSort('userName')}> 
                        User Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                        active={sortBy === 'lastName'}
                        direction={sortBy === 'lastName' ? sortOrder : 'asc'}
                        onClick={() => handleSort('lastName')}> 
                        Last Name
                    </TableSortLabel>
                  </TableCell>  
                  <TableCell>
                    <TableSortLabel
                        active={sortBy === 'firstName'}
                        direction={sortBy === 'firstName' ? sortOrder : 'asc'}
                        onClick={() => handleSort('firstName')}> 
                        First Name
                    </TableSortLabel>
                  </TableCell>  
                  <TableCell>Email</TableCell>
                  <TableCell>Contact No.</TableCell>
                  {/* <TableCell>Created/Updated By</TableCell> */}
                  <TableCell>Role</TableCell>
                  <TableCell style={{textAlign:'center'}} >Actions</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Updated By</TableCell>
                  <TableCell>Created By</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows
                .filter(row =>
                  row.userName.toLowerCase().includes(userNameFilter.toLowerCase()) &&
                  row.lastName.toLowerCase().includes(lastNameFilter.toLowerCase()) &&
                  row.firstName.toLowerCase().includes(firstNameFilter.toLowerCase())
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((jsonRead,index) => (
                  <StyledTableRow key={jsonRead.uuid}>
                    <TableCell>{index+1}</TableCell>
                    {/* <TableCell><img src={GetPicture(jsonRead.image)} className='logo'  alt="" style={{height:'21px', width:'21px', marginLeft: '0rem', color: 'darkblue', content: 'View Picture...' }} onClick={() => handleViewImage(jsonRead)}/>  </TableCell> */}
                    <TableCell> 
                      <img src={GetPicture(jsonRead.image)} alt="" style={stylePicture} onClick={() =>  handleEdit(jsonRead)}/>
                    </TableCell>

                    <TableCell>{jsonRead.userName}</TableCell>
                    <TableCell>{jsonRead.lastName}</TableCell>
                    <TableCell>{jsonRead.firstName}</TableCell>
                    <TableCell>{jsonRead.email}</TableCell>
                    <TableCell>{jsonRead.contactNo}</TableCell>
                    <TableCell>{showRole(jsonRead.role)}</TableCell>
                    <TableCell>
                        <AiFillEdit style={styleActionEdit} onClick={() => handleEdit(jsonRead)}/>  
                        <AiFillDelete style={styleActionDelete} onClick={() => deleteRecord(jsonRead.uuid,jsonRead.id,jsonRead.lastName) }/>  
                    </TableCell>

                    <TableCell>{Number(jsonRead.inactive)===0 ? 'Yes' :'No'}</TableCell>
                    <TableCell>{jsonRead.updatedBy}</TableCell>
                    <TableCell>{jsonRead.createdBy}</TableCell>
                  {/* </TableRow> */}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5,6,7,8,9,10, 15, 20, 25,30,35,40,45,50,100]}
            component="div"
            count={datRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
                
        {isOpen ? ( popupAddEdit() ) : ''}
      
    </div>
  </main>
  
);
}

export default UserAccounts