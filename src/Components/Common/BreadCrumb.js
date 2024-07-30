import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const BreadCrumb = ({ title, pageTitle, children, leftContent }) => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [is320, setIs320] = useState(window.innerWidth >= 320 && window.innerWidth <= 360);

    const updateIsMobile = useCallback(() => {
        setIsMobile(window.innerWidth <= 500);
        setIs320(window.innerWidth >= 320 && window.innerWidth <= 360);
    }, []);

    useEffect(() => {
        updateIsMobile();
        window.addEventListener('resize', updateIsMobile);

        return () => {
            window.removeEventListener('resize', updateIsMobile);
        };
    }, [updateIsMobile]);

    const breadcrumbTitleStyle = location.pathname === '/operational' ? { marginTop: isMobile?'-1.7rem':'-2.5rem', marginRight: isMobile ? '':'35rem' ,marginLeft: isMobile ? '5rem':''} : {};

    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between" style={{ paddingLeft: '4px', paddingRight: '4px', width: isMobile ? '115%' : '' }}>
                        {leftContent && location.pathname === '/operational' && (
                            <div className="mr-3">{leftContent}</div>
                        )}
                        <h4 className="mb-sm-0" style={breadcrumbTitleStyle}>{title}</h4>

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
