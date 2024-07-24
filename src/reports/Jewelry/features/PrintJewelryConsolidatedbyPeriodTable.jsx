import React, { useState, useRef }from 'react';
import ReactToPrint from 'react-to-print';
import './PrintJewelryConsolidatedbyPeriodTable.css';

function OroReportTable({ items, handlePrint, tBranch }) {
    console.log('tBranch,',tBranch)
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDateRange, setSelectedDateRange] =   useState({ from: '2024-02-27', to: '2024-02-29' });
    // const [selectedBranch, setSelectedBranch] = useState(tBranch);
    const itemsPerPage = 10;
    const componentRef = useRef();

    const getCurrentDateTime = () => {
        const currentDate = new Date();
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentDate.getDay()];
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const year = currentDate.getFullYear() % 100;
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const ampm = hours >=12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;

        return `${month}/${day}/${year}[${dayOfWeek}] ${formattedHours}:${minutes} ${ampm}`;
    };

    const currentDateAndTime = getCurrentDateTime();


    if (!items || items.length === 0) {
        return null; // Don't render anything if there are no items to display
    }

    const formatNumberWithCommas = (number) => {
        if (number === null || number === undefined || number===0){
            // return null;
            return '-';
        }
        return number.toLocaleString();
    };

    const computeTotalCashSales = () => {
        let totalCashSales = 0;
        for (let i = 0; i < items.length; i++) {
            totalCashSales += parseInt(items[i].cashSales);
        }
        return totalCashSales;
    }
    
    const computeTotalCashQty = () => {
        let totalCashQty = 0;
        for (let i = 0; i < items.length; i++) {
            totalCashQty += parseInt(items[i].cashQty);
        }
        return totalCashQty;
    }
    
    const computeTotalLaCash = () => {
        let totalLaCash = 0;
        for (let i = 0; i < items.length; i++) {
            totalLaCash += parseInt(items[i].laCash);
        }
        return totalLaCash;
    }
    
    const computeTotalLaQty = () => {
        let totalLaQty = 0;
        for (let i = 0; i < items.length; i++) {
            totalLaQty += parseInt(items[i].laQty);
        }
        return totalLaQty;
    }
    
    const computeTotalSales = () => {
        let totalSales = 0;
        for (let i = 0; i < items.length; i++) {
            totalSales += parseInt(items[i].totalSales);
        }
        return totalSales;
    }
    
    const computeTotalNetSales = () => {
        let totalNetSales = 0;
        for (let i = 0; i < items.length; i++) {
            totalNetSales += parseInt(items[i].netSales);
        }
        return totalNetSales;
    }
    
    const computeTotalPawnVal = () => {
        let totalPawnVal = 0;
        for (let i = 0; i < items.length; i++) {
            totalPawnVal += parseInt(items[i].pawnValue);
        }
        return totalPawnVal;
    }
    
    // const computeTotalCommCode = () => {
    //     let totalCommCode = 0;
    //     for (let i = 0; i < items.length; i++) {
    //         totalCommCode += parseInt(items[i].commCode);
    //     }
    //     return totalCommCode;
    // }
    const computeTotalCommCode = () => {
        let totalCommCode = 0;
        for (let i = 0; i < items.length; i++) {
            totalCommCode += parseInt(items[i].commCode);
        }
        return totalCommCode;
    }

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

return (
    <div id='table-to-print'>
        <div className='table-title' style={{ textAlign: 'left', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', marginTop: '20px' }}>JEWELRY{' '} <small><span style={{ float: 'right', fontSize: '14px'}}>| Page{currentPage} of {totalPages} </span></small></div>
        <div className='table-subtitle' style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold'}}>CONSOLIDATED REPORT [Branch {tBranch}] <br />
        <span style={{ fontSize: '16px'}}>Period: {selectedDateRange.from} to {selectedDateRange.to}</span>
        <small><span style={{ float: 'right', fontSize: '16px'}}>{currentDateAndTime}</span></small></div>

        <div className='table-container'>
            <table style={{ cursor: 'pointer', width: 'auto', margin: 'auto ', alignItems: 'left'}} className='table table-borderless datatable'>
                <thead className='table-light'>
                    <tr style={{ fontSize: '12px'}}>
                        <th style={{  borderLeft: '0.7px solid #313131', borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>Cashier</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>---CASH---</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>---LA--</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>---SUNDRIES---</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>---Total---</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>---LESS---</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>Over/</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>Less</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>Net&nbsp;&nbsp;Sales</th>
                        <th style={{  borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>---ADD---</th>
                        <th style={{  borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>---LESS---</th>
                        <th style={{  borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>---LA---</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>Pawn&nbsp;Val</th>
                        <th style={{ borderTop: '0.7px solid #313131', borderRight: '0.7px solid #313131', textAlign: 'center'}} scope='col'>Comm.&nbsp;(Code)</th>
                    </tr>
                    <tr style={{ fontSize: '11px'}}>
                        <th style={{ textAlign: "left", borderBottom: '0.7px solid #313131', borderLeft: '0.7px solid #313131', borderTop: 'none', borderRight: '0.7px dashed #313131'}} scope='col'>&nbsp;&nbsp;&nbsp;&nbsp;Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Day&nbsp;&nbsp;&nbsp;&nbsp;</th>
                        <th style={{ borderBottom: '0.7px solid #313131',  borderRight: '0.7px dashed #313131'}} scope='col'>Sales&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Qty</th>
                        <th style={{ borderBottom: '0.7px solid #313131',  borderRight: '0.7px dashed #313131'}} scope='col'>Sales&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DPay&nbsp;&nbsp;&nbsp;Qty</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131'}} scope='col'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131'}} scope='col'>Sales&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cash</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131'}} scope='col'>Cash&nbsp;w/d&nbsp;Cr&nbsp;&nbsp;Card/Ret</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131'}} scope='col'>Short</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131', textAlign: 'center'}} scope='col'>Can&nbsp;LA</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131'}} scope='col'>Net&nbsp;&nbsp;Sales</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131'}} scope='col'>Dsply&nbsp;&nbsp;&nbsp;&nbsp;LA</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131'}} scope='col'>Cash&nbsp;&nbsp;&nbsp;&nbsp;LA&nbsp;&nbsp;W/d&nbsp;&nbsp;&nbsp;Amount</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131'}} scope='col'>Add&nbsp;&nbsp;&nbsp;&nbsp;(FP)&nbsp;&nbsp;&nbsp;(Cncl)&nbsp;&nbsp;&nbsp;End&nbsp;Inv</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px dashed #313131'}} scope='col'>[Cash+LA]</th>
                        <th style={{ borderBottom: '0.7px solid #313131', borderRight: '0.7px solid #313131'}} scope='col'></th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'left', fontSize: '11px'}}>
                    {items &&
                    items.length > 0 &&
                    (() => {
                        const rows = [];
                        for (let i = 0; i < items.length; i++) {
                            const item = items[i];
                            rows.push(
                                <tr key={item.cashier} style={{ fontWeight: 'bold'}}>
                                    <th scope='row' style={{ whiteSpace: 'nowrap'}}>
                                        {item.cashier}<br />
                                        {item.reportDate}&nbsp;{item.dayOfWeek}
                                    </th>
                                    {/* <td style={{ paddingTop: '25px', paddingBottom: '0px', textAlign: 'right', width: '20px'}}>{formatNumberWithCommas(item.cashSales)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.cashQty)}</td> */}
                                    
                                    <td style={{ paddingTop: '25px', textAlign: 'right'}}>{formatNumberWithCommas(item.cashSales)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>{formatNumberWithCommas(item.cashQty) }</span>
                                    </td>
                                    {/* <td style={{ paddingTop: '25px', textAlign: 'right', width: '20px'}}>{formatNumberWithCommas(item.cashQty) }</td> */}

                                    <td style={{ paddingTop: '25px', paddingBottom: '0px' }}>{formatNumberWithCommas(item.laSales)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.laCash)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.laQty)}</td>
                                    <td style={{ paddingTop: '25px', paddingBottom: '0px', textAlign: 'center' }}>&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.sundries)}&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                    <td style={{ paddingTop: '25px', paddingBottom: '0px', textAlign: 'right' }} >{formatNumberWithCommas(item.totalSales)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.totalCash)}</td>
                                    <td style={{ paddingTop: '25px', paddingBottom: '0px', textAlign: 'center'}}>{formatNumberWithCommas(item.lessWdCard)}</td>
                                    <td style={{ paddingTop: '25px', paddingBottom: '0px', textAlign: 'center'}}>{formatNumberWithCommas(item.overShort)}</td>
                                    <td style={{ paddingTop: '25px', paddingBottom: '0px', textAlign: 'center'}}>{formatNumberWithCommas(item.lessLaCan)}</td>
                                    <td style={{ paddingTop: '25px', paddingBottom: '0px', textAlign: "center"}}>{formatNumberWithCommas(item.netSales)}</td>
                                    <td style={{ paddingTop: '25px', paddingBottom: '0px'}}>{formatNumberWithCommas(item.addInv)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.addLaCancel)}</td>
                                    <td style={{ paddingTop: '25px', paddingBottom: '0px'}}>&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.lessCash)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.lessLa)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.lessStockTransfer)}</td>
                                    <td style={{ paddingTop: '25px', paddingBottom: '0px'}}>{formatNumberWithCommas(item.laAdd)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.laLessFP)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.laLessCancel)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(item.laEndInv)}</td>
                                    <td style={{ textAlign: "center", paddingTop: '25px', paddingBottom: '0px'}}>{formatNumberWithCommas(item.pawnValue)}</td>
                                    <td style={{ textAlign: 'center', paddingTop: '25px', paddingBottom: '0px'}}>{formatNumberWithCommas(item.commCode)}</td>
                                </tr>
                            );
                        }
                        return rows;
                    })()}
                </tbody>
                </table>
                
                {/* <br></br> */}
                
                {/* <tfoot2 style={{ borderTop: "0.7px solid #313131"}}>
                
                    {items &&
                    items.length > 0 && (
                        <tr style={{ fontSize: '12px', fontWeight: 'bold'}}>
                            <th scope="row">Jewelry</th>
                            <td>{formatNumberWithCommas(computeTotalCashSales())}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(computeTotalCashQty())}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(computeTotalLaCash())}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(computeTotalLaQty())}</td>
                            <td>Total&nbsp;Sales&#x27A3;&#x27A3;&#x27A3;</td>
                            <td>{formatNumberWithCommas(computeTotalSales())}</td>
                            <td></td>   
                            <td></td>
                            <td style={{ textAlign: "center"}}>Total&nbsp;Net&nbsp;Sales&#x27A3;&#x27A3;</td>
                            <td style={{ textAlign: "center"}}>{formatNumberWithCommas(computeTotalNetSales())}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{ textAlign: 'center' }}>{formatNumberWithCommas(computeTotalPawnVal())}</td>
                            <td style={{ textAlign: 'center' }}>{formatNumberWithCommas(computeTotalCommCode())}</td>
                        </tr>
                    )}
                </tfoot2> */}
                </div>
                

                <br></br>
                <div style={{ borderTop: "0.7px solid #313131"}}>
                    {items &&
                    items.length > 0 && (
                        <tr style={{ fontSize: '12px', fontWeight: 'bold'}}>
                            <th scope="row">Jewelry</th>
                            <td>{formatNumberWithCommas(computeTotalCashSales())}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(computeTotalCashQty())}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(computeTotalLaCash())}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(computeTotalLaQty())}</td>
                            <td>Total&nbsp;Sales&#x27A3;&#x27A3;&#x27A3;</td>
                            <td>{formatNumberWithCommas(computeTotalSales())}</td>
                            <td></td>   
                            <td></td>
                            <td style={{ textAlign: "center"}}>Total&nbsp;Net&nbsp;Sales&#x27A3;&#x27A3;</td>
                            <td style={{ textAlign: "center"}}>{formatNumberWithCommas(computeTotalNetSales())}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{ textAlign: 'center' }}>{formatNumberWithCommas(computeTotalPawnVal())}</td>
                            <td style={{ textAlign: 'center' }}>{formatNumberWithCommas(computeTotalCommCode())}</td>
                        </tr>
                    )}
                </div>
            
        
        <div className='print-button1 row mt-3'>
            <div className='col-md-12 d-flex justify-content-end'>
                <ReactToPrint
                trigger={() => <button className='print-button' style={{  backgroundColor: '#198754', border: 'none', color: 'white', padding: '8px 18px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', width: '60%', margin: '4px 2px', cursor: 'pointer', borderRadius: '0.3rem'}}
                onClick={handlePrint}>Print</button>}
                content={() => document.getElementById('table-to-print')}
                />
            </div>
        </div>
    </div>
);
}    



export default OroReportTable;


