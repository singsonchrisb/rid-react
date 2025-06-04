import React from 'react'

function TopSellingItem({ item }) {

    const handleStatus = status => {
        switch (status) {
            case 'Approved':
                return 'success';
                break;
            case 'Paid':
                    return 'success';
                    break;    
            case 'Not Paid':
                return 'warning';
                break;
            case 'Rejected':
                return 'danger';
                break;
            default:
                return 'danger';
        }
    };

  return (
    <tr>
        {/* <th scope='row'>
            <a href='#'>
                <img src={item.preview} alt=" " />
            </a>
        </th>
        <td>
            <a href='#' className='text-primary fw-bold'>
                {item.name}
            </a>
        </td>
        <td><span>&#8369;</span>{item.price.toFixed(2)}</td>
        <td className='fw-bold'>{item.sold}</td>
        <td><span>&#8369;</span>{(item.price * item.sold).toLocaleString('en-US')}</td> */}
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
  );
}

export default TopSellingItem
