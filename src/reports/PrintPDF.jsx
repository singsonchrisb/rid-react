const responseBlob = new Blob([pdfBlob], {
    type: 'application/pdf'
  });
  const fileURL = URL.createObjectURL(responseBlob);
  setPreview(false);
  // printJS(fileURL);
  printJS({
    type: 'pdf',
    printable: fileURL,
    honorMarginPadding: true,
    style: '@page { size: 80mm 50mm }'

  });


//   npm i react-to-print  uae this instead of printJS
// npm install --save react-to-print
// https://www.npmjs.com/package/react-to-print