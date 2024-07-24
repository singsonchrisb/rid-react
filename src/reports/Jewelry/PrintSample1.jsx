// import React, { useRef, useState,useEffect } from 'react';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import loaddata from "./EmployeeData.json";
let data=loaddata.data;


const PrintComponent = ({ data }) => {
  return (
    <div>
      {/* Your printable content goes here */}
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
};

const PrintablePage = ({ data }) => {
  const componentRef = useRef();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);


 console.log('data sample: ',data)

  const handlePrint = useReactToPrint({
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

  // Calculate total pages based on content height
  const calculateTotalPages = () => {
    const componentHeight = componentRef.current.offsetHeight;
    const pageHeight = 1056; // A4 page height in pixels
    const totalPages = Math.ceil(componentHeight / pageHeight);
    setTotalPages(totalPages);
  };

  // Update current page based on scroll position
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const pageHeight = 1056; // A4 page height in pixels
    const currentPage = Math.ceil(scrollTop / pageHeight) + 1;
    setCurrentPage(currentPage);
  };

  // Listen for scroll events to update current page
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

//   Recalculate total pages when component updates
//   useEffect(() => {
//     calculateTotalPages();
//   }, [data]);

  useLayoutEffect(() => {
    // const componentHeight = componentRef.current.offsetHeight ;
    const componentHeight = 856 ;
    const pageHeight = 1056; // A4 page height in pixels
    const totalPages = Math.ceil(componentHeight / pageHeight);
    setTotalPages(totalPages);
  }, [data]);


  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <PrintComponent ref={componentRef} data={data} />
      {/* <div className="page-number">{currentPage} / {totalPages}</div> */}
    </div>
  );
};

export default PrintablePage;
