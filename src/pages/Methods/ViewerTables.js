

import { FaArrowUp, FaArrowDown,FaDownload } from "react-icons/fa";
// import { AiFillEdit } from "react-icons/ai";
// import { BiSolidCartDownload } from "react-icons/bi";
import { isMobile } from 'react-device-detect';
import React, { useState }  from 'react';


// function ViewTables(data) {
const ViewTables = (props) => {  
    // console.log('data1 ',props.data)

	// const [users, setUsers] = useState( datFile.data);
	let column3='';
	let column4='';
	let column5='';
	  
    const results = [];
    // alert(props.tableName)
    if (props.tableName==='Supplier') {
		// alert(props.tableName)
		props.data.forEach((dtRead) => {
			results.push({
			code: dtRead.vendorCode,
			description: dtRead.description,
			field3: dtRead.contact,
			field4: dtRead.telNo,
			field5: dtRead.cpNo,
			});
		});
		column3='Contact';
		column4='Phone#';
		column5='Mobile#';
       
    } else if (props.tableName==='Class') {
		props.data.forEach((dtRead) => {
			results.push({
			code: dtRead.classCode,
			description: dtRead.description,
			field3: dtRead.typeofGold,
			field4: dtRead.telNo,
			field5: dtRead.mobileNo,
			});
		});
	}


    const [datTable, setDataTable] = useState(results);
	const [sorted, setSorted] = useState({ sorted: "code", reversed: false });
	const [searchPhrase, setSearchPhrase] = useState("");
    

	// const sortById = () => {
	// 	const usersCopy = [...users];
	// 	usersCopy.sort((userA, userB) => {
	// 		if (sorted.reversed) {
	// 			return userA.id - userB.id;
	// 		}
	// 		return userB.id - userA.id;
	// 	});
	// 	setUsers(usersCopy);
	// 	setSorted({ sorted: "id", reversed: !sorted.reversed });
	// };

	const sortByCode = () => {
		const dtRead = [...datTable];
		dtRead.sort((dtReadA, dtReadB) => {
			
            const fullNameA = `${dtReadA.code}`;
			const fullNameB = `${dtReadB.code}`;

			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setDataTable(dtRead);
		setSorted({ sorted: "code", reversed: !sorted.reversed });
	};

	const sortByName = () => {
		const dtRead = [...datTable];
		dtRead.sort((dtReadA, dtReadB) => {
			
            const fullNameA = `${dtReadA.description}`;
			const fullNameB = `${dtReadB.description}`;

			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setDataTable(dtRead);
		setSorted({ sorted: "name", reversed: !sorted.reversed });
	};

    
	const search = (event) => {
        // alert(event.target.value);
		const matchedRead = props.data.filter((dtRead) => {
			return `${dtRead.code} ${dtRead.description}`
				.toLowerCase()
				.includes(event.target.value.toLowerCase());
		});
        setDataTable(matchedRead);
		setSearchPhrase(event.target.value);
    
	 };


	const renderUsers = () => {
		// return users.map((user) => {
            return datTable.map((user,index) => {
			return (
				// <tr style={{ height: "3px"}} key={ product.karat } onDoubleClick={() => alert( product.karat + " " +product.value)}>
                <tr style={{ height: "3px"}} key={datTable.code } onDoubleClick={() => handleSubmit(user.code, user.description)}>
                    <td>{ index + 1 }</td>
					<td>{user.code}</td>
					<td>{`${user.description}`}</td>
					<td>{user.field3}</td> 
					<td>{user.field4}</td> 
					<td>{user.field5}</td> 
                    <td>
                        <FaDownload className='action-button' style={{ marginLeft: '1rem', color: 'darkblue' }} onClick={() => handleSubmit(user.code, user.description)}/>  
                     </td>
				</tr>


			);
		});
	};

	const renderArrow = () => {
		if (sorted.reversed) {
            return <FaArrowDown />;	
		}
        return <FaArrowUp />;
	};
    const handleSubmit = (tCode, tDesc) => {
        props.onReturnValue({code: tCode, description: tDesc})
	};

	return (
		//  className='Box-Center' <div className3="App">
        <div  style={{width: isMobile ? '100%' : '770px', height: '100%', marginTop: '0px', textAlign:'left', marginLeft:'0px' }} >
            {/* <label style={{marginRight:'10px', textAlign: 'right'}} > Double click description to load</label> */}
			<div className="search-container">
				<input
                    style={{marginLeft:'0px', width:'280px'}}
            		type="text"
					placeholder="Search"
					value={searchPhrase}
					onChange={search}
				/>
                <label style={{marginLeft:'20px'}} > Double click description to load</label>
			</div>
            <br></br>
			
			{/* <div className="table-container"> */}
            <div className="styled-table" style={{fontSize: isMobile ? '.6rem' :'1.1rem', marginTop: '20px' , height: '100%', textAlign:'left', marginLeft:'0px'}} >
				{/* <table className="styled-tablew" style={{height: '300px'}}> 
				style={{fontSize: isMobile ? '.6rem' :'.9rem', marginTop: '0px'}}
				*/} 
				<table className="styled-table"  >
					<thead>
						<tr>
							<th>No.</th>
							<th onClick={sortByCode}>
								<span style={{ marginRight: 10 }}>Code</span>
								{sorted.sorted === "code" ? renderArrow() : null}
							</th>
							<th onClick={sortByName}>
								<span style={{ marginRight: 10 }}>Description</span>
								{sorted.sorted === "name"
									? renderArrow()
									: null}
							</th>
							<th><span>{column3}</span></th>
							<th><span>{column4}</span></th>
							<th><span>{column5}</span></th>
							<th><span>Action</span></th>
						</tr>
					</thead>
					<tbody>{renderUsers()}</tbody>
				</table>
			</div>
		</div>
	);
}

export default ViewTables;