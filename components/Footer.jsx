import React from 'react';
import './footer.css';

function Footer() {
  return (
      <footer className='footer'> 
        <div className='copyright'>
            &copy; Copyright{ ' 2024 ' }
            <strong>
                <span>CHRICH and PMC I.T Solution</span>
            </strong>
            . All Rights Reserved
        </div>
        <div className="credits">
            Developed by <a href='#'>CHRICH Dev Team</a>
        </div>
        
     </footer> 
  );
}

export default Footer
