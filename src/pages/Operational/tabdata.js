import React, { useState, useEffect } from "react";
import { Collapse, Col, Container, Row, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FaMinus } from "react-icons/fa6";
import moment from "moment";

const TabData = ({ vouchers, selectedTab, selectedDates, onUpdateCounts,searchQuery  }) => {
  const [FromDate, ToDate] = Array.isArray(selectedDates) ? selectedDates : [null, null];
  const [expandedItems, setExpandedItems] = useState([]);
  const [expandedGateMap, setExpandedGateMap] = useState({});
  const [expandedWeighBridgeMap, setExpandedWeighBridgeMap] = useState({});
  const navigate = useNavigate();

  const handleExpandItem = (e, index) => {
    e.stopPropagation();
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const toggleGateDetails = (e, voucherIndex) => {
    e.stopPropagation();
    setExpandedGateMap(prevState => ({
      ...prevState,
      [voucherIndex]: !prevState[voucherIndex]
    }));
  };

  const toggleWeighBridgeDetails = (e, voucherIndex) => {
    e.stopPropagation();
    setExpandedWeighBridgeMap(prevState => ({
      ...prevState,
      [voucherIndex]: !prevState[voucherIndex]
    }));
  };

  const formatDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    return moment(dateTime).format("ddd, DD MMM YYYY - hh:mmA");
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });
  };

  const handleCardClick = (e, voucher) => {
    e.stopPropagation();
    setVoucherDetailsToLocalStorage(voucher);
    navigate("/voucher-num");
  };

  const setVoucherDetailsToLocalStorage = voucher => {
    localStorage.setItem("NetWeight", JSON.stringify(voucher.gateWeightRecord.netWeight));
    localStorage.setItem("NetGateTime", JSON.stringify(voucher.gateWeightRecord.netGateTime));
    localStorage.setItem("FirstTime", JSON.stringify(voucher.gateWeightRecord.inTime));
    localStorage.setItem("FinalTime", JSON.stringify(voucher.gateWeightRecord.outTime));
    localStorage.setItem("FirstWeight", JSON.stringify(voucher.gateWeightRecord.grossWeight));
    localStorage.setItem("FinalWeight", JSON.stringify(voucher.gateWeightRecord.tareWeight));
    localStorage.setItem("Items", JSON.stringify(voucher.items.map(item => item.item)));
    localStorage.setItem("Quantity", JSON.stringify(voucher.items.map(item => item.quantity)));
    localStorage.setItem("Unit", JSON.stringify(voucher.items.map(item => item.unit)));
    localStorage.setItem("Party", JSON.stringify(voucher.party));
    localStorage.setItem("VehicleNumber", JSON.stringify(voucher.vehicleNumber));
    localStorage.setItem("VoucherDate", JSON.stringify(voucher.voucherDate));
    localStorage.setItem("VoucherDetails", JSON.stringify(voucher));
  };

  const filterVouchersByTab = (vouchers, selectedTab) => {
    if (selectedTab === "All") {
      return vouchers; // Return all vouchers for the 'All' tab
    }
    return vouchers.filter(voucher => {
      const gateInTime = new Date(voucher.gateWeightRecord.inTime);
      const gateOutTime = new Date(voucher.gateWeightRecord.outTime);
      const fromDate = new Date(FromDate);
      const toDate = new Date(ToDate);

      if (selectedTab === "Opening") {
        return gateInTime < fromDate;
      } else if (selectedTab === "In") {
        return gateInTime > fromDate;
      } else if (selectedTab === "Out") {
        return gateOutTime < toDate;
      } else if (selectedTab === "Closing") {
        return gateInTime >= fromDate || gateOutTime > toDate;
      } else {
        return true;
      }
    });
  };

  const getCounts = (vouchers) => {
    return {
      All: vouchers.length,
      Opening: filterVouchersByTab(vouchers, "Opening").length,
      In: filterVouchersByTab(vouchers, "In").length,
      Out: filterVouchersByTab(vouchers, "Out").length,
      Closing: filterVouchersByTab(vouchers, "Closing").length
    };
  }

  const filterVouchersByQuery = (vouchers, query) => {
    if (!query) return vouchers;
    return vouchers.filter(voucher => {
      const lowerCaseQuery = query.toLowerCase();
      return voucher.party.toLowerCase().includes(lowerCaseQuery)
        || voucher.items.some(item => item.item.toLowerCase().includes(lowerCaseQuery))
        || voucher.voucherNumber.toLowerCase().includes(lowerCaseQuery)
        || voucher.vehicleNumber.toLowerCase().includes(lowerCaseQuery)
        || formatDate(voucher.voucherDate).toLowerCase().includes(lowerCaseQuery);
    });
  };

  const filteredVouchers = filterVouchersByTab(filterVouchersByQuery(vouchers, searchQuery), selectedTab);
  
  useEffect(() => {
    if (typeof onUpdateCounts === "function") {
      onUpdateCounts(getCounts(vouchers));
    }
  }, [vouchers, selectedTab, selectedDates]);

  return (
    <div className="page-content" style={{ paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', marginBottom: '0rem' }}>
      <Container fluid style={{ marginTop: '-5.5rem' }}>
        <Row className="mb-3">
          {filteredVouchers.length > 0 ? (
            filteredVouchers.map((voucher, voucherIndex) => (
              <div className="card-header p-0" key={voucherIndex} onClick={e => handleCardClick(e, voucher)}>
                <Col xl={12} lg={12}>
                  <Card className="product cursor-pointer ribbon-box border shadow-none mb-1 right" xl={12} lg={12} md={12} style={{ marginTop: '0rem', marginLeft: '0rem' }}>
                    <CardBody style={{ paddingTop: "0px" }}>
                      <div className="ribbon-two ribbon-two-info">
                        <span style={{ fontSize: voucher.status && voucher.status.length > 7 ? "7px" : "13px" }}>
                          {voucher.status}
                        </span>
                      </div>
                      <div>
                        <div className="card-header p-0">
                          <div className="d-flex align-items-center">
                            <h5 className="card-title flex-grow-1 mb-0 mt-0">
                              <span className="d-block d-md-none" style={{
                                fontSize: window.innerWidth >= 320 && window.innerWidth <= 350 ? "11px" : "13px",
                                marginTop: "10px",
                                marginBottom: "10px",
                                fontWeight: 'bold',
                                wordWrap: 'break-word'
                              }}>
                                {voucher.party}
                              </span>
                              <span className="d-none d-md-block">{voucher.party}</span>
                            </h5>
                            <div className="d-none d-md-block" style={{ paddingTop: "1rem", paddingRight: "2rem" }}>
                              {voucher.voucherNumber}
                              <div>{formatDate(voucher.voucherDate)}</div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 mb-4" style={{ marginTop: "-0.5rem" }}>
                            {voucher.vehicleNumber}
                            <div className="d-block d-md-none">
                              {voucher.voucherNumber}
                              <div>{formatDate(voucher.voucherDate)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive table-card">
                        <table className="table table-nowrap align-middle table-sm mb-0">
                          <thead className="table-light text-muted">
                            <tr>
                              <th scope="col">Product Details</th>
                              <th scope="col" className="text-end">Total Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex">
                                  <div className="flex-grow-1 ms-0">
                                    <h5 className="fs-15">
                                      {voucher.items[0].sequence}. {voucher.items[0].item}
                                    </h5>
                                    <p className="text-muted mb-0">
                                      {voucher.items[0].quantity} {voucher.items[0].unit} |
                                      {voucher.items[0].exclusiveRate.toLocaleString()}  {/* Comma separator */}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="fw-medium text-end">
                                {voucher.items[0].amount.toLocaleString()}  {/* Comma separator */}
                              </td>
                            </tr>
                            {!expandedItems.includes(voucherIndex) && voucher.items.length > 1 ? (
                              <tr
                                key="expand-btn"
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={e => handleExpandItem(e, voucherIndex)}
                              >
                                <td colSpan="2">+{voucher.items.length - 1} more items</td>
                              </tr>
                            ) : (
                              expandedItems.includes(voucherIndex) && voucher.items.length > 1 && (
                                <>
                                  {voucher.items.slice(1).map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                      <td>
                                        <div className="d-flex">
                                          <div className="flex-grow-1 ms-0">
                                            <h5 className="fs-15">
                                              {item.sequence}. {item.item}
                                            </h5>
                                            <p className="text-muted mb-0">
                                              {item.quantity} {item.unit} |
                                              {item.exclusiveRate.toLocaleString()}  {/* Comma separator */}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="fw-medium text-end">
                                        {item.amount.toLocaleString()}  {/* Comma separator */}
                                      </td>
                                    </tr>
                                  ))}
                                  <tr
                                    key="collapse-btn"
                                    style={{ cursor: "pointer", color: "red" }}
                                    onClick={e => handleExpandItem(e, voucherIndex)}
                                  >
                                    <td colSpan="2">Less items</td>
                                  </tr>
                                </>
                              )
                            )}
                            <tr className="border-top border-top-dashed">
                              <td colSpan="2" className="fw-medium p-0">
                                <table className="table table-borderless table-sm mb-0">
                                  <tbody>
                                    <tr>
                                      <td style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                                        <div className="d-flex align-items-center">
                                          <div
                                            className="flex-shrink-0 avatar-xs"
                                            style={{ width: "0.5rem", marginTop: "9px" }}
                                            onClick={e => toggleGateDetails(e, voucherIndex)}
                                          >
                                            <div className="avatar-title bg-success rounded-circle" style={{ width: "20px", height: "20px" }}>
                                              {expandedGateMap[voucherIndex] ? (
                                                <FaMinus />
                                              ) : (
                                                <i className="ri-add-line"></i>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex-grow-1 ms-3">
                                            <h6 className="fs-15 mb-0 fw-semibold">Gate</h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-end" style={{ paddingTop: "10px" }}>
                                        {voucher.gateWeightRecord.gateDisplay}
                                      </td>
                                    </tr>
                                    {expandedGateMap[voucherIndex] && (
                                      <tr>
                                        <td colSpan="2" className="accordion-body ms-2 ps-5 pt-0">
                                          <div>
                                            <h6 className="mb-2">In Time: {formatDateTime(voucher.gateWeightRecord.inTime)}</h6>
                                            <h6 className="mb-1">Out Time: {formatDateTime(voucher.gateWeightRecord.outTime)}</h6>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                    <tr>
                                      <td style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                                        <div className="d-flex align-items-center">
                                          <div
                                            className="flex-shrink-0 avatar-xs"
                                            style={{ width: "0.5rem", marginTop: "9px" }}
                                            onClick={e => toggleWeighBridgeDetails(e, voucherIndex)}
                                          >
                                            <div className="avatar-title bg-success rounded-circle" style={{ width: "20px", height: "20px" }}>
                                              {expandedWeighBridgeMap[voucherIndex] ? (
                                                <FaMinus />
                                              ) : (
                                                <i className="ri-add-line"></i>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex-grow-1 ms-3">
                                            <h6 className="fs-15 mb-0 fw-semibold">WeighBridge</h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-end" style={{ paddingTop: "10px" }}>
                                        {voucher.gateWeightRecord.weightDisplay}
                                      </td>
                                    </tr>
                                    {expandedWeighBridgeMap[voucherIndex] && (
                                      <tr>
                                        <td colSpan="2" className="accordion-body ms-2 ps-5 pt-0">
                                          <div>
                                            <h6 className="mb-2">
                                              Gross Weight: {voucher.gateWeightRecord.grossWeight} {voucher.items[0].unit}
                                            </h6>
                                            <h6 className="mb-1">
                                              Tare Weight: {voucher.gateWeightRecord.tareWeight} {voucher.items[0].unit}
                                            </h6>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            ))
          ) : (
            <p>No data available for the selected filters.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default TabData;