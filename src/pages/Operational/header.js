import React, { useState } from 'react';
import {
    ButtonGroup,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Col,
    Input,
    Label
} from 'reactstrap'; // Assuming you're using Reactstrap

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const [selectedOptions, setSelectedOptions] = useState({
        inward: false,
        outward: false,
        rawMaterials: false,
        finishedProducts: false,
        stores: false,
        others: false
    });

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setSelectedOptions({ ...selectedOptions, [id]: checked });
    };

    const renderContent = () => {
        const selectedKeys = Object.keys(selectedOptions).filter(key => selectedOptions[key]);
        if (selectedKeys.length === 6) {
            return "All";
        }
        return selectedKeys.map(key => key.charAt(0).toUpperCase() + key.slice(1)).join(", ");
    };


    return (
        <ButtonGroup>
            <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle tag="button" className="btn btn-primary">
                    {renderContent()} <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                    <div className="d-flex justify-content-end p-2">
                        <i className="ri-close-line" style={{ cursor: 'pointer' }} onClick={toggleDropdown}></i>
                    </div>
                    <DropdownItem>
                        <Col>
                            <div>
                                <div className="form-check mb-2">
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="inward"
                                        checked={selectedOptions.inward}
                                        onChange={handleCheckboxChange}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <Label className="form-check-label" for="inward">
                                        Inward
                                    </Label>
                                </div>
                                <div className="form-check">
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="outward"
                                        checked={selectedOptions.outward}
                                        onChange={handleCheckboxChange}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <Label className="form-check-label" for="outward">
                                        Outward
                                    </Label>
                                </div>
                                <div className="dropdown-divider"style={{ borderTop: '1px solid rgba(0, 0, 0, 0.5)', margin: '0.5rem 0' }}/>
                                <div className="form-check mb-2">
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="rawMaterials"
                                        checked={selectedOptions.rawMaterials}
                                        onChange={handleCheckboxChange}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <Label className="form-check-label" for="rawMaterials">
                                        Raw Materials
                                    </Label>
                                </div>
                                <div className="form-check mb-2">
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="finishedProducts"
                                        checked={selectedOptions.finishedProducts}
                                        onChange={handleCheckboxChange}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <Label className="form-check-label" for="finishedProducts">
                                        Finished Products
                                    </Label>
                                </div>
                                <div className="form-check mb-2">
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="stores"
                                        checked={selectedOptions.stores}
                                        onChange={handleCheckboxChange}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <Label className="form-check-label" for="stores">
                                        Stores
                                    </Label>
                                </div>
                                <div className="form-check">
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="others"
                                        checked={selectedOptions.others}
                                        onChange={handleCheckboxChange}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <Label className="form-check-label" for="others">
                                        Others
                                    </Label>
                                </div>
                            </div>
                        </Col>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </ButtonGroup>
    );
};

export default Header;
