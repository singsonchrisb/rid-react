https://medium.com/@massoud-sharifi/reacttoprint-8f9d35b3e2d7


export class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}




<!-- ---- Calling from class components -->
import React from 'react';
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';

class Example extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <a href="#">Print this out!</a>;
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
 }
}






<!-- ----------useReactToPrint -->


import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';
const Example = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div
      style={{ display: "none" }}// This make ComponentToPrint show   only while printing
      > 
       <ComponentToPrint ref={componentRef} />
      </div>
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};






<!-- Helpful Style Tips
Custom page margin
To set custom margin to the page, First, create a function to return the page margin. -->


const marginTop="10px"
const marginRight="5px"
const marginBottom="10px"
const marginLeft="5px"
const getPageMargins = () => {
  return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
};
<style>{getPageMargins()}</style>





@media print {
  @page { size: landscape; }
}


<!-- pageStyle prop
For example: -->

const pageStyle = `
  @page {
    size: 80mm 50mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;



----sample card style
let divStyle = {
    color: "blue", // Example color change
    padding: "10px", // Example padding
    margin: "5px", // Example margin
    width: "200px",
 };

 let divStyle2 = {
  color: "blue", // Example color change
  padding: "10px", // Example padding
  margin: "5px", // Example margin
  width: "200px",
  
};


{/* <Row className="g-3">
        <Card style={divStyle}>
            <p>Name: chris</p>
          <p>Surname: singson</p>
        </Card>
        <Card style={divStyle2}>
            <p>Name: chris</p>
          <p>Surname: singson</p>
        </Card>
        <Card style={divStyle2}>
            <p>Name: chris</p>
          <p>Surname: singson</p>
        </Card>
        </Row> */}
        

