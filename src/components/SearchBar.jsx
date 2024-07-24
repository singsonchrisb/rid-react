import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const routes = ["/dashboard","/dashboardVessels", "/vessels", "/portpiers", "/farecodes","/routesProfile", "/routeFares","/UserAccounts","/UserChangePassword","/UserUpdateAccount","/ticketHeader", "/login", "/faq"];
  const routesName = ["dashboard","dashboard Vessels","vessels", "port piers", "fare codes","routes profile", "route fares","User Accounts","User Change Password","User Update Account","ticket header", "log in","Frequently asked"];

  const handleSearch = (event) => {
    event.preventDefault();
    const results = routes.filter(route => route.toLowerCase().includes(query.toLowerCase()));
    if (results.length > 0) {
       setQuery('');
       navigate(results[0]); // Navigate to the first matching route
    } else {
        let arrNum=50;
        {routesName.forEach((route1, index) => {
          if (route1.toLowerCase()===query.toLowerCase()) {
              arrNum=index;
          }
        })}
        if (arrNum < 50) {
            // alert('routes[arrNum] ' + routes[arrNum])
            setQuery('');
            navigate(routes[arrNum]); // Navigate to the first matching route      
        } else {         
             if (verifyOtherSearch()) {
                setQuery('');
             } else {          
                alert('No matching route found : ' + query);
             }
        } 
    }
  };

  function verifyOtherSearch() {
    let tQuery = query.toLowerCase();
    if (tQuery ==="update password" || tQuery ==="change password" || tQuery ==="user change" ) {  
        navigate("/UserChangePassword");
    } else if (tQuery ==="user update" || tQuery ==="user change" || tQuery.substring(0,14) ==="update account" ) {  
        navigate("/UserUpdateAccount");   
    } else if (tQuery ==="route fare" || tQuery ==="fares route" ) {  
        navigate("/routeFares");
    } else {          
        // alert('No matching route found : ' + tQuery);
        return false;
    }
    return true;
  }

  return (
    <div className='search-bar'>
      <form className="search-form d-flex align-items-center" onSubmit={handleSearch}>
        <input
          type='text'
          name='query'
          placeholder='Search'
          title='Enter search keyword'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type='submit' title='Search'>
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
