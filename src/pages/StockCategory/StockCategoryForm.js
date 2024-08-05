import React from 'react';
import { Alert ,Card, Input, CardBody, Label, Col, Row} from 'reactstrap';
import PrismCode from '../../Components/Common/Prism';





    const StockCategoryForm  = () => {
        
        
        
        
        return (
            <React.Fragment>
                <div>
                   <Row className="g-3">
                    <Col lg={20} md={20}>
                      
                       <div>
                       <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">Stock Category</span>
                        <Input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                       </div>

                       <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">Parent Category</span>
                        <Input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                       </div>

                       <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">Group Code</span>
                        <Input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                       </div>

                       <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">Use Group Code For</span>
                        <Input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                       </div>

                       <div className="form-check mb-2">
                         <Input className="form-check-input" type="checkbox" name="flexCheckBoxDefault" id="flexCheckBoxDefault1" />
                         <Label className="form-check-label" for="flexCheckBoxDefault1">
                           <strong>Active</strong>
                         </Label>
                       </div>
                       </div>
                       
                      </Col>
            
                    </Row>
                </div>
                
            </React.Fragment>
        )
        }


    

export default StockCategoryForm;


