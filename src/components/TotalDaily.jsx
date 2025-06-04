import React, { useState } from 'react'
import OroBranchesChart from './TotalDailyChart';

function OroBranches() {
  return (
    <div className='card'>
        <div className='card-body pb-0'>
            <h5 className='card-title'>
                Total Daily Applied
            </h5>
            <OroBranchesChart />
        </div>
    </div>
  );
}

export default OroBranches
