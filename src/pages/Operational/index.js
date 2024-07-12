import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import Statistics from './statistics';
import TabData from './tabdata';

const Operational = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Operational" pageTitle="Infinity X" />
                    <Row style={{marginTop:'-5rem'}}>
                        <Col>
                            <Statistics />
                        </Col>
                        <Col>
                            <TabData />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Operational;
