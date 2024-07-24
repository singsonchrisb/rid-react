// gs://oro-business-group.appspot.com/tutorials/Jewelry POS Tutorial.mp4
//tokern a209f43f-9ae4-46f7-8d66-b2df824c772d

// @ JewelrySub -> DropDownReportLink("/PrintDailyPhysicalInventory", 8001)

import React, { useState, useEffect, useRef }  from 'react';
// useEffect,
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
import moment from 'moment';

import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { MyServerHostJava,GetDepartmentList, GetItemBranch, decryptPWord, formatNumber}  from '../../pages/Functions/MyFunctions';
import PrintDPDiscrepanyDetail from '../Jewelry/features/PrintDPDiscrepancyDetail'
import '../../styles/Print.css';
import useEscapeKey from '../../hooks/useEscapeKey'; // Adjust the path as needed

// import imgPicture  from "../../images/imgcloudviewer.jfif";
// formatNumber, mySubstr, myDayName, myMonthName,

let dbServerHostJava = MyServerHostJava();
let reportTitle, reportFromDate ="";
// let gPhotoDirectory ="https://firebasestorage.googleapis.com/v0/b/oro-business-group.appspot.com";
// let gPhotoDirectory2 ="https://firebasestorage.googleapis.com/v0/b/react-contact-1ea2c.appspot.com";


// const initRowState = {
//     description: '',
//     comm: 0,
//     auct: 0,
//     total: 0,
// }

let arrRow =['Beginning', 'Add Display  [LA]','Return/Error','Cancel    [LA]','Less Sales  [FP]','W/d[LA cancel]','Computed','Actual','Over (Short)'];
let arrClassCode=['BA','BCT','CK','DIA','EARG','JBOX','NKCL','PEND','RING'];
let arrClassCodeNew=[];
let arrClass=[];
let arrClassNew=[];
let arrDiscrepancy=[];

const printStyles = `
    @media print {
      @page {
        size: portrait; 
      }
    }
  `;

