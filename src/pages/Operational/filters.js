import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
    Container,
    Row,
    Input,
    Label,
    Col
} from 'reactstrap'; // Assuming you're using Reactstrap
import BreadCrumb from '../../Components/Common/BreadCrumb'; // Replace with correct path to BreadCrumb component
import Flatpickr from 'react-flatpickr'; // Assuming you're using Flatpickr
import Statistics from './statistics'; // Replace with correct path to Statistics component
import TabData from './tabdata'; // Replace with correct path to TabData component
import Header from './header';
import HeaderTabData from "./header_tab_data";
import { fetchFinishedProductsData } from "../../slices/thunks";

const Filters = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('statistics');
    const [filterOpen, setFilterOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen1, setIsOpen1] = useState(false); 
    const [isOpen2, setIsOpen2] = useState(false); 
    const [isOpen3, setIsOpen3] = useState(false); 
    const [isOpen4, setIsOpen4] = useState(false); 
    const [isAnyAccordionOpen, setIsAnyAccordionOpen] = useState(false);
    
    useEffect(() => {
        dispatch(fetchFinishedProductsData());
    }, [dispatch]);
    
    const toggleAccordion1 = () => {
        setIsOpen1(!isOpen1);
    };
    const toggleAccordion2 = () => {
        setIsOpen2(!isOpen2);
    };
    const toggleAccordion3 = () => {
        setIsOpen3(!isOpen3);
    };
    const toggleAccordion4 = () => {
        setIsOpen4(!isOpen4);
    };

    // Selecting data from Redux state using selectors
    const selectFinishedProductsState = (state) => state.FinishedProducts;
    const selectFinishedProductsData = createSelector(
        selectFinishedProductsState,
        (state) => ({
            user: state.user,
            loading: state.loading,
            error: state.error,
        })
    );
    
    const { user, loading, error } = useSelector(selectFinishedProductsData);

    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    const headerContent = (
        <Header/>
    );

    // Fetch PartyNames and filter out duplicates
    const PartyNames = JSON.parse(localStorage.getItem("PartyNames") || "[]");
    const uniquePartyNames = Array.from(new Set(PartyNames));

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
    };

    useEffect(() => {
        setIsAnyAccordionOpen(isOpen1 || isOpen2 || isOpen3 || isOpen4);
    }, [isOpen1, isOpen2, isOpen3, isOpen4]);

    
    
    return (
        <div>
            <BreadCrumb leftContent={headerContent}>
                {location.pathname !== '/operational' && headerContent}
                <div className="mt-3 mt-lg-0 d-flex justify-content-end">
                    <i
                        className="ri-filter-3-line"
                        style={{ marginTop: '0.3rem', marginRight: '1rem', fontSize: '1.5rem', cursor: 'pointer' }}
                        onClick={toggleFilter}
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
                                    <div className="input-group-text bg-primary border-primary text-white">
                                        <i className="ri-calendar-2-line"></i>
                                    </div>
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

            <Container>
    {activeTab === 'vouchers' && <HeaderTabData />}
    <Col xl={8}>
        {Array.isArray(user) ? (
            activeTab === 'statistics' ? (
                <Statistics user={user}/>
            ) : (
                user.map((voucher, voucherIndex) => (
                    <TabData key={voucherIndex} voucher={voucher} voucherIndex={voucherIndex} />
                ))
            )
        ) : (
            <p>No finished products data available.</p>
        )}
    </Col>
</Container>



            {/* Sidebar filter */}
            {filterOpen && (
                <div className={`sidebar-filter ${isAnyAccordionOpen ? 'open-height' : 'closed-height'}`}>
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
                <button className="accordion-button bg-transparent shadow-none" type="button" id="flush-headingBrands"  onClick={toggleAccordion1}>
                    <span className="text-muted text-uppercase fs-12 fw-medium">Party</span>
                    <span className="badge bg-success rounded-pill align-middle ms-1">{uniquePartyNames.length}</span>
                </button>
            </h2>
            <div toggler="#flush-headingBrands" className="collapse show">
                <div   className={`collapse ${isOpen1 ? 'show' : ''}`} id="flush-collapseBrands" aria-labelledby="flush-headingBrands">
                    <div className="accordion-body text-body pt-0">
                        <div className="search-box search-box-sm">
                            <input
                                type="text"
                                className="form-control bg-light border-0"
                                placeholder="Search Party..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                        <div className="d-flex flex-column gap-2 mt-3">
                            {uniquePartyNames.filter(party => party.toLowerCase().includes(searchQuery)).slice(0, 3).map((party, index) => (
                                <div className="form-check" key={index}>
                                    <Input className="form-check-input" type="checkbox" id={`partyName${index}`} />
                                    <Label className="form-check-label" for={`partyName${index}`}>{party}</Label>
                                </div>
                            ))}
                            {showMore && uniquePartyNames.filter(party => party.toLowerCase().includes(searchQuery)).slice(3).map((party, index) => (
                                <div className="form-check" key={index + 5}>
                                    <Input className="form-check-input" type="checkbox" id={`partyNameMore${index}`} />
                                    <Label className="form-check-label" for={`partyNameMore${index}`}>{party}</Label>
                                </div>
                            ))}
                            {uniquePartyNames.length > 3 && (
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                                        onClick={() => setShowMore(!showMore)}
                                    >
                                        {showMore ? 'Show Less' : `${uniquePartyNames.length - 3} More`}
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
                        <div className="accordion accordion-flush">
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button bg-transparent shadow-none" type="button" id="flush-headingBrands" onClick={toggleAccordion2}>
                    <span className="text-muted text-uppercase fs-12 fw-medium">Items</span>
                    <span className="badge bg-success rounded-pill align-middle ms-1">{uniquePartyNames.length}</span>
                </button>
            </h2>
            <div toggler="#flush-headingBrands" className="collapse show">
                <div id="flush-collapseBrands" className={`collapse ${isOpen2 ? 'show' : ''}`} aria-labelledby="flush-headingBrands">
                    <div className="accordion-body text-body pt-0">
                        <div className="search-box search-box-sm">
                            <input
                                type="text"
                                className="form-control bg-light border-0"
                                placeholder="Search Items..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                        <div className="d-flex flex-column gap-2 mt-3">
                            {uniquePartyNames.filter(party => party.toLowerCase().includes(searchQuery)).slice(0, 3).map((party, index) => (
                                <div className="form-check" key={index}>
                                    <Input className="form-check-input" type="checkbox" id={`partyName${index}`} />
                                    <Label className="form-check-label" for={`partyName${index}`}>{party}</Label>
                                </div>
                            ))}
                            {showMore && uniquePartyNames.filter(party => party.toLowerCase().includes(searchQuery)).slice(3).map((party, index) => (
                                <div className="form-check" key={index + 5}>
                                    <Input className="form-check-input" type="checkbox" id={`partyNameMore${index}`} />
                                    <Label className="form-check-label" for={`partyNameMore${index}`}>{party}</Label>
                                </div>
                            ))}
                            {uniquePartyNames.length > 3 && (
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                                        onClick={() => setShowMore(!showMore)}
                                    >
                                        {showMore ? 'Show Less' : `${uniquePartyNames.length - 3} More`}
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
    <div className="accordion accordion-flush">
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button bg-transparent shadow-none" type="button" id="flush-headingBrands" onClick={toggleAccordion3}>
                    <span className="text-muted text-uppercase fs-12 fw-medium">Agent</span>
                    <span className="badge bg-success rounded-pill align-middle ms-1">{uniquePartyNames.length}</span>
                </button>
            </h2>
            <div toggler="#flush-headingBrands" className="collapse show">
                <div id="flush-collapseBrands" className={`collapse ${isOpen3 ? 'show' : ''}`} aria-labelledby="flush-headingBrands">
                    <div className="accordion-body text-body pt-0">
                        <div className="search-box search-box-sm">
                            <input
                                type="text"
                                className="form-control bg-light border-0"
                                placeholder="Search Agents..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                        <div className="d-flex flex-column gap-2 mt-3">
                            {uniquePartyNames.filter(party => party.toLowerCase().includes(searchQuery)).slice(0, 3).map((party, index) => (
                                <div className="form-check" key={index}>
                                    <Input className="form-check-input" type="checkbox" id={`partyName${index}`} />
                                    <Label className="form-check-label" for={`partyName${index}`}>{party}</Label>
                                </div>
                            ))}
                            {showMore && uniquePartyNames.filter(party => party.toLowerCase().includes(searchQuery)).slice(3).map((party, index) => (
                                <div className="form-check" key={index + 5}>
                                    <Input className="form-check-input" type="checkbox" id={`partyNameMore${index}`} />
                                    <Label className="form-check-label" for={`partyNameMore${index}`}>{party}</Label>
                                </div>
                            ))}
                            {uniquePartyNames.length > 3 && (
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                                        onClick={() => setShowMore(!showMore)}
                                    >
                                        {showMore ? 'Show Less' : `${uniquePartyNames.length - 3} More`}
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
    <div className="accordion accordion-flush">
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button bg-transparent shadow-none" type="button" id="flush-headingBrands" onClick={toggleAccordion4}>
                    <span className="text-muted text-uppercase fs-12 fw-medium">Groups</span>
                    <span className="badge bg-success rounded-pill align-middle ms-1">{uniquePartyNames.length}</span>
                </button>
            </h2>
            <div toggler="#flush-headingBrands" className="collapse show">
                <div id="flush-collapseBrands" className={`collapse ${isOpen4 ? 'show' : ''}`} aria-labelledby="flush-headingBrands">
                    <div className="accordion-body text-body pt-0">
                        <div className="search-box search-box-sm">
                            <input
                                type="text"
                                className="form-control bg-light border-0"
                                placeholder="Search Groups..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                        <div className="d-flex flex-column gap-2 mt-3">
                            {uniquePartyNames.filter(party => party.toLowerCase().includes(searchQuery)).slice(0, 3).map((party, index) => (
                                <div className="form-check" key={index}>
                                    <Input className="form-check-input" type="checkbox" id={`partyName${index}`} />
                                    <Label className="form-check-label" for={`partyName${index}`}>{party}</Label>
                                </div>
                            ))}
                            {showMore && uniquePartyNames.filter(party => party.toLowerCase().includes(searchQuery)).slice(3).map((party, index) => (
                                <div className="form-check" key={index + 5}>
                                    <Input className="form-check-input" type="checkbox" id={`partyNameMore${index}`} />
                                    <Label className="form-check-label" for={`partyNameMore${index}`}>{party}</Label>
                                </div>
                            ))}
                            {uniquePartyNames.length > 3 && (
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                                        onClick={() => setShowMore(!showMore)}
                                    >
                                        {showMore ? 'Show Less' : `${uniquePartyNames.length - 3} More`}
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
                .sidebar-filter.open-height {
                    height: 70%;
                }
                .sidebar-filter.closed-height {
                    height: 45%;
                }
            `}</style>
        </div>
    );
};

export default Filters;
