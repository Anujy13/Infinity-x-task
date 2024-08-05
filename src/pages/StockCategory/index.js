import React from 'react';
import { Container } from 'reactstrap';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import StockCategoryForm from './StockCategoryForm';
import StockCategoryHeader from './StockCategoryHeader';

const StockCategory = () => {


    document.title="Infinity X | ERP";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Stock Category " pageTitle="Infinity X" />
                    <StockCategoryHeader />
                    <StockCategoryForm />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default StockCategory;
