
import React, { useState, useEffect, useRef }  from 'react';
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete, AiFillFileAdd } from "react-icons/ai";
import {IconButton, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import {useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';


import {GetMyHeaders} from '../Functions/GetAPIToken';
import {CheckNumber, formatNumber,myChrichFormat, MyServerHostJava, GetItemBranch,GetDepartmentList, dateIsValid, CheckAccessRights, decryptPWord}  from '../Functions/MyFunctions';
// import { formatNumber,myChrichFormat } from '../Functions/MyFunctions';
import useEscapeKey from '../../hooks/useEscapeKey'; // Adjust the path as needed


let nModule =8002;
let dbServerHostJava = MyServerHostJava();


const tableData = [
  // Example data structured as groups, replace this with your actual data
  {
    groupName: 'Base Price',
    items: [
      { id: 1, name: '12k', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '1456' },
      { id: 2, name: '18k', cash: '2113', gCash: '1123', paymaya: '1456', debitCard: '5456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '54456' },
      { id: 3, name: '21k', cash: '1223', gCash: '6123', paymaya: '2456', debitCard: '6456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '54456' },
    ],
  },
  {
    groupName: 'Wedding Ring yellow gold (WG)',
    items: [
      { id: 3, name: '18K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
      { id: 7, name: '21K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
    ],
  },
  {
    groupName: 'Wedding Ring white gold (UG)/3color/2color',
    items: [
      { id: 4, name: '18K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
      { id: 6, name: '21K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
    ],
  },
  {
    groupName: 'Juego yellow gold (except OA)',
    items: [
      { id: 1, name: '18K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
      { id: 1, name: '21K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
    ],
  },
  {
    groupName: 'Juego 3 color',
    items: [
      { id: 1, name: '18k', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
      { id: 1, name: '21K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
      { id: 1, name: '22K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
    ],
  },
  {
    groupName: 'Fixed Price + 0A (-35) (-38)',
    items: [
      { id: 1, name: '18K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
      { id: 1, name: '21K', cash: '123', gCash: '123', paymaya: '456', debitCard: '456', cCard0m: '456', cCard3m: '456', cCard6m: '456', cCard9m: '456', cCard12m: '456' },
    ],
  },
];

// Custom styles
const StyledTable = styled(Table)({
  border: '1px solid lightgray',
  '& td, & th': {
    borderRight: '1px solid lightgray',
  },
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

const StyledTableRow = styled(TableRow)({
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});


const sxTableCell = {
  width: '85px',
  whiteSpace: 'nowrap',
  textAlign: 'right',
};



// function CustomTable() {
const CustomTable = () => {  
  let navigate = useNavigate();
  let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));

  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isMobile = useMediaQuery(theme.breakpoints.between(300, 500));
  const isMobile = useMediaQuery('(max-width:500px)');
  const [isOpen, setIsOpen] = useState(false);
    const [IsShowGroup, setIsShowGroup] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  let varIsAdd = isAdd ? "Add" : "Edit";
  
  



  useEscapeKey(() => {
    if (isOpen) {
        setIsOpen(false); // Close the modal
    } else if (IsShowGroup ) {      
         setIsShowGroup(false)
    } else {
        navigate("/"); // Navigate back to main page
    }
  });


  const handleWindowClose = () => {
    navigate('/');
  } 

  const togglePopup = () => {
    // setIsOpen(!isOpen);
    setIsOpen(false);
  }

  const handleRefdresh = () => {

  }

  const handleAddShow = () => {
    return Swal.fire("Sorry! not yet done.");
  }


  const handleEditShow = () => {
    return Swal.fire("Sorry! not yet done.");
  }


  const loadData = async () => {
    // setProduct([]);
    let errorTry ={errors: 'none'}
    try {
        await fetch(dbServerHostJava + "/api/j/profile/discount/" , {                
        // await fetch(dbServerHostJava + "/api/j/profile/discount/j1", {
        method: 'GET',
        headers: GetMyHeaders(gAccessToken),
        // headers: GetMyHeaders('gAccessToken'),
        })
        .then((response) => response.json() )
        .then((json) => {
            // console.log("test2",json,gAcceesBranch)
            //  console.log('discount: ',json)
            //  errorTry =json.error + ",\n" + json.message;
             errorTry = json.status + "\n"+  json.error  //+ "\n"+ json.message
            if (json.status===200) {
                //  setProduct(json.data);
                //  setProduct({"self": 0, "branchCode": "","sequence": 0,"group": "","classCode": "","karat": 0,"karatSubGroup": ""});
                // console.log('discount: ',json.data)
            } else {
                // setProduct({"self": 0, "branchCode": "","sequence": 0,"group": "","classCode": "","karat": 0,"karatSubGroup": ""});
                // toast.error("The discount file is empty! Error: " + errorTry )
            }
        })


    } catch (err) {
        // console.log(err)
        //  setProduct({"self": 0, "branchCode": "","sequence": 0,"group": "","classCode": "","karat": 0,"karatSubGroup": ""});
        //  toast.error("No data to display! Error: " + err +"\n" + errorTry); 
        //  alert(errorTry)
    }
}


  const handleDelete = async (id) => {
    

    if (CheckAccessRights (nModule,'Delete')===false) {
      // Swal.fire("Sorry! no access to delete/remove discount.");
      // return false;
      return Swal.fire("Sorry! no access to delete/remove discount.");
  }
  // alert ("code in Node.js")
  //  check only admin can delete chris/admin/gerard
  const { isConfirmed } = await Swal.fire({
      title: "Confirm deletion?",
      icon: "question",
      iconColor: "#806749",
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: "#279856",
      customClass: {
        popup: "border-radius-0",
      },
  });
  if (isConfirmed) {    
      try {
          // fetch( dbServerHostNodeJS + "/karats/deleteKarat/" + id, {
          fetch( dbServerHostJava + "/api/j/profile/discount/delete/" + id, {
          method: 'DELETE',
          headers: GetMyHeaders(gAccessToken)
          }).then(() => {
              // console.log('removed');
              // alert("Karat: " + id + ", Value: " + contactName + ", Deleted Successfully");
              loadData();
              // toast.success("ID: " + id + ", Group: " + tDesc + ", deleted successfully.");
          }).catch(err => {
              console.error(err)
          });
          const timer = setTimeout(() => {
          loadData();
          }, 50);
          return () => clearTimeout(timer);
      } catch (error) {
          console.error("Error:", error);
          alert("Removal unsuccessful. \n" + error ) 
      }
     
  }

  }


  return (
    <main id='main'>
      {/* <TableContainer component={Paper}  > */}
      <TableContainer component={Paper} sx={{  padding:'20px 20px 20px 20px', borderRadius: '10px', width: '98%', maxWidth: '1100px' }}>
      <h2 style={{fontFamily: 'Roboto, Arial, sans-serif', color:'#8B4513',fontWeight:'bold'}} >Pricing Table
          <IconButton className='windowclose-button' style={{ marginTop: '-10px', marginRight: '-10px' }} onClick={() => handleWindowClose()} ><CloseIcon /></IconButton>  
      </h2>
      {/* <br></br> */}

      {/* <div style={{display: 'flex',float:'right',marginRight:'150px',marginTop:'20px'}}> */}
          {/* <button style={{marginLeft:'20px'}} >Group Entry</button> */}
          {/* <button style={{marginLeft:'20px'}} >Add Karat</button> */}
          {/* <button style={{marginLeft:'20px'}} >Refresh</button>
          <button style={{marginLeft:'20px'}} >Back</button> */}
       {/* </div> */}
                  
{/* , width: isMobile ? '100%':'120px' */}
        {tableData.map((group, groupIndex) => (
          <div key={group.groupName}>
               <div style={{display: isMobile ? 'block':'flex',marginBottom:'5px' }}>
                   {/* <h3 style={{display: isMobile ? 'flex':'block',  width: isMobile ? '360px':'425px'}} >{group.groupName}</h3> */}
                   <h3 style={{ 
                        width: isMobile ? '100%' : '425px', 
                      }}>
                      {group.groupName}
                    </h3>
                   
                   {groupIndex===0 ?
                     
                     <>
                     <button className="btn-neo1-primary" style={{ fontSize: '13px', marginLeft: isMobile ? '':'5rem', width: isMobile ? '120px':'120px' }} onClick={() => handleAddShow()}>Group Entry</button> 
                     <button className="btn-neo1-secondary" style={{fontSize: '13px', marginLeft: '.6rem', width: isMobile ? '120px':'120px' }} onClick={() => handleRefdresh()}>Refresh</button>
                     <button className="btn-neo1-dark" style={{fontSize: '13px', marginLeft: '.6rem', width: isMobile ? '120px':'120px' }} onClick={() => handleWindowClose()}>Home</button>
                     </>
                    :
                    "" //<button style={{marginLeft:'20px',marginRight:'150px'}} >Add Karat</button>
                   }
                  
              </div>
              {/* <br></br> */}
              {/* {isMobile ? <br></br>:''} */}
            {/* <StyledTable> */}
            <StyledTable size={isMobile ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{sxTableCell, width: '50px' }} >Karat</StyledTableCell>
                  <StyledTableCell sx={sxTableCell} >Cash</StyledTableCell>
                  <StyledTableCell sx={sxTableCell}>GCash</StyledTableCell>
                  <StyledTableCell sx={sxTableCell}>Paymaya</StyledTableCell>
                  <StyledTableCell>Debit Card</StyledTableCell>
                  <StyledTableCell>Credit Card</StyledTableCell>
                  <StyledTableCell>CCard 3M</StyledTableCell>
                  <StyledTableCell>CCard 6M</StyledTableCell>
                  <StyledTableCell>CCard 9M</StyledTableCell>
                  <StyledTableCell>CCard 12M</StyledTableCell>
                  <TableCell align="center" sx={{ width: '145px', fontWeight:'bold',border: '1px solid lightgrey' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.items.map((item) => (
                  <StyledTableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    
                    <TableCell sx={sxTableCell} >{myChrichFormat(item.cash,'amount')}</TableCell>
                    <TableCell sx={sxTableCell} >{myChrichFormat(item.gCash,'amount')}</TableCell>
                    <TableCell sx={sxTableCell} >{myChrichFormat(item.paymaya,'amount')}</TableCell>
                    <TableCell sx={sxTableCell} >{myChrichFormat(item.debitCard,'amount')}</TableCell>
                    <TableCell sx={sxTableCell} >{myChrichFormat(item.cCard0m,'peso')}</TableCell>
                    <TableCell align='right' whiteSpace= 'nowrap' >{formatNumber(item.cCard3m)}</TableCell>
                    <TableCell align='right' whiteSpace= 'nowrap' >{formatNumber(item.cCard6m)}</TableCell>
                    <TableCell align='right' whiteSpace= 'nowrap' >{formatNumber(item.cCard9m)}</TableCell>
                    <TableCell align='right' whiteSpace= 'nowrap' >{formatNumber(item.cCard12m)}</TableCell>

                    <TableCell align="right" sx={{ width: '85px', py: 0.3 ,border: '1px solid lightgrey', whiteSpace: 'nowrap'}}>
                       <IconButton onClick={() => handleAddShow(group.groupName)} sx={{ color: 'darkblue', marginLeft: '0px'}}>
                        <AiFillFileAdd sx={{width: '40px', marginLeft: '0px'}}/>
                        </IconButton>

                        <IconButton onClick={() => handleEditShow(item)} sx={{ color: 'darkblue', marginLeft: '0px'}}>
                        <AiFillEdit sx={{width: '40px',marginLeft: '0px'}}/>
                        </IconButton>

                        <IconButton onClick={() => handleDelete(item.id)} sx={{ color: 'darkred'}}>
                        <AiFillDelete  sx={{width: '40px', marginLeft: '00px'}}/>
                        </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </StyledTable>
            <br></br>
          </div>
          
        ))}
        
      </TableContainer>
    </main>
  );
}

export default CustomTable;
