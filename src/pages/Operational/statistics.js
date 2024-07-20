import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'reactstrap';
import CountUp from "react-countup";

// Utility function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Statistics = ({ partyFilter, itemFilter, brokerFilter, groupFilter, selectedDates }) => {
  const [FromDate, ToDate] = Array.isArray(selectedDates) ? selectedDates : [null, null];
  const [openingCounts, setOpeningCounts] = useState({});
  const [inwardCounts, setInwardCounts] = useState({});
  const [outwardCounts, setOutwardCounts] = useState({});
  const [closingCounts, setClosingCounts] = useState({});
  const [openingCountsItem, setOpeningCountsItem] = useState({});
  const [inwardCountsItem, setInwardCountsItem] = useState({});
  const [outwardCountsItem, setOutwardCountsItem] = useState({});
  const [closingCountsItem, setClosingCountsItem] = useState({});
  const [openingCountsbroker, setOpeningCountsbroker] = useState({});
  const [inwardCountsbroker, setInwardCountsbroker] = useState({});
  const [outwardCountsbroker, setOutwardCountsbroker] = useState({});
  const [closingCountsbroker, setClosingCountsbroker] = useState({});
  const [openingCountsGroup, setOpeningCountsGroup] = useState({});
  const [inwardCountsGroup, setInwardCountsGroup] = useState({});
  const [outwardCountsGroup, setOutwardCountsGroup] = useState({});
  const [closingCountsGroup, setClosingCountsGroup] = useState({});

  useEffect(() => {
    const openingCounts = {};
    const inwardCounts = {};
    const outwardCounts = {};
    const closingCounts = {};

    partyFilter.forEach(voucher => {
      const formattedInTime = formatDate(voucher.gateWeightRecord.inTime);
      const formattedOutTime = formatDate(voucher.gateWeightRecord.outTime);
      const formattedFromDate = formatDate(FromDate);
      const formattedToDate = formatDate(ToDate);

      if (formattedInTime < formattedFromDate) {
        openingCounts[voucher.party] = (openingCounts[voucher.party] || 0) + 1;
      }

      if (formattedInTime >= formattedFromDate) {
        inwardCounts[voucher.party] = (inwardCounts[voucher.party] || 0) + 1;
      }

      if (formattedOutTime <= formattedToDate) {
        outwardCounts[voucher.party] = (outwardCounts[voucher.party] || 0) + 1;
      }
    });

    Object.keys(openingCounts).forEach(party => {
      closingCounts[party] = (openingCounts[party] || 0) + (inwardCounts[party] || 0) - (outwardCounts[party] || 0);
    });

    setOpeningCounts(openingCounts);
    setInwardCounts(inwardCounts);
    setOutwardCounts(outwardCounts);
    setClosingCounts(closingCounts);
  }, [partyFilter, FromDate, ToDate]);

  useEffect(() => {
    const openingCountsItem = {};
    const inwardCountsItem = {};
    const outwardCountsItem = {};
    const closingCountsItem = {};

    itemFilter.forEach(voucher => {
      voucher.items.forEach(item => {
        const formattedInTime = formatDate(voucher.gateWeightRecord.inTime);
        const formattedOutTime = formatDate(voucher.gateWeightRecord.outTime);
        const formattedFromDate = formatDate(FromDate);
        const formattedToDate = formatDate(ToDate);

        if (formattedInTime < formattedFromDate) {
          openingCountsItem[item.item] = (openingCountsItem[item.item] || 0) + 1;
        }

        if (formattedInTime >= formattedFromDate) {
          inwardCountsItem[item.item] = (inwardCountsItem[item.item] || 0) + 1;
        }

        if (formattedOutTime <= formattedToDate) {
          outwardCountsItem[item.item] = (outwardCountsItem[item.item] || 0) + 1;
        }
      });
    });

    Object.keys(openingCountsItem).forEach(item => {
      closingCountsItem[item] = (openingCountsItem[item] || 0) + (inwardCountsItem[item] || 0) - (outwardCountsItem[item] || 0);
    });

    setOpeningCountsItem(openingCountsItem);
    setInwardCountsItem(inwardCountsItem);
    setOutwardCountsItem(outwardCountsItem);
    setClosingCountsItem(closingCountsItem);
  }, [itemFilter, FromDate, ToDate]);

  useEffect(() => {
    const openingCountsbroker = {};
    const inwardCountsbroker = {};
    const outwardCountsbroker = {};
    const closingCountsbroker = {};

    brokerFilter.forEach(voucher => {
      const formattedInTime = formatDate(voucher.gateWeightRecord.inTime);
      const formattedOutTime = formatDate(voucher.gateWeightRecord.outTime);
      const formattedFromDate = formatDate(FromDate);
      const formattedToDate = formatDate(ToDate);

      if (formattedInTime < formattedFromDate) {
        openingCountsbroker[voucher.broker] = (openingCountsbroker[voucher.broker] || 0) + 1;
      }

      if (formattedInTime >= formattedFromDate) {
        inwardCountsbroker[voucher.broker] = (inwardCountsbroker[voucher.broker] || 0) + 1;
      }

      if (formattedOutTime <= formattedToDate) {
        outwardCountsbroker[voucher.broker] = (outwardCountsbroker[voucher.broker] || 0) + 1;
      }
    });

    Object.keys(openingCountsbroker).forEach(broker => {
      closingCountsbroker[broker] = (openingCountsbroker[broker] || 0) + (inwardCountsbroker[broker] || 0) - (outwardCountsbroker[broker] || 0);
    });

    setOpeningCountsbroker(openingCountsbroker);
    setInwardCountsbroker(inwardCountsbroker);
    setOutwardCountsbroker(outwardCountsbroker);
    setClosingCountsbroker(closingCountsbroker);
  }, [brokerFilter, FromDate, ToDate]);

  useEffect(() => {
    const openingCountsGroup = {};
    const inwardCountsGroup = {};
    const outwardCountsGroup = {};
    const closingCountsGroup = {};

    groupFilter.forEach(voucher => {
      voucher.items.forEach(item => {
        const formattedInTime = formatDate(voucher.gateWeightRecord.inTime);
        const formattedOutTime = formatDate(voucher.gateWeightRecord.outTime);
        const formattedFromDate = formatDate(FromDate);
        const formattedToDate = formatDate(ToDate);

        if (formattedInTime < formattedFromDate) {
          openingCountsGroup[item.stockGroup] = (openingCountsGroup[item.stockGroup] || 0) + 1;
        }

        if (formattedInTime >= formattedFromDate) {
          inwardCountsGroup[item.stockGroup] = (inwardCountsGroup[item.stockGroup] || 0) + 1;
        }

        if (formattedOutTime <= formattedToDate) {
          outwardCountsGroup[item.stockGroup] = (outwardCountsGroup[item.stockGroup] || 0) + 1;
        }
      });
    });

    Object.keys(openingCountsGroup).forEach(group => {
      closingCountsGroup[group] = (openingCountsGroup[group] || 0) + (inwardCountsGroup[group] || 0) - (outwardCountsGroup[group] || 0);
    });

    setOpeningCountsGroup(openingCountsGroup);
    setInwardCountsGroup(inwardCountsGroup);
    setOutwardCountsGroup(outwardCountsGroup);
    setClosingCountsGroup(closingCountsGroup);
  }, [groupFilter, FromDate, ToDate]);


  const uniqueParties = Array.isArray(partyFilter) ? Array.from(new Map(partyFilter.map(voucher => [voucher.party, voucher])).values()) : [];
  const uniqueItems = Array.isArray(itemFilter) ? Array.from(new Map(itemFilter.flatMap(voucher => voucher.items).map(item => [item.item, item])).values()) : [];
  const uniqueBrokers = Array.isArray(brokerFilter) ? Array.from(new Map(brokerFilter.map(voucher => [voucher.broker, voucher])).values()) : [];
  const uniqueGroups = Array.isArray(groupFilter) ? Array.from(new Map(groupFilter.flatMap(voucher => voucher.items).map(item => [item.stockGroup, item])).values()) : [];

  const mobileStyles = {
    fontSize: '0.5rem',
    whiteSpace: 'normal',
  };

  const isMobile = window.innerWidth <= 767.98;

  return (
    <React.Fragment>
      <div className="page-content" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
        <Container fluid style={{ marginTop: '-5rem', paddingRight: '0px', paddingLeft: '0px', marginRight: '10px' }}>
          <div className="table-responsive">
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Party Name</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Opening</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Inward</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Outward</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueParties.length > 0 ? (
                  uniqueParties.map((voucher, voucherIndex) => (
                    <tr key={voucherIndex}>
                      <th scope="row" style={isMobile ? mobileStyles : {}}>
                        <Link to="#" className="fw-medium">{voucher.party}</Link>
                      </th>
                      <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={openingCounts[voucher.party] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={inwardCounts[voucher.party] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={outwardCounts[voucher.party] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={closingCounts[voucher.party] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No parties Selected.</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Item Name</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Opening</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Inward</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Outward</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueItems.length > 0 ? (
                  uniqueItems.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <th style={isMobile ? mobileStyles : {}}>
                        <Link to="#" className="fw-medium">{item.item}</Link>
                      </th>
                      <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={openingCountsItem[item.item] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={inwardCountsItem[item.item] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={outwardCountsItem[item.item] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={closingCountsItem[item.item] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No items Selected.</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Broker Name</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Opening</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Inward</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Outward</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueBrokers.length > 0 ? (
                  uniqueBrokers.map((voucher, voucherIndex) => (
                    <tr key={voucherIndex}>
                      <th scope="row" style={isMobile ? mobileStyles : {}}>
                        <Link to="#" className="fw-medium">{voucher.broker}</Link>
                      </th>
                      <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={openingCountsbroker[voucher.broker] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={inwardCountsbroker[voucher.broker] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={outwardCountsbroker[voucher.broker] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={closingCountsbroker[voucher.broker] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No brokers Selected.</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Table className="align-middle table-nowrap mb-4" style={{ backgroundColor: '#ffffff' }}>
              <thead>
                <tr>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Group Name</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Opening</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Inward</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Outward</th>
                  <th scope="col" style={isMobile ? mobileStyles : {}}>Closing</th>
                </tr>
              </thead>
              <tbody>
                {uniqueGroups.length > 0 ? (
                  uniqueGroups.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <th style={isMobile ? mobileStyles : {}}>
                        <Link to="#" className="fw-medium">{item.stockGroup}</Link>
                      </th>
                      <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={openingCountsGroup[item.stockGroup] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={inwardCountsGroup[item.stockGroup] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={outwardCountsGroup[item.stockGroup] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                        <td style={isMobile ? mobileStyles : {}}> 
                        <CountUp
                          start={0}
                          end={closingCountsGroup[item.stockGroup] || 0}
                          separator=","
                          duration={4}
                        />
                        </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No groups Selected.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Statistics;
