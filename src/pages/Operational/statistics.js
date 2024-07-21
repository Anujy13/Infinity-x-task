import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

// Utility function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Statistics = ({ partyFilter, itemFilter, brokerFilter, groupFilter, selectedDates, user }) => {
  const [FromDate, ToDate] = Array.isArray(selectedDates) ? selectedDates : [null, null];
  const [openingCounts, setOpeningCounts] = useState({});
  const [inwardCounts, setInwardCounts] = useState({});
  const [outwardCounts, setOutwardCounts] = useState({});
  const [closingCounts, setClosingCounts] = useState({});
  const [openingCountsItem, setOpeningCountsItem] = useState({});
  const [inwardCountsItem, setInwardCountsItem] = useState({});
  const [outwardCountsItem, setOutwardCountsItem] = useState({});
  const [closingCountsItem, setClosingCountsItem] = useState({});
  const [openingCountsBroker, setOpeningCountsBroker] = useState({});
  const [inwardCountsBroker, setInwardCountsBroker] = useState({});
  const [outwardCountsBroker, setOutwardCountsBroker] = useState({});
  const [closingCountsBroker, setClosingCountsBroker] = useState({});
  const [openingCountsGroup, setOpeningCountsGroup] = useState({});
  const [inwardCountsGroup, setInwardCountsGroup] = useState({});
  const [outwardCountsGroup, setOutwardCountsGroup] = useState({});
  const [closingCountsGroup, setClosingCountsGroup] = useState({});
  const [mobileFontSize, setMobileFontSize] = useState('15px');
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const counts = {
      opening: {},
      inward: {},
      outward: {},
      closing: {},
    };

    partyFilter.forEach(voucher => {
      const formattedInTime = formatDate(voucher.gateWeightRecord.inTime);
      const formattedOutTime = formatDate(voucher.gateWeightRecord.outTime);
      const formattedFromDate = formatDate(FromDate);
      const formattedToDate = formatDate(ToDate);

      if (formattedInTime < formattedFromDate) {
        counts.opening[voucher.party] = (counts.opening[voucher.party] || 0) + 1;
      }

      if (formattedInTime >= formattedFromDate) {
        counts.inward[voucher.party] = (counts.inward[voucher.party] || 0) + 1;
      }

      if (formattedOutTime <= formattedToDate) {
        counts.outward[voucher.party] = (counts.outward[voucher.party] || 0) + 1;
      }
    });

    Object.keys(counts.opening).forEach(party => {
      counts.closing[party] = (counts.opening[party] || 0) + (counts.inward[party] || 0) - (counts.outward[party] || 0);
    });

    setOpeningCounts(counts.opening);
    setInwardCounts(counts.inward);
    setOutwardCounts(counts.outward);
    setClosingCounts(counts.closing);
  }, [partyFilter, FromDate, ToDate]);

  useEffect(() => {
    const counts = {
      opening: {},
      inward: {},
      outward: {},
      closing: {},
    };

    itemFilter.forEach(voucher => {
      voucher.items.forEach(item => {
        const formattedInTime = formatDate(voucher.gateWeightRecord.inTime);
        const formattedOutTime = formatDate(voucher.gateWeightRecord.outTime);
        const formattedFromDate = formatDate(FromDate);
        const formattedToDate = formatDate(ToDate);

        if (formattedInTime < formattedFromDate) {
          counts.opening[item.item] = (counts.opening[item.item] || 0) + 1;
        }

        if (formattedInTime >= formattedFromDate) {
          counts.inward[item.item] = (counts.inward[item.item] || 0) + 1;
        }

        if (formattedOutTime <= formattedToDate) {
          counts.outward[item.item] = (counts.outward[item.item] || 0) + 1;
        }
      });
    });

    Object.keys(counts.opening).forEach(item => {
      counts.closing[item] = (counts.opening[item] || 0) + (counts.inward[item] || 0) - (counts.outward[item] || 0);
    });

    setOpeningCountsItem(counts.opening);
    setInwardCountsItem(counts.inward);
    setOutwardCountsItem(counts.outward);
    setClosingCountsItem(counts.closing);
  }, [itemFilter, FromDate, ToDate]);

  useEffect(() => {
    const counts = {
      opening: {},
      inward: {},
      outward: {},
      closing: {},
    };

    brokerFilter.forEach(voucher => {
      const formattedInTime = formatDate(voucher.gateWeightRecord.inTime);
      const formattedOutTime = formatDate(voucher.gateWeightRecord.outTime);
      const formattedFromDate = formatDate(FromDate);
      const formattedToDate = formatDate(ToDate);

      if (formattedInTime < formattedFromDate) {
        counts.opening[voucher.broker] = (counts.opening[voucher.broker] || 0) + 1;
      }

      if (formattedInTime >= formattedFromDate) {
        counts.inward[voucher.broker] = (counts.inward[voucher.broker] || 0) + 1;
      }

      if (formattedOutTime <= formattedToDate) {
        counts.outward[voucher.broker] = (counts.outward[voucher.broker] || 0) + 1;
      }
    });

    Object.keys(counts.opening).forEach(broker => {
      counts.closing[broker] = (counts.opening[broker] || 0) + (counts.inward[broker] || 0) - (counts.outward[broker] || 0);
    });

    setOpeningCountsBroker(counts.opening);
    setInwardCountsBroker(counts.inward);
    setOutwardCountsBroker(counts.outward);
    setClosingCountsBroker(counts.closing);
  }, [brokerFilter, FromDate, ToDate]);

  useEffect(() => {
    const counts = {
      opening: {},
      inward: {},
      outward: {},
      closing: {},
    };

    groupFilter.forEach(voucher => {
      voucher.items.forEach(item => {
        const formattedInTime = formatDate(voucher.gateWeightRecord.inTime);
        const formattedOutTime = formatDate(voucher.gateWeightRecord.outTime);
        const formattedFromDate = formatDate(FromDate);
        const formattedToDate = formatDate(ToDate);

        if (formattedInTime < formattedFromDate) {
          counts.opening[item.stockGroup] = (counts.opening[item.stockGroup] || 0) + 1;
        }

        if (formattedInTime >= formattedFromDate) {
          counts.inward[item.stockGroup] = (counts.inward[item.stockGroup] || 0) + 1;
        }

        if (formattedOutTime <= formattedToDate) {
          counts.outward[item.stockGroup] = (counts.outward[item.stockGroup] || 0) + 1;
        }
      });
    });

    Object.keys(counts.opening).forEach(group => {
      counts.closing[group] = (counts.opening[group] || 0) + (counts.inward[group] || 0) - (counts.outward[group] || 0);
    });

    setOpeningCountsGroup(counts.opening);
    setInwardCountsGroup(counts.inward);
    setOutwardCountsGroup(counts.outward);
    setClosingCountsGroup(counts.closing);
  }, [groupFilter, FromDate, ToDate]);

  const uniqueParties = Array.isArray(partyFilter) ? Array.from(new Map(partyFilter.map(voucher => [voucher.party, voucher])).values()) : [];
  const uniqueItems = Array.isArray(itemFilter) ? Array.from(new Map(itemFilter.flatMap(voucher => voucher.items).map(item => [item.item, item])).values()) : [];
  const uniqueBrokers = Array.isArray(brokerFilter) ? Array.from(new Map(brokerFilter.map(voucher => [voucher.broker, voucher])).values()) : [];
  const uniqueGroups = Array.isArray(groupFilter) ? Array.from(new Map(groupFilter.flatMap(voucher => voucher.items).map(item => [item.stockGroup, item])).values()) : [];

  // Sorting uniqueParties and uniqueItems in alphabetical order by name
  uniqueParties.sort((a, b) => a.party.localeCompare(b.party));
  uniqueItems.sort((a, b) => a.item.localeCompare(b.item));
  uniqueBrokers.sort((a, b) => a.broker.localeCompare(b.broker));
  uniqueGroups.sort((a, b) => a.stockGroup.localeCompare(b.stockGroup));

  const mobileStyles = {
    fontSize: '0.5rem',
    whiteSpace: 'normal',
  };
  const isMobile = window.innerWidth <= 767.98;

  useEffect(() => {
    // Function to update font size based on window width
    const updateFontSize = () => {
      if (window.innerWidth <= 767) {
        setMobileFontSize('10px');
      } else {
        setMobileFontSize('15px');
      }
    };

    // Initial font size setting
    updateFontSize();

    // Add event listener for window resize
    window.addEventListener('resize', updateFontSize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  const getFontSize = () => (window.innerWidth <= 767 ? '11px' : '13px');

  const toggleRow = (id) => {
    setExpandedRows(prevState => 
      prevState.includes(id) 
        ? prevState.filter(row => row !== id) 
        : [...prevState, id]
    );
  };

  const calculateTotals = (counts) => {
    return counts.reduce((totals, item) => {
      totals.opening += item.opening || 0;
      totals.inward += item.inward || 0;
      totals.outward += item.outward || 0;
      totals.closing += item.closing || 0;
      return totals;
    }, { opening: 0, inward: 0, outward: 0, closing: 0 });
  };

  const partyTotals = calculateTotals(uniqueParties.map(voucher => ({
    opening: openingCounts[voucher.party],
    inward: inwardCounts[voucher.party],
    outward: outwardCounts[voucher.party],
    closing: closingCounts[voucher.party],
  })));

  const itemTotals = calculateTotals(uniqueItems.map(item => ({
    opening: openingCountsItem[item.item],
    inward: inwardCountsItem[item.item],
    outward: outwardCountsItem[item.item],
    closing: closingCountsItem[item.item],
  })));

  const brokerTotals = calculateTotals(uniqueBrokers.map(voucher => ({
    opening: openingCountsBroker[voucher.broker],
    inward: inwardCountsBroker[voucher.broker],
    outward: outwardCountsBroker[voucher.broker],
    closing: closingCountsBroker[voucher.broker],
  })));

  const groupsTotals = calculateTotals(uniqueGroups.map(item => ({
    opening: openingCountsGroup[item.stockGroup],
    inward: inwardCountsGroup[item.stockGroup],
    outward: outwardCountsGroup[item.stockGroup],
    closing: closingCountsGroup[item.stockGroup],
  })));

  return (
    <div className="page-content" style={{ paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', marginBottom: '0' }}>
      <Container fluid style={{ marginTop: '-4rem', paddingLeft: '0px', paddingRight: '0px' }}>
        <Row className="mb-3">
          {uniqueParties.length > 0 ? (
            <Col xl={12} lg={12}>
              <Card className="product cursor-pointer ribbon-box border shadow-none mb-1 right" xl={12} lg={12} md={12} style={{ marginTop: '0rem', marginLeft: '0rem' }}>
                <CardBody style={{ paddingTop: "0px" }}>
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap align-middle table-sm mb-0">
                      <thead className="table-light text-muted">
                        <tr>
                          <th scope="col">Party Name</th>
                          <th scope="col" style={{ textAlign: 'center' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uniqueParties.map((voucher, voucherIndex) => (
                          <React.Fragment key={voucherIndex}>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="me-2 mb-2" onClick={() => toggleRow(voucher.party)} style={{ cursor: 'pointer' }}>
                                    {expandedRows.includes(voucher.party) ? (
                                      <RiSubtractLine size={16} />
                                    ) : (
                                      <RiAddLine size={16} />
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <h5 style={{ fontSize: getFontSize() }}>
                                      {voucher.party}
                                    </h5>
                                    <p className="text-muted mb-0">
                                      {/* Quantity and unit if needed */}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="fw-medium" style={{ textAlign: 'center' }}>
                                  {(
                                    (openingCounts[voucher.party] || 0) +
                                    (inwardCounts[voucher.party] || 0) +
                                    (outwardCounts[voucher.party] || 0) +
                                    (closingCounts[voucher.party] || 0)
                                  ).toLocaleString()}
                                </td>
                            </tr>
                            {expandedRows.includes(voucher.party) && (
                              <>
                                <tr>
                                <td>
                                  Opening
                                </td>
                                <td  style={{ textAlign: 'center' }}>{openingCounts[voucher.party] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>In</td>
                                <td  style={{ textAlign: 'center' }}>{inwardCounts[voucher.party] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>Out</td>
                                <td  style={{ textAlign: 'center' }}>{outwardCounts[voucher.party] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>Closing</td>
                                <td  style={{ textAlign: 'center' }}>{closingCounts[voucher.party] || 0}
                                </td>
                              </tr>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-top border-top-dashed">
                          <th scope="row">Total Entries:(As per all Parties)</th>
                          <th style={{ textAlign: 'center' }}>{(partyTotals.opening + partyTotals.inward + partyTotals.outward + partyTotals.closing).toFixed(2)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ) : (
            <p>No data available for the selected filters.</p>
          )}

          {uniqueItems.length > 0 ? (
            <Col xl={12} lg={12}>
              <Card className="product cursor-pointer ribbon-box border shadow-none mb-1 right" xl={12} lg={12} md={12} style={{ marginTop: '0rem', marginLeft: '0rem' }}>
                <CardBody>
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap align-middle table-sm mb-0">
                      <thead className="table-light text-muted">
                        <tr>
                          <th scope="col">Item Name</th>
                          <th scope="col" style={{ textAlign: 'center' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uniqueItems.map((item, itemIndex) => (
                          <React.Fragment key={itemIndex}>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="me-2 mb-2" onClick={() => toggleRow(item.item)} style={{ cursor: 'pointer' }}>
                                    {expandedRows.includes(item.item) ? (
                                      <RiSubtractLine size={16} />
                                    ) : (
                                      <RiAddLine size={16} />
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <h5 style={{ fontSize: getFontSize() }}>
                                      {item.item}
                                    </h5>
                                    <p className="text-muted mb-0">
                                      {/* Quantity and unit if needed */}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="fw-medium" style={{ textAlign: 'center' }}>
                                  {(
                                    (openingCountsItem[item.item] || 0) +
                                    (inwardCountsItem[item.item] || 0) +
                                    (outwardCountsItem[item.item] || 0) +
                                    (closingCountsItem[item.item] || 0)
                                  ).toLocaleString()}
                                </td>
                            </tr>
                            {expandedRows.includes(item.item) && (
                              <>
                                <tr>
                                <td>
                                  Opening
                                </td>
                                <td  style={{ textAlign: 'center' }}>{openingCountsItem[item.item] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>In</td>
                                <td  style={{ textAlign: 'center' }}>{inwardCountsItem[item.item] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>Out</td>
                                <td  style={{ textAlign: 'center' }}>{outwardCountsItem[item.item] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>Closing</td>
                                <td  style={{ textAlign: 'center' }}>{closingCountsItem[item.item] || 0}
                                </td>
                              </tr>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                      <tfoot>
                                                <tr className="border-top border-top-dashed">
                          <th scope="row">Total Entries:(As per all Items)</th>
                          <th style={{ textAlign: 'center' }}>{(itemTotals.opening + itemTotals.inward + itemTotals.outward + itemTotals.closing).toFixed(2)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ) : (
            <p>No data available for the selected filters.</p>
          )}

          {uniqueBrokers.length > 0 ? (
            <Col xl={12} lg={12}>
              <Card className="product cursor-pointer ribbon-box border shadow-none mb-1 right" xl={12} lg={12} md={12} style={{ marginTop: '0rem', marginLeft: '0rem' }}>
                <CardBody>
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap align-middle table-sm mb-0">
                      <thead className="table-light text-muted">
                        <tr>
                          <th scope="col">Broker Name</th>
                          <th scope="col" style={{ textAlign: 'center' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uniqueBrokers.map((voucher, voucherIndex) => (
                          <React.Fragment key={voucherIndex}>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="me-2 mb-2" onClick={() => toggleRow(voucher.broker)} style={{ cursor: 'pointer' }}>
                                    {expandedRows.includes(voucher.broker) ? (
                                      <RiSubtractLine size={16} />
                                    ) : (
                                      <RiAddLine size={16} />
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <h5 style={{ fontSize: getFontSize() }}>
                                      {voucher.broker}
                                    </h5>
                                    <p className="text-muted mb-0">
                                      {/* Quantity and unit if needed */}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="fw-medium" style={{ textAlign: 'center' }}>
                                  {(
                                    (openingCountsBroker[voucher.broker] || 0) +
                                    (inwardCountsBroker[voucher.broker] || 0) +
                                    (outwardCountsBroker[voucher.broker] || 0) +
                                    (closingCountsBroker[voucher.broker] || 0)
                                  ).toLocaleString()}
                                </td>
                            </tr>
                            {expandedRows.includes(voucher.broker) && (
                              <>
                                <tr>
                                <td>
                                  Opening
                                </td>
                                <td  style={{ textAlign: 'center' }}>{openingCountsBroker[voucher.broker] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>In</td>
                                <td  style={{ textAlign: 'center' }}>{inwardCountsBroker[voucher.broker] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>Out</td>
                                <td  style={{ textAlign: 'center' }}>{outwardCountsBroker[voucher.broker] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>Closing</td>
                                <td  style={{ textAlign: 'center' }}>{closingCountsBroker[voucher.broker] || 0}
                                </td>
                              </tr>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-top border-top-dashed">
                          <th scope="row">Total Entries:(As per all Brokers)</th>
                          <th style={{ textAlign: 'center' }}>{(brokerTotals.opening + brokerTotals.inward + brokerTotals.outward + brokerTotals.closing).toFixed(2)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ) : (
            <p>No data available for the selected filters.</p>
          )}

{uniqueGroups.length > 0 ? (
            <Col xl={12} lg={12}>
              <Card className="product cursor-pointer ribbon-box border shadow-none mb-1 right" xl={12} lg={12} md={12} style={{ marginTop: '0rem', marginLeft: '0rem' }}>
                <CardBody>
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap align-middle table-sm mb-0">
                      <thead className="table-light text-muted">
                        <tr>
                          <th scope="col">Group Name</th>
                          <th scope="col" style={{ textAlign: 'center' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uniqueGroups.map((item, itemIndex) => (
                          <React.Fragment key={itemIndex}>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="me-2 mb-2" onClick={() => toggleRow(item.stockGroup)} style={{ cursor: 'pointer' }}>
                                    {expandedRows.includes(item.stockGroup) ? (
                                      <RiSubtractLine size={16} />
                                    ) : (
                                      <RiAddLine size={16} />
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <h5 style={{ fontSize: getFontSize() }}>
                                      {item.stockGroup}
                                    </h5>
                                    <p className="text-muted mb-0">
                                      {/* Quantity and unit if needed */}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="fw-medium" style={{ textAlign: 'center' }}>
                                  {(
                                    (openingCountsGroup[item.stockGroup] || 0) +
                                    (inwardCountsGroup[item.stockGroup] || 0) +
                                    (outwardCountsGroup[item.stockGroup] || 0) +
                                    (closingCountsGroup[item.stockGroup] || 0)
                                  ).toLocaleString()}
                                </td>
                            </tr>
                            {expandedRows.includes(item.stockGroup) && (
                              <>
                                <tr>
                                <td>
                                  Opening
                                </td>
                                <td  style={{ textAlign: 'center' }}>{openingCountsGroup[item.stockGroup] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>In</td>
                                <td  style={{ textAlign: 'center' }}>{inwardCountsGroup[item.stockGroup] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>Out</td>
                                <td  style={{ textAlign: 'center' }}>{outwardCountsGroup[item.stockGroup] || 0}
                                </td>
                              </tr>
                              <tr>
                                <td>Closing</td>
                                <td  style={{ textAlign: 'center' }}>{closingCountsGroup[item.stockGroup] || 0}
                                </td>
                              </tr>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                      <tfoot>
                                                <tr className="border-top border-top-dashed">
                          <th scope="row">Total Entries:(As per all Groups)</th>
                          <th style={{ textAlign: 'center' }}>{(brokerTotals.opening + brokerTotals.inward + brokerTotals.outward + brokerTotals.closing).toFixed(2)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ) : (
            <p>No data available for the selected filters.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Statistics;