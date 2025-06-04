import React from 'react';
import './pageTitle.css';


function PageTitle({ page }) {
    return (
      <div className="pagetitle">
          <h1 className=''>{page}</h1>
      </div>
    );
}

export default PageTitle;
