import moment from 'moment';
// import storage  from '../../api/firebase.js';
import { storage }  from '../../firebase/firestore.js';
import { ref, getDownloadURL } from 'firebase/storage';
// import { faRulerVertical } from '@fortawesome/free-solid-svg-icons';
// import { useState, useEffect } from 'react';

// import { setSelectionRange } from '@testing-library/user-event/dist/utils/index.js';
// import { AiFillFileText } from 'react-icons/ai';
// import { getToPathname } from '@remix-run/router';
// uploadBytesResumable,

export function MyServerHost() {
    //   return "http://124.105.189.173:3010";
    //  return "http://192.168.4.241:3001";
    //   return "http://127.0.0.1:5000";
    //  return "https://mysterious-woolens-foal.cyclic.app";
}

export function MyServerHostAPICyclicNodeJS() {
     return "https://mysterious-woolens-foal.cyclic.app"
}

export function MyServerHostGood() {
    return "http://124.105.189.173:5001";
    //  "http://192.168.4.248:5001";
}

export function MyServerHostNodeJS() {
    //   return "http://localhost:5000";
      return "https://us-central1-oro-business-group.cloudfunctions.net/app";
    
    // return "http://127.0.0.1:3001";
    //  return "http://124.105.189.173:5001";
    // return "http://124.105.189.173:5001"; // 192.168.4.248/192.166.1.130 server node.js server 
}

export function MyServerHostJavaLocal() {
    return "http://192.168.4.248:8080";
}

export function MyServerHostJava() {
    // return "http://192.168.4.248";
    // return "http://localhost:80/site101";
    // return "http://192.168.4.248/site101";
    // return "http://124.105.189.173:8080";
    // return "https://techsit.orobusinessgroup.online/site101"    kezar
    //   return "https://techsit.orobusinessgroup.online/site102";  
       return "https://oroerp.net/erp";  
    //    return "http://192.168.4.248/site102";
    //    return "https://oroerp.net/erp";
}

export const delayMe = ms => new Promise(
    resolve => setTimeout(resolve, ms)
)

export const Round = (nNum) => {
    let nNum1 =nNum ? nNum : 0;
    let nNum2 = Math.round(nNum1 * 100) / 100;
    return nNum2;
}

export const nullNumeric = (nNum) => {
    return nNum ? nNum : 0;
}

export const formatNumber = (inputNumber, l0) => {
    if( Number(inputNumber) ===0) {
        if(l0===true) { 
            return '0';
        } else {
            return '0.00';
        }
    };

    let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    // let splitArray=formetedNumber.split('.'); ' not to show .00
    
    let splitArray=0;
    if(l0===true) {
        splitArray=formetedNumber.split('.'); 
    } else {
        splitArray=formetedNumber.split(' ');
    }

    if(splitArray.length>1){
       formetedNumber=splitArray[0];
    } else {
        // alert(splitArray[0]);
        // if (Number(splitArray[0]) === 0) {
        //     formetedNumber='0.00';  
        // }
        
    }
    // "&#8369;" "₱" 
    return(  formetedNumber);
};

export const formatAmount = inputNumber => {
    if( Number(inputNumber) ===0) {
        return '0.00';
    };

    let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // let splitArray=formetedNumber.split('.'); ' not to show .00
    let splitArray=formetedNumber.split(' ');
    if(splitArray.length>1){
       formetedNumber=splitArray[0];
    } else {
        // alert(splitArray[0]);
        // if (Number(splitArray[0]) === 0) {
        //     formetedNumber='0.00';  
        // }
        
    }
    // "&#8369;" "?" 
    return(formatAmount);
};


export function removeCommas(tValues) {
    var nRetValues = 0;
      if (tValues.length >0) {
        nRetValues = Number(tValues.replace(/,/g,''))
      } else {
         nRetValues = Number(tValues);
      }
      return (nRetValues);
    // return (Number(tValues.replace(/,/g,'')));
}

