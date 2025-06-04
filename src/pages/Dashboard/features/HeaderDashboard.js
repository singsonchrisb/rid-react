
// import { NavLink } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
// import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { decryptPWord } from '../../Functions/MyFunctions';
import { useEffect } from 'react';

export const HeaderDashboard = ({ name}) => {
  let gDashboard =  Number(decryptPWord(sessionStorage.getItem('dashb')));
  // alert(gDashboard)
  let navigate = useNavigate();
  let buttonSelectStyle={
    border: "none",
    fontSize: "15px",
    fontWeight: "bold",
    padding: "12px",
    cursor: "pointer",
  }


  useEffect(() => {
    if (gDashboard===0) {
       navigate('/ProjectDashBoard')
    }
  }, []);

    
  // const handleWindowClose = () => {
  //   // Navigate('/home');
  //   // Navigate(-1);
  // }

  return (
    <>
    {/* <FaWindowClose className='windowclose-button' onClick={() => handleWindowClose()}/>   */}
      <div className="header">
        <h1 className="greeting">Hi, {name}!</h1>
        <br/>
        {/* <br />
        <span className="greet-text">
          Here's an overview of the ORO DashBoard
        </span> */}
      </div>

      <div className='tabs'>
          <Grid>
              <Grid.Row>
                  <Grid.Column>
                      {/* <button className="btn-neo1 btn-neo1-warming-dark" style={buttonSelectStyle} as={NavLink}  to='/JewelryPOSDashboard' exact> */}
                      <button className="btn-neo1 btn-neo1-warming-dark" style={buttonSelectStyle}  disabled={gDashboard===1 ? false: true}  onClick={()=> navigate('/JewelryPOSDashboard')} >
                          POS Jewelry
                      </button>
                      <button className="btn-neo1 btn-neo1-warming-dark" style={buttonSelectStyle} onClick={()=> navigate('/ProjectDashBoard')} >
                          Project
                      </button>
                      {/* <Button as={NavLink} to='/JewelryPOSWithdrawal'>
                          Withdrawal
                      </Button> */}
                      {/* <Button as={NavLink} to='/fundingwithdrawal/perpos'>
                          Per POS
                      </Button> */}
                      {/* <button className="btn-neo1 btn-neo1-warming-dark" style={buttonSelectStyle} onClick={()=> Navigate('/home')} >
                          Back to Home Page
                      </button> */}
                  </Grid.Column>
              </Grid.Row>
          </Grid>
      </div>
  </>
  );
};
