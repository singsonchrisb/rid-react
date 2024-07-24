import { isMobile } from 'react-device-detect';

let topMargin = ((window.innerHeight-600)/2) ;
// let gWidth= '100%';
// let gHeight='100%';
// let gTopMargin=((window.innerHeight-600)/2);

const myStyles = {
    boxHeadTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: '1px',
        marginBottom: '15px',
        width: '100%',
        color: 'white',
        backgroundColor: '#448AFF',
      },
    // popupBox: {
    //     position: 'fixed',
    //     background: '#00000050',
    //     width: '100%',
    //     height: '100vh',
    //     top: '0',
    //     textAlign: 'center',
    // },
    // popupHeadTitle: { 
    //     width: "100%", 
    //     marginTop: "0px", 
    //     marginBottom: "20px", 
    //     textAlign: 'center', 
    //     color: 'blue',
    // },
}


// const styles = {
//     popupAddEditContainer: {
//         position: 'relative',
//         textAlign: 'center',
//         justifyContent: 'center',
//         alignItems:'center',
//         width: '866px',
//         height: '540px',
//         margin: 'auto',
//         marginTop:  topMargin +'px',
//         background: '#fff',
//         borderRadius: '6px',
//         padding: '2px 4px 00px 20px',
//         border: '1px solid #999',
//         overflow: 'auto',
//       },
//       popupContainer: {
//         position: 'relative',
//         textAlign: 'center',
//         justifyContent: 'center',
//         alignItems:'center',
//         // width: '466px',
//         width: isMobile ? '100%': '400px',
//         height: '550px',
//         margin: 'auto',
//         marginTop:  topMargin +'px',
//         background: '#fff',
//         borderRadius: '6px',
//         padding: '5px 5px 20px 20px',
//         border: '1px solid #999',
//         overflow: 'auto',
//       },  
//     popupViewContainer: {
//         position: 'relative',
//         // textAlign: 'center',
//         textAlign: 'left',
//         justifyContent: 'center',
//         alignItems:'center',
//         // width: '620px',
//         width: isMobile ? '100%':'620px',
//         height: '540px',
//         margin: 'auto',
//         marginTop:  topMargin +'px',
//         background: '#fff',
//         borderRadius: '6px',
//         padding: '2px 4px 00px 20px',
//         border: '1px solid #999',
//         overflow: 'auto',
//       },  
    
    // popupUVContainer: {
    //     position: 'relative',
    //     textAlign: 'center',
    //     justifyContent: 'center',
    //     alignItems:'center',
    //     width: myWidth(),
    //     height: myHeight(),
    //     margin: 'auto',
    //     marginTop:  topMargin +'px',
    //     background: '#fff',
    //     borderRadius: '6px',
    //     padding: '2px 4px 00px 20px',
    //     border: '1px solid #999',
    //     overflow: 'auto',
    // },  

    
    
  // };

  export {myStyles}

  export const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    p: 1,
  };