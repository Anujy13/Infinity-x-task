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

  // Effect to log user data and specific fields when user changes
  useEffect(() => {
    console.log("user:", user);
    if (user) {
      console.log("user items:", user.itemStatus); // Ensure to log the correct field
    }
  }, [user]);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return moment(dateTime).format('ddd, DD MMM YYYY - hh:mmA');
  };

  // Utility function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  };

  // Utility function to get Gate status based on voucher data
  const getGateStatus = (voucher) => {
    const minDate = new Date('0001-01-01T00:00:00');
    const inTime = new Date(voucher["voucherNum.GateVoucher.VehicleGateWeightDetails.GateInDateTime"]);
    const outTime = new Date(voucher["voucherNum.GateVoucher.VehicleGateWeightDetails.GateOutDateTime"]);

    if (inTime > minDate && outTime > minDate) {
      return `Total Time : ${voucher["voucherNum.GateVoucher.VehicleGateWeightDetails.NetGateTime"]}`;
    } else if (inTime > minDate) {
      return "Gate-In Done";
    } else {
      return "Gate-In Pending";
    }
  };

  // Utility function to get Bridge status based on voucher data
  const getBridgeStatus = (voucher) => {
    const minDate = new Date('0001-01-01T00:00:00');
    const GrossTime = new Date(voucher["voucherNum.WeighmentVoucher.VehicleGateWeightDetails.GrossWeightDateTime"]);
    const TareTime = new Date(voucher["voucherNum.WeighmentVoucher.VehicleGateWeightDetails.TareWeightDateTime"]);

    if (GrossTime > minDate && TareTime > minDate) {
      return `Net Time @ ${voucher["weightDetails.NetWeightMTS"]} MTS | ${voucher["voucherNum.WeighmentVoucher.VehicleGateWeightDetails.NetWeightTime"]}`;
    } else if (GrossTime > minDate) {
      return `Gross Time @ ${voucher["weightDetails.GrossWeightMTS"]} MTS | ${voucher["weightDetails.Username"]}`;
    } else {
      return "W/B Pending";
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Security Gate/Finished Products" pageTitle="Infinity X" />
        <Row className="mb-3">
          <Col xl={8}>
            {Array.isArray(user) ? (
              user.map((voucher, voucherIndex) => (
                <Card key={voucherIndex} className="product cursor-pointer" onClick={() => navigate('/voucher-num')}>
                  <CardBody>
                    <Row className="gy-3">
                      <Col sm={8}>
                        <h5 className="fs-14 text-truncate text-wrap w-100">
                          <span className="text-body">
                            {voucher["voucherNum.Account.Account"]}
                          </span>
                        </h5>
                        <ul className="list-inline text-muted mb-1 mb-md-3">
                          <li className="list-inline-item">
                            <span className="fw-medium">
                              {voucher["voucherNum.Transport.VehicleNumber"]}
                            </span>
                          </li>
                        </ul>
                      </Col>
                      <Col sm={4} className="text-lg-end mb-1.5 mt-sm-0">
                        <p className="text-muted mb-1"></p>
                        <h5 className="fs-14 mt-md-3 mt-sm-0">
                          <span className="product-price">
                            {voucher["voucherNum.VoucherNumber"]} | {formatDate(voucher["voucherNum.GateVoucher.VoucherDate"])}
                          </span>
                        </h5>
                      </Col>
                    </Row>

                    <Row className="gy-3">
                      <Col sm={12}>
                        <div className="d-flex flex-row">
                          <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-1 mb-sm-0">
                            <span className="text-body">
                              {voucher["item.Item"]}
                            </span>
                          </h5>
                          <ul className="list-inline text-muted mb-0 d-flex">
                            <li className="list-inline-item me-2">
                              <span className="fw-medium">
                                {voucher["quantity"]} MTS
                              </span>
                            </li>
                            <li className="list-inline-item">
                              <span className="fw-medium">
                                {voucher["exclusiveRate"]}
                              </span>
                            </li>
                          </ul>
                        </div>

                        {/* Display additional items count */}
                        {!expandedItems.includes(voucherIndex) ? (
                          <div
                            style={{ marginLeft: "1rem", cursor: "pointer", color: 'red' }}
                            onClick={(e) => handleExpandItem(e, voucherIndex)}
                          >
                            +{voucher["item.Item"].length - 1} more items
                          </div>
                        ) : (
                          <Collapse isOpen={expandedItems.includes(voucherIndex)} className="mt-2">
                            {/* Display additional details here */}
                            <div className="d-flex flex-row">
                              <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-1 mb-sm-0">
                                <span className="text-body">
                                  {voucher["item.Item"]}
                                </span>
                              </h5>
                              <ul className="list-inline text-muted mb-0 d-flex">
                                <li className="list-inline-item">
                                  <span className="fw-medium">
                                    {voucher["quantity"]} MTS
                                  </span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="fw-medium">
                                    {voucher["exclusiveRate"]}
                                  </span>
                                </li>
                              </ul>
                              <div className="position-relative ms-auto">
                              </div>
                            </div>
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
                              boxShadow : "none",
                              backgroundColor : 'white',
                              border:'none',
                            }}
                          >
                            {expandedGate.includes(voucherIndex) ? "-" : "+"}
                          </Button>
                          <span className="ms-2">Gate</span>
                          <span className="text-danger ms-2">{getGateStatus(voucher)}</span>
                          <Collapse isOpen={expandedGate.includes(voucherIndex)}>
                            <div className="ms-4">
                              <p style={{ marginBottom: "0.25rem" }}>In-Time : {formatDateTime(voucher["voucherNum.GateVoucher.VehicleGateWeightDetails.GateInDateTime"])}</p>
                              <p style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}>Out-Time: {formatDateTime(voucher["voucherNum.GateVoucher.VehicleGateWeightDetails.GateOutDateTime"])}</p>
                            </div>
                          </Collapse>
                        </div>

                        <div className="mt-1 mt-sm-1">
                          <Button
                            type="button"
                            className="btn btn-link p-1"
                            onClick={(e) => handleExpandWeightment(e, voucherIndex)}
                            style={{
                              fontSize: "1rem",
                              lineHeight: "1",
                              textShadow: "none",
                              boxShadow : "none",
                              backgroundColor : 'white',
                              border:'none',
                            }}
                          >
                            {expandedWeightment.includes(voucherIndex) ? "-" : "+"}
                          </Button>
                          <span className="ms-2">WeighBridge</span>
                          <span className="text-danger ms-2">{getBridgeStatus(voucher)}</span>
                          <Collapse isOpen={expandedWeightment.includes(voucherIndex)}>
                            <div className="ms-4">
                              <p style={{ marginBottom: "0.25rem" }}>Gross Wt : {formatDateTime(voucher["voucherNum.WeighmentVoucher.VehicleGateWeightDetails.GrossWeightDateTime"])}</p>
                              <p style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}>Tare Wt:{formatDateTime(voucher["voucherNum.WeighmentVoucher.VehicleGateWeightDetails.TareWeightDateTime"])}</p>
                            </div>
                          </Collapse>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div>No data available</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FinishedProducts;