import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';

const ReportComponent = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const generatePDF = () => {
    const pdf = new jsPDF();
    let pageNumber = 1;
    let numberOfPage = 1;

    // Function to add content for a single page
    const addPageContent = (pageContent) => {
    const pageCount = pdf.internal.getNumberOfPages();
    // for (let i = 1; i <= pageCount; i++) {
    //     pdf.setPage(i);
    //     pdf.text(10, 10, `Page ${i} of ${pageCount}`);
    // }

      pdf.addPage();
    //   pdf.text(10, 10, `Page ${pageNumber}`);
      pdf.text(160, 10, `Page ${pageNumber} of ${pageCount}`); // Page number at top right
      pdf.text(10, 20, pageContent);
      pageNumber++;
      
    };

    // Add content for three pages
    addPageContent("Page 1 - Content goes here."  + "Page 1 - Content goes here."
    );
    addPageContent("Page 2 - More content goes here. This will span multiple lines to ensure multiple pages.");
    addPageContent("Page 3 - Even more content goes here. This is just an example.");

    pdf.save('report.pdf');
  };

  return (
    <div>
      <div ref={componentRef}>
        {/* Content to be printed */}
        <h1>Report</h1>
        <p>This is the report content. It should span multiple pages.</p>
        {/* You can add more content here */}
      </div>
      <button onClick={handlePrint}>Print</button>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default ReportComponent;
