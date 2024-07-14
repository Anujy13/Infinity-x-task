import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const BreadCrumb = ({ title, pageTitle, children, leftContent }) => {
    const location = useLocation();

    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        {leftContent && location.pathname === '/operational' && (
                            <div className="mr-3">{leftContent}</div>
                        )}
                        <h4 className="mb-sm-0">{title}</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                {pageTitle && (
                                    <li className="breadcrumb-item">
                                        <Link to="#">{pageTitle}</Link>
                                    </li>
                                )}
                                {title && location.pathname !== '/operational' && (
                                    <li className="breadcrumb-item active">{title}</li>
                                )}
                            </ol>
                        </div>

                        {children && <div className="ml-3">{children}</div>}
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BreadCrumb;
