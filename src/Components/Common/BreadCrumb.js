import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Flatpickr from "react-flatpickr";

const BreadCrumb = ({ title, pageTitle }) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    {/* <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{title}</h4> */}

                        {/* <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="#">{pageTitle}</Link></li>
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div> */}

<div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">{title}</h4>
    <div class="flex-shrink-0">
                                        <div className="input-group">
                                        <div className="input-group-text bg-primary border-primary text-white"><i className="ri-calendar-2-line"></i></div>
                                            <Flatpickr className="form-control border-1 dash-filter-picker"options={{mode: "range",dateFormat: "d M, Y",defaultDate: ["01 Jan 2022", "31 Jan 2022"]}}/>
                                        </div>
    </div>
    </div>

                                    

                    {/* </div> */}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BreadCrumb;