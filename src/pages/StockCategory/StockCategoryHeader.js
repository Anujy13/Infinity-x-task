import React from 'react';
import { Alert ,Card, CardBody, Col, Row} from 'reactstrap';




const StockCategoryHeader = () => {


    return (
            <React.Fragment>
            

            <Card className="bg-primary text-white text-center p-3">
                <blockquote className="card-blockquote m-0">
                    <h3 className='text-white'>Stock Category</h3>
                </blockquote>
            </Card>
            
        </React.Fragment>
        
    )

}

export default StockCategoryHeader;