export const dateIsValid = dateStr =>  {
    if (dateStr === null || dateStr==='') {
        // alert("false null")
        return false;
     }  
    // alert('date: ' + dateStr);
    return true;
}

export function isValidDate(dateString) {
    // Parse the input date string
    const parsedDate = new Date(dateString);
  
    // Check if the parsed date is a valid date
    // A valid date is one where the date isn't NaN after parsing
    // and the date string remains the same after parsing (to handle cases like "2022-02-30")
    return !isNaN(parsedDate) && parsedDate.toISOString().slice(0, 10) === dateString;
}


export function mySubstr(cStr, nStart,nEnd) {
    var cRetVal = cStr;
    //   alert( "1,"+ cRetVal + "2, " + cStr);
    // cStr.length() <=1 ||
         if (cStr==='' || cStr===0 || cStr===null || cStr==='null' || cStr===undefined  || cStr==='NaN') {
            cRetVal = "";
         } else {
            // alert('TR: ' + cRetVal + ", " + cStr + ", " + nStart + ", " +nEnd);
            cRetVal = cStr.substring(nStart,nEnd) ; 
            // alert(  cRetVal);
         }
    return cRetVal;
}

export function myDayName(nDay) {
    // var arrWeek = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var arrWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return arrWeek[nDay];
}

