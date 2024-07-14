import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'reactstrap';

const Statistics = ({ user }) => {
  // Deduplicate vouchers based on the 'party' property
  const uniqueVouchers = Array.from(new Map(user.map(voucher => [voucher.party, voucher])).values());

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid style={{ marginTop: '-5rem' }}>
          <div className="table-responsive">
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
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
                {uniqueVouchers.map((voucher, voucherIndex) => (
                  <tr key={voucherIndex}>
                    <th scope="row"><Link to="#" className="fw-medium">{voucher.party}</Link></th>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Opening</th>
                  <th scope="col">In</th>
                  <th scope="col">Out</th>
                  <th scope="col">Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueVouchers.map((voucher, voucherIndex) => (
                  <tr key={voucherIndex}>
                    <th scope="row"><Link to="#" className="fw-medium">{voucher.party}</Link></th>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col">Agent Name</th>
                  <th scope="col">Opening</th>
                  <th scope="col">In</th>
                  <th scope="col">Out</th>
                  <th scope="col">Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueVouchers.map((voucher, voucherIndex) => (
                  <tr key={voucherIndex}>
                    <th scope="row"><Link to="#" className="fw-medium">{voucher.party}</Link></th>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col">Group Name</th>
                  <th scope="col">Opening</th>
                  <th scope="col">In</th>
                  <th scope="col">Out</th>
                  <th scope="col">Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueVouchers.map((voucher, voucherIndex) => (
                  <tr key={voucherIndex}>
                    <th scope="row"><Link to="#" className="fw-medium">{voucher.party}</Link></th>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
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
