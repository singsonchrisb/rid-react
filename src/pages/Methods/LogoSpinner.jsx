import React from 'react';
import './LogoSpinner.css';
import logo from '../../images/orologo1.png';


const LogoSpinner = () => {
    return (
        <div className='spinner-container'>
            <div className='spinner-logo'>
                {/* <img src={`${process.env.PUBLIC_URL}/orologo1.png`} alt='ORO Logo' /> */}
                <img src={logo} alt='ORO Logo' />
                
            </div>
            <div className='spinner-loader spinner-loader1'>
                <div className='spinner-dot'></div>
            </div>
            <div className='spinner-loader spinner-loader2'>
                <div className='spinner-dot'></div>
            </div>
            <div className='spinner-loader spinner-loader3'>
                <div className='spinner-dot'></div>
            </div>
            <div className='spinner-loader spinner-loader4'>
                <div className='spinner-dot'></div>
            </div>
            <div className='spinner-loader spinner-loader5'>
                <div className='spinner-dot'></div>
            </div>
            <div className='spinner-loader spinner-loader6'>
                <div className='spinner-dot'></div>
            </div>
        </div>
    );
};

export default LogoSpinner;




// import React from 'react';
// import './LogoSpinner.css';

// const LogoSpinner = () => {
//     return (
//         <div className='spinner-container'>
//             <div className='spinner__logo'></div>
//             <svg viewBox="25 25 50 50" className='spinner'>
//                 <circle r="20" cy="50" cx="50"></circle>
//             </svg>
//         </div>
//     );
// };

// export default LogoSpinner;
