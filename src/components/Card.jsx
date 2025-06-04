import React, { useEffect, useState } from 'react';
import './card.css';
import CardFilter from './CardFilter';

const cardsData = [
  {
    "_id": 1,
    "name": "Total Sales",
    "icon": "bi bi-trophy",
    "amount": 808888,
    "desc": "PHP",
    "percentage": 0.05,
    "active": true
  },
  {
    "_id": 2,
    "name": "Cash Discrepancy",
    "icon": "bi bi-cash-stack",
    "amount": 1008,
    "desc": "PHP",
    "percentage": -0.11,
    "active": false
  },
  {
    "_id": 3,
    "name": "Stocks",
    "icon": "bi bi-boxes",
    "amount": 250,
    "desc": "ITEMS",
    "percentage": 0.01,
    "active": false
  }
];

function Card({ card }) {
  const [filter, setFilter] = useState('Today');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      // Handle the selected date here, e.g., format it or perform any specific actions
    }
  }, [selectedDate]);

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
    // Additional logic related to filter changes can be added here
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-PH');
  };

  return (
    <div className="col-lg-4 mb-3">
      <div className='card info-card justify-content-center sales-card'>
        <CardFilter filterChange={handleFilterChange} setSelectedDate={setSelectedDate} />
        <div className='card-body'>
          <h5 className='card-title'>
            {card.name} <span>| {filter}</span>
          </h5>

          <div className='d-flex align-items-center'>
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className={card.icon}></i>
            </div>
            <div className='ps-3'>
              <h6>
                {card.name === 'Revenue'
                  ? 'P' + formatAmount(card.amount)
                  : formatAmount(card.amount)}
              </h6>
              <span className='text-muted small pt-1 fw-bold ps-1'>
                {card.desc}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardList() {
  return (
    <div className="row">
      {cardsData.map(card => (
        <Card key={card._id} card={card} />
      ))}
    </div>
  );
}

export default CardList;
