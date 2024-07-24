// import React, { useRef } from 'react';

// const printStyles = `
//   @media print {
//     @page {
//       size: portrait;
//       margin: 1cm;
//       @top-center {
//         content: element(header);
//       }
//       @bottom-center {
//         content: element(footer);
//       }
//     }
//     .header, .footer {
//       position: running(header_footer);
//     }
//     .header {
//       display: block;
//       text-align: center;
//       font-weight: bold;
//       margin-bottom: 10px;
//       font-size: 16px;
//     }
//     .footer {
//       display: block;
//       text-align: center;
//       font-size: 12px;
//     }
//     .page-content {
//       display: table-row-group;
//     }
//     .page-break {
//       page-break-before: always;
//     }
//   }
// `;

// const data = Array.from({ length: 150 }).map((_, index) => ({
//   col1: `Data 1 Row ${index + 1}`,
//   col2: `Data 2 Row ${index + 1}`,
//   col3: `Data 3 Row ${index + 1}`,
// }));

// const Report = () => {
//   const componentRef = useRef();
//   const rowsPerPage = 30; // Adjust based on the number of rows you want per page


//   const handlePrint = () => {
//     const printContents = componentRef.current.innerHTML;
//     const originalContents = document.body.innerHTML;

//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;
//     window.location.reload();
//   };

//   return (
//     <div>
//       <style>{printStyles}</style>
//       <button onClick={handlePrint}>Print Report</button>
//       <div style={{ maxWidth: '100%', margin: '0 auto' }} ref={componentRef}>
//         <div className="report-container">
//           <div className="header" id="header">
//             Report Title
//           </div>
//           <div className="footer" id="footer">
//             Page <span className="page-number"></span>
//           </div>
//           {Array.from({ length: Math.ceil(data.length / rowsPerPage) }).map((_, pageIndex) => (
//             <div key={pageIndex} className="page">
//               <div className="page-content">
//                 {data
//                   .slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
//                   .map((row, rowIndex) => (
//                     <div key={rowIndex}>
//                       {row.col1} | {row.col2} | {row.col3}
//                     </div>
//                   ))}
//               </div>
//               {pageIndex < Math.ceil(data.length / rowsPerPage) - 1 && (
//                 <div className="page-break"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Report;


import React, { useRef } from 'react';

const printStyles = `
  @media print {
    @page {
      size: portrait;
      margin: 1cm;
      @top-center {
        content: element(header);
      }
      @bottom-center {
        content: element(footer);
      }
    }
    .header, .footer {
      position: running(header_footer);
    }
    .header {
      display: block;
      text-align: center;
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .footer {
      display: block;
      text-align: center;
      font-size: 12px;
    }
    .page-content {
      display: table-row-group;
    }
    .page-break {
      page-break-before: always;
    }
  }
`;

const data = Array.from({ length: 150 }).map((_, index) => ({
  col1: `Data 1 Row ${index + 1}`,
  col2: `Data 2 Row ${index + 1}`,
  col3: `Data 3 Row ${index + 1}`,
}));

const Report = () => {
  const componentRef = useRef();
  const rowsPerPage = 10; // Adjust based on the number of rows you want per page
  const pageCount = Math.ceil(data.length / rowsPerPage);

  const handlePrint = () => {
    const printContents = componentRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div>
      <style>{printStyles}</style>
      <button onClick={handlePrint}>Print Report</button>
      <div style={{ maxWidth: '100%', margin: '0 auto' }} ref={componentRef}>
        <div className="report-container">
          <div className="header" id="header">
            Report Title
          </div>
          <div className="footer" id="footer">
            Page <span className="page-number"></span>
          </div>
          {[...Array(pageCount)].map((_, pageIndex) => (
            <div key={pageIndex} className="page">
              <div className="page-content">
                {data
                  .slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
                  .map((row, rowIndex) => (
                    <div key={rowIndex}>
                      {row.col1} | {row.col2} | {row.col3}
                    </div>
                  ))}
              </div>
              {pageIndex < pageCount - 1 && (
                <div className="page-break"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
