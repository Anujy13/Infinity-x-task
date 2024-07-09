import React, { useEffect,useState } from "react";
import {Card,CardBody,Col,Container,Row,CardHeader,Collapse} from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { productDetails } from "../../common/data/ecommerce";
import EcommerceOrderProduct from "./EcommerceOrderProduct";
import avatar3 from "../../assets/images/users/avatar-3.jpg";

import {fetchVoucherNumData } from '../../slices/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from "reselect";
import moment from "moment/moment";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import img4 from "../../assets/images/small/img-4.jpg";
import img5 from "../../assets/images/small/img-5.jpg";
import img6 from "../../assets/images/small/img-6.jpg";
import VoucherImages from "./Images";

const EcommerceOrderDetail = (props) => {
  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(true);
  const [col3, setcol3] = useState(true);
  const [accordionState, setAccordionState] = useState([]);

  function togglecol1() {
    setcol1(!col1);
  }

  function togglecol2() {
    setcol2(!col2);
  }

  function togglecol3() {
    setcol3(!col3);
  }

  const toggleAccordion = (index) => {
    setAccordionState(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.VoucherNum;


  const userprofileData = createSelector(
    selectLayoutState,
    (state) => ({ user: state.user, loading: state.loading, error: state.error })
  );

  const { user,loading, error } = useSelector(userprofileData);

  useEffect(() => {
    dispatch(fetchVoucherNumData());
  }, [dispatch]);


  if (loading) {
    return <div>Loading...</div>;
  }

  // Debugging: log user2 object


document.title ="Voucher Details | Infinity X";
  return (
    <div className="page-content">
      <Container fluid>        
        <BreadCrumb title={user.voucherName} pageTitle={user.voucherNumber} />

        <Row>
          <Col xl={9}>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">{user.voucherNumber}</h5>
                  <div className="flex-shrink-0">
                    <Link
                      to="/apps-invoices-details"
                      className="btn btn-success btn-sm"
                    >
                      <i className="ri-download-2-fill align-middle me-1"></i>{" "}
                      Download
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive table-card">
                  <table className="table table-nowrap align-middle table-sm mb-0">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col">Product Details</th>
                        <th scope="col" className="text-end">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                   
        <EcommerceOrderProduct  />
      
                      <tr className="border-top border-top-dashed">
                        <td colSpan="2" className="fw-medium p-0">
                          <table className="table table-borderless table-sm mb-0">
                            <tbody>
                            {user.financial.map((financial, index) => (
                <tr key={index}>
                                <td>{financial.particulars} :</td>
                                <td className="text-end">{financial.exclusiveAmount}</td>
                              </tr>
                                ))}
                              {/* <tr>
                                <td>
                                  Discount{" "}
                                  <span className="text-muted">(VELZON15)</span>{" "}
                                  : :
                                </td>
                                <td className="text-end">-$53.99</td>
                              </tr>
                              <tr>
                                <td>Shipping Charge :</td>
                                <td className="text-end">$65.00</td>
                              </tr>
                              <tr>
                                <td>Estimated Tax :</td>
                                <td className="text-end">$44.99</td>
                              </tr>
                              <tr className="border-top border-top-dashed">
                                <th scope="row">Total (USD) :</th>
                                <th className="text-end">$415.96</th>
                              </tr> */}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="d-sm-flex align-items-center">
                <h5 className="card-title flex-grow-1 mb-0">
                    <i className="ri-links-line align-middle me-1 text-muted"></i> Voucher Tracking
                  </h5>
                  <div className="flex-shrink-0 mt-2 mt-sm-0">
                  </div>
                </div>
              </CardHeader>
              <CardBody>
  <div className="profile-timeline">
    <div className="accordion accordion-flush" id="accordionFlushExample">
      {user.trackingDetails.map((tracking, index) => (
        <div className="accordion-item border-0" key={index} onClick={() => toggleAccordion(index)}>
          <div className="accordion-header" id={`heading${index}`}>
            <Link to="#" className={classnames(
              "accordion-button",
              "p-2",
              "shadow-none",
              { collapsed: !accordionState[index] }
            )}>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 avatar-xs">
                  <div className="avatar-title bg-success rounded-circle">
                    <i className="ri-shopping-bag-line"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="fs-15 mb-0 fw-semibold">
                    {tracking.particulars} -{" "}
                    <span className="fw-normal">
                      {tracking.trackingDate}
                    </span>
                  </h6>
                </div>
              </div>
            </Link>
          </div>
          <Collapse
            id={`collapse${index}`}
            className="accordion-collapse"
            isOpen={accordionState[index]}
          >
            <div className="accordion-body ms-2 ps-5 pt-0">
              <h6 className="mb-1">An order has been placed.</h6>
              <p className="text-muted">
                Wed, 15 Dec 2021 - 05:34PM
              </p>

              <h6 className="mb-1">
                Seller has processed your order.
              </h6>
              <p className="text-muted mb-0">
                Thu, 16 Dec 2021 - 5:48AM
              </p>
            </div>
          </Collapse>
        </div>
      ))}

                    {/* <div className="accordion-item border-0" onClick={togglecol2}>
                      <div className="accordion-header" id="headingTwo">
                        <Link to="#"
                          className={classnames(
                            "accordion-button",
                            "p-2",
                            "shadow-none",
                            { collapsed: !col2 }
                          )}
                          href="#collapseTwo"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="mdi mdi-gift-outline"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-1 fw-semibold">
                                Packed -{" "}
                                <span className="fw-normal">
                                  Thu, 16 Dec 2021
                                </span>
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <Collapse
                        id="collapseTwo"
                        className="accordion-collapse"
                        isOpen={col2}
                      >
                        <div className="accordion-body ms-2 ps-5 pt-0">
                          <h6 className="mb-1">
                            Your Item has been picked up by courier patner
                          </h6>
                          <p className="text-muted mb-0">
                            Fri, 17 Dec 2021 - 9:45AM
                          </p>
                        </div>
                      </Collapse>
                    </div>
                    <div className="accordion-item border-0" onClick={togglecol3}>
                      <div className="accordion-header" id="headingThree">
                        <Link to="#"
                          className={classnames(
                            "accordion-button",
                            "p-2",
                            "shadow-none",
                            { collapsed: !col3 }
                          )}
                          href="#collapseThree"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="ri-truck-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-1 fw-semibold">
                                Shipping -{" "}
                                <span className="fw-normal">
                                  Thu, 16 Dec 2021
                                </span>
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <Collapse
                        id="collapseThree"
                        className="accordion-collapse"
                        isOpen={col3}
                      >
                        <div className="accordion-body ms-2 ps-5 pt-0">
                          <h6 className="fs-14">
                            RQK Logistics - MFDS1400457854
                          </h6>
                          <h6 className="mb-1">Your item has been shipped.</h6>
                          <p className="text-muted mb-0">
                            Sat, 18 Dec 2021 - 4.54PM
                          </p>
                        </div>
                      </Collapse>
                    </div> */}
                    <div className="accordion-item border-0">
                      <div className="accordion-header" id="headingFour">
                        <Link to="#"
                          className="accordion-button p-2 shadow-none"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-light text-success rounded-circle">
                                <i className="ri-takeaway-fill"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-14 mb-0 fw-semibold">
                                Out For Delivery
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="accordion-item border-0">
                      <div className="accordion-header" id="headingFive">
                        <Link
                          className="accordion-button p-2 shadow-none"
                          to="#"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-light text-success rounded-circle">
                                <i className="mdi mdi-package-variant"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-14 mb-0 fw-semibold">
                                Delivered
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={3}>
            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i> Logistics Details
                  </h5>
                  <div className="flex-shrink-0">
                    <Link to="#" className="badge bg-primary-subtle text-primary fs-11">
                      Track Order
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/uetqnvvg.json"
                    trigger="loop"
                    colors="primary:#405189,secondary:#0ab39c"
                    style={{ width: "80px", height: "80px" }}
                  ></lord-icon>
                  <h5 className="fs-16 mt-2">{user.logistics.vehicleNumber}</h5>
                  <p className="text-muted mb-0">{user.logistics.transporterName}</p>
                  <p className="text-muted mb-0">LR : <b>{user.logistics.lrNumber}</b> dt. {moment(user.logistics.lrDate).format("DD-MM-yyyy")}</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                  <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                    Voucher Details
                  </h5>
                  <div className="flex-shrink-0">                    
                      Gate In Pending
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                
              <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Entity:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <p className="text-muted mb-0"><b>{user.entity} | {user.division} | {user.center}</b></p>                  
                  </div>
                </div>
                <br />
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Voucher   :</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <p className="text-muted mb-0"><b>{user.voucherNumber}</b> | {moment(user.voucherDate).format("DD-MM-yyyy")}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Purchase:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <p className="text-muted mb-0"><b>{user.purchaseNumber}</b> | {moment(user.purchaseDate).format("DD-MM-yyyy")}</p>                  
                  </div>
                </div>

                <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Narration:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <p className="text-muted mb-0">{user.narration}</p>                  
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Billing Address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack fs-13 mb-0">
                  <li className="fw-medium fs-14">{user.billing.name}</li>
                  <li>{user.billing.address}</li>
                  <li>{user.billing.cityPinState}</li>
                  <li>PAN: {user.billing.pan}</li>
                  <li><b>GSTIN: {user.billing.gstin}</b></li>
                  <li>POS: {user.billing.placeOfSupply}</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Shipping Address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack fs-13 mb-0">
                <li className="fw-medium fs-14">{user.shipping.name}</li>
                  <li>{user.shipping.address}</li>
                  <li>{user.shipping.cityPinState}</li>
                  <li>PAN: {user.shipping.pan}</li>
                  <li><b>GSTIN: {user.shipping.gstin}</b></li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className=" ri-flag-2-fill align-bottom me-1 text-muted"></i>{" "}
                  Order Details
                </h5>
              </CardHeader>
              <CardBody>
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Transactions:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">#VLZ124561278124</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Payment Method:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">Debit Card</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Card Holder Name:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">Joseph Parker</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Card Number:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">xxxx xxxx xxxx 2456</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Total Amount:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">$415.96</h6>
                  </div>
                </div>
              </CardBody>
            </Card>

        <Card >
          <CardHeader>
            <h5 className="card-title mb-0">
              <i className="ri-flag-2-fill align-bottom me-1 text-muted"></i>{" "}
              Camera Captures
            </h5>
          </CardHeader>
          <CardBody>
            <VoucherImages/>
          </CardBody>
        </Card>


            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className=" ri-flag-2-fill align-bottom me-1 text-muted"></i>{" "}
                  Time Taken
                </h5>
              </CardHeader>
              <CardBody>
                    <div className="mb-2 text-center" >
                        <lord-icon src="https://cdn.lordicon.com/kbtmbyzy.json" trigger="loop"
                            colors="primary:#405189,secondary:#02a8b5" style={{ width: "90px", height: "90px" }}>
                        </lord-icon>
                    </div>
                    <h3 className="mb-1 text-center">9 hrs 13 min</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceOrderDetail;