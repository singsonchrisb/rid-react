import React, {useState, useEffect, useRef} from 'react';
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";

import { useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
// import { isMobile } from 'react-device-detect';

// let nModule =80011;
// let topMargin = ((window.innerHeight-660)/2) ;
// let topMargin = 50 ;

const styles = {
  boxHeadTitle: {
      textAlign: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: '1px',
      marginBottom: '15px',
      width: '100%',
      height: '28px',
      color: 'white',
      backgroundColor: '#448AFF',
    },

};


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

  const PrintVirtualBarcode = (props) => {  
    const Navigate = useNavigate();

    // const [value, setValue] = useState('J1000001');
    const [value, setValue] = useState(props.data[0].self);
    const [direct,setDirect] = React.useState(false);
    const [isShowBarcode, setIsShowBarcode] = useState(false);

    const ref = useRef();
    

    useEffect(() => {
      if (props.data[0].prodCode==='x') {
         setDirect(false)   
        //  topMargin = ((window.innerHeight-660)/2)

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

    const handleShow = () => {
      
      if (isShowBarcode===false) {
          // check data api

          

          setIsShowBarcode(true);
      } else {
        setIsShowBarcode(false);
      }
    }


 function showBarcode () {
  return (
    <div style={{textAlign:'center',justifyContent: 'center',  marginLeft:'5px', width:'345px' }}>
    <div style={{textAlign:'center', justifyContent: 'center', width:'100%', height:'160px', borderRadius: '2px', border: '1px solid #999' }}> 
        <div ref={ref} style={{fontSize:'15px', fontWeight:'bold', textAlign:'left'}}>
            {/* <Barcode width={1} height={25} ref={ref} value={value} format="CODE39" />  */}
            {/* <Barcode width={1} height={40} ref={ref} value={value}  */}
            <br></br>
            <Barcode width={2} height={80} fontSize={16} value={value}
            /> 
        </div>
    </div>
    <br></br>

    
    {/* <button onClick={setValueBarcode}>Generate Barcode</button> */}
    {/* <button className="btn-neo1 btn-neo1-primary" style={{ fontSize: '15px', marginLeft: '5rem' }} onClick={() => handleAddShow()}>Add New Class</button>  */}
    
    <ReactToPrint 
        trigger={() => <button className="btn-neo1 btn-neo1-primary" >Preview</button>}
        content={() => ref.current}
        pageStyle={pageStyle2}
    />
    
</div>

  )
 }


  return (
    <div>
        <div className='Box-Center' style={{width: '360px', height: '350px', marginTop: '60px' }} >
        {/* ((window.innerHeight-600)/2) */}
            {!direct ? (
               <FaWindowClose className='windowclose-button' onClick={() => handleWindowClose()}/>   
             ) :  ''  }
             {!direct ? (
               <h3 style={styles.boxHeadTitle}>Print Virtual Barcode</h3>
             ) :  ''  }
             {/* marginLeft:'30px', */}

             <label style={{marginLeft:'10px',fontSize:'18px'}} >Barcode:</label>
             <input style={{marginLeft:'10px', marginRight:'10px', width:'150px',fontSize:'18px', fontWeight:'bold' }} 
                    type="text" 
                    onChange={onChange} 
                    disabled={isShowBarcode===true ? true: false }
                    value={value} />
             <button className="btn-neo1 btn-neo1-primary"  onClick={() => handleShow()} > {isShowBarcode ===false ? "Show" :"Input new"} </button>
             <br></br>
             <br></br>

             {isShowBarcode ? (
               showBarcode()
            ) : ''}
            
        </div>


    </div>
    
  );
}

export default PrintVirtualBarcode