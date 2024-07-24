// import moment from 'moment';

export function MyServerAPIHost() {
    //   return "http://124.105.189.173:3010";
    //  return "http://192.168.4.241:3001";
    //   return "http://127.0.0.1:5000";
    //   return "https://mysterious-woolens-foal.cyclic.app";
    // return "http://127.0.0.1:5000";
          // return "http://localhost:5000";
         return "https://ticketing-api-mysql-vercel.vercel.app";
    // return "https://ticketing-api-mysql-vercel-9ymq53zsw-singsonchrisb.vercel.app"
}


// export function MyServerHostAPICyclicNodeJS() {
//      return "https://mysterious-woolens-foal.cyclic.app"
// }

// export function MyServerHostGood() {
//     return "http://124.105.189.173:5001";
//     //  "http://192.168.4.248:5001";
// }

// export function MyServerHostNodeJS() {
//     // return "http://127.0.0.1:3001";
//     return "http://124.105.189.173:5001";
//     // return "http://124.105.189.173:5001"; // 192.168.4.248/192.166.1.130 server node.js server 
// }

// export function MyServerHostJavaLocal() {
//     return "http://192.168.4.248:8080";
// }

export function MyServerHostJava() {
    // return "http://192.168.4.248";
    // return "http://localhost:80/site101";
    // return "http://192.168.4.248/site101";
    // return "http://124.105.189.173:8080";
    // return "https://techsit.orobusinessgroup.online/site101"    kezar
       return "https://techsit.orobusinessgroup.online/site102";  
    // return "http://192.168.4.248/site102";
}

export function MyServerHostPicture(projectName) {
  if (projectName.toLowerCase() ==='ticketing-booking') {
    return "https://firebasestorage.googleapis.com/v0/b/ticketing-booking-9cc08.appspot.com";
  }
}

export const delayMe = ms => new Promise(
    resolve => setTimeout(resolve, ms)
)

export const formatNumber = inputNumber => {
    if( Number(inputNumber) <=0) {
        return 0;
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
    return(formetedNumber);
};

export function format(n) {
  
    const baseFormat = n.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  
    if(n < 0) {
      return (
        <>
          &#8369; ({baseFormat.slice(1)})
        </>
      )
    }
  
    return (
      <>
        &#8369; {baseFormat}
      </>
    )
  }

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
    // return moment(tDate,'YYYY-MM-DD').format(strFormat);
}
  
export function getMonth(tDate,strFormat) {
    // return moment(tDate,'YYYY-MM-DD').format(strFormat);
}

export function getDay(tDate,strFormat) {
    // return moment(tDate,'YYYY-MM-DD').format(strFormat);
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

export const nullNumeric = (nNum) => {
  return nNum ? nNum : 0;
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

  export function draftDecimal2Zero(tValue) {
    if (tValue <=0) { return 0};
       var nRetVal =0;
       var cStr=parseInt(tValue); 
       var nDecimal = Number(tValue) - Number(cStr)
       let nPlus = nDecimal >0 ? 0:0;
       nRetVal= Number(cStr) + nPlus
      //  alert(nRetVal)
     return nRetVal;
}

export function draftDecimal2WholeNumber(tValue) {
    if (tValue <=0) { return 0};
       var nRetVal =0;
       var cStr=parseInt(tValue); 
       var nDecimal = Number(tValue) - Number(cStr)
       let nPlus = nDecimal >0 ? 1:0;
       nRetVal= Number(cStr) + nPlus
      //  alert(nRetVal)
     return nRetVal;
}

export function Num2Code(nNum) { 
    var cRetVal = "";
    var cRetVal2 = "";
    var cStr1 = nNum.toFixed(2).toString().trim();
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

export function PriceCode2Num2(cNumStr) { 
    var cRetVal = "";
    var cStr1 = cNumStr.trim();
    var cCode="1234567890-";
    // alert('nNum: ' + nNum  + ',  length: ' + cStr1.length);
    
    for (let i = 0; i < cStr1.length; i++) {
        var cChar = cStr1.substr(i,1).trim()
        // alert('cChar: ' + cChar + " i: " +i);
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



// usage const days = dayDifference(dates[0].endDate, dates[0].startDate);  
export function dayDifference(date1, date2) {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
}

// usage const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
// export const getDatesInRange = (startDate, endDate) => {
export async function getDatesInRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const date = new Date(start.getTime());

  const dates = [];

  while (date <= end) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

  

/**
 * // Convert Currency into Words up to 999,999
 * @param {int} n
 * @returns Word equivalent currency
 */
 export function numberToWords(n) {
    var num =
      "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(
        " "
      );
    var tens = "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
  
    if (n < 1000000) {
      if (n < 20) return num[n];
  
      var digit = n % 10;
      if (n < 100) return tens[~~(n / 10) - 2] + (digit ? "-" + num[digit] : "");
  
      if (n < 1000)
        return (
          num[~~(n / 100)] +
          " hundred" +
          (n % 100 === 0 ? "" : " " + numberToWords(n % 100))
        );
  
      return (
        numberToWords(~~(n / 1000)) +
        " thousand" +
        (n % 1000 !== 0 ? " " + numberToWords(n % 1000) : "")
      );
    } else {
      console.log("Error: Amount reached up to a Million!");
      return n.toString();
    }
  }
 
export function getFirstWord(fullName) {
    const words = fullName.split(" ");
    return words[0];
};

export function getSecondWord(fullName) {
    const words = fullName.split(" ");
    return words.length > 1 ? words[1] : "";
};  

//   export function encryptPWord(strNativeStr) {
//     let strNative = strNativeStr; //+ 'blessKhaki';
//     let strEncrypt = "";
//     for (let strI = 0; strI < strNative.length; strI++) {
//         let TEMP1 = strNative.charCodeAt(strI) - strNative.length;
//         strEncrypt = String.fromCharCode(TEMP1) + strEncrypt;
//     }
//     return strEncrypt;
// }

// export function decryptPWord(strEncryptStr) {
//     let strEncrypt = strEncryptStr;
//     let strNative = "";
//     for (let strI = 0; strI < strEncrypt.length; strI++) {
//         let TEMP1 = strEncrypt.charCodeAt(strI) + strEncrypt.length;
//         strNative = String.fromCharCode(TEMP1) + strNative;
//     }
//      //remove 'blessKhaki';

//     return strNative;
// }

export function encryptPWord(strNativeStr) {
  if (strNativeStr==='' || strNativeStr===undefined || strNativeStr===null) {
    return '';
  }

  let secretKey='lIlaCdAnAkHakI';
  let strNative= strNativeStr + secretKey;
  let strEncrypt = "";
  for (let strI = 0; strI < strNative.length; strI++) {
      let TEMP1 = strNative.charCodeAt(strI) - strNative.length;
      strEncrypt = String.fromCharCode(TEMP1) + strEncrypt;
  }
  return strEncrypt;
}

export function decryptPWord(strEncrypt) {
  
  if (strEncrypt==='' || strEncrypt===undefined || strEncrypt===null) {
    return '';
  }
  let secretKey='lIlaCdAnAkHakI';
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