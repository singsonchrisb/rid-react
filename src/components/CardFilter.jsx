import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

function CardFilter({ filterChange }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);

        if (date instanceof Date && !isNaN(date.getTime())) {
            // const formattedDate = format(date, 'yyyy-MM-dd');
            const formattedDate = format(date, 'dd-MM-yyyy');
            filterChange(formattedDate);
        } else {
            filterChange(null);
        }
    };

    const handleClearDate = () => {
        setSelectedDate(null);
        filterChange(null);
    };

    return (
        <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                </li>
                <li>
                    <a className="dropdown-item" onClick={() => filterChange('Today')}>
                        Today
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" onClick={() => filterChange('This Month')}>
                        This Month
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" onClick={() => filterChange('This Year')}>
                        This Year
                    </a>
                </li>
                <li>
                    <div className="dropdown-item">
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            isClearable
                            placeholderText="Select Date"
                        />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default CardFilter;
