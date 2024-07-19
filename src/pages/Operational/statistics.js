import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'reactstrap';

const Statistics = ({ user }) => {
  // Deduplicate vouchers based on the 'party' property
  const uniqueVouchers = Array.from(new Map(user.map(voucher => [voucher.party, voucher])).values());
  // Deduplicate vouchers based on the 'items' property
  const allItems = user.flatMap(voucher => voucher.items);
  const uniqueItems = Array.from(new Map(allItems.map(item => [item.item, item])).values());
 // Deduplicate vouchers based on the 'broker' property
  const uniqueBrokers = Array.from(new Map(user.map(voucher => [voucher.broker, voucher])).values());
   // Deduplicate vouchers based on the 'stockGroup' property
  const uniqueGroups = Array.from(new Map(allItems.map(item => [item.stockGroup, item])).values());


  const mobileStyles = {
    fontSize: '0.5rem',
    whiteSpace: 'normal',
  };

  const isMobile = window.innerWidth <= 767.98;

  return (
    <React.Fragment>
      <div className="page-content" style={{paddingRight:'0px',paddingLeft:'0px'}}>
        <Container fluid style={{ marginTop: '-5rem',paddingRight:'0px',paddingLeft:'0px' ,marginRight:'10px'}}>
          <div className="table-responsive">
          <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Party Name</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Opening</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>In</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Out</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueVouchers.map((voucher, voucherIndex) => (
                  <tr key={voucherIndex}>
                    <th scope="row" style={isMobile ? mobileStyles : {}}>
                      <Link to="#" className="fw-medium" >{voucher.party}</Link>
                    </th>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Item Name</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Opening</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>In</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Out</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueItems.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <th style={isMobile ? mobileStyles : {}}>
                      <Link to="#" className="fw-medium">{item.item}</Link>
                    </th>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Broker Name</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Opening</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>In</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Out</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueBrokers.map((voucher, voucherIndex) => (
                  <tr key={voucherIndex}>
                    <th scope="row" style={isMobile ? mobileStyles : {}}>
                      <Link to="#" className="fw-medium" >{voucher.broker}</Link>
                    </th>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Group Name</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Opening</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>In</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Out</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Closing</th>
                </tr>
              </thead>
              <tbody>
              {uniqueGroups.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <th style={isMobile ? mobileStyles : {}}>
                      <Link to="#" className="fw-medium">{item.stockGroup}</Link>
                    </th>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                    <td style={isMobile ? mobileStyles : {}}>999</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Statistics;
