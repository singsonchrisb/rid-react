import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
// import mysql from 'mysql'; // Import mysql module
import loaddata from "./EmployeeData.json";
import jsPDF from 'jspdf';


let myData=loaddata.data;
let pPageNo=0;



// const PrintComponent = ({ data }) => {
  const PrintComponent = () => {
  let data = myData;
  

  // console.log('dataa:',data);

  function PageCountMe() {
    pPageNo = pPageNo+1;
    // alert('page:' + pPageNo)
  }

  return (
    <div>
      {/* Your printable content goes here */}
      {/* <h1>{data.title}</h1>
      <p>{data.content}</p> */}
      
      {/* <h1>{data[0].name}</h1>
      <p>{data[0].position}</p>
      <p>{data[0].branch}</p>
      <p>{data[0].startDate}</p> */}
      <table className="print-styled-table" style={{fontSize: '9px'}} >
      
                <thead>
                {/* {PageCountMe()} */}
                {/* <div className="page-number">{pPageNo} / {tTotalPages}</div>  */}
                    <tr style={{borderBottom: '1px solid gray'}}>
                        <th style={{textAlign: "center", width: "10px"}}>#</th>
                        <th style={{textAlign: "left", width: "200px" }}>Name</th>
                        <th style={{textAlign: "left", width: "40px" }} >Position</th>
                        <th style={{textAlign: "left", width: "100px" }}>ProdCode</th>
                        <th style={{textAlign: "left", width: "90px"}}>Entry Date</th>
                    </tr>
                </thead>
                
          <tbody>
              {  data.length >0 && data.map((jsonRec, index) => (
                  <tr key={ index } >
                      <td>{ jsonRec.name } </td>
                      <td>{ jsonRec.position } </td>
                      <td>{ jsonRec.branch } </td>
                      <td>{ jsonRec.starDate } </td>
                  </tr>
              )) }
          </tbody>
      </table>

    </div>
  );
};

// const PrintablePage = ({ data1 }) => {
  const PrintablePage = () => {
  const componentRef = useRef();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
//  alert('test page: ')

  console.log('myData',myData); 
  const handlePrint2 = useReactToPrint({
    content: () => componentRef.current,
  });

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text(10, 10, 'Printable Content');
    pdf.text(10, 20, 'This is the content that will be printed.');
    // Add page number
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.text(10, 10, `Page ${i} of ${pageCount}`);
    }
    pdf.save('printed-document.pdf');
  };


  const handlePrint = useReactToPrint({
    
  //   content: () => {
  //     const content = componentRef.current.innerHTML;
  //     return (
  //       <div>
  //         <div style={{ position: 'fixed', top: 0, right: 0 }}>
  //           {/* <span className="pageNumber">Page 1</span> */}
  //           <span id="pageNumber"></span>
  //         </div>
  //         <div dangerouslySetInnerHTML={{ __html: content }} />
  //       </div>
  //     );
  //   },
  // });
    
    content: () => componentRef.current,
    onAfterPrint: () => {
      setCurrentPage(1); // Reset page number after printing
    },
    pageStyle: `
      @page {
        size: auto;   /* auto is the initial value */
        margin: 20mm; /* this affects the margin in the printer settings */
      }
    `,
  });
  // content: () => componentRef.current,
  //       pageStyle: `
  //       @page {
  //           size: auto;
  //           margin: 11mm 11mm 11mm 11mm;
  //           // size: 11mm 11mm 11mm 11mm;
  //           @top-right selector {
  //               content: "Page " counter(page);
  //           }
  //       }`,
  //       documentTitle: "ORO BUSINESS GROUP" 
        
  //     });

  // Calculate total pages based on content height
  // useLayoutEffect(() => {
  //   const componentHeight = componentRef?.current?.offsetHeight ? componentRef?.current?.offsetHeight : 1046;
  //   const pageHeight = 1056; // A4 page height in pixels
  //   const totalPages = Math.ceil(componentHeight / pageHeight);
  //   setTotalPages(totalPages);
  // }, [myData]);

  // // Update current page based on scroll position
  // const handleScroll = () => {
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //   const pageHeight = 1056; // A4 page height in pixels
  //   const currentPage = Math.ceil(scrollTop / pageHeight) + 1;
  //   setCurrentPage(currentPage);
  // };

  // // Listen for scroll events to update current page
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);


  
  return (
    <div style={{ display: "none1" }}>
      <button onClick={generatePDF}>Generate PDF</button>
      <button onClick={()=>handlePrint()}>Print me test</button>
      {/* <PrintComponent ref={componentRef} data={myData} />
      <div className="page-number">{currentPage} / {totalPages}</div> */}
            <div ref={componentRef} >
                {/* <div className="page-number">{currentPage} / {totalPages}</div>  */}
                 {PrintComponent()}
                
            </div>
            
    </div>
  );
};

export default PrintablePage;
