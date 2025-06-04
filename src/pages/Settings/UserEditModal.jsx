
import React, {useState, useRef} from 'react';
// import { toast } from 'react-toastify';
//import {useParams} from 'react-router-dom';
// import axios from 'axios';
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
// import {Form, Button, FloatingLabel} from 'react-bootstrap';
// import {MyServerHost}  from './MyFunctions';
import {MyServerHostJava, CheckBoxNum2Boalen, CheckBoxBoalen2Num, decryptPWord }  from '../../functions/ChrisFunctions';
import {GetMyHeaders} from '../Methods/GetAPIToken';
import { isMobile } from 'react-device-detect';

//const dbServerHost ="http://127.0.0.1:3001"
// const dbServerHost = MyServerHost()
const dbServerHostJava = MyServerHostJava()
var lAddNew="Edit";
//import { Modal, Button } from "bootstrap";
//https://www.youtube.com/watch?v=sam1Zb0ahkk   = other file .js call modal
//https://www.youtube.com/watch?v=tSMmJ88kCdg    = 
//npm install react-bootstrap bootstrap
//import 'bootstrap/dist/css/bootstrap.min.css';
  
const UserEditModal = ({datUsers}) => {
//    alert  (datUsers.modeCode + ", "+ datUsers.self + ",  " + datUsers.username + ", " + datUsers.firstName);
    // console.log('datUsers:',datUsers)

  if (datUsers.username==='Add New') {
	  lAddNew="";
	  
  } else {
	  lAddNew="Edit";
  }
//   alert(lAddNew);

 
//    const [state, setState] = useState(initialState);

//    const {login_name, first_name, last_name, email, contact} = state;  // data fields
    let Navigate = useNavigate();     
	var gAccessToken = decryptPWord(sessionStorage.getItem("accessToken")); 
	// console.log(gAccessToken);

    const [username, setUserName] = useState(datUsers.username);
	const [empno, setEmpNo] = useState(datUsers.empno);
	const [firstname, setFirstName] = useState(datUsers.firstName);
	const [lastname, setLastName] = useState(datUsers.lastName);
	const [email, setEmail] = useState(datUsers.email);
	const [contactno, setContactNo] = useState(datUsers.contactNumber);
	
	const [accountType, setAccountType] = useState(datUsers.accountType);

	const [dashboard, setDashboard] = useState(CheckBoxNum2Boalen(datUsers.dashboard));
	const [jewelry, setJewelry] = useState(CheckBoxNum2Boalen(datUsers.jewelry));
	const [telecom, setTelecom] = useState(CheckBoxNum2Boalen(datUsers.telecom));
	const [pawnshop, setPawnshop] = useState(CheckBoxNum2Boalen(datUsers.pawnshop));
	const [dsgrocery, setDSGrcoery] = useState(CheckBoxNum2Boalen(datUsers.ds_grocery));
	const [payroll, setPayroll] = useState(CheckBoxNum2Boalen(datUsers.payroll));
	const [foton, setFoton] = useState(CheckBoxNum2Boalen(datUsers.foton));
	const [settings, setSettings] = useState(CheckBoxNum2Boalen( datUsers.settings));
	const [barcode, setBarcode] = useState(CheckBoxNum2Boalen( datUsers.barcode));

	// alert (datUsers.dashboard)
	//  alert (datUsers.barcode)
    
	const userNameFocus = useRef(null);
	const empNoFocus = useRef(null);
    const firstNameFocus = useRef(null);
    const lastNameFocus = useRef(null);
    const emailFocus = useRef(null);
    const contactNoFocus = useRef(null);
	const accountTypeRef= useRef(null);
	const dashboardFocus = useRef(null);
	const jewelryFocus = useRef(null);
	const pawnshopRef = useRef(null);
	const telecomFocus = useRef(null);
	const payrollFocus = useRef(null);
	const fotonFocus = useRef(null);
	const dsgroceryFocus = useRef(null);
	const settingsFocus = useRef(null);
	const barcodeFocus = useRef(null);

	const optAcctType = [
        {value: 0, text: 'User'},
        {value: 1, text: 'Cashier'},
        {value: 2, text: 'Supervisor'},
        {value: 3, text: 'CEO/VP/Bosses'},
        {value: 8, text: 'Administrator'},
    ];  

//   const styleInput= {
//     	borderRadius: "4px" ,border: '1px solid blue',boxShadow: '1px 2px 1px #F4AAB9', marginTop: "2px", marginBottom: "15px"};
  
const popupBox = {
    position: 'fixed',
    background: '#00000050',
    margin: 'auto',
    width: '100%',
    height: '100vh',
    // height : topMargin,
    top: '0',
    // left: '0',
    textAlign: 'center',
    // justifyContent: 'center',
    // alignItems:'center',
  }
  

   const StyleCheckBoxOne = {
		width: isMobile ? '90%': '465px',
		height: '90px',
		background: 'darkkhaki',
		color: 'darkblue',
		margin: '3px 1px',
		// marginBottom: '10px',
		// fontSize : '16px',
		borderRadius: '10px',
		position: 'relative',
	}

	const styleCheckBox = {
		marginLeft: '12px',marginRight: '2px'};

	// const optDepartment = [
	// 	{value: '', text: '--Choose Department--'},
	// 	{value: 'Jewelry', text: 'Jewelry'},
	// 	{value: 'Telecom', text: 'Telecom'},
	// 	{value: 'DSGrocery', text: 'DS and Grocery'},
	// 	{value: 'Payroll', text: 'Payroll'},
	// 	{value: 'Foton', text: 'Foton'},
	// 	{value: 'Dashaboard', text: 'Dashaboard'},
	//   ];
	//   const [selected, setSelected] = useState(optDepartment[0].value); 

   //const {id} = useParams();
 //alert(id)
 
 
//  useEffect(() => {
// 	axios.get(dbServerHost + "/api/getUserID/:"+id)
// 	.then((resp) => setState({...resp.data[0] }));
//  },[id])

//  const handleInputChangeUserName = event => {
//     setUserName(event.target.value);
// };

// useEffect(() => {
// 	if(!sessionStorage.getItem("loginName")) {
// 		// Navigate("/signin")
// 	    Navigate("/");
// 	}
// }, [Navigate]);
  
const handleEnter = (event) => {
  if (event.key.toLowerCase() === "enter") {
	if (event.target.name==="username") {
		if (!CheckGet(1)) {
		   userNameFocus.current.focus();
		   return false;
		}
		empNoFocus.current.focus();
	} else if (event.target.name==="empno") {
		if (!CheckGet(2)) {
		   empNoFocus.current.focus();
		   return false;
		} 
		firstNameFocus.current.focus();	
	} else if (event.target.name==="firstname") {
		if (!CheckGet(3)) {
		   firstNameFocus.current.focus();
		   return false;
		} 
		lastNameFocus.current.focus();
	} else if (event.target.name==="lastname") {
		if (!CheckGet(4)) {
		  lastNameFocus.current.focus();
		  return false;
		} 
		emailFocus.current.focus();
		return true;
	} else if (event.target.name==="email") {
		if (!CheckGet(5)) {
		  emailFocus.current.focus();
		  return false;
		} 
		contactNoFocus.current.focus();
		return true;   
	} else if (event.target.name==="contactno") {
		if (!CheckGet(6)) {
		  contactNoFocus.current.focus();
		  return false;
		} 
		accountTypeRef.current.focus();
		return true;   
	} else if (event.target.name==="accountType") {
		dashboardFocus.current.focus();
		return true;   	

	} else if (event.target.name==="dashboard") {
		   jewelryFocus.current.focus();
		   return true;   
	} else if (event.target.name==="jewelry") {
			telecomFocus.current.focus();	   
			return true;   
	} else if (event.target.name==="pawnshop") {
			pawnshopRef.current.focus();	   
			return true;   		
	} else if (event.target.name==="telecom") {
			dsgroceryFocus.current.focus();	   
			return true;  
	} else if (event.target.name==="dsgrocery") {
			payrollFocus.current.focus();	   
			return true;  		 		
	} else if (event.target.name==="payroll") {
			fotonFocus.current.focus();	   
			return true;   				
	} else if (event.target.name==="foton") {
			settingsFocus.current.focus();	   
			return true;   						
	} else if (event.target.name==="settings") {
			barcodeFocus.current.focus();	   
			return true;   								
	} else  {		
 		handleSubmit()
		return true;
	 }

  	event.preventDefault();
  } 
};


function CheckGet(nMode) {
	if (nMode ===1) {
	   if (username ==="") {
		   toast.error("Login or user name must be filled out!");
		   userNameFocus.current.focus();
		   return false;
		}
		if(username.length <3)  {
			toast.error("User/Log-In name length should be more than 3.");
			//  passwFocus.current.focus();
			//  return false;
		   }  
	} else if (nMode === 2) {
		if (empno ==="") {
		  toast.error("Employee Number must be filled out!");
		  // alert("Login or user name must be filled out!");
		  empNoFocus.current.focus();
		  return false;
		} 	
	} else if (nMode === 3) {
	   if (firstname ==="") {
		  toast.error("First name must be filled out!");
		 // alert("Login or user name must be filled out!");
		  firstNameFocus.current.focus();
		  return false;
	   }
		  
	} else if (nMode === 4) {     
	   if (lastname ==="") {
		 toast.error("Last name must be filled out!");
		 lastNameFocus.current.focus();
		 return false;
	   }  
	} else if (nMode === 5) {     
	   if (email ==="") {
		 toast.error("Email address must be filled out!");
		//  emailFocus.current.focus();
		//  return false;
	   }  
	} else if (nMode === 6) {     
		if (contactno ==="") {
		  toast.error("Email address must be filled out!");
		//   contactnoFocus.current.focus();
		//   return false;
		}     
 
	 }
    return true;
}

const handleInputChange = (e) => {
	//alert("e " + e.target.name)
	if (e.target.name==="username") {
		setUserName(e.target.value);
    } else if (e.target.name==="empno") {
		setEmpNo(e.target.value);
	} else if (e.target.name==="firstname") {
		setFirstName(e.target.value);
	} else if (e.target.name==="lastname") {
		setLastName(e.target.value);
	} else if (e.target.name==="email")	{
		setEmail(e.target.value);
	} else if (e.target.name==="contactno")	{
		setContactNo(e.target.value);
	} else if (e.target.name==="accountType")	{	
		setAccountType(e.target.value)
	}
};


const handleSubmit = async (event) => {
    //event.preventDefault();
	// let id = datUsers.self; 

    // alert("saving data,  Dashboard: " + dashboard +"   Jewelry: " + jewelry + "  id: " + datUsers.self );
	//alert("key: " + datUsers.idkey + ",  id: " + id + ", User Name: " + username);
	//alert("First name: " + firstname + ", Last name: " + lastname);
	//alert("email: " + email + ", Contact No.: " + contact);
	// alert (id)

	// if (!dashboard || dashboard===false || dashboard==='false' || dashboard===0 ) {
	// 	setDashboard(0);
	// 	alert("dash fasl")
	// } else  {	
	// 	setDashboard(1);
	// 	alert("dash tru")
	// }
	// if (!jewelry || jewelry===false || jewelry==='false' || jewelry===0) {
	// 	setJewelry(0)
	// 	alert("jew fal")
	// } else  {	
	// 	setJewelry(1)
	// 	alert("jew true")
	// }
	// const timer = setTimeout(() => {
    //         // 
    //   }, 50);

	// alert("saving data2, Dashboard: " + dashboard +"   Jewelry: " + jewelry);

	// axios.put(dbServerHost +"/users/updateAccountByAdmin/:" + id, {
	// 	username: username,
	// 	firstname: firstname,
	// 	lastname: lastname,
	// 	email: email,
	// 	contactno: contactno,
	// 	dashboard: dashboard ? 1 : 0,
	// 	jewelry: jewelry ? 1 : 0,
	// 	telecom: telecom ? 1 : 0,
	// 	dsgrocery:dsgrocery ? 1 : 0,
	// 	payroll: payroll ? 1 : 0,
	// 	foton: foton ? 1 : 0,
	// 	settings: settings ? 1 : 0,
	//   })
	//   .then(() => {
	// 	/* setUserName("");
	// 	setFirstName("");
	// 	setLastName("");
	// 	setEmail("");
	// 	setContact(""); */
	// 	alert("Successfully change!")
	//   })
	//   .catch((err) => toast.error(err.response.data));
	// //   toast.success("User Update Succesfully");

    //   //setTimeout(() => Navigate("/",5));   
	//   //Navigate("/userlist");
	// dashboard: dashboard ? 1 : 0,
	// 		  jewelry: jewelry ? 1 : 0,
	// 		  telecom: telecom ? 1 : 0,
	// 		  dsgrocery:dsgrocery ? 1 : 0,
	// 		  payroll: payroll ? 1 : 0,
	// 		  foton: foton ? 1 : 0,
	// 		  settings: settings ? 1 : 0,
	
    // try {

	
	
    var tDashboard="";
	var tJewelry="";
	var tPawnshop="";
	var tTelecom="";
	var tDSGrocery="";
	var tPayroll=";"
    var tFoton="";
	var tSetttings="";
	var tBarcode="";

	// console.log("Saving : ", datUsers.self);  
	// console.log("Saving : ", username);  
	// console.log("Saving : ", firstname);  
	// console.log("Saving : ", lastname);  
	// console.log("Saving : ", contactno);  
	// console.log("Saving : ", email);  
	// console.log("dashboard : ", dashboard);  
	// console.log("jewelry : ", jewelry);  
	// console.log("telecom : ", telecom);  
	// console.log("Payroll : ", payroll);  
	// console.log("ds grocery : ", dsgrocery);  
	// console.log("foton : ", foton);  
	// console.log("settings : ", settings);  

	// if (dashboard===true || dashboard===1 ) {
	// 	tDashboard=1;
	// } else {		
	// 	tDashboard=0;
	// }
	// if (jewelry===true || jewelry===1) {
	// 	tJewelry=1;
	// } else {		
	// 	tJewelry=0;
	// }

	// if (telecom===true || telecom===1) {
	// 	tTelecom=1;
	// } else {		
	// 	tTelecom=0;
	// }

    tDashboard= CheckBoxBoalen2Num(dashboard);
	tJewelry= CheckBoxBoalen2Num(jewelry);
	tPawnshop =CheckBoxBoalen2Num(pawnshop)
	tTelecom= CheckBoxBoalen2Num(telecom);
	tDSGrocery= CheckBoxBoalen2Num(dsgrocery); 
	tPayroll= CheckBoxBoalen2Num(payroll);
	tFoton= CheckBoxBoalen2Num(foton);
	tSetttings= CheckBoxBoalen2Num(settings);
	tBarcode= CheckBoxBoalen2Num(barcode);


	// console.log("dash : ", tDashboard);  
	// console.log("jewel: ", tJewelry);  
	// console.log("Tele : ", tTelecom);  
	// console.log("DSGro: ", tDSGrocery);  
	// console.log("Payrol ", tPayroll);  
	// console.log("Foton : ", tFoton);  
	// console.log("Setti : ", tSetttings);  

    // alert(lAddNew); 
	// await fetch(dbServerHostJava + "/api/j/profile/products/" + fBranch + "/list", {  
    let optionBody = {
		username: username,
		empno: empno,
		firstName: firstname,
		lastName: lastname,
		email: email,
		contactNumber : contactno , 
		register: "Admin",
		accountType: Number(accountType),
		dashboard: tDashboard,
		jewelry: tJewelry,
		pawnshop: tPawnshop,
		telecom: tTelecom,
		ds_grocery: tDSGrocery,
		payroll: tPayroll,
		foton: tFoton,
		settings: tSetttings,
		barcode: tBarcode
	}
	// console.log('optionBody: ',optionBody);

	let cComfirmMessage = lAddNew ? "Update changes ?" :"Add new user ?" 
    let confirmAction = window.confirm( cComfirmMessage );
    if (confirmAction) {
        if (lAddNew==="Edit") {
			// var url = dbServerHostJava + "/api/accounts/update/" + datUsers.self
        	await fetch(dbServerHostJava + "/api/accounts/update/" + datUsers.self, {
			method: 'PUT',
			headers: GetMyHeaders(gAccessToken),
			body: JSON.stringify(optionBody)
			}).then((response) => response.json() )
			  .then((json) => {
				//  console.log("put results 1:", json);  
				// alert('json.status: '+json.status)
				if (Number(json.status)===200) {
					toast.success("Successfully change... ");
					Navigate(0);
				} else {
					toast.error("Unsuccessfully Update, " + json.status +", "  + json.error);
					alert("Unsuccessfully Update, " + json.status +", " + json.error);
					userNameFocus.current.focus();
					return false; 		

				}

				}).catch((error) => {
					console.log("catch saving error: ", error);
					alert("Unsuccesfully change,  " + error); 
					firstNameFocus.current.focus();
					return false;
				});
		   	

				
	    } else {		
			// add new user
			// alert(accountType)
	        await fetch(dbServerHostJava + "/api/accounts/create", {
			method: 'POST',
			headers: GetMyHeaders(gAccessToken),
			body: JSON.stringify({ 
				username: username,
				empno: empno,
				firstName: firstname,
				lastName: lastname,
				email: email,
				contactNumber : contactno , 
				password: "ORO12345",
				register: "Admin",
				accountType: Number(accountType),
				dashboard: tDashboard,
				jewelry: tJewelry,
				pawnshop: tPawnshop,
				telecom: tTelecom,
				ds_grocery: tDSGrocery,
				payroll: tPayroll,
				foton: tFoton,
				settings: tSetttings,
				barcode: tBarcode,
				})
			}).then((response) => response.json() )
			  .then((json) => {
				// console.log("put results 1:", json);  
				// console.log("post results 1:", json);   

				if (json.status===200) {
					toast.success("Successfully add... ")
					alert("User/Login Name: " + username + ", Password: ORO12345   Please let user change password in ORO Web app.");
					Navigate(0);
					return true;
				} else {
					toast.error("Unsuccessfully Create, " + json.error);
					// alert("Unsuccessfully add, Duplicate User/Login Name,  Error: 400");
					userNameFocus.current.focus();
					return false; 		

				}

				}).catch((error) => {
					console.log("catch saving error: ", error);
					alert("Unsuccesfully change,  " + error); 
					userNameFocus.current.focus();
					return false;
				});


		}		

	} else {
		toast.error("Canceled entry...");
	};
	  
}

const handleResetPassword  = async (tID) => {
	let confirmAction = window.confirm("Are you sure to reset password?");
    if (confirmAction) {
        let url = dbServerHostJava + "/api/accounts/update/"  + datUsers.self;
        await fetch(url, {
        method: 'PUT',
        headers: GetMyHeaders(gAccessToken),
        body: JSON.stringify({ 
          password: 'ORO12345',
          })
        }).then((response) => response.json() )
          .then((json) => {
          // console.log("put results 2:", json);   
          // alert(json)
          toast.success("Successfully reset password...");
          Navigate(0);
		  return true;

        }).catch((error) => {
            toast.error("Unsuccesfully reset password!" );   
            return false;
        }); 
    };

}

//<TextField id="outlined-basic" label="Outlined" variant="outlined" />

if(lAddNew==="") {
	// userNameFocus.current.focus();
} else {
	// empNoFocus.current.focus();
}

  return (
    
	<div>
		{/* <div style = {popupBox}> */}
		{/* <Row className="g-1" > */}
		
		<Row className="g-3" >
			<Col md>
				<FloatingLabel
					label="Log-in Name"
					>
					<Form.Control
						type="text"
						id="username"
						name="username"
						require
						onKeyDown={handleEnter}
						onChange ={(e) => handleInputChange(e)}
						value={username || ""}
						ref={userNameFocus}
						placeholder="Login name"
						// disabled={lAddNew ? false: true}
						disabled={lAddNew ? true : false}
						
					/>
				</FloatingLabel>
			</Col>
			<Col md>
				<FloatingLabel className="mb-2"
					label="Employee ID Number"
					>
					<Form.Control
						type="text"
						id="empno"
						name="empno"
						require
						onKeyDown={handleEnter}
						onChange ={(e) => handleInputChange(e)}
						value={empno || ""}
						ref={empNoFocus}
						placeholder="Employee ID Number"
					/>
				</FloatingLabel>
			</Col>
			
		</Row>

		<Row className="g-3" >
			<Col md>
				<FloatingLabel className="mb-2"	label="First Name">
				<Form.Control
					type="text"
					id="firstname"
					name="firstname"
					require
					onKeyDown={handleEnter}
					onChange ={(e) => handleInputChange(e)}
					value={firstname || ""}
					ref={firstNameFocus}
					placeholder="First name"
				/>
				</FloatingLabel>  
			</Col>
			<Col md>
				<FloatingLabel className="mb-2" label="Last Name">
				<Form.Control
					type="text"
					id="lastname"
					name="lastname"
					require
					onKeyDown={handleEnter}
					onChange ={(e) => handleInputChange(e)}
					value={lastname || ""}
					ref={lastNameFocus}
					placeholder="Last name"
				/>
				</FloatingLabel>  

			</Col>
		</Row>	
	  
	   <Row className="g-3" >
		   <Col md>
				<FloatingLabel label="Email Address">
				<Form.Control
					type="email"
					name="email"
					require
					onKeyDown={handleEnter}
					onChange ={(e) => handleInputChange(e)}
					value={email || ""}
					ref={emailFocus}
					placeholder="name@example.com"
				/>
				</FloatingLabel>  
		   </Col>
		   <Col md>
				<FloatingLabel className="mb-2"	label="Contact Number">
					<Form.Control
						type="phone"
						name="contactno"
						require
						onKeyDown={handleEnter}
						onChange ={(e) => handleInputChange(e)}
						value={contactno || ""}
						ref={contactNoFocus}
						placeholder="062-992-0551"
					/>
				</FloatingLabel>  
		   </Col>
	   </Row>
	   <Row className="g-2" >
			<Col md>
			<FloatingLabel className="mb-2" style={{marginRight:'18px' }} label="Account Type">
				<Form.Select  
					name="accountType"
					 ref={accountTypeRef}
					 value={accountType || ""} 
					 onKeyDown={handleEnter}
					//  onFocus={handleFocus}
					onChange ={(e) => handleInputChange(e)}
					// onClick={handleOnClickGroup}
					// disabled={isAddEditModule ? false:true}
					>
					{optAcctType.map(option => (
						<option key={option.value} value={option.value}>
						{option.text}
						</option>
					))}
				</Form.Select>
			</FloatingLabel>
			{/* </Col>
			<Col md> */}

			</Col>
	   </Row>
  
		  <div style={StyleCheckBoxOne}>
		       <label style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px',marginBottom: '5px', color: 'blue', fontSize: '18px'}} >Department Access Roles </label>
			   {/* <input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} /> */}
			   <input style={{marginLeft: '20px',marginRight: '2px'}} 
			   		type='checkbox' 
					id='checkboxOneInputDash' 
					name='dashboard'
					// value={dashboard || ""}
					defaultChecked={dashboard}
					onKeyDown={handleEnter}
					ref={dashboardFocus}
					onChange ={() =>  setDashboard(!dashboard)}	
				  />
			   <label >Dashboard </label>

			   <input style={styleCheckBox} 
			   		type='checkbox' 
					id='checkboxOneInputJewel' 
					name='jewelry' 
  				//    value={jewelry || ""}
					defaultChecked={jewelry}
					onKeyDown={handleEnter}
					ref={jewelryFocus}
       				onChange ={() =>  setJewelry(!jewelry)}	
					/> 
			   <label >Jewelry </label>

			   <input style={styleCheckBox} 
			   		type='checkbox' 
					id='checkboxOneInputTelecom' 
					name='telecom' 
					defaultChecked={telecom}
				    onKeyDown={handleEnter}
					ref={telecomFocus}
       			    onChange ={() =>  setTelecom(!telecom)}	
					/> 
		        <label >Pawn Shop </label>
					<input style={styleCheckBox} 
					type='checkbox' 
					id='checkboxOneInputPawnshop' 
					name='pawnshop' 
					defaultChecked={pawnshop}
					onKeyDown={handleEnter}
					ref={pawnshopRef}
						onChange ={() =>  setPawnshop(!pawnshop)}	
					/> 			
			    <label >Telecom </label>

			   <input style={styleCheckBox} 
			   		type='checkbox' 
					id='checkboxOneInputDSGrocery' 
					name='dsgrocery' 
					defaultChecked={dsgrocery}
					onKeyDown={handleEnter}
					ref={dsgroceryFocus}
					onChange ={() =>  setDSGrcoery(!dsgrocery)}	
					/> 
			   <label >DS/Grocery </label>

			   <br></br>
			   <input style={{marginLeft: '20px',marginRight: '2px'}} 
			   		type='checkbox' 
					id='checkboxOneInputPayroll' 
					name='payroll' 
					defaultChecked={payroll}
					onKeyDown={handleEnter}
					ref={payrollFocus}
					onChange ={() =>  setPayroll(!payroll)}	
					 /> 
			   <label >Payroll </label>
			   

			   <input style={{marginLeft: '38px',marginRight: '2px'}} 
			   		type='checkbox' 
					id='checkboxOneInputFoton' 
					name='foton' 
					defaultChecked={foton}
					onKeyDown={handleEnter}
					ref={fotonFocus}
					onChange ={() =>  setFoton(!foton)}	
					/> 
			   <label >Foton </label>

			   <input style={{marginLeft: '23px',marginRight: '2px'}} 
			   		type='checkbox' 
					id='checkboxOneInputSettings' 
					name='settings'
					defaultChecked={settings}
					onKeyDown={handleEnter}
					ref={settingsFocus}
					onChange ={() =>  setSettings(!settings)}	
					 /> 
			   <label >Setting </label>

			   <input style={{marginLeft: '34px',marginRight: '2px'}} 
			   		type='checkbox' 
					id='checkboxOneInputBarcode' 
					name='barcode'
					defaultChecked={barcode}
					onKeyDown={handleEnter}
					ref={barcodeFocus}
					onChange ={() =>  setBarcode(!barcode)}	
					 /> 
			   <label >Assign to Branch </label>

   			</div>
         
		<br></br>

	  {/* <div className="d-grid gap-2"> */}
	  		<Row className="g-2" >
			      <Button variant="success" size="m" type="submit" onClick={handleSubmit}>Save</Button>
			</Row>
	  {/* </div> */}
	  		<br></br>
			<Row className="g-3" >
				<Col md> </Col>
				<Col md> </Col>
				<Col md>
					<Button variant="danger" size="m" type="submit"  onClick={handleResetPassword}>Reset Password</Button>
					</Col>
				</Row>
				
	{/* </div> */}
	</div>
  );

//   function CheckBoxNum2Boalen(nCheckMode) {
// 	if (nCheckMode===1 || nCheckMode===true) {
// 		return true;
// 	} else {
// 		return false;
// 	}
//   }

//   function CheckBoxBoalen2Num(nCheckMode) {
// 	if (nCheckMode===1 || nCheckMode===true) {
// 		return 1;
// 	} else {
// 		return 0;
// 	}
//   }
 

}

export default UserEditModal;