export function myMonthName(nMonth) {
    // var arrMonth = Array("", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
     var arrMonth =["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return arrMonth[nMonth];
}

export function getYear(tDate,strFormat) {
    return moment(tDate,'YYYY-MM-DD').format(strFormat);
}
  
export function getMonth(tDate,strFormat) {
    return moment(tDate,'YYYY-MM-DD').format(strFormat);
}

export function getDay(tDate,strFormat) {
    return moment(tDate,'YYYY-MM-DD').format(strFormat);
}


export function checkChar(cStr1,tBranchCode) {
    let retValue='';
    for (let i = 0; i < cStr1.length; i++) {
      var tAt = cStr1.at(i);
          if (tAt===tBranchCode) {
              retValue=tBranchCode;
               break;
          }
    }
    return retValue;

  }

export function CheckNumber(eKey, tValues, tChar) {
    if (eKey==='0' || eKey==='1' || eKey==='2' || eKey==='3' || eKey==='4' || eKey==='5' || eKey==='6'|| eKey==='7' || eKey==='8' || eKey==='9') {
       return eKey;
    } else if (eKey==='.') {   
        // alert(tValues)
        var cStr1 = tValues.toString().trim();
        for(let i = 0; i <= cStr1.length; i++){
            var tAt = cStr1.at(i);
            // alert(tAt)
            if (tAt==='.') {
                return '';
            }
         }
         return eKey;
    } else if (eKey==='-' || eKey===':') {        
        if (tChar==='-' || tChar===':' ) {
            return eKey;
        } else {
            return '';
        }
    } else {
        return '';
    }
}

export function CheckBoxNum2Boalen(nCheckMode) {
	if (nCheckMode===1 || nCheckMode===true) {
		return true;
	} else {
		return false;
	}
  }

export function CheckBoxBoalen2Num(nCheckMode) {
	if (nCheckMode===1 || nCheckMode===true) {
		return 1;
	} else {
		return 0;
	}
  }


export function Num2Code(nNum) { 
    // alert('nNum: ' + nNum)
    if (nNum === undefined || isNaN(nNum) || nNum.length <= 0) {
        return '';
    }
    // if (typeof nNum !== 'number' || isNaN(nNum)) {
    //     alert(nNum)
    //     return '';
    // }
    
    var cRetVal = "";
    var cRetVal2 = "";
    // var cStr1 = nNum.toFixed(2).toString().trim();
    var cStr1 = nNum.toString().trim();

    var cCode="GOLDENFISH-";
    // alert('nNum: ' + nNum  + ',  length: ' + cStr1.length);
    for (let i = 0; i < cStr1.length; i++) {
        var cChar = cStr1.substr(i,1)
        // .trim()
        if (cChar==="0") {
            cRetVal2 = cCode.substr(10-1, 1)   
            // alert(cChar + ", 9, R: " + cRetVal2   );
        } else if (cChar===".") {
            cRetVal2 = cCode.substr(10, 1)   
        } else {
            cRetVal2 = cCode.substr(Number(cChar)-1, 1)   
        }
        cRetVal = cRetVal + cRetVal2

        // if (cRetVal==='' || cRetVal===null) {
        //     cRetVal =  cRetVal2 
        // } else {
        //     cRetVal = cRetVal + cRetVal2
        // }
        // alert('Value: ' + cStr1 +', cRetVal: ' + cRetVal  + "cRetVal2: " + cRetVal2 + ",  cChar: " + cChar);
    }
    return cRetVal;
}


export function Code2Num(cNumStr) { 
    if (cNumStr === undefined || isNaN(cNumStr) || cNumStr.length <= 0) {
        //  return '';
    }
    // alert('cNumStr: ' + cNumStr)
    var cRetVal = "";
    // var cStr1 = nNum.toFixed(2).toString().trim();
    var cStr1 = cNumStr.toString().trim();
    var nNum ="1234567890.";
    var cCode="GOLDENFISH-";
    for (let i = 0; i < cStr1.length; i++) {
        var cChar = cStr1.substr(i,1)
        // alert('cChar: ' + cChar)
        var cRetVal2 = "";
        for (let j = 0; j < cCode.length; j++) {
            var cCharJ = cCode.substr(j,1)
            // alert('cCharJ: ' + cCharJ)
            if (cChar===cCharJ) {
                cRetVal2 = nNum.substr(j,1)
            }
        }
        cRetVal = cRetVal + cRetVal2

    }
    return cRetVal;
}

export function PriceCode2Num2(cNumStr) { 
    var cRetVal = "";
    var cStr1 = cNumStr.trim();
    var cCode="1234567890-";
    
    
    for (let i = 0; i < cStr1.length; i++) {
        var cChar = cStr1.substr(i,1).trim()
         alert('cChar: ' + cChar + " i: " +i);
        var nPosition = 0;
        if (cChar==="H") {
            nPosition = 10;
        } else if (cChar==="-") {
            nPosition = 11;
        } else {
            nPosition  = Number(cChar);
        }
        nPosition=nPosition-1
        cRetVal = cRetVal + cCode.substr(nPosition, 1)   
        alert('Value: ' + cStr1 +', cRetVal: ' + cRetVal);
    }
    return Number(cRetVal);
}

export function GetItemLogin() {
    return decryptPWord(sessionStorage.getItem('loginName'));
}

export function GetItemBranch() {
    // return sessionStorage.getItem('accessBranch');
    let cRetVal =sessionStorage.getItem('accessBranch');
    // if (cRetVal==='' || cRetVal==='null' || cRetVal===null) {
    //     cRetVal='J1';
    // }
    return cRetVal;
}

export function checkBranchNo(cNumStr) { 
    var cRetVal = "";
    var cStr1 = cNumStr.trim();
    var isNumumeric=false;
    var processIt=true;
    for (let i = 0; i < cStr1.length; i++) {
        var cChar = cStr1.substr(i,1).trim()
        if (Number(cChar) >=1 && Number(cChar) <=9 && processIt) {
            cRetVal = cRetVal + cStr1.substr(i, 1).trim();
            isNumumeric=true;
        } else {
            if (isNumumeric===true && cRetVal.length >1) {
                processIt=false;
                return Number(cRetVal);
            }           
        }
        // alert('Value: ' + cStr1 +', cRetVal: ' + cRetVal);
    }
    //  alert('cRetVa3l: ' + cRetVal);
    return Number(cRetVal);
}

export function GetBranchCode(cBranch) {
    const nBranch =  cBranch ? Number(cBranch.substring(1)) : 0 ;
    if (nBranch===1) {
        return 1
    } else if (nBranch===2) {
        return 2
    } else if (nBranch===4) {
        return 3    
    } else if (nBranch===5) {
        return 4
    } else if (nBranch===12) {
        return 5
    } else if (nBranch===14) {
        return 6
    } else if (nBranch===16) {
        return 7              
    } else if (nBranch===18) {
        return 8
    } else if (nBranch===19) {
        return 9           
    } else if (nBranch===20) {
       return 10
    } else if (nBranch===21) {
        return 11
    } else if (nBranch===22) {
        return 12             
    } else if (nBranch===23) {
        return 13
    } else if (nBranch===24) {
        return 14
    } else {     
        return 0
    }
  }

  export function GetDepartmentList(tAll) {
        const arrDept =[];
        if ((tAll || '').toLowerCase()==='all') {
            arrDept.push({value: '', text: '--Choose Branch--'})
        }
        arrDept.push({value: 'J1', text: 'J1-Magay'},
                    {value: 'J2', text: 'J2-Guiwan'},
                    {value: 'J4', text: 'J4-Mayor Climaco'},
                    {value: 'J5', text: 'J5-Puericulture'},
                    {value: 'J12', text: 'J12-Southway'},
                    {value: 'J14', text: 'J14-Gateway'},
                    {value: 'J16', text: 'J16-Yubengco Putik'},
                    {value: 'J18', text: 'J18-City Mall Tetuan'},
                    {value: 'J19', text: 'J19-KCC'},
                    {value: 'J20', text: 'J20-Sta. Maria'},
                    {value: 'J21', text: 'J21-SM Mindpro'},
                    {value: 'J22', text: 'J22-KCC East Wing'},
                    {value: 'J23', text: 'J23-CDO'},
                    {value: 'J24', text: 'J24'},
                    {value: 'J25', text: 'J25'},)
  return (arrDept);
}

// export function GetDepartmentListORG(tAll) {
//     const optDepartment = [
//     {value: '', text: '--Choose Branch--'},
//     {value: 'J1', text: 'J1-Magay'},
//     {value: 'J2', text: 'J2-Guiwan'},
//     {value: 'J4', text: 'J4-Guardia National'},
//     {value: 'J5', text: 'J5-Puericulture'},
//     {value: 'J12', text: 'J12-Southway'},
//     {value: 'J14', text: 'J14-Gateway'},
//     {value: 'J16', text: 'J16-Yubengco Putik'},
//     {value: 'J18', text: 'J18-City Mall Tetuan'},
//     {value: 'J19', text: 'J19-KCC'},
//     {value: 'J20', text: 'J20-Sta. Maraia'},
//     {value: 'J21', text: 'J21-SM Mindpro'},
//     {value: 'J22', text: 'J22-KCC East Wing'},
//     {value: 'J23', text: 'Jewelry-23'},
//     {value: 'J24', text: 'Jewelry-24'},
//     {value: 'J25', text: 'Jewelry-25'},
//   ];
//   return (optDepartment);
// }


// not working pa
export const loadMyPicture = async (varAuth) => { 
      

    let filePict  = varAuth.toLowerCase();    // {username}; 
    let fileRef = ref(storage, 'users/'+filePict + '.png');
    console.log("filett pic1", filePict)
    console.log("filett pic2", filePict.toLowerCase())
    console.log("loadtt fb pic", fileRef)
    let photoURL = await getDownloadURL(fileRef);
    //    setImageUser(photoURL);
      //  console.log("test pic", photoURL)
      return (photoURL);
  
};
     

export function getMarginTop(formHeight) {
    let topMargin  =(formHeight/2);
    let innerHeight = (window.innerHeight) ;
    // let topMargin = ((innerHeight/2)-nHieght);
    // console.log("innerhieght: ", innerHeight );
    // console.log("topMargin: ", topMargin );

    // laptop 625, xlscreen=937
    if (innerHeight >= 625 && innerHeight <= 725) {
        let nComp = (innerHeight -formHeight);
        if (nComp <=0) {
            topMargin =0;  
        } else if (nComp < 200) {    
            topMargin =10;  
        } else if (nComp < 300) {        
            topMargin =20;  
        } else {
            topMargin =(nComp/2);   
        }
    } else if (innerHeight >= 730) {    
        for(let i = 1; i <= 6; i++){
            if (topMargin > 200) {
                topMargin = (topMargin/2)  
            } else {
                break;
            }
        }    
        return topMargin; 
    } else {        
        topMargin = 0
    }
    // console.log("topMargin: ", topMargin );
    return topMargin;
    
};

export function CheckAccessRights(mCode,tAccessType) {
    // var storedArray = JSON.parse(sessionStorage.getItem("RolesDetail"));//no brackets
    var datTempFile = decryptPWord(sessionStorage.getItem("RolesDetail"));
    var storedArray = datTempFile ? JSON.parse(datTempFile) : "";//no brackets
    // console.log('storedArray:',storedArray)
    var accountType = decryptPWord(sessionStorage.getItem("accountType"));
    // console.log('empty Roles0: ',storedArray)
    // console.log('mCode: ', mCode, 'tAccessType:', tAccessType)
    // console.log('datTempFile: ',datTempFile, 'storedArray:', storedArray)
    


    if (Number(accountType)===3 || Number(accountType)===8) {
        // console.log('accountType0:',accountType)
        return true;
    } 
    if (storedArray===null || storedArray === undefined ) {
        // console.log('empty Roles: ',storedArray)
        return false;
    }
    if (storedArray.length <=0) {
        // console.log('empty Roles: ',storedArray)
        return false;
    }
    // var i;
    // for (i = 0; i < storedArray.length; i++) {
    //             alert(storedArray[i]);
    // }
    
    
    // let datTable =sessionStorage.getItem('RolesDetail');
    // console.log('datTable 1:',datTable)
    // return true;
    // const datTable = [storedArray]
    // console.log('datTable 1:',datTable)

    
    // if (datTable) this.setState({ datTable: JSON.parse(datTable) });
    
    // const [datTable, setDataTable] = useState([arrTable]);


    //  console.log('datTable 1:',datTable)
    // alert("teset")
    
    // let copyState = [...datTable]

    let copyState = [...storedArray];
    //  console.log('copyState:',copyState)
    let retVal=false;
    const dtRead = copyState.find((p) => Number(p.moduleId) === Number(mCode));
    // const dtRead = datTable.find((p) => p.mCode === mCode);
    // alert(dtRead.printData)  
    
    if (dtRead) {
        // alert('Found mCode: '+ mCode);
        // console.log('datTable 2:',storedArray)
        if (tAccessType==='Print' && Number(dtRead.printData)===1) {
            retVal = true;
            // console.log('Found print data:',true)
        } else if (tAccessType==='Append' && Number(dtRead.appendData)===1) {
            retVal = true;
        } else if (tAccessType==='Modify' && Number(dtRead.modifyData)===1) {
            retVal = true;
        } else if (tAccessType==='Delete' && Number(dtRead.deleteData)===1) {
            retVal = true;
        } else if (tAccessType==='Final' && Number(dtRead.finalData)===1) {
            retVal = true;            
        } else if (tAccessType==='Post' && Number(dtRead.postData)===1) {
            retVal = true;            
        } else if (tAccessType==='Process' && Number(dtRead.processData)===1) {
            retVal = true;                    
        } else if (tAccessType==='Approve' && Number(dtRead.approvedData)===1) {
            retVal = true;                        
        } else if (tAccessType==='Browse') {
            retVal = true;                            
        }
            
        
    }    
    return retVal;
}


export async function urlExists(url) {
    const result = await fetch(url, { method: 'HEAD' });
    return result.ok;
}

export const pdfExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.status === 200;
    } catch (err) {
      return false;
    }
}

  export function checkIfPdfExists(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = () => {
    if (xhr.status === 200) {
        const blob = xhr.response;
        // check if the blob contains a valid PDF file
        if (blob.type === 'application/pdf') {
        // the Blob object contains a PDF file
        console.log('PDF file retrieved successfully.');
        // you can do something with the PDF file here
        } else {
        console.error('The retrieved file is not a PDF file.');
        // handle the error case here
        }
    } else {
        console.error(`Request failed with status ${xhr.status}.`);
        // handle the error case here
    }
    };
    xhr.send();
}

