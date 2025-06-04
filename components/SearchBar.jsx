import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { decryptPWord } from '../functions/ChrisFunctions';
import './searchBar.css';

function SearchBar() {
  let gUserType = decryptPWord(sessionStorage.getItem('accessType'));
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  // const routes = ["/dashboard","/applicants", "/vessels", "/portpiers", "/farecodes","/routesProfile", "/routeFares","/UserAccounts","/UserChangePassword","/UserUpdateAccount","/ticketHeader", "/login", "/faq"];
  const routes = ["/dashboard","/UserChangePassword","/UserUpdateAccount", "/signin", "/faq"];
  const routesName = ["dashboard","User Change Password","User Update Account", "sign in","Frequently asked"];

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
                Swal.fire({
                  title: "There is no matching route found: " + query +"!",
                  text:  "click the ok button to continue",
                  icon: "error"
                });
             }
        } 
    }
  };

  function verifyOtherSearch() {
    let tQuery = query.toLowerCase();

    if (gUserType==='admin') {
      if (tQuery ==="user accounts" || tQuery ==="accounts" ) {  
          navigate("/UserAccounts");
      } else if (tQuery ==="user update" || tQuery ==="user change" || tQuery.substring(0,14) ==="update account" ) {  
          navigate("/UserUpdateAccount");   
      } else if (tQuery ==="route fare" || tQuery ==="fares route" ) {  
        
      } 
      return true;

    } else {


    }

    if (tQuery ==="update password" || tQuery ==="change password" || tQuery ==="user change" ) {  
        navigate("/UserChangePassword");
    } else if (tQuery ==="user update" || tQuery ==="user change" || tQuery.substring(0,14) ==="update account" ) {  
        navigate("/UserUpdateAccount");   
    } else if (tQuery ==="route fare" || tQuery ==="fares route" ) {  
        // navigate("/routeFares");
    } else {          
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
