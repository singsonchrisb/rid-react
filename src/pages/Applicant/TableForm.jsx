import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const data = [
  // Example data structured as groups, replace this with your actual data
  {
    groupName: 'Group 1',
    items: [
      { id: 1, name: 'Item 1', value: '123' },
      { id: 2, name: 'Item 2', value: '456' },
    ],
  },
  {
    groupName: 'Group 2',
    items: [
      { id: 3, name: 'Item 3', value: '789' },
      { id: 4, name: 'Item 4', value: '101' },
    ],
  },
  {
    groupName: 'Group 3',
    items: [
      { id: 3, name: 'Item 3', value: '789' },
      { id: 4, name: 'Item 4', value: '101' },
    ],
  },
  {
    groupName: 'Group 4',
    items: [
      { id: 3, name: 'Item 3', value: '789' },
      { id: 4, name: 'Item 4', value: '101' },
      { id: 4, name: 'Item 5', value: '101' },
      { id: 4, name: 'Item 6', value: '101' },
    ],
  },
  {
    groupName: 'Group 5',
    items: [
      { id: 3, name: 'Item 3', value: '789' },
      { id: 4, name: 'Item 4', value: '101' },
    ],
  },
];

const TableForm = () => {
  const [tableData, setTableData] = useState(data);

  const handleInputChange = (groupIndex, itemIndex, field, value) => {
    const newData = [...tableData];
    newData[groupIndex].items[itemIndex][field] = value;
    setTableData(newData);
  };

  const handleSave = () => {
    // Handle save logic, e.g., save to a database or API
    console.log('Data saved:', tableData);
  };

  return (
    <div className='main'>
    <TableContainer component={Paper}>
      {tableData.map((group, groupIndex) => (
        <div key={group.groupName}>
          <h2>{group.groupName}</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {group.items.map((item, itemIndex) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  
                  {/* <TableCell>
                    <TextField
                      value={item.value}
                      onChange={(e) => handleInputChange(groupIndex, itemIndex, 'value', e.target.value)}
                    />
                  </TableCell> */}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      {/* <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button> */}
    </TableContainer>
    </div>
  );
};

export default TableForm;
