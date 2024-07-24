import { toast } from 'react-toastify';
import { GetMyHeaders } from '../pages/Functions/GetAPIToken';
import { decryptPWord, MyServerHostJava} from '../pages/Functions/MyFunctions';


const dbServerHostJava = MyServerHostJava();
const dbServerHostJava101 = "https://techsit.orobusinessgroup.online/site101";
// gAccessToken = sessionStorage.getItem("accessToken");
let gAccessToken= decryptPWord(sessionStorage.getItem("accessToken"));

export async function getAPIAppKey(barcodeNumber)  {
    // GET  https://techsit.orobusinessgroup.online/site102/key/search?appKey={barcodeNumber}
    // alert(barcodeNumber);
    let results=[];
          try {
              await fetch(dbServerHostJava + "/key/search?appKey="+barcodeNumber, {
              method: 'GET',
            //   headers: GetMyHeaders(gAccessToken),
              })
              .then((response) => response.json() )
              .then((json) => {
                  // console.log("App key data: ", json)
                  results =json; 
                //   json.data.forEach((value) => {
                //       results.push({
                //           ...value
                //       });
                //   });
              })
  
           } catch (err) {
              // console.log(err)
              //  setDataBranch({branchCode: '0', branchName: 'none', aliasName: 'none'});
              //  toast.error("NO branches data to display,  " + err ); 
          }
  
        console.log('results app key : ',results);
        return results;
  }

  export async function getAPISpecialItems(nBranchCode,classCode,isAuction,karat,selSubGroup, description, weightCode)  {
          // console.log("branchcode: " + nBranchCode + ", Class: " + classCode + ", isAuction: "+ isAuction,karat,selSubGroup, description, weightCode);
          // GET http://localhost:8080/site102/api/j/profile/karat/addon/j1?descript=wxg&wt=0.9&clscode=bct&karat=18&ksub=REG
          // weightCode=2.2;
          // let results=[];
          // let sellingPr;
          // let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
          let results=0
          try {
            // await fetch(dbServerHostJava + "/api/j/profile/karat/addon/"+nBranchCode +"?descript="+ description.substring(0,8) + "&wt=" + weightCode + "&clscode=" + classCode +"&karat=" +karat +"&ksub="+selSubGroup, {
            await fetch(dbServerHostJava + "/api/j/profile/karat/addon/"+nBranchCode +"?descript="+ description + "&wt=" + weightCode + "&clscode=" + classCode +"&karat=" +Number(karat) +"&ksub="+selSubGroup, {
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                // console.log("Special data: ", json.data)
                results=json.data.sellingPr;
            })
          } catch (err) {
            // console.log(err)
            //  setDataBranch({branchCode: '0', branchName: 'none', aliasName: 'none'});
                toast.error("NO branches data to display,  " + err ); 
            // results=json.data.sellingPr;
        }
      // console.log('results Special : ',results);
      return results;
}

export async function postCancellLayaway(nBranchCode, layawayNo, dTrnDate, prodCode)  {
      // console.log('post cancell layawya: ',nBranchCode + ", " +  layawayNo + ", " + dTrnDate + ", "+ prodCode)   
  // alert(nBranchCode + ", " +  layawayNo + ", " + dTrnDate + ", "+ prodCode)
      let optionBody =[{
          documentNumber: layawayNo,
          trnDate: dTrnDate,
          productCode: prodCode,
      }]


    // console.log('optionBody:',optionBody)
    try {
        
        await fetch(dbServerHostJava101 + "/api/j/inventory/" + nBranchCode +"/cancel/layaway", {                
        method: 'POST',
        headers: GetMyHeaders(gAccessToken),
        body: JSON.stringify(optionBody)
        }).then((response) => {
            response.json().then((json) => {
                // console.log("update layaway1:", json);
                // console.log("update layaway2:", json.data);
                // console.log(json.status);
            if (Number(json.status)===200) {
                toast.success("Successfully update.. ");
                return true;
            } else {    
                toast.error("Unsuccessfully update: " + json.status + ","  + json.error + ","  + json.message )         
                return false;
            }
        })    
        }).catch(Error => {
            toast.error("catch update Error: " + Error )             
        })
        return true;
    } catch (error) {
        console.log ("Error:", error);
        toast.error("Unsuccessfully update: " +  error)
    }  
}

// https://techsit.orobusinessgroup.online/site101/api/j/inventory/{branchCode}/cancel/layaway
// "documentNumber" : "docNumber",
// "trnDate" : "2023-09-11",
// "productCode" : "DIA18-34"


// export async function GetKarat(tAcceesBranch) {  
//     console.log('tAcceesBranch', tAcceesBranch);
//     console.log('gAccessToken', gAccessToken);
//     console.log('dbServerHostJava',dbServerHostJava);
//     let tRetVal={status: 401, data: {decription: 'none'}, error: 'Unsuccessfuly!' }
//         try {
//            await fetch(dbServerHostJava + "/api/j/profile/karat/" + tAcceesBranch, {
//             method: 'GET',
//             headers: GetMyHeaders(gAccessToken),
//             })
//             .then((response) => response.json() )
//             .then((json) => {
                
//                 if (json.status===200) {
//                     // setProduct(json.data);
//                     console.log('json',json.data);
//                     tRetVal =json.data;
//                     return json.data

//                 } else {
//                     tRetVal ={status: json.status, data: "json Error", error: json.error }
//                     // setProduct([{karat: '0', value: '0'}]);
//                     // toast.error("Karat file not found, error: " + json.error )
//                 }
//             })
//         } catch(err) {
//             // console.log(err)
//             //  setProduct([{karat: '0', value: '0'}]);
//             //  alert("NO karat data to display,  " + err ) 
//             tRetVal ={status: 401, data: "Try Catch Error", error: err }
//         }
//         return tRetVal;
//     }    