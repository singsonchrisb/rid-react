import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, paginate }) => {
    const [visiblePages, setVisiblePages] = useState(5);

    const handleClick = (pageNumber) => {
        paginate(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPage = currentPage * visiblePages;
    const indexOfFirstPage = indexOfLastPage - visiblePages;
    const visiblePageNumbers = pageNumbers.slice(indexOfFirstPage, indexOfLastPage);

    return (
        <nav>
            <ul className='pagination'>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => handleClick(currentPage - 1)} className='page-link'>&laquo;</button>
                </li>

                {visiblePageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => handleClick(number)} className='page-link'>{number}</button>
                    </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={() => handleClick(currentPage + 1)} className='page-link'>&raquo;</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;