import React from 'react'
import './logo.css'
import Orologo from '../images/logo192.jpg'


function Logo() {
    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

    return (
        <div className='d-flex align-items-center justify-content-between'>
            <a href='/' className='logo d-flex align-items-center'>
                <img src={Orologo} alt="logo" />
                <span className='d-none d-lg-block fw-bold'>Regional Intelligence Division</span>
            {/* <span className='d-none d-lg-block fw-bold'>RID</span>  */}
            </a>
            <i className='bi bi-list toogle-sidebar-btn' onClick={handleToggleSideBar}></i>
        </div>
    );
}

export default Logo
