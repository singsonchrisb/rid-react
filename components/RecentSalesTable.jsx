import React from 'react'

function RecentSalesTable({ items }) {
    const handleStatus = status => {
        switch (status) {
            case 'Approved':
                return 'success';
                break;
            case 'Paid':
                    return 'success';
                    break;    
            case 'Pending':
                return 'warning';
                break;
            case 'Rejected':
                return 'danger';
                break;
            default:
                return 'success';
        }
    };

  return (
    <table className='table table-borderless datatable'>
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
            items.map(item => (
                <tr key={item._id}>
                    <th scope='row'>
                        <a href='#'>{item.id}</a>
                    </th>
                    <td>
                        <a href='#' className='text-primary'>
                            {item.applicantName}
                        </a>
                     </td>
                    <td>
                       <a href='#' className='text-primary'>
                             {item.ridNo}
                        </a>
                    </td>
                    <td>{item.dateApply}</td>
                    {/* <td><span>&#8369;</span>{item.price.toFixed(2)}</td> */}
                    <td>
                        <span className={`badge bg-${handleStatus(item.status)}`}>
                            {item.status}
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  );
}

export default RecentSalesTable
