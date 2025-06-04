import React, { useState, useEffect } from 'react'
import './recentSales.css'
import CardFilter from './CardFilter'
import RecentSalesTable from './RecentSalesTable'

function RecentSales() {
    let datData=[{id:1, ridNo:'1000010' ,applicantName: 'Joan G. Tan', dateApply: '07/22/2024',status:''},
                 {id:2, ridNo:'1000011' ,applicantName: 'Jay Ray H. Zamora', dateApply: '07/16/2024',status:''},
                 {id:3, ridNo:'1000021' ,applicantName: 'Lila S. Remolano', dateApply: '07/16/2024',status:''},
                 {id:4, ridNo:'1000055' ,applicantName: 'Khaki R. Angco', dateApply: '07/16/2024',status:'printed'}]
                 
     const [items, setItems] = useState(datData);
    // const [items, setItems] = useState([]);
    const [filter, setFilter] = useState ('Today');
    const handleFilterChange = filter => {
        setFilter(filter);
    };

    const fetchData = () => {
        fetch('http://localhost:4000/recentsales')
            .then(res => res.json())
            .then(data => {
                setItems(data);
            })
            .catch(e => console.log(e.message));
    };

    useEffect (() => {
        // fetchData();
    }, []);

  return (
    <div className='card recent-sales overflow-auto'>
        <CardFilter filterChange={handleFilterChange} />

        <div className='card-body'>
            <h5 className='card-title'>
                For Releasing Clearance <span>| {filter}</span>
            </h5>
            <RecentSalesTable items={items} />
        </div>
    </div>
  )
}

export default RecentSales
