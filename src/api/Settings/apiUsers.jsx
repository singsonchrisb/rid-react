import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { MyServerHostJava} from '../../pages/Functions/MyFunctions';


const dbServerHostJava = MyServerHostJava()
var gAccessToken='';

gAccessToken = sessionStorage.getItem("accessToken");

// export const getAPIPassword = async (cUser, cPassword) => {

export const getAPIPassword = async (cUser, cPassword) => {
// export const formatNumber = inputNumber => {
    var APIRetVal=[];
    try {
        await fetch(dbServerHostJava + "/api/accounts/login?username=" + cUser + "&password="+ cPassword, {                
        method: 'GET',
        headers: GetMyHeaders(gAccessToken),
        })
        .then((response) => response.json() )
        .then((json) => {
            
            // console.log("test api: ",json)
            APIRetVal.push({ error : json.error, data: json, status:json.status});
            console.log("rett api: ",APIRetVal)
            return json;
            

            // if (json.status===403) {
            //     return false;
            // } else if (json.status===404) {
            //     return false;      
                 
            //  } else {
            //     return (APIRetVal);

            //     //  toast.error("Error: " + json.error )
            //  }
        })
        // console.log("test3",json) 

    } catch (err) {
         console.log(err)
        //  toast.error("NO data receive,  " + err ); 
        APIRetVal.push({ error : "NO data receive,  " + err, data: [{error : 'Error'}] , status: 400});
        // return APIRetVal;
        return false;      

    }
};