const dataPhysical =
{
    "status": 200,
    "data": {
        "detail1": [
            {
                "self": null,
                "hscode": "J1",
                "trndate": "2024-04-23",
                "classCode": "AUC",
                "opening": 9,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 9,
                "actual": 0,
                "overShort": -9
            },
            {
                "self": null,
                "hscode": "J1",
                "trndate": "2024-04-23",
                "classCode": "BA",
                "opening": 35,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 35,
                "actual": 0,
                "overShort": -35
            },
            {
                "self": null,
                "hscode": "J1",
                "trndate": "2024-04-23",
                "classCode": "BCT",
                "opening": 78,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 78,
                "actual": 0,
                "overShort": -78
            },
            {
                "self": null,
                "hscode": "J1",
                "trndate": "2024-04-23",
                "classCode": "CK",
                "opening": 5,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 5,
                "actual": 5,
                "overShort": 0
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "DIA",
                "opening": 28,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 28,
                "actual": 0,
                "overShort": -28
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "EARG",
                "opening": 117,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 117,
                "actual": 0,
                "overShort": -117
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "JBOX",
                "opening": 25,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 25,
                "actual": 0,
                "overShort": -25
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "MISC",
                "opening": 6,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 6,
                "actual": 0,
                "overShort": -6
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "NKLC",
                "opening": 201,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 201,
                "actual": 0,
                "overShort": -201
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "PEND",
                "opening": 207,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 207,
                "actual": 0,
                "overShort": -207
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "RING",
                "opening": 149,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 149,
                "actual": 0,
                "overShort": -149
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "STDX",
                "opening": 228,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 228,
                "actual": 0,
                "overShort": -228
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "WR",
                "opening": 350,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 350,
                "actual": 0,
                "overShort": -350
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "LA",
                "opening": 0,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 0,
                "actual": 0,
                "overShort": 0
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "COMM",
                "opening": 1429,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 1429,
                "actual": 5,
                "overShort": -1424
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "AUCT",
                "opening": 9,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 9,
                "actual": 0,
                "overShort": -9
            },
            {
                "self": null,
                "hscode": "J18",
                "trndate": "2024-04-23",
                "classCode": "TOTAL",
                "opening": 1438,
                "addDisplay": 0,
                "addReturn": 0,
                "addCancel": 0,
                "lessSales": 0,
                "lessWd": 0,
                "closing": 1438,
                "actual": 5,
                "overShort": -1433
            }
        ],
        "detail2": [
            {
                "docno": "0423240001",
                "trnDate": "2024-04-22",
                "remarks": "TEST REMARKS1",
                "items": [
                 {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0110200007",
                    "barcode": "J250877",
                    "classCode": "DIA",
                    "description": "R WG RCTGL SHAPE #2806582",
                    "weight": 3.2,
                    "size": "7",
                    "carats": 18,
                    "priceCode": "LHEHH",
                    "sellingPr": 122000.00,
                    "dtEncoded": "2024-01-10"
                },
                {
                    "hscode": "J1",
                    "dtReceived": "2024-04-23",
                    "code": "0110200007",
                    "barcode": "J202728",
                    "classCode": "DIA",
                    "description": "R WG RCTGL SHAPE #2806582",
                    "weight": 3.2,
                    "size": "7",
                    "carats": 18,
                    "priceCode": "LHEHH",
                    "sellingPr": 122000.00,
                    "dtEncoded": "2024-01-10"
                },
                {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0110200007",
                    "barcode": "J202728",
                    "classCode": "DIA",
                    "description": "R WG RCTGL SHAPE #2806582",
                    "weight": 3.2,
                    "size": "7",
                    "carats": 18,
                    "priceCode": "LHEHH",
                    "sellingPr": 122000.00,
                    "dtEncoded": "2024-01-10"
                },
                {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0110200007",
                    "barcode": "J250877",
                    "classCode": "DIA",
                    "description": "R WG RCTGL SHAPE #2806582",
                    "weight": 3.2,
                    "size": "7",
                    "carats": 18,
                    "priceCode": "LHEHH",
                    "sellingPr": 122000.00,
                    "dtEncoded": "2024-01-10"
                },
                {
                    "hscode": "J1",
                    "dtReceived": "2024-04-23",
                    "code": "0110200007",
                    "barcode": "J202728",
                    "classCode": "DIA",
                    "description": "R WG RCTGL SHAPE #2806582",
                    "weight": 3.2,
                    "size": "7",
                    "carats": 18,
                    "priceCode": "LHEHH",
                    "sellingPr": 122000.00,
                    "dtEncoded": "2024-01-10"
                },
                {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0110200007",
                    "barcode": "J202728",
                    "classCode": "DIA",
                    "description": "R WG RCTGL SHAPE #2806582",
                    "weight": 3.2,
                    "size": "7",
                    "carats": 18,
                    "priceCode": "LHEHH",
                    "sellingPr": 122000.00,
                    "dtEncoded": "2024-01-10"
                },
                {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0110200007",
                    "barcode": "J202728",
                    "classCode": "DIA",
                    "description": "R WG RCTGL SHAPE #2806582",
                    "weight": 3.2,
                    "size": "7",
                    "carats": 18,
                    "priceCode": "LHEHH",
                    "sellingPr": 122000.00,
                    "dtEncoded": "2024-01-10"
                },
                {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0110200007",
                    "barcode": "J202728",
                    "classCode": "DIA",
                    "description": "R WG RCTGL SHAPE #2806582",
                    "weight": 3.2,
                    "size": "7",
                    "carats": 18,
                    "priceCode": "LHEHH",
                    "sellingPr": 122000.00,
                    "dtEncoded": "2024-01-10"
                },
                {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0110200007",
                    "barcode": "J202728",
                    "classCode": "DIA",
                    "description": "R WG RCTGL SHAPE #2806582",
                    "weight": 3.2,
                    "size": "7",
                    "carats": 18,
                    "priceCode": "LHEHH",
                    "sellingPr": 122000.00,
                    "dtEncoded": "2024-01-10"
                },
                {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0114230009",
                    "barcode": "J252815",
                    "classCode": "BCT",
                    "description": "OVAL/ENAMEL[N]750",
                    "weight": 1.2,
                    "size": "",
                    "carats": 18,
                    "priceCode": "",
                    "sellingPr": 10095.00,
                    "dtEncoded": "2023-01-14"
                }] 
            },
            {
                "docno": "0423240002",
                "trnDate": "2024-04-22",
                 "remarks": "TEST REMARKS2",
                 "items": [
                {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0121230001",
                    "barcode": "J253394",
                    "classCode": "NKLC",
                    "description": "YG JAPAN SUPERFINE",
                    "weight": 0.8,
                    "size": "20\"",
                    "carats": 18,
                    "priceCode": "OLGO",
                    "sellingPr": 6795.00,
                    "dtEncoded": "2023-01-21"
                },
                {
                    "hscode": "J18",
                    "dtReceived": "2024-04-23",
                    "code": "0121230014",
                    "barcode": "J253396",
                    "classCode": "NKLC",
                    "description": "TeststYG JAPAN SUPERFINE",
                    "weight": 0.8,
                    "size": "20\"",
                    "carats": 18,
                    "priceCode": "OLGO",
                    "sellingPr": 6795.00,
                    "dtEncoded": "2023-01-21"
                }
                ]
            }
        ],
    "detail3": [
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "ANKLT",
            "code": "R4-L170490",
            "barcode": "J250877",
            "dtEncoded": "2023-08-19",
            "description": "YG750/6DNGRND",
            "weight": 1.3,
            "size": "",
            "carats": 18,
            "sellingPr": 10895.00,
            "priceCode": "DDEEDDD-DD",
            "qty": 1,
            "image": '/o/jewelry%2FJ250877.jpg?alt=media&token=cd885791-8fcf-4d75-9e4f-b7f52a6f9e60',
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "R1-117069",
            "barcode": "J256840",
            "dtEncoded": "2023-03-15",
            "description": "NAIL T750",
            "weight": 6.9,
            "size": "",
            "carats": 18,
            "sellingPr": 56495.00,
            "priceCode": "GGGG-KK",
            "qty": 1,
            "image": '',
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "0728220001",
            "barcode": "J250877",
            "dtEncoded": "2022-07-28",
            "description": "WG NAIL THIN",
            "weight": 4.5,
            "size": "",
            "carats": 18,
            "sellingPr": 39595.00,
            "priceCode": "GGFHH",
            "qty": 1,
            "image": '/o/jewelry%2FJ250877.jpg?alt=media&token=cd885791-8fcf-4d75-9e4f-b7f52a6f9e60',
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "R4-L112746",
            "barcode": "J252398",
            "dtEncoded": "2022-12-20",
            "description": "BELT DES T750",
            "weight": 10.1,
            "size": "",
            "carats": 18,
            "sellingPr": 82695.00,
            "priceCode": "",
            "qty": 1
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "1005230005",
            "barcode": "J271196",
            "dtEncoded": "2023-10-05",
            "description": "YG CLIP SLANTLINESDE",
            "weight": 8.0,
            "size": "",
            "carats": 21,
            "sellingPr": 75095.00,
            "priceCode": "",
            "qty": 1
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "R1-R113378",
            "barcode": "J246721",
            "dtEncoded": "2022-08-17",
            "description": "BA5BALLT-750",
            "weight": 3.9,
            "size": "",
            "carats": 18,
            "sellingPr": 32695.00,
            "priceCode": "",
            "qty": 1
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "0920210012",
            "barcode": "J226112",
            "dtEncoded": "2021-09-20",
            "description": "WG 2 PRL BGTS",
            "weight": 18.9,
            "size": "",
            "carats": 14,
            "sellingPr": 116895.00,
            "priceCode": "GOHHH",
            "qty": 1
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "R4-L170539",
            "barcode": "J265860",
            "dtEncoded": "2023-08-19",
            "description": "DIA SHPE STN 750",
            "weight": 9.3,
            "size": "",
            "carats": 18,
            "sellingPr": 77995.00,
            "priceCode": "",
            "qty": 1
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "R1-117019",
            "barcode": "J256834",
            "dtEncoded": "2023-03-15",
            "description": "BA NAIL T750",
            "weight": 3.1,
            "size": "",
            "carats": 18,
            "sellingPr": 25995.00,
            "priceCode": "",
            "qty": 1
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "R4-122214",
            "barcode": "J283655",
            "dtEncoded": "2024-02-15",
            "description": "BA CHILD/DNGKITTY750",
            "weight": 5.2,
            "size": "",
            "carats": 18,
            "sellingPr": 42595.00,
            "priceCode": "",
            "qty": 1
        },
        {
            "scanned": " ",
            "hscode": "J5",
            "clscode": "BA",
            "code": "1005230003",
            "barcode": "J271194",
            "dtEncoded": "2023-10-05",
            "description": "OVAL DOTS DEF T-ARBC",
            "weight": 7.5,
            "size": "",
            "carats": 21,
            "sellingPr": 70395.00,
            "priceCode": "",
            "qty": 1
        }
    ]
},
"error": null
}

const PrintInventory = () => {
    const Navigate = useNavigate();
    const componentRef = useRef();
    const selBranchRef = useRef(null);
    const dateFromRef = useRef(null);
    const classRef = useRef(null);
    const showDiscrepancyRef = useRef(null);
    const previewRef = useRef(null);
    

    // var gAssignBranch = sessionStorage.getItem('assignBranch');
    var numBranch = sessionStorage.getItem('assignBranch');
    var gAssignBranch = numBranch ? "J"+numBranch:"";
    var gAcceesBranch ="";
    var gAccessToken="";

    gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
    gAcceesBranch = gAssignBranch ? gAssignBranch:GetItemBranch();

         
    let  curr = new Date();
    // curr.setDate(curr.getDate() + 3);
    let curDate = curr.toISOString().substr(0,10);
    // const [datProducts, setDataProduct] = useState(['']);  // data array
      const [datTable, setDataTable] = useState(['']);  // data array for searching, pgnation
    // const [datTable, setDataTable] = useState([]);  // data array for searching, pgnation
    //  const [datTable, setDataTable] = useState(dataPhysical);  // data array for searching, pgnation
   
    const [arrTable, setArrayTable] = useState(['']);  // data array for searching, pgnation
    // const [sorted, setSorted] = useState({ sorted: "name", reversed: false });

    const [showDiscrepancy, setShowDiscrepancy] = useState(false);
    const [dateFrom, setDateFrom] = useState(curDate);

    const optDepartment = GetDepartmentList()
    const [selBranch, setSelBranch] = useState(gAssignBranch ? gAssignBranch : gAcceesBranch ? gAcceesBranch : 'J1'); 
    const [selClass, setSelClass] = useState([]);
    const [optClass, setOptClass] = useState([]);

    // const[message1, setMessage1] = useState([]);
    
    // const [selBranch, setSelBranch] = useState('J1'); 
    // console.log('gAcceesBranch:', gAcceesBranch);
    // console.log('selbranm:', selBranch);

    // alert(curr.getDay())

     


    
    //  "Daily Physical Inventory Report [Branch " + selBranch.substring(1) + "]";
    //  "As of: " + myMonthName(curr.getMonth()+1)  + " " + curr.getDate() + ", " + curr.getUTCFullYear()  + " [" + myDayName(curr.getDay()) + "]";

    useEffect(() => {
        loadClass();
        RefreshData(false);
    }, []);


    useEscapeKey(() => {
        Navigate("/"); // Navigate back to main page
  });

    const RefreshData = (tTrue) => { 
         if (tTrue===true) {
            toast.success("Data refreshed successfully.");
         }
        reportTitle = "Daily Physical Inventory Report [Branch " + selBranch.substring(1) + "]";
        // console.log("date: ",dateFrom)
        // console.log("year: ",moment(dateFrom,'YYYY-MM-DD').format('YYYY'))
        // console.log("month: ",moment(dateFrom,'YYYY-MM-DD').format('MM'))
        // console.log("day: ",moment(dateFrom,'YYYY-MM-DD').format('DD'))
        //  console.log("day name: ",moment(dateFrom,'YYYY-MM-DD').format('dddd'))

        var nYear = moment(dateFrom,'YYYY-MM-DD').format('YYYY');
        // var nMonth = moment(dateFrom,'YYYY-MM-DD').format('MM');
        var cMonth= moment(dateFrom,'YYYY-MM-DD').format('MMMM');
        var nDay = moment(dateFrom,'YYYY-MM-DD').format('DD');
        var cDayName = moment(dateFrom,'YYYY-MM-DD').format('dddd');

        reportFromDate ="As of : " + cMonth  + " " + nDay + ", " + nYear  + " [" + cDayName + "]";            

        loadData(gAcceesBranch);
    }

    const printTable = () => {
        const printContents = componentRef.current.innerHTML;
        // const printContents = document.getElementById('printableTable').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    const handPrinCheck = () => {
        //    if (sUsrAg.indexOf("Chrome") > -1) {
        //        sBrowser = "Google Chrome or Chromium";
        //    } else {
        //        sBrowser = "unknown";
        //        alert ("please use Chrome")
        //    }
        //    alert("You are using: " + sBrowser);

         RefreshData(false);
         if (selBranch===null || selBranch==='') {
            toast.error("Please select branch...");
            alert("Please select branch...")  ;
            return false;
         }
            //  sortByName();
            //  alert('alert');
        //  handlePrint(); 
         printTable();
    }
    
        // const sortByName = () => {
        //     const dtRead = [...datProducts];
        //     dtRead.sort((dtReadA, dtReadB) => {
                
        //         const fullNameA = `${dtReadA.description}`;
        //         const fullNameB = `${dtReadB.description}`;
    
        //         if (sorted.reversed) {
        //             // return fullNameB.localeCompare(fullNameA);
        //         }
        //         return fullNameA.localeCompare(fullNameB);
        //     });
        //     setDataTable(dtRead);
        //     setSorted({ sorted: "name", reversed: !sorted.reversed });
        // };
        
            
        // const handlePrintORG = useReactToPrint({
        //     content: () => componentRef.current,
        //     pageStyle: `
        //     @page {
        //         size: portrait 8.5in 11in;
        //         margin: 11mm 11mm 11mm 11mm;
        //         // size: 11mm 11mm 11mm 11mm;
        //         @top-right selector {
        //             content: "Page " counter(page);
        //         }
        //     }`,
        //     documentTitle: "ORO BUSINESS GROUP"
        //   });

        //   const handlePrintnottt= useReactToPrint({
        //     content: () => componentRef.current,
        //     documentTitle: "ORO BUSINESS GROUP"
        // });  

        //   const handlePrint11111 = useReactToPrint({
        //     content: () => componentRef.current,
        //     pageStyle: `
        //         @page {
        //             size: 8.5in 11in;
        //             margin: 11mm 11mm 11mm 11mm;
        //             // size: 11mm 11mm 11mm 11mm;
        //             @top-right selector {
        //                 content: "Page " counter(page);
        //         }
        //         @media print {
        //             @page {
        //                 size: portrait;
        //                 margin: 11mm 11mm 11mm 11mm;
        //             }
        //         }
        //     }`,
        //     documentTitle: "ORO BUSINESS GROUP"
        //   });

        //   const handlePrint_org = useReactToPrint({
        //     content: () => componentRef.current,
        //     pageStyle: `
        //         @page {
        //             size: 8.5in 11in;
        //             margin: 11mm 11mm 11mm 11mm;
        //         }
        //         @top-right {
        //             content: "Page " counter(page);
        //         }
        //         @media print {
        //             @page {
        //                 size: portrait;
        //                 // margin: 11mm 11mm 11mm 11mm;
        //             }
        //             @top-right {
        //                 content: "Page " counter(page);
        //             }
        //         }
        //     `,
        //     documentTitle: "ORO BUSINESS GROUP"
        // });
    
        const handleEnter = (event) => {
            if (event.key.toLowerCase() === "enter") {
                // alert("pawn ticket,  "+ event.target.name);
                if (event.target.name==="selbranch") {
                    showDiscrepancyRef.current.focus();
                    return true;
                    
                } else if (event.target.name==='datefrom') {    
                    RefreshData(false);
                    classRef.current.focus();
                    return true;
                } else if (event.target.name==='selclass') {    
                    RefreshData(false);
                    showDiscrepancyRef.current.focus();
                    return true;    
                } else if (event.target.name==="showDiscrepancy") {
                    previewRef.current.focus();
                    return true;
                }    
            } else if (event.keyCode===112) {
                // alert("F1-a");
                  event.preventDefault();
                  return false;
            } else if (event.keyCode >=113 && event.keyCode <=123) {
                    // Turn off Function key F2 to F12
                  event.preventDefault();      
            }
        }            
        
        const handleChangeDepartment = event => {
            // console.log(event.target.value);
            // alert(event.target.value);
            if (event.target.value==='null' || event.target.value===''  ) {
                toast.error("You did not select a branch...");
                return false;
            } else {
                // toast.success("Setting branch to  " + event.target.value  + "...");
                
                //  alert(event.target.value);
                // alert ( "Set branch to  " + event.target.value  + "...");
                // if ( window.confirm("Process to set branch to  " + event.target.value  + " ?") ) {
                    setSelBranch(event.target.value);
                    gAcceesBranch = event.target.value;
                    sessionStorage.setItem("accessBranch",gAcceesBranch);
                    loadData(event.target.value);
                    // RefreshData();
                    // sortByName();
                // }
            }
          };


    const handleInputChange = (e) => {
        if (e.target.name==="datefrom") {
            setDateFrom(e.target.value) 
        }
    };      

    const handleChangeClass = event => {
        const tValues=event.target.value
        setSelClass(tValues);
        // alert('tValues' + tValues)
        // const timer = setTimeout(() => {
        //     setSelClass(tValues);
        // }, 100);
        // return () => clearTimeout(timer);
        loadData(gAcceesBranch,tValues)
      };
    
    const loadData = async (tBranch, tClass ) => {
        //  console.log('dataPhysical:', dataPhysical)
        //  console.log('datTable:', datTable)
        //  console.log('datTable d1:', datTable.data.detail1)
        //  console.log('datTable d2:', datTable.data.detail2)
        //  console.log('datTable d3:', datTable.data.detail3)

        // ProcessMe(datTable.data.detail1);
         
        //  return false;

        let tFilter="/list";
        setDataTable(''); 
        setArrayTable('');
        arrClassNew=[];
        arrDiscrepancy=[];
        // setMessage1("");

    
        // if (textFilter.length >0) {
        //     if (selFilter==='barcode' || selFilter==='productCode' ) {
        //         tFilter="?code=" + textFilter;
        //     } else if (selFilter==='batch') {
        //         tFilter="/list/search?by=batch-" + textFilter;
        //     } else if (selFilter==='descript') {
        //         tFilter="/list/search?by=desc-" + textFilter;
        //     } else if (selFilter==='entryDate') {
        //         tFilter="/list/search?by=entrydate-" + textFilter;    
        //     }
        // } else {
        //     // tFilter="/list";
        // }
        // // tFilter="?code=J255262";
        // tBranch='j1'
        // tFilter= "/list/09-04-2023";
        // alert(selClass);
        tFilter= "/list/" + dateFrom;
        if (tClass ==='' || tClass ===undefined || tClass ==='ALL') {
            // all
            // alert('all ' + selClass)
        } else {
            // tFilter= "/list/" + dateFrom + "?repost=0?cls=" + selClass
            tFilter= "/list/" + dateFrom + "?cls=" + tClass
        }
        

        // setMessage1(tFilter);

        // console.log('tBranch:',tBranch);
        // console.log('tFilter:',tFilter);
        // console.log('dbServerHostJava:',dbServerHostJava)
        
        try {
            
            // GET  https://techsit.orobusinessgroup.online/site102/api/j/inventory/daily/{branchCode}/list/{asOfDate}{?repost=1, default=0}{&|?cls=<classCode>}
            // await fetch(dbServerHostJava + "/api/j/profile/products/" + tBranch + tFilter , {  
            // site102/api/j/inventory/daily/j1/list/09-04-2023
             await fetch(dbServerHostJava + "/api/j/inventory/daily/" + tBranch + tFilter , {  
            // await fetch(dbServerHostJava + "/api/j/inventory/daily/j1/list/09-04-2023" , {  
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                //  console.log("Status test:",json.status)
                //   console.log("inventory Data:",json)
                  

                if (Number(json.status)===200) {
                    // console.log("Status test2:",json)
                    // alert(json.status)
                      setDataTable(json.data); 
                      ProcessMe(json.data.detail1);
                } else {
                     toast.error("Branch: " + selBranch  + ", Error: " + json.error );
                }
                
            })
            // console.log("test3",json) 
    
        } catch (err) {
             console.log(err)
            //  setProduct(''); 
            //  setProduct({self: '0', acType: '',append: '',auctionGroup: '', productCode: '', barcode: '', description: '', classCode: ''});
            //  toast.error("NO product data to display,  " + err ); 
        }
        
    }


    const loadClass = async () => {
        const results = [{value: 'ALL', text: 'All' }];
        try {
            // where group like 'DIA'/GOLD'
            await fetch(dbServerHostJava + "/api/j/profile/jclass/list", {                

            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                // console.log('class: ', json)
                // console.log('class: ', json.data)
                // console.log('class: ', json.status)
                // setDataClass(json.data);   
                json.data.forEach((value) => {
                    // alert (value.classCode)
                    results.push({
                    value: value.classCode,
                    text: value.description,
                    });
                });
                // console.log("Results: ",results)
                setOptClass(results);   
            })
        } catch (err) {
            toast.error("NO class data to load,  " + err );
        }
    }

    const RepostData = async () =>{
        // toast.success("Re-posting.....")
        
        try {
             await fetch(dbServerHostJava + "/api/j/inventory/daily/" + selBranch + "/list/" + dateFrom + "?repost=1", {  
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                // console.log("post test:",json.status)
                // console.log("Status test2:",json)

                 if (json.status===200) {
                    toast.success("Successfully re-posting...")
                } else {
                    toast.error("Unsuccessfully re-posting: " +  json.error)
                }
                
            })
    
        } catch (err) {
            //  console.log(err)
            toast.error("Unsuccessfully re-posting: " +  err)
            
        }






        RefreshData(false);
    }


    
    function ProcessMe(datRead) {
        // console.log('dtRead2',datRead)
        // console.log('arr:',arrRow[1])   
        let results=[];
        let arrCOMM=[];
        let arrAUCT=[];
        let arrTotal=[];
        let arrAUC=[];
        let arrLA=[];
        let nCtr=0;

         arrClassCode=[];
         arrClassCodeNew=[];
         arrClass=[];
         arrClassNew=[];
         arrDiscrepancy=[];

         datRead.forEach((dtRead) => {
            //  console.log('arr3:',dtRead)   
             if (dtRead.classCode==="COMM") {
                 arrCOMM.push(dtRead.opening,dtRead.addDisplay,dtRead.addReturn,dtRead.addCancel, dtRead.lessSales, dtRead.lessWd, dtRead.closing, dtRead.actual, Neg2AbsString(dtRead.overShort))
             } else if (dtRead.classCode==="AUCT") {
                 arrAUCT.push(dtRead.opening,dtRead.addDisplay,dtRead.addReturn,dtRead.addCancel, dtRead.lessSales, dtRead.lessWd, dtRead.closing, dtRead.actual, Neg2AbsString(dtRead.overShort))
             } else if (dtRead.classCode==="TOTAL") {
                  arrTotal.push(dtRead.opening,dtRead.addDisplay,dtRead.addReturn,dtRead.addCancel, dtRead.lessSales, dtRead.lessWd, dtRead.closing, dtRead.actual, Neg2AbsString(dtRead.overShort))
             } else if (dtRead.classCode==="AUC") {
                  arrAUC.push(dtRead.opening,dtRead.addDisplay,dtRead.addReturn,dtRead.addCancel, dtRead.lessSales, dtRead.lessWd, dtRead.closing, dtRead.actual, Neg2AbsString(dtRead.overShort))
             } else if (dtRead.classCode==="LA") {
                  arrLA.push(dtRead.opening,dtRead.addDisplay,dtRead.addReturn,dtRead.addCancel, dtRead.lessSales, dtRead.lessWd, dtRead.closing, dtRead.actual, Neg2AbsString(dtRead.overShort))
             } else {
                // nCtr=nCtr+1;
                //  console.log('ctr:',nCtr);
                 arrClassCode.push(dtRead.classCode);
                 if(dtRead.overShort===0) {
                    arrClassCodeNew.push({classCode: dtRead.classCode, value:0});
                 } else {
                    arrClassCodeNew.push({classCode: dtRead.classCode, value:1});
                 }
                 arrClass.push(dtRead.classCode, dtRead.opening,dtRead.addDisplay,dtRead.addReturn,dtRead.addCancel, dtRead.lessSales, dtRead.lessWd, dtRead.closing, dtRead.actual, Neg2AbsString(dtRead.overShort));
                 arrClassNew.push({classCode: dtRead.classCode, opening: dtRead.opening, addDisplay:dtRead.addDisplay, addReturn:dtRead.addReturn, addCancel:dtRead.addCancel, lessSales:dtRead.lessSales, lessWd:dtRead.lessWd, closing:dtRead.closing, actual:dtRead.actual, overShort:Neg2AbsString(dtRead.overShort)});
                 nCtr=nCtr+1;
             }   

         })    
        //  console.log('arrCOMM:',arrCOMM)   
        //  console.log('arrAUCT:',arrAUCT)   

        for(let nL = 0; nL <= 8; nL++){
            // console.log('arr2:',arrRow[nL])   
            results.push({description: arrRow[nL], comm: arrCOMM[nL], auct: arrAUCT[nL], total: arrTotal[nL], auc: arrAUC[nL], la: arrLA[nL]
            })
        }  

        //  console.log('results2:',results)
        // console.log('results3:',arrClass)

        setArrayTable(results)

        results.forEach((value) => {
            if(value.description==='Over (Short)') {
                arrDiscrepancy.push({
                description: value.description,
                comm: value.comm,
                auct: value.auct,
                la: value.la,
                })
            }
        });

        // {  arrClassCode.length >0 && arrClassCode.map((jsonRec3, index3) => (
        //     // <td style={{textAlign:'center'}}>{ arrClass[Convert2(index3)+index]} </td>
            
        // )) }

        
    //    arrDiscrepancy.push(arrTable)


    }

    function GetDiscrepancy(tCode) {
        // alert(cClass);

        // console.log('Discrepancy Class:',tCode)
        // console.log('arrClass:',arrClassNew)

        let copyState = [...arrClassNew];
        const exists = copyState.find((p) => p.classCode === tCode);
        if (exists) {
            //  alert(" class exist: sp fix: " + exists.classCode)
            //  alert(exists.overShort)
            return exists.overShort;
        } else {
            return false;
        };


    }

    function Neg2AbsString(nValue) {
        if (nValue < 0) {
            return '(' + Math.abs(nValue) +')'
        } else {
            return nValue;
        }
    }

    function Convert2(nCtr) {
        if (nCtr===0) {
            return 1
        } else {
            return (nCtr * 10)+1
        }    
    }

    

    function PrintPhysicalInventorySummary() {
        return (
            <div>
                {/* <h5 style={{textAlign:'center'}}>{reportTitle}</h5>
                <h6 style={{textAlign:'center',fontSize: '12px'}}>{reportFromDate}</h6> */}
                 <br></br>
                <h5 style={{textAlign:'left'}}>{reportTitle}</h5>
                <h6 style={{textAlign:'left',fontSize: '12px'}}>{reportFromDate}</h6>
                <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                    <thead>
                        <tr style={{borderTop: '1px solid gray', borderBottom: '1px solid gray'}}>
                            {/* <th style={{textAlign: "center", width: "8px"}}>#</th> */}
                            <th style={{textAlign: "center", width: "100px"}}> </th>
                            <th style={{textAlign: "center", width: "50px" }}>COMM</th>
                            <th style={{textAlign: "center", width: "50px" }} >AUCT</th>
                            <th style={{textAlign: "center", width: "50px", borderRight: 'solid gray 1px', }}>TOTAL</th>
                            {/* .length >0 */}
                            {  arrClassCode && arrClassCode.map((jsonRec1, index) => (
                                <th style={{textAlign: "center", width: "50px" }}>{jsonRec1}</th>
                             )) }

                            <th style={{textAlign: "center", width: "50px", borderLeft: 'solid gray 1px', borderRight: 'solid gray 1px'}}>AUC</th>
                            <th style={{textAlign: "center", width: "90px"}}>LA</th>
                            
                        </tr>
                    </thead>
                    
                    <tbody>


                       {/* datTable.length >0 && */}
                        {  arrTable && arrTable.map((jsonRec, index) => (
                            // onDoubleClick={() => handleEditShow(product)}
                            
                            <tr key={ index } >
                                {/* <td>{ index + 1 }</td>  recordsPerPage */}
                                {/* <td>{ (index + 1 )  }</td> */}
                                <td style={{color:'blue',fontSize:'10px' }} >{ jsonRec.description } </td>
                                <td style={{textAlign:'center'}}>{ jsonRec.comm } </td>
                                <td style={{textAlign:'center'}}>{ jsonRec.auct } </td>
                                <td style={{textAlign:'center', borderRight: 'solid gray 1px'}}>{ jsonRec.total } </td>
                                {  arrClassCode.length >0 && arrClassCode.map((jsonRec3, index3) => (
                                    // <th style={{textAlign: "left", width: "50px" }}>{jsonRec3}</th>
                                    // <td>{ Convert2(index3)+index } </td>
                                    <td style={{textAlign:'center'}}>{ arrClass[Convert2(index3)+index]} </td>
                                    // <td>{ arrClass[index  * index3] } </td>
                                )) }

                                <td style={{textAlign:'center', borderLeft: 'solid gray 1px', borderRight: 'solid gray 1px'}}>{ jsonRec.auc===0 ? "-":jsonRec.auc } </td>
                                <td style={{textAlign:'center'}}>{ jsonRec.la===0 ? "-":jsonRec.la } </td>
    
                                
                            </tr>
                        )) }
                         
                    </tbody>
                    <tfoot><td>
                       <div className="footer-space"> </div>
                   </td></tfoot>
                </table>
                {/* <br></br> */}
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <br></br>
            </div>
            
        )
    }

    function PrintDiscrepancySummary() {
        return (
            <div>
                <h6 style={{textAlign:'left'}}>Discrepancy Summary</h6>
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                    <thead>
                        <tr style={{borderBottom: '1px solid gray'}}>
                            {/* <th style={{textAlign: "center", width: "8px"}}>#</th> */}
                            <th style={{textAlign: "center", width: "100px"}}> </th>
                            {/* .length >0 */}
                            {  arrClassCodeNew && arrClassCodeNew.map((jRec1, index) => (
                                 <th style={{textAlign: "center", width: jRec1.value===1 ? "50px":"0px" }}>{jRec1.value===1 ? jRec1.classCode: ""}</th>
                             )) }

                           {  arrDiscrepancy && arrDiscrepancy.map((jsonRecD, index) => (
                             <>
                                {/* <th style={{textAlign: "center", borderRight: 'solid gray 1px', width: jsonRecD.la ===0 ? "0px":"20px"}}>{jsonRecD.la !==0 ? "LA":""}</th>
                                <th style={{textAlign: "center", borderRight: 'solid gray 1px', width: jsonRecD.auct ===0 ? "0px":"20px"}} >{jsonRecD.auct !==0 ? "AUCT":""}</th> */}
                                <th style={{textAlign: "center", width:'40px', borderLeft: 'solid gray 1px', borderRight: 'solid gray 1px'}} >AUC</th>
                                <th style={{textAlign: "center", width:'40px'}}>LA</th>
                            </>
                            )) }
                            
                        </tr>
                    </thead>
                    <tbody>
                        {  arrDiscrepancy && arrDiscrepancy.map((jsonRec, index) => (
                            <tr key={ index } >
                                <td style={{color:'blue',fontSize:'10px' }} >{ jsonRec.description } </td>
                                {  arrClassCodeNew.length >0 && arrClassCodeNew.map((jRec3, index3) => (
                                    <td style={{textAlign:'center'}}>{ jRec3.value===1 ? GetDiscrepancy(jRec3.classCode) :"" } </td>
                                )) }
                                {/* <td style={{textAlign:'left', borderRight: 'solid gray 1px'}}>{ jsonRec.auct===0 ? "":jsonRec.auct } </td> */}
                                {/* <td style={{textAlign:'center', borderRight: 'solid gray 1px'}}>{ jsonRec.la ===0 ? "":jsonRec.la } </td> */}
                                <td style={{textAlign: 'center', width: '40px', borderLeft: 'solid gray 1px', borderRight: 'solid gray 1px'}}>{jsonRec?.auct}</td>
                                <td style={{textAlign: 'center'}}>{jsonRec?.la }</td> 
                            </tr>
                        )) }
                    </tbody>
                    <tfoot><td>
                    <div className="footer-space"> </div>
                   </td></tfoot>
                </table>
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <br></br>
                <br></br>

            </div>
        )
    }

    function PrintDraftNotFinaledGroupByDocument() {
        // let dtRead2 = datTable?.data?.detail2
        let dtRead2 = datTable?.detail2;
        return (
            <div>
                <h6 style={{textAlign:'left'}}>Draft not finaled/Not added back</h6>
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                    <thead>
                        <tr style={{borderBottom: '1px solid gray'}}>
                            <th style={{textAlign: "left", width: "20px"}}> </th>
                            <th style={{textAlign: "left", width: "90px"}}>Product </th>
                            <th style={{textAlign: "left", width: "50px"}}>Barcode</th>
                            <th style={{textAlign: "left", width: "250px"}}>Description</th>
                            <th style={{textAlign: "left", width: "30px"}}>Wt</th>
                            <th style={{textAlign: "left", width: "50px"}}>Size</th>
                            <th style={{textAlign: "left", width: "30px"}}>Karat</th>
                            <th style={{textAlign: "left", width: "60px"}}>Price Code</th>
                            <th style={{textAlign: "center", width: "80px"}}>Selling Price</th>
                            <th style={{textAlign: "center", width: "10px"}}></th>
                            <th style={{textAlign: "left", width: "60px"}}>Entry Date</th>
                        </tr>
                    
                    {/* <tbody> */}
                        
                    {/* </tbody> */}
                    </thead>
                    <tfoot><td>
                    <div className="footer-space"> </div>
                   </td></tfoot>
                </table>
                {  dtRead2 && dtRead2.map((jsonRec, index) => (
                    <div>
                        {PrintDraftNotFinaledDetails(jsonRec,index)}
                    </div>
                 ))}
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <br></br>
            </div>
        )
    }
    function PrintDraftNotFinaledDetails(dtRead2B) {
        return (
            <div>
                <label style={{textAlign:'left', fontSize:'11px'}}>Draft#:<span style={{fontWeight:'bold', marginRight:'40px'}}> {dtRead2B.docno}</span> <span>Date:</span> <span style={{fontWeight:'bold', marginRight:'40px'}}>{moment(dtRead2B.trnDate,'YYYY-MM-DD').format('MM/DD/YY')} </span> <span>Remarks:</span> <span style={{fontWeight:'bold'}}>{dtRead2B.remarks}</span> </label>
                <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                    <tbody>
                        {  dtRead2B.items.length >0 && dtRead2B.items.map((jsonRec, index) => (
                            <tr key={ index } >
                                <td style={{textAlign: "left", width: "20px", fontSize:'10px' }} >{ index +1 }) </td>
                                <td style={{textAlign: "left", width: "90px", fontSize:'10px' }} >{ jsonRec.code } </td>
                                <td style={{textAlign: "left", width: "50px", color:'blue',fontSize:'10px' }} >{ jsonRec.barcode } </td>
                                <td style={{textAlign: "left", width: "250px", fontSize:'10px' }} >{ jsonRec.classCode + " " +jsonRec.description } </td>
                                <td style={{textAlign: "left", width: "30px", fontSize:'10px' }} >{ jsonRec.weight } </td>
                                <td style={{textAlign: "left", width: "50px", fontSize:'10px' }} >{ jsonRec.size } </td>
                                <td style={{textAlign: "left", width: "30px", fontSize:'10px' }} >{ jsonRec.carats } </td>
                                <td style={{textAlign: "left", width: "60px", fontSize:'10px' }} >{ jsonRec.priceCode } </td>
                                <td style={{textAlign: "right", width: "80px", fontSize:'10px' }} >{ formatNumber(jsonRec?.sellingPr) } </td>
                                <td style={{textAlign: "center", width: "10px", fontSize:'10px' }} ></td>
                                <td style={{textAlign: "left", width: "60px", fontSize:'10px' }} >{ moment(jsonRec?.dtEncoded,'YYYY-MM-DD').format('MM/DD/YY')} </td>
                            </tr>
                        )) }
                    </tbody>
                    <tfoot><td>
                    <div className="footer-space"> </div>
                   </td></tfoot>
                </table>
            </div>
        )
    }





  return (
    <div id='main'>
      <div className='print-section-85115' style={{textAlign:'left',marginTop:'5px' }} >
           <label style={{marginLeft: '15px',marginRight: '10px'}} >Branch : </label>
           <select 
                className='chrich-custom-select'
                style={{width: '200px'}}
                value={selBranch}
                   name="selbranch"
                   onKeyDown={handleEnter}
                   ref={selBranchRef}
                   onChange={handleChangeDepartment}
                   disabled={gAssignBranch ? true: false}
           >
           {optDepartment.map(option => (
                <option key={option.value} value={option.value}>
                {option.text}
                </option>
           ))}
           </select>
           
           <input 
               style={{marginLeft: '20px',marginRight: '5px'}} 
                type='checkbox' 
                name='showDiscrepancy'
                defaultChecked={showDiscrepancy}
                value={false}
                onKeyDown={handleEnter}
                ref={showDiscrepancyRef}
                onChange ={() =>  setShowDiscrepancy(!showDiscrepancy)}	
           />
           <label>Discrepancy Details only</label>
           {/* <button className={datTable?.detail1?.length >0 ? 'btn-neo1-primary':'btn-neo1-disabled'} style={{width: '90px',height:'35px', marginLeft:'70px',marginRight:'5px'}} ref={previewRef} disabled={datTable?.detail1?.length >0 ? false:true} onClick={handPrinCheck} >Preview </button>  */}
           <button className={'btn-neo1-add'} style={{width: '90px',height:'35px', marginLeft:'70px',marginRight:'5px'}} ref={previewRef} disabled={datTable?.detail1?.length >0 ? false:true} onClick={handPrinCheck} >Preview </button>  

           <button className={"btn-neo1-danger"} style={{width: '90px',height:'35px', marginLeft:'10px',marginRight:'00px' }} onClick={() => Navigate(-1)} >Cancel</button>
           <br></br>
           <label style={{marginLeft:'4px',marginRight: '10px'}} >For Date :</label>
           <input
                className='chrich-custom-select'
                style={{width: '200px'}}
                type="date"
                name="datefrom"
                ref={dateFromRef}
                onChange ={(e) => handleInputChange(e)}
                onKeyDown={handleEnter} 
                value={dateFrom || ""}
           />
           <br></br>
           <label style={{marginLeft:'25px'}} >Class :</label>
            <select 
                className='chrich-custom-select'
                style={{marginLeft:'10px', width:'200px'}}
                name="selclass"
                ref={classRef}
                onChange={handleChangeClass}
                onKeyDown={handleEnter} 
                value={selClass || ""} 
                // disabled={isAdd ? false: true}
                > 

                {optClass.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.text}
                    </option>
                ))}
            </select>
{/* dateFrom===curDate ?  */}
           <button className="btn-neo1-primary" style={{width: '100px',  marginLeft: '20px',height:'35px'}} onClick={() => RefreshData(true)}>Apply</button>
           <button className={"btn-neo1-success"} style={{ width: '100px', marginLeft: '10px',height:'35px' }} disabled={dateFrom===curDate ? false:true} onClick={() => RepostData() }>Re-post</button>
           <br></br>
           {/* <div>{message1}</div> */}
           <div style={{marginTop:'5px', with:'100%', color:'gray',border:'solid 1px' }}></div>
           {/* <br></br> */}
            <div className='print-section-85115' style={{ display: "none1"}}>
                <div style={{ maxWidth: '100%', margin: '0 auto'}} ref={componentRef} >
                    {showDiscrepancy ? "": PrintPhysicalInventorySummary()}
                    {showDiscrepancy ? "": PrintDiscrepancySummary()}
                    {showDiscrepancy ? "": PrintDraftNotFinaledGroupByDocument()}
                    {/* Report content call discrepancy detail */}
                    { datTable?.detail3 ? <PrintDPDiscrepanyDetail data={datTable?.detail3} reportBranch={selBranch} reportFromDate={reportFromDate}/> :""}
                    {/* <PrintComponent title={title} reportContent={reportContent} /> */}
                    <style>
                        {printStyles}
                    </style>
                </div>
                <br></br>
                <h6 style={{textAlign:'left',fontSize: '12px'}}>------------------- nothing follows ------------------</h6>
                <h6 style={{textAlign:'left',fontSize: '12px'}}>Note : Items not delivered are not included in this report!</h6>
                
            </div>
        </div>
   </div>     
  )
}

export default PrintInventory