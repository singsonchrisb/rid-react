import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());


  const componentRef = useRef();
  const previewRef = useRef(null);

  useEffect(() => {
    // Generate 500 items
    const generatedItems = Array.from({ length: 500 }, (_, i) => `Item Test ${i + 1}`);
    setItems(generatedItems);
  }, []);

  useEffect(() => {
    // Update the current date and time
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
// margin: 1in;
  const printStyles = `
    @media print {
      @page {
        size: portrait;
      }

      body {
        font-family: Arial, sans-serif;
      }

      .page {
        page-break-after: always;
        page-break-inside: avoid;
      }

      .page:last-child {
        page-break-after: auto;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        top: 0;
      }

      .date-time {
        position: absolute;
        top: 10;
        right: 0;
      }

      .page-counter {
        position: absolute;
        top: 0;
        // left: 50%;
        // transform: translateX(-50%);
        right: 0;
       
      }
    }
  `;



  const printTable = () => {
    const printContents = componentRef.current.innerHTML;
    // const printContents = document.getElementById('printableTable').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    // window.location.reload();
};


const handPrinCheck = async () => {
    
    //  RefreshData(false);

    
     printTable();
}


  const itemsPerPage = 40; // Adjust this number to control items per page
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="App">
      <button className='btn-neo1 btn-neo1-primary' style={{width: '90px',marginLeft:'50px',marginRight:'5px'}} ref={previewRef}  onClick={handPrinCheck} >Preview </button>
      
      <div style={{ maxWidth: '100%', margin: '0 auto'}} ref={componentRef} >

        {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex} className="page">
            <div className="header">
                <h1>Report</h1>
                <div className="page-counter">Page {pageIndex + 1} of {totalPages}</div>
                <div className="date-time">{currentDate.toLocaleString()}</div>
                
            </div>
            
            <ul>
                {items
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((item, index) => (
                    <>
                    <li key={index}>{item}
                        <span>No. {index+1}</span>
                    </li>
                    </>
                ))}
            </ul>
            </div>
        ))}
        <style>
            {printStyles}
        </style>
      </div>
    </div>
  );
};

export default App;
