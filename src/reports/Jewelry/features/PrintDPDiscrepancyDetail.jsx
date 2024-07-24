import React from 'react';
import moment from 'moment';
import './PrintDPDiscrepancyDetail.css';
import { formatNumber } from '../../../pages/Functions/MyFunctions';
import imgPicture  from "../../../images/imgcloudviewer.jfif";
let gPhotoDirectory ="https://firebasestorage.googleapis.com/v0/b/oro-business-group.appspot.com";

class PrintComponent extends React.Component { props
    constructor(props) {
        super(props);
    }
    
  render() {
    const { data } = this.props;
    // console.log('detail3: ',data)

    const headerStyle = {
        backgroundColor: '#f2f2f2',
        border: '1px solid #ddd',
        padding: '5px',
        textAlign: 'left',
        
    };
      
    const cellStyle = {
        border: '1px solid #ddd',
        // padding: '8px',
        padding:'2px 1px 5px 4px',
        textAlign: 'left',
    };

    function GetPicture(tImageFile)  { 
        //  alert(tImageFile);
        let cRetval= imgPicture;
        if (tImageFile==='') {
            // ok
        } else {
            cRetval= gPhotoDirectory + tImageFile;
            // alert(cRetval);
        }
        return cRetval;
    }
    

    function reportsHeaders() {
        return (
            <>
            {/* , with:'100%', color:'gray',border:'solid 1px' */}
            <div style={{marginTop:'3px' }}></div>
                {/*  width: '100%' borderCollapse: 'collapse',*/}
                <table className="print-styled-table85115">
                    {/* ,margin:'0 0 0 0' */}
                <thead>
                    <tr>
                    <th style={{...headerStyle, width: '80px'}}>
                        <span>Image</span>
                        <br></br>
                        <span></span>
                    </th>
                    <th style={{...headerStyle, width: '68px'}}>
                        Code
                        <br></br> 
                        <span>Barcode</span>
                        <br></br>
                        <span>Entry Date</span>
                     </th>
                    <th style={{...headerStyle, width: '180px'}}>
                        Class/Description
                        <br></br> 
                        <span>Weight</span>
                        <br></br>
                        <span>Size</span>
                     </th>
                     <th style={{...headerStyle, width: '40px'}}>
                        Karat
                    </th>
                    <th style={{...headerStyle, width: '65px'}}>
                        Selling Price
                        <br></br> 
                        <span>Price Code</span>
                    </th>


                    <th style={{...headerStyle, width: '0px',padding: '2px',}}></th>
                    
                    <th style={{...headerStyle, width: '80px'}}>
                        <span>Image</span>
                        <br></br>
                        <span></span>
                    </th>
                    <th style={{...headerStyle, width: '68px'}}>
                        Code
                        <br></br> 
                        <span>Barcode</span>
                        <br></br>
                        <span>Entry Date</span>
                     </th>
                    <th style={{...headerStyle, width: '180px'}}>
                        Class/Description
                        <br></br> 
                        <span>Weight</span>
                        <br></br>
                        <span>Size</span>
                     </th>
                     <th style={{...headerStyle, width: '40px'}}>
                        Karat
                    </th>
                    <th style={{...headerStyle, width: '65px'}}>
                        Selling Price
                        <br></br> 
                        <span>Price Code</span>
                    </th>
                    </tr>

                </thead>
                </table>

            </>
        )
    }

    function reportsHeadersNew() {
        return (
            <>
                <thead>
                    <tr>
                    <th style={{...headerStyle, width: '80px'}}>
                        <span>Image</span>
                        <br></br>
                        <span></span>
                    </th>
                    <th style={{...headerStyle, width: '68px'}}>
                        Code
                        <br></br> 
                        <span>Barcode</span>
                        <br></br>
                        <span>Entry Date</span>
                     </th>
                    <th style={{...headerStyle, width: '180px'}}>
                        Class/Description
                        <br></br> 
                        <span>Weight</span>
                        <br></br>
                        <span>Size</span>
                     </th>
                     <th style={{...headerStyle, width: '40px'}}>
                        Karat
                    </th>
                    <th style={{...headerStyle, width: '65px'}}>
                        Selling Price
                        <br></br> 
                        <span>Price Code</span>
                    </th>


                    
                    </tr>

                </thead>
            </>
        )
    }
    function reportsDetails() {
        return (
            <>
            {/*  print-styled-table85115  print-section-85115-p*/}
                <table className="print-styled-table85115DC">
                    {reportsHeadersNew()}
                    <tbody>
                        {  data.length >0 && data.map((jsonRec, index) => (
                            <tr key={ index } >

                                <td style={{...cellStyle, width: '79px'}}> 
                                    {jsonRec.image ?
                                        <img src={GetPicture(jsonRec.image)} className='logo'  alt="" style={{height:'60px', width:'60px', marginLeft: '0rem', color: 'darkblue', content: 'View Picture...' }} />  
                                        : ""
                                    }
                                </td>

                                {/* <td style={{...cellStyle, width: '79px'}}><img src={Logo} alt="Image1" style={{ maxWidth: '60px' }} /></td> */}


                                <td style={{...cellStyle, width: '65px'}}>{jsonRec.code}
                                    <br></br>
                                    <span>{jsonRec.barcode}</span>
                                    <br></br>
                                    <span>{moment(jsonRec?.dtEncoded,'YYYY-MM-DD').format('MM/DD/YY')}</span>
                                </td>
                                <td style={{...cellStyle, width: '178px', padding:'1 00 00 00'}}>
                                    {jsonRec.clscode  + ' ' + jsonRec.description}
                                    <br></br>
                                    <span>{jsonRec.weight } {jsonRec.weight ? 'g':''}  </span>
                                    <br></br>
                                    <span>{jsonRec.size}</span>
                                </td>
                                <td style={{...cellStyle, width: '40px'}}>{jsonRec.carats}</td>
                                <td style={{...cellStyle, width: '65px',textAlign: 'right' }}> <span style={{color: 'blue', marginRight:'1px' }} >{formatNumber(jsonRec.sellingPr)}</span>
                                    <br></br>
                                    <span>{jsonRec.priceCode}</span>
                                </td>

                            </tr>
                        )) }
                    </tbody>
                </table>
            </>
        )
    }


    return (
      <div className="print-new-page" style={{marginTop: '0px', padding: '20px 0px 0px 0px'}}>
        <h5>JEWELRY (Discrepancy Details)  [Branch  {this.props.reportBranch.substring(1)} ]</h5>
        <label style={{textAlign:'left',fontSize: '12px'}}>{this.props.reportFromDate}</label>
        {/* {reportsHeaders()} */}
        <div className="print-column2-content">
            {/* <h5>JEWELRY (Discrepancy Details)  [Branch  {this.props.reportBranch.substring(1)} ]</h5>
            <h6 style={{textAlign:'left',fontSize: '12px'}}>{this.props.reportFromDate}</h6> */}
          {/* Your content goes here */}
          {/* This content will automatically span multiple columns if necessary */}
          
          {reportsDetails()}
          {/* <div className="print-new-page">
              {reportsDetails()}
          </div> */}
        </div>
      </div>
    );
  }
}

export default PrintComponent;