// checkIfPdfExists('https://www.africau.edu/images/default/sample.pdf'); // PDF file retrieved successfully.

// function padTo2Digits(num) {
//     return num.toString().padStart(2, '0');
//   }
  
// function formatDate(date) {
//     return [
//       padTo2Digits(date.getDate()),
//       padTo2Digits(date.getMonth() + 1),
//       date.getFullYear(),
//     ].join('/');
//   }

// export function encryptPWord(strNative) {
//     let strEncrypt = "";
//     for (let strI = 0; strI < strNative.length; strI++) {
//         let TEMP1 = strNative.charCodeAt(strI) - strNative.length;
//         strEncrypt = String.fromCharCode(TEMP1) + strEncrypt;
//     }
//     return strEncrypt;
// }

// export function decryptPWord(strEncrypt) {
//     let strNative = "";
//     for (let strI = 0; strI < strEncrypt.length; strI++) {
//         let TEMP1 = strEncrypt.charCodeAt(strI) + strEncrypt.length;
//         strNative = String.fromCharCode(TEMP1) + strNative;
//     }
//     return strNative;
// }
export function encryptPWord(strNativeStr) {
    if (strNativeStr==='') { 
        //} || strNativeStr===null || strNativeStr===undefined) {
        // alert('strNativeStr: ' + strNativeStr)
        return "";
    }
    let secretKey='0r0GodIsWithMe8888';
    let strNative= strNativeStr + secretKey;
    let strEncrypt = "";
    for (let strI = 0; strI < strNative.length; strI++) {
        let TEMP1 = strNative.charCodeAt(strI) - strNative.length;
        strEncrypt = String.fromCharCode(TEMP1) + strEncrypt;
    }
    // alert(strEncrypt)
    return strEncrypt;
}

export function decryptPWord(strEncrypt) {
    if (strEncrypt==='' || strEncrypt===undefined || strEncrypt===null) {
        return "";
    }

    // alert(strEncrypt)
    let secretKey='0r0GodIsWithMe8888';
    let strNative = "";
    for (let strI = 0; strI < strEncrypt.length; strI++) {
        let TEMP1 = strEncrypt.charCodeAt(strI) + strEncrypt.length;
        strNative = String.fromCharCode(TEMP1) + strNative;
    }
     // Check if the password contains the secretKey
    if (strNative.includes(secretKey)) {
        // Replace the secretKey with an empty string
        const result = strNative.replace(secretKey, '');
        return result.trim(); // Trim any extra spaces
    } else {
        // Return the original password if secretKey is not found
        return strNative;
    }
    // return strNative;
}

export function getFirstWord(fullName) {
    const words = fullName.split(" ");
    return words[0];
};

export function getSecondWord(fullName) {
    const words = fullName.split(" ");
    return words.length > 1 ? words[1] : "";
};


function padRight(sString, cChar, length) {
    let tmpChar = '';
    for (let strCtr = 1; strCtr <= length - sString.length; strCtr++) {
      tmpChar += cChar;
    }
    return sString + tmpChar;
  }
  
  // Example usage
//   const originalString = "hello";
//   const paddedString = padRight(originalString, '*', 10);
//   console.log(paddedString);  // Output: "hello*****"


function padLeft(sString, cChar, length) {
    let tmpChar = '';
    for (let strCtr = 1; strCtr <= length - sString.length; strCtr++) {
      tmpChar += cChar;
    }
    return tmpChar + sString;
  }
  
  // Example usage
//   const originalString = "hello";
//   const paddedString = padLeft(originalString, '*', 10);
//   console.log(paddedString);  // Output: "*****hello"
export function appVersion() {
    // let retVal ='v.1.4 2024-04-03 01:23pm';
    let retVal ='v.1.4 2024-07-22 04:55pm';
    return retVal;
};
