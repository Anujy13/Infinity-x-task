import React, { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import CountUp from "react-countup";
import { fetchDashboardData } from '../../slices/thunks';
import { createSelector } from "reselect";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import FinishedProducts from '../FinishedProducts';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';
import {Table} from 'reactstrap';
const Statistics = () => {
    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid style={{marginTop:'-5rem'}}>
            <div className="table-responsive">
<Table className="align-middle table-nowrap mb-0" style={{ backgroundColor: '#ffffff' }}>
    <thead>
        <tr>
            <th scope="col">Party Name</th>
            <th scope="col">Opening</th>
            <th scope="col">In</th>
            <th scope="col">Out</th>
            <th scope="col">Closing</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row"><Link to="#" className="fw-medium">#VZ2110</Link></th>
            <td>Bobby Davis</td>
            <td>October 15, 2021</td>
            <td>$2,300</td>
            <td><Link to="#" className="link-success">View More <i className="ri-arrow-right-line align-middle"></i></Link></td>
        </tr>
        <tr>
            <th scope="row"><Link to="#" className="fw-medium">#VZ2109</Link></th>
            <td>Christopher Neal</td>
            <td>October 7, 2021</td>
            <td>$5,500</td>
            <td><Link to="#" className="link-success">View More <i className="ri-arrow-right-line align-middle"></i></Link></td>
        </tr>
        <tr>
            <th scope="row"><Link to="#" className="fw-medium">#VZ2108</Link></th>
            <td>Monkey Karry</td>
            <td>October 5, 2021</td>
            <td>$2,420</td>
            <td><Link to="#" className="link-success">View More <i className="ri-arrow-right-line align-middle"></i></Link></td>
        </tr>
        <tr>
            <th scope="row"><Link to="#" className="fw-medium">#VZ2107</Link></th>
            <td>James White</td>
            <td>October 2, 2021</td>
            <td>$7,452</td>
            <td><Link to="#" className="link-success">View More <i className="ri-arrow-right-line align-middle"></i></Link></td>
        </tr>
    </tbody>
</Table>
</div>
                </Container>
        </div>
    </React.Fragment>
    );
  };

export default Statistics;
