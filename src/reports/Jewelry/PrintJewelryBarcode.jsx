

import React, {useState, useEffect, useRef} from 'react';
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";

import { useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { isMobile } from 'react-device-detect';
import useEscapeKey from '../../hooks/useEscapeKey'; // Adjust the path as needed

// let nModule =80011;
// let topMargin = ((window.innerHeight-660)/2) ;
let topMargin = 50 ;

const styles = {
  boxHeadTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 15,
      marginTop: '1px',
      marginBottom: '15px',
      width: '100%',
      height: '30px',
      color: 'white',
      backgroundColor: '#448AFF',
    },

};


// size: 38mm 20mm
// const pageStyle = `
//   @page {
//     size: 68mm 40mm
//     // margin: 1mm 1mm 1mm 1mm
//   };
//   @media all {
//     .pageBreak {
//       display: none
//     }
//   };
//   @media print {
//     .pageBreak {
//       page-break-before: always;
//     }
//   }
// `;
// margin: 0mm 0mm 0mm 2mm;
// margin: 0mm 0mm 0mm left;
// size: auto;
const pageStyle2 = `
  @page { 
    size: 50mm 30mm
    margin: 0mm 0mm 0mm 2mm;
  }
  body {
    margin: 0;
    padding: 0;
  };
 `;


//  @media print {
//   body {
//       display: table;
//       table-layout: fixed;
//       padding-top: 2.5cm;
//       padding-bottom: 2.5cm;
//       height: auto;
//   }
// }

// @page Section1 {
//   size: 8.27in 11.69in; 
//   margin: .5in .5in .5in .5in; 
//   mso-header-margin: .5in; 
//   mso-footer-margin: .5in; 
//   mso-paper-source: 0;
// }


// function PrintBarcodes(props) {
  const PrintBarcodes = (props) => {  
    const Navigate = useNavigate();

    // const [value, setValue] = useState('J1000001');
    const [value, setValue] = useState(props.data[0].self);
    const [direct,setDirect] = React.useState(false);
    const ref = useRef();
    

    useEffect(() => {
      if (props.data[0].prodCode==='x') {
         setDirect(false)   
         topMargin = ((window.innerHeight-660)/2)

      } else {
         setDirect(true)   
      }
    }, []);

    


  //  alert(direct);

    
    // alert(props.data[0].self);
    // const imageFilename = product.data[0].self;

    // const setValueBarcode = () => {
    //     // setValue("1234567891011");
    //     setValue("J0234567");
    // };

    const onChange=(e)=>{
      setValue(e.target.value)
    }

    const handleWindowClose = () => {
      // Navigate("/dasboard");
      // Navigate("/hamepage");
      Navigate(-1);
  }

 

  return (
    <div>
        <div className='Box-Center' style={{width: isMobile ? '100%':'200px', height: direct ? '260px':'320px', marginTop: (topMargin) +'px' }} >
        {/* ((window.innerHeight-600)/2) */}
            {!direct ? (
               <FaWindowClose className='windowclose-button' onClick={() => handleWindowClose()}/>   
             ) :  ''  }
             {!direct ? (
               <h3 style={styles.boxHeadTitle}>Print Barcode</h3>
             ) :  ''  }


            <div style={{textAlign:'center', marginLeft:'5px', width:'95%' }}>
                <div style={{textAlign:'left', marginLeft:'0px', width:'100%', height:'120px', borderRadius: '2px', border: '1px solid #999' }}> 
                    
                    <div ref={ref} style={{fontSize:'9px', fontWeight:'bold', marginLeft:'0px', textAlign:'left'}}>
                        {/* <Barcode width={1} height={25} ref={ref} value={value} format="CODE39" />  */}
                        <label > Descript ddddsd d </label>
                        <br></br>
                        <label > Size: 50   </label>
                        <br></br>
                        <label > Size: 50   </label>
                        {/* <Barcode width={1} height={40} ref={ref} value={value}  */}
                        <br></br>
                        <Barcode width={1} height={40} fontSize={12} value={value}
                        /> 
                    </div>
                </div>
                <br></br>

                <label>Barcode:</label>
                <input style={{marginLeft:'4px', width:'100px'}} type="text" onChange={onChange} value={value} />
                <br></br>
                <br></br>
                {/* <button onClick={setValueBarcode}>Generate Barcode</button> */}
                {/* <button className="btn-neo1 btn-neo1-primary" style={{ fontSize: '15px', marginLeft: '5rem' }} onClick={() => handleAddShow()}>Add New Class</button>  */}
                
                <ReactToPrint 
                    trigger={() => <button className="btn-neo1 btn-neo1-primary" >Preview</button>}
                    content={() => ref.current}
                    pageStyle={pageStyle2}
                />
            </div>
        </div>


    </div>
    
  );
}

export default PrintBarcodes