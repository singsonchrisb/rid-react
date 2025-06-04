import React from 'react'
import { isMobile } from 'react-device-detect'

function Project() {


  return (
    <> 
    {/* <div className='sidebar'>
     </div>  */}
     
      
       <div className='Box-Center' style={{width: isMobile ? '96%' :'70%', height: '90%', marginTop: '10px' }} >
        {/* <div className='chrich-Container' style={{width: isMobile ? '96%' :'60%', height:'90%'}}> */}
            <h2 style={{color:'white smoke',background:'rgb(82, 151, 230)'}} >Project Modules</h2>
            <br></br>
            <div className='chrich-leftl' style={{fontSize:'15px', textAlign: 'left'}}>
                 <label style={{marginLeft:'40px', fontSize:'20px',fontWeight:'bold'}}>1. Jewelry: DONE</label>
                 <div style={{marginLeft:'60px'}}>
                    <label>a. Product = list, add, edit, delete, filtering, load/take picture, view, print list, </label>
                    <label style={{marginLeft:'5px'}}>Tag Deliver, copy existing picture</label>
                    <br></br>
                    <label>b. Discount = list, add, edit, delete</label>
                    <br></br>
                    <label>c. Class = list, add, edit,delete not allow </label>
                    {/* <label style={{color:'red'}}>---- pending- add, edit, delete </label> */}
                    <br></br>
                    <label>d. Karats = list, add, edit, delete, update all branches</label>
                    <br></br>
                    <label>e. Supplier = list, add, edit, delete</label>
                    <br></br>
                    <label>f. Charges = list, add, edit, delete</label>
                    <br></br>
                    <label>g. Stock Withdraw-Stock Transfer = history list, add doc & items</label>
                    <br></br>
                    <label>h. Stock Withdrawal-Issue = draft, received,  add back/return</label>
                    <br></br>
                    <label>i. Physical Inventory =scan items, post, print physical inventory</label>
                    <br></br>
                    <label>j. Set Inventory # of days</label>
                    

                 </div>


                 <br></br>
                 <label style={{marginLeft:'40px',fontSize:'20px',fontWeight:'bold'}}>2. Settings: DONE</label>
                 <div style={{marginLeft:'60px'}}>
                     <label>a. User Account Main -admin = list, add, edit,  reset password, filtering</label>
                     {/* <label style={{color:'red'}}>---- pending- users roles allow to: add, edit, delete, print </label> */}
                     <br></br>
                     <label>b. User Account Main -user = edit account, change password</label>
                     <br></br>
                     <label>c. User Account Details -admin = list, add, edit, delete, delete all </label>
                     <br></br>
                     <label>d. Modules -admin = list, add, edit, delete </label>
                     <br></br>
                     <label>e. Branches -admin = list, add, edit </label>
                 </div>


                 <br></br>
                 <br></br>
                 <label style={{marginLeft:'40px',fontSize:'20px',fontWeight:'bold', color: 'red' }}>Pending Entries</label>
                 <div style={{marginLeft:'60px'}}>
                    <label>a. Purchase Order</label>
                    <br></br>
                    <label>b. Purchase Invoice</label>
                    <br></br>
                    <label>c. Retrieve weighing scale</label>
                 </div>

                 <br></br>
                 <br></br>
                 <label style={{marginLeft:'40px',fontSize:'20px',fontWeight:'bold', color: 'red' }}>Pending Systems</label>
                 <div style={{marginLeft:'60px'}}>
                    <label>a. Telecom</label>
                    <br></br>
                    <label>b. Drugstore and Grocery</label>
                    <br></br>
                    <label>c. HRMS/Payroll</label>
                    <br></br>
                    <br></br>
                    <br></br>
                 </div>

            </div>

        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    </>
    

  )
}

export default Project