import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Col, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import Statistics from './statistics';
import TabData from './tabdata';
import Flatpickr from "react-flatpickr";

const Operational = (props) => {
    const [activeTab, setActiveTab] = useState('statistics');
    const location = useLocation();
    const [showMore, setShowMore] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({
        inward: true,
        outward: true,
        rawMaterials: true,
        finishedProducts: true,
        stores: true,
        others: true
    });
    const [filterOpen, setFilterOpen] = useState(false); // State to control sidebar filter

    const toggleFilter = () => setFilterOpen(!filterOpen); // Toggle function for sidebar filter
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setSelectedOptions(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };

    const renderContent = () => {
        const selectedKeys = Object.keys(selectedOptions).filter(key => selectedOptions[key]);
        if (selectedKeys.length === 6) {
            return "All";
        }
        return selectedKeys.map(key => key.charAt(0).toUpperCase() + key.slice(1)).join(", ");
    };

    const headerContent = (
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
                                    <Input className="form-check-input" type="checkbox" id="inward" checked={selectedOptions.inward} onChange={handleCheckboxChange} onClick={(e) => e.stopPropagation()} />
                                    <Label className="form-check-label" for="inward">
                                        Inward
                                    </Label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" id="outward" checked={selectedOptions.outward} onChange={handleCheckboxChange} onClick={(e) => e.stopPropagation()} />
                                    <Label className="form-check-label" for="outward">
                                        Outward
                                    </Label>
                                </div>
                                <div className="dropdown-divider" />
                                <div className="form-check mb-2">
                                    <Input className="form-check-input" type="checkbox" id="rawMaterials" checked={selectedOptions.rawMaterials} onChange={handleCheckboxChange} onClick={(e) => e.stopPropagation()} />
                                    <Label className="form-check-label" for="rawMaterials">
                                        Raw Materials
                                    </Label>
                                </div>
                                <div className="form-check mb-2">
                                    <Input className="form-check-input" type="checkbox" id="finishedProducts" checked={selectedOptions.finishedProducts} onChange={handleCheckboxChange} onClick={(e) => e.stopPropagation()} />
                                    <Label className="form-check-label" for="finishedProducts">
                                        Finished Products
                                    </Label>
                                </div>
                                <div className="form-check mb-2">
                                    <Input className="form-check-input" type="checkbox" id="stores" checked={selectedOptions.stores} onChange={handleCheckboxChange} onClick={(e) => e.stopPropagation()} />
                                    <Label className="form-check-label" for="stores">
                                        Stores
                                    </Label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" id="others" checked={selectedOptions.others} onChange={handleCheckboxChange} onClick={(e) => e.stopPropagation()} />
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

    // Fetch PartyNames and filter out duplicates
    const PartyNames = JSON.parse(localStorage.getItem("PartyNames") || "[]");
    const uniquePartyNames = Array.from(new Set(PartyNames));

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb leftContent={headerContent}>
                        {location.pathname !== '/operational' && headerContent}
                        <div className="mt-3 mt-lg-0 d-flex justify-content-end">
                            <i className="ri-filter-3-line" 
                               style={{marginTop:'0.3rem',marginRight:'1rem',fontSize:'1.5rem'}}
                               onClick={toggleFilter} // Toggle sidebar filter on icon click
                            ></i>
                            <form action="#">
                                <Row className="g-3 mb-0 align-items-center">
                                    <div className="col-sm-auto">
                                        <div className="input-group">
                                            <Flatpickr
                                                className="form-control border-0 dash-filter-picker shadow"
                                                options={{
                                                    mode: "range",
                                                    dateFormat: "d M, Y",
                                                    defaultDate: ["01 Jan 2022", "31 Jan 2022"]
                                                }}
                                            />
                                            <div className="input-group-text bg-primary border-primary text-white"><i className="ri-calendar-2-line"></i></div>
                                        </div>
                                    </div>
                                </Row>
                            </form>
                        </div>
                    </BreadCrumb>
                    <div className="card-header border-0" style={{ marginLeft: '1rem' }}>
                        <div className="row align-items-center">
                            <div className="col">
                                <ul role="tablist" className="nav-tabs-custom card-header-tabs border-bottom-0 nav">
                                    <li className="nav-item flex-grow-1">
                                        <a
                                            href="#"
                                            className={`fw-semibold nav-link ${activeTab === 'statistics' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('statistics')}
                                            style={{ width: '100%', textAlign: 'center' }}
                                        >
                                            Statistics <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">12</span>
                                        </a>
                                    </li>
                                    <li className="nav-item flex-grow-1">
                                        <a
                                            href="#"
                                            className={`fw-semibold nav-link ${activeTab === 'vouchers' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('vouchers')}
                                            style={{ width: '100%', textAlign: 'center' }}
                                        >
                                            Vouchers <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">5</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {activeTab === 'statistics' && <Statistics />}
                    {activeTab === 'vouchers' && <TabData />}
                </Container>
            </div>

            {/* Sidebar filter */}
            {filterOpen && (
                <div className="sidebar-filter">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <h5 className="fs-16">Filters</h5>
                                </div>
                                <div className="flex-shrink-0">
                                    <a className="text-decoration-underline" href="/apps-ecommerce-products">Clear All</a>
                                </div>
                            </div>
                        </div>
                        <div className="accordion accordion-flush">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button bg-transparent shadow-none" type="button" id="flush-headingBrands">
                                        <span className="text-muted text-uppercase fs-12 fw-medium">Party</span>
                                        <span className="badge bg-success rounded-pill align-middle ms-1">{uniquePartyNames.length}</span>
                                    </button>
                                </h2>
                                <div toggler="#flush-headingBrands" className="collapse show">
                                    <div id="flush-collapseBrands" className="accordion-collapse collapse show" aria-labelledby="flush-headingBrands">
                                        <div className="accordion-body text-body pt-0">
                                            <div className="search-box search-box-sm">
                                                <input type="text" className="form-control bg-light border-0" placeholder="Search Brands..." />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                            <div className="d-flex flex-column gap-2 mt-3">
                                                {uniquePartyNames.slice(0, 5).map((party, index) => (
                                                    <div className="form-check" key={index}>
                                                        <Input className="form-check-input" type="checkbox" id={`partyName${index}`} />
                                                        <Label className="form-check-label" for={`partyName${index}`}>{party}</Label>
                                                    </div>
                                                ))}
                                                {showMore && uniquePartyNames.slice(5).map((party, index) => (
                                                    <div className="form-check" key={index + 5}>
                                                        <Input className="form-check-input" type="checkbox" id={`partyNameMore${index}`} />
                                                        <Label className="form-check-label" for={`partyNameMore${index}`}>{party}</Label>
                                                    </div>
                                                ))}
                                                {uniquePartyNames.length > 5 && (
                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                                                            onClick={() => setShowMore(!showMore)}
                                                        >
                                                            {showMore ? 'Show Less' : `${uniquePartyNames.length - 5} More`}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Other accordion items */}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .sidebar-filter {
                    position: fixed;
                    top: 18%; /* Adjust this value based on your header height */
                    right: 10%;
                    width: 300px; /* Adjust width as needed */
                    height: 70%;
                    background-color: white;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    z-index: 1050;
                    padding: 1rem;
                    overflow-y: auto;
                }
            `}</style>
        </React.Fragment>
    );
};

export default Operational;
