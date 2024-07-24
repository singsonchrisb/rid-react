import { FaArrowUp, FaArrowDown, FaDownload } from "react-icons/fa";
import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
// import { styled } from '@mui/system';

const ViewTables = (props) => {
  let column3 = '';
  let column4 = '';
  let column5 = '';

  const results = [];
  if (props.tableName === 'Supplier') {
    props.data.forEach((dtRead) => {
      results.push({
        code: dtRead.vendorCode,
        description: dtRead.description,
        field3: dtRead.contact,
        field4: dtRead.telNo,
        field5: dtRead.cpNo,
      });
    });
    column3 = 'Contact';
    column4 = 'Phone#';
    column5 = 'Mobile#';
  } else if (props.tableName === 'Class') {
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
  const [datSearch, setDataSearch] = useState(results);
  const [sorted, setSorted] = useState({ sorted: "code", reversed: false });
  const [searchPhrase, setSearchPhrase] = useState("");

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
    // const matchedRead = props.data.filter((dtRead) => {
	const matchedRead = datSearch.filter((dtRead) => {
      return `${dtRead.vendorCode} ${dtRead.description}`
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setDataTable(matchedRead);
    setSearchPhrase(event.target.value);
  };

  const renderUsers = () => {
    return datTable.map((user, index) => {
      return (
        <TableRow key={index} style={{ height: "3px" }} onDoubleClick={() => handleSubmit(user.code, user.description)}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{user.code}</TableCell>
          <TableCell>{`${user.description}`}</TableCell>
          <TableCell>
            <FaDownload className='action-button' style={{ marginLeft: '1rem', color: 'darkblue' }} onClick={() => handleSubmit(user.code, user.description)} />
          </TableCell>
		  <TableCell>{user.field3}</TableCell>
		  <TableCell>{user.field4}</TableCell>
          <TableCell>{user.field5}</TableCell>
        </TableRow>
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
    props.onReturnValue({ code: tCode, description: tDesc });
  };

  return (
	<Box
      sx={{
        width: '100%',
        maxWidth: { xs: '95%', md: '770px' }, // Adjust the maximum width for different screen sizes
        height: '90%',
        marginTop: '0px',
        textAlign: 'left',
        marginLeft: 'auto',
        marginRight: 'auto', // Center the box horizontally
      }}>
         {/*className="search-container"  */}
      <div >
        <TextField
          style={{ marginTop: '-20px', marginLeft: '0px', width: '280px' }}
          type="text"
          placeholder="Search"
          value={searchPhrase}
          onChange={search}
        />
        <Typography style={{ marginLeft: '20px' }}> Double click description to load</Typography>
      </div>
      {/* <br /> */}
      <TableContainer style={{width: '98%',height: '85%',marginLeft: 'auto',marginRight: 'auto', textAlign: 'left',marginTop: '0px',}}>
        <Table className="styled-table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell style={{width: '70px'}} onClick={sortByCode}>
                <span style={{ marginRight: 10 }}>Code</span>
                {sorted.sorted === "code" ? renderArrow() : null}
              </TableCell>
              <TableCell style={{width: '310px'}} onClick={sortByName}>
                <span style={{ marginRight: 10 }}>Description</span>
                {sorted.sorted === "name" ? renderArrow() : null}
              </TableCell>
              <TableCell style={{width: '50px'}} ><span>Action</span></TableCell>
			  <TableCell style={{width: '40px'}} ><span>{column3}</span></TableCell>
              <TableCell style={{width: '40px'}} ><span>{column4}</span></TableCell>
              <TableCell style={{width: '40px'}} ><span>{column5}</span></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{renderUsers()}</TableBody>
        </Table>
      </TableContainer>
	</Box>
  );
}

export default ViewTables;
