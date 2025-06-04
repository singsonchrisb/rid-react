import React, { useState, useEffect } from 'react'
import './topSelling.css'
import CardFilter from './CardFilter';
import TopSellingItem from './TopSellingItem';

function TopSelling() {
    let datData=[{id:1, ridNo:'1000015' ,applicantName: 'Roy T. Balan', dateApply: '07/02/2024',status:'Not Paid'},
                 {id:2, ridNo:'1000018' ,applicantName: 'Efrahim Z. Siason', dateApply: '07/18/2024',status:'Documents Lacking'},
                 {id:3, ridNo:'1000025' ,applicantName: 'Lila H. Singson', dateApply: '07/14/2024',status:'Rejected'},
                 {id:4, ridNo:'1000045' ,applicantName: 'Roland S. Angco', dateApply: '07/15/2024',status: 'Not Paid'}]
    
    // const [items, setItems] = useState([]);
    const [items, setItems] = useState(datData);

    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter);
    };

    const fetchData = () => {
        fetch('http://localhost:4000/topselling')
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
    <div className='card top-selling overflow-auto'>
        <CardFilter filterChange={handleFilterChange} />

        <div className='card-body pb-0'>
            <h5 className='card-title'>
                Pending Application <span>| {filter}</span>
            </h5>

            <table className='table table-borderless'>
                <thead className='table-light'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Applicant Name</th>
                        <th scope='col'>RID No.</th>
                        <th scope='col'>Date Apply</th>
                        <th scope='col'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {items &&
                        items.length > 0 &&
                        items.map(item => <TopSellingItem key={item._id} item={item} />)}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default TopSelling
