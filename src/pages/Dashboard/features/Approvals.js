import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalsDiscount, updateApprovalsDiscount, getApprovals, updateApprovals } from "../../../firebase/queries";
import { setAprovalDiscountList,setApprovalList } from "../dashboardSlice";
// import { getApprovals, updateApprovals } from "../../../firebase/queries";
// import { setApprovalList } from "../dashboardSlice";
import { currency } from "../../../functions/currency";
import Swal from "sweetalert2";


const initDetailState = {
  discount: 0
}

export const Approvals = () => {

  const [inputState, setInputState] = useState([initDetailState]);
  // const discountRef = useRef()


  const approvalDiscountList = useSelector((state) => state.dashboard.approvalDiscountList);
  const approvalList = useSelector((state) => state.dashboard.approvalList);

  const dispatch = useDispatch();

  const updateApprovalDiscount = async (action, id, discount) => {
    await updateApprovalsDiscount(action, id, discount).then(() => {
      Swal.fire("Success!", "Successfully " + action, "success");
    });
  };

  const updateApproval = async (action, id) => {
    await updateApprovals(action, id).then(() => {
      Swal.fire("Success!", "Successfully " + action, "success");
    });
  };

  useEffect(() => {
    const onDataUpdate = async (query) => {
      let data = [];
      query.forEach((docs) => {
        data.push({ ...docs.data(), id: docs.id });
      });
      dispatch(setAprovalDiscountList(data));
      console.log('data: ',data);

    };

    const onDataUpdate2 = async (query) => {
      let data2 = [];
      query.forEach((docs) => {
        data2.push({ ...docs.data(), id: docs.id });
      });
      dispatch(setApprovalList(data2));
      
    };

   
    getApprovalsDiscount(onDataUpdate);
    getApprovals(onDataUpdate2);

  
  }, [dispatch]);

  const handleInputChange = (e) => {
    // if (e.target.name==='discount') {
      // alert('te')
        setInputState(inputState => ({...inputState,  [e.target.name]: e.target.value}));
    // } else {
    // }
  };

  // const handleFocus = (event) => {
  //     if (event.target.name==="discount") { 
  //         // discountRef.current.select() ;
  //     }
  // } 

  const handleEnter = (event) => {
      if (event.key.toLowerCase() === "enter" || event.key.toLowerCase() === "arrowdown" ) {
          if (event.target.name==="selbranch") {
          
          }
        event.preventDefault();
      }
      else if (event.key.toLowerCase() === "arrowup") {
          
          return false;
      } else if (event.keyCode >=112 && event.keyCode <=123) {
          // Turn off Function key F1 to F12
          event.preventDefault();
      } else {
          // alert(event.keyCode);
      }
    
  };

  // function loadDiscount() {
  //     let loadDetailState = {
  //         discount: approval.request.discount,
  //     }
  //     setInputState(loadDetailState)
  // }



  return (
    //  approvalsm
    <div className="approvals">
      <div className="container">

        <span className="label" style={{color: 'blue'}} >Needed Approvals</span>
        <div className="request-container">

{/* original Approvals  */}

          {approvalDiscountList.map((approval) => {
            return (
              
              <div className="request" style={{height:'300px'}}>
                
                <div className="content" >
                  <span className="request-label">{approval.request.type}</span>
                  <span className="request-label1">
                    {approval.request.requestedby.branchName}
                  </span>
                  <p className="details">
                    <span className="request-label2">
                      {/* {approval.request.requestedby.userLevel} :{" "} */}
                      {approval.request.requestedby.userId} - {" "}
                      {approval.request.requestedby.userFullName}
                    </span>
                    <span className="request-label1">
                      Scanned Items: {approval.request.totalItems}
                    </span>
                  </p>
                  <p>
                    <span className="request-label2">
                      {/* Total Amount: {currency(approval.request.amount)} */}
                      Total Amount:
                    </span>
                    <span className="request-label2" style={{color: 'black', fontWeight:'bolder' , marginLeft:'10px'}} >
                      {currency(approval.request.amount)}
                    </span>
                    <span className="request-label1">
                      Remarks: {approval.status}
                    </span>
                  </p>
                  <p>
                    <span className="request-label2">
                         Req. Discount: 
                    </span>
                    <span className="request-label2" style={{color: 'black', fontWeight:'bolder' , marginLeft:'10px'}} >
                      {currency(approval.request.discount)}
                    </span>
                    </p>
                  <p>
                    <span className="request-label2">
                         Approve Discount: 
                    </span>
                    <input className= {'Input-Biteable'}
                          style={{width:'100px',marginTop:'10px',marginRight:'20px', height:'27px',textAlign:'center'}}
                          type="text"
                          name="discount"
                          require
                          autocomplete="off"
                          onKeyDown={handleEnter}
                          onKeyPress={(event) => {
                              if (!/[.0-9]/.test(event.key)) {    
                                  event.preventDefault();
                              }
                          }}
                          onChange ={(e) => handleInputChange(e)}
                          // onMouseEnter={(e) =>  handleChangeCase(e)}
                          // onFocus={handleFocus}
                          //  ref={discountRef}
                          // value={approval.request.discount || ''} 
                          value={inputState.discount || ''} 
                          maxLength={9}
                          // disabled={isAddEdit}
                    /> 
                    
                  </p>
                  <button
                    className="btn-neo1 btn-neo1-delete"
                    style={{ marginLeft: '4rem', width: '150px', height: '40px' }}
                    onClick={() => updateApprovalDiscount("rejected", approval.id, 0)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn-neo1 btn-neo1-success"
                    style={{ marginLeft: '4rem', width: '150px', height: '40px'  }}
                    onClick={() => updateApprovalDiscount("approved", approval.id, inputState.discount)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            );
            
          })}

{/* original Approvals  */}

          {approvalList.map((approval) => {
            return (
              <div className="request">
                <div className="content">
                  <span className="request-label">{approval.request.type}</span>
                  <span className="request-label1">
                    {approval.request.requestedby.branchName}
                  </span>
                  <p className="details">
                    <span className="request-label2">
                      {approval.request.requestedby.userLevel} :{" "}
                      {approval.request.requestedby.userFullName}
                    </span>
                    <span className="request-label1">
                      Scanned Items: {approval.request.totalItems}
                    </span>
                  </p>
                  <p>
                    <span className="request-label2">
                      Amount: {currency(approval.request.amount)}
                    </span>
                    <span className="request-label3">
                      Remarks: {approval.status}
                    </span>
                  </p>
                  <button
                    className="btn-neo1 btn-neo1-delete"
                    style={{ marginLeft: '4rem', width: '150px', height: '40px' }}
                    onClick={() => updateApproval("rejected", approval.id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn-neo1 btn-neo1-success"
                    style={{ marginLeft: '4rem', width: '150px', height: '40px'  }}
                    onClick={() => updateApproval("approved", approval.id)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};
