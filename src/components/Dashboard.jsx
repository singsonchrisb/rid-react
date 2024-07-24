import React, {useState, useEffect} from 'react'
import Card from './Card';
import './dashboard.css';

import Reports from './Reports';
import RecentSales from './RecentSales';
import TopSelling from './TopSelling';
import RecentActivity from './RecentActivity';
// import BudgetReport from './BudgetReport';
import OroBranches from './TotalDaily';
// import TicketList from "./TicketList";
import Widget from "./Widget";
import Featured from "./Featured";
// import { useMediaQuery } from '@mui/material';
import useMediaQuery from "../hooks/useMediaQuery";
import useSessionStorage from '../hooks/useSessionStorage ';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    let loginAuth = useSessionStorage('loginAuth');  
    let isDesktop = useMediaQuery ('(min-width: 780px)');
    let navigate = useNavigate();
    
    const [cards, setCards] = useState([]);


    useEffect(() => {
        if (loginAuth !=='khaki') {
            navigate("/login")
          }
    }, []);

    // const fetchData = () => {
    //     fetch('http://localhost:4000/cards')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('data',data)
    //             setCards(data);
                
    //         })
    //         .catch(e => console.log(e.message));
    //         console.log('cards',cards)
    // };

    useEffect(() => {
        // fetchData();
    }, []);

  return (
    
    <section className="dashboard section">
        <div className="row">
            {/* <div className="col-lg-8"> */}
            <div className="col-lg-8">
                <div className="row">

                <div className='col-12'>
                    <RecentSales />
                </div>
                <div className='col-12'>
                    <TopSelling />
                </div>

                    {cards &&
                        cards.length > 0 &&
                        cards.map(card => <Card key={card._id} card={card} />)
                    }

                        
                        {/* <div className="col-lg-4"></div> */}
                        <div className= {isDesktop ? 'col-4' :'col-lg-4'} >
                            <Widget type="admin" />
                        </div>
                        <div className={isDesktop ? 'col-4' :'col-lg-4'}>
                            <Widget type="users" />
                        </div>
                        {/* <div className={isDesktop ? 'col-4' :'col-lg-4'}>
                            <Widget type="  fareCodes" />
                        </div>
                        <div className={isDesktop ? 'col-4' :'col-lg-4'}>
                            <Widget type="routes" />
                        </div>
                        <div className={isDesktop ? 'col-4' :'col-lg-4'}>
                            <Widget type="routeFares" />
                        </div>
                        <div className={isDesktop ? 'col-4' :'col-lg-4'}>
                            <Widget type="routeScheduling" />
                        </div>
                        <div className={isDesktop ? 'col-4' :'col-lg-4'}>
                            <Widget type="order" />
                        </div>
                        <div className={isDesktop ? 'col-4' :'col-lg-4'}>
                            <Widget type="earning" />
                        </div> */}
                        {/* <div className='col-4'>
                            <Widget type="balance" />
                        </div> */}
                        {/* <div className='col-12'>
                            <Reports />
                        </div> */}
                        
                </div>
            </div>
            <div className="col-lg-4">
                <RecentActivity />
                {/* <BudgetReport /> */}
                <OroBranches />
                <Featured />
            </div>
            <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
                    {/* <TicketList /> */}
                </div>
            </div>
        {/* </div> */}
    </section>
  );
}

export default Dashboard
