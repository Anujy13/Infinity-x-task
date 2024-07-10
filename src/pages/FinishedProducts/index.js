import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Collapse, Col, Container, Row, Card, CardBody, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { fetchFinishedProductsData } from "../../slices/thunks";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const FinishedProducts = () => {
  const dispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState([]);
  const [expandedGate, setExpandedGate] = useState([]);
  const [expandedWeightment, setExpandedWeightment] = useState([]);
  const navigate = useNavigate();

  // Fetching data and handling loading and error states
  useEffect(() => {
    dispatch(fetchFinishedProductsData());
  }, [dispatch]);

  // Selecting data from Redux state using selectors
  const selectFinishedProductsState = (state) => state.FinishedProducts;
  const selectFinishedProductsData = createSelector(
    selectFinishedProductsState,
    (state) => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
    })
  );

  const { user, loading, error } = useSelector(selectFinishedProductsData);

  // Handle functions to expand/collapse sections
  const handleExpandItem = (e, index) => {
    e.stopPropagation();
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const handleExpandGate = (e, index) => {
    e.stopPropagation();
    if (expandedGate.includes(index)) {
      setExpandedGate(expandedGate.filter((item) => item !== index));
    } else {
      setExpandedGate([...expandedGate, index]);
    }
  };

  const handleExpandWeightment = (e, index) => {
    e.stopPropagation();
    if (expandedWeightment.includes(index)) {
      setExpandedWeightment(expandedWeightment.filter((item) => item !== index));
    } else {
      setExpandedWeightment([...expandedWeightment, index]);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return moment(dateTime).format('ddd, DD MMM YYYY - hh:mmA');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  };

  const parseGateDisplayTime = (gateDisplay) => {
    const hoursMatch = gateDisplay.match(/(\d+)\s*Hours?/i);
    const minutesMatch = gateDisplay.match(/(\d+)\s*Mins?/i);

    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  const setVoucherDetailsToLocalStorage = (voucher) => {
    localStorage.setItem("NetWeight", JSON.stringify(voucher.gateWeightRecord.netWeight));
    localStorage.setItem("NetGateTime", JSON.stringify(voucher.gateWeightRecord.netGateTime));
    localStorage.setItem("Items", JSON.stringify(voucher.items.map(item => item.item)));
    localStorage.setItem("Quantity", JSON.stringify(voucher.items.map(item => item.quantity)));
    localStorage.setItem("Unit", JSON.stringify(voucher.items.map(item => item.unit)));
    localStorage.setItem("Party", JSON.stringify(voucher.party));
    localStorage.setItem("VehicleNumber", JSON.stringify(voucher.vehicleNumber));
    localStorage.setItem("VoucherDate", JSON.stringify(voucher.voucherDate));
    localStorage.setItem("VoucherDetails", JSON.stringify(voucher));
  };
  // const getGateStatus = (voucher) => {
  //   const minDate = new Date('0001-01-01T00:00:00');
  //   const inTime = new Date(voucher.gateWeightRecord.inTime);
  //   const outTime = new Date(voucher.gateWeightRecord.outTime);

  //   if (inTime > minDate && outTime > minDate) {
  //     return `Total Time : ${voucher.gateWeightRecord.netGateTime}`;
  //   } else if (inTime > minDate) {
  //     return "Gate-In Done";
  //   } else {
  //     return "Gate-In Pending";
  //   }
  // };

  // const getBridgeStatus = (voucher) => {
  //   const minDate = new Date('0001-01-01T00:00:00');
  //   const GrossTime = new Date(voucher.gateWeightRecord.grossTime);
  //   const TareTime = new Date(voucher.gateWeightRecord.tareTime);

  //   if (GrossTime > minDate && TareTime > minDate) {
  //     return `Net Time @ ${voucher.gateWeightRecord.netWeight} ${voucher.items[0].unit} | ${voucher.gateWeightRecord.netWeightTime}`;
  //   } else if (GrossTime > minDate) {
  //     return `Gross Time @ ${voucher.gateWeightRecord.grossWeight} ${voucher.items[0].unit}`;
  //   } else {
  //     return "W/B Pending";
  //   }
  // };

  
  useEffect(() => {
    if (Array.isArray(user)) {
      user.forEach(voucher => setVoucherDetailsToLocalStorage(voucher));
    }
  }, [user]);


  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Security Gate/Finished Products" pageTitle="Infinity X" />
        <Row className="mb-3">
          <Col xl={8}>

            {Array.isArray(user) ? (
              user.map((voucher, voucherIndex) => (
                <Card key={voucherIndex} className="product cursor-pointer  ribbon-box border shadow-none mb-lg-0 right mt-2" onClick={() => navigate('/voucher-num')}>
                  <CardBody  className="text-muted">
                  <div className="ribbon-two ribbon-two-info">
  <span style={{ fontSize: voucher.status && voucher.status.length > 7 ? '9px' : '13px' }}>
    {voucher.status}
  </span>
</div>
                    <Row className="gy-3">
                      <Col sm={8}>
                        <h5 className="fs-14 text-truncate text-wrap w-100">
                          <span className="text-body">
                            {voucher.party}
                          </span>
                        </h5>
                        <ul className="list-inline text-muted mb-1 mb-md-3">
                          <li className="list-inline-item">
                            <span className="fw-medium">
                              {voucher.vehicleNumber}
                            </span>
                          </li>
                        </ul>
                      </Col>
                      <Col sm={3} className="text-lg-end mb-1.5 mt-sm-0">
                        <p className="text-muted mb-1"></p>
                        <h5 className="fs-14 mt-md-3 mt-sm-0">
                          <span className="product-price">
                            {voucher.voucherNumber} | {formatDate(voucher.voucherDate)}
                          </span>
                        </h5>
                      </Col>
                    </Row>

                    <Row className="gy-3">
                      <Col sm={12}>
                        <div className="d-flex flex-row">
                          <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-1 mb-sm-0">
                            <span className="text-body">
                              {voucher.items[0].sequence}. {voucher.items[0].item}
                            </span>
                          </h5>
                          <ul className="list-inline text-muted mb-0 d-flex">
                            <li className="list-inline-item me-2">
                              <span className="fw-medium">
                                {voucher.items[0].quantity} {voucher.items[0].unit}
                              </span>
                            </li>
                            <li className="list-inline-item">
                              <span className="fw-medium">
                                {voucher.items[0].exclusiveRate}
                              </span>
                            </li>
                          </ul>
                        </div>

                        {!expandedItems.includes(voucherIndex) ? (
                          <div
                            style={{ marginLeft: "1rem", cursor: "pointer", color: 'red' }}
                            onClick={(e) => handleExpandItem(e, voucherIndex)}
                          >
                            +{voucher.items.length - 1} more items
                          </div>
                        ) : (
                          <Collapse isOpen={expandedItems.includes(voucherIndex)} className="mt-2">
                            {voucher.items.slice(1).map((item, itemIndex) => (
                              <div className="d-flex flex-row" key={itemIndex}>
                                <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-1 mb-sm-0">
                                  <span className="text-body">
                                    {item.sequence}. {item.item}
                                  </span>
                                </h5>
                                <ul className="list-inline text-muted mb-0 d-flex">
                                  <li className="list-inline-item me-2">
                                    <span className="fw-medium">
                                      {item.quantity} {item.unit}
                                    </span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span className="fw-medium">
                                      {item.exclusiveRate}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            ))}
                            <div
                              style={{ marginLeft: "1rem", cursor: "pointer", color: 'red' }}
                              onClick={(e) => handleExpandItem(e, voucherIndex)}
                            >
                              Less items
                            </div>
                          </Collapse>
                        )}

                        <div className="mt-3 mt-sm-0">
                          <Button
                            type="button"
                            className="btn btn-link p-1"
                            onClick={(e) => handleExpandGate(e, voucherIndex)}
                            style={{
                              fontSize: "1rem",
                              lineHeight: "1",
                              textShadow: "none",
                              boxShadow: "none",
                              backgroundColor: 'white',
                              border: 'none',
                            }}
                          >
                            {expandedGate.includes(voucherIndex) ? "-" : "+"}
                          </Button>
                          <span className="ms-2">Gate</span>
                          <span className="text-danger ms-2">{(voucher.gateWeightRecord.gateDisplay)}</span>
                          <Collapse isOpen={expandedGate.includes(voucherIndex)}>
                            <div className="ms-4">
                              <p style={{ marginBottom: "0.25rem" }}>In-Time: {formatDateTime(voucher.gateWeightRecord.inTime)}</p>
                              <p style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}>Out-Time: {formatDateTime(voucher.gateWeightRecord.outTime)}</p>
                            </div>
                          </Collapse>
                        </div>

                        <div className="mt-3 mt-sm-0">
                          <Button
                            type="button"
                            className="btn btn-link p-1"
                            onClick={(e) => handleExpandWeightment(e, voucherIndex)}
                            style={{
                              fontSize: "1rem",
                              lineHeight: "1",
                              textShadow: "none",
                              boxShadow: "none",
                              backgroundColor: 'white',
                              border: 'none',
                            }}
                          >
                            {expandedWeightment.includes(voucherIndex) ? "-" : "+"}
                          </Button>
                          <span className="ms-2">Weightment</span>
                          <span className="text-danger ms-2">{voucher.gateWeightRecord.weightDisplay}</span>
                          <Collapse isOpen={expandedWeightment.includes(voucherIndex)}>
                            <div className="ms-4">
                              <p style={{ marginBottom: "0.25rem" }}>Gross Weight: {voucher.gateWeightRecord.grossWeight}</p>
                              <p style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}>Tare Weight: {voucher.gateWeightRecord.tareWeight}</p>
                            </div>
                          </Collapse>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))
            ) : (
              <p>No finished products data available.</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FinishedProducts;
