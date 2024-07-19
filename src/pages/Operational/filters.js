import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Container, Row, Input, Label, Col } from 'reactstrap'; // Assuming you're using Reactstrap
import BreadCrumb from '../../Components/Common/BreadCrumb'; // Replace with correct path to BreadCrumb component
import Flatpickr from 'react-flatpickr'; // Assuming you're using Flatpickr
import Statistics from './statistics'; // Replace with correct path to Statistics component
import TabData from './tabdata'; // Replace with correct path to TabData component
import Header from './header';
import HeaderTabData from "./header_tab_data";
import { fetchFinishedProductsData} from "../../slices/thunks"; 
import {setDateRange } from "../../slices/finishedProducts/reducer";

import { format, parse } from 'date-fns';

const Filters = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('statistics');
    const [filterOpen, setFilterOpen] = useState(false);
    const [showMore1, setShowMore1] = useState(false);
    const [showMore2, setShowMore2] = useState(false);
    const [showMore3, setShowMore3] = useState(false);
    const [showMore4, setShowMore4] = useState(false);
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery3, setSearchQuery3] = useState('');
    const [searchQuery4, setSearchQuery4] = useState('');
    const [isOpen1, setIsOpen1] = useState(false); 
    const [isOpen2, setIsOpen2] = useState(false); 
    const [isOpen3, setIsOpen3] = useState(false); 
    const [isOpen4, setIsOpen4] = useState(false); 
    const [isAnyAccordionOpen, setIsAnyAccordionOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState([null, null]);



    const [isLargeOrMedium, setIsLargeOrMedium] = useState(window.innerWidth > 767);
    const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth <= 560);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeOrMedium(window.innerWidth > 767);
            setIsSmallDevice(window.innerWidth <= 560);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDropdown = () => {
        setFilterOpen(!filterOpen); // Toggle the state between true and false
      };
      
    useEffect(() => {
        // Fetch finished products data on initial mount
        dispatch(fetchFinishedProductsData());
        
        // Fetch finished products data if selectedDates have both start and end date
        if (selectedDates[0] && selectedDates[1]) {
            dispatch(setDateRange(selectedDates));
            dispatch(fetchFinishedProductsData());
        }
    }, [selectedDates, dispatch]);

    const handleDateChange = (newDates) => {
        const convertedDates = newDates.map(date => format(date, 'yyyy-MM-dd'));
        setSelectedDates(convertedDates);
    };

    const toggleAccordion1 = () => setIsOpen1(!isOpen1);
    const toggleAccordion2 = () => setIsOpen2(!isOpen2);
    const toggleAccordion3 = () => setIsOpen3(!isOpen3);
    const toggleAccordion4 = () => setIsOpen4(!isOpen4);

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

    const toggleFilter = () => setFilterOpen(!filterOpen);

    const headerContent = (
        <Header/>
    );

    // Fetch PartyNames and filter out duplicates
   const uniquePartyNames = Array.isArray(user) ? Array.from(new Set(user.map(voucher => voucher.party))) : [];
    // Fetch ItemsNames and filter out duplicates
   const allItems = Array.isArray(user) ? user.flatMap(voucher => voucher.items) : [];
   const uniqueItems = Array.isArray(allItems) ? Array.from(new Map(allItems.map(item => [item.item, item])).values()) : [];
   // Fetch BrokerNames and filter out duplicates
   const uniqueBrokerNames = Array.isArray(user) ? Array.from(new Set(user.map(voucher => voucher.broker))) : [];
   // Fetch stockGroupNames and filter out duplicates
   const uniqueGroups = Array.isArray(allItems) ? Array.from(new Map(allItems.map(item => [item.stockGroup, item])).values()) : [];

   const [checkedState1, setCheckedState1] = useState(Array(uniquePartyNames.length).fill(false));
   const [checkedState2, setCheckedState2] = useState(Array(uniqueItems.length).fill(false));
   const [checkedState3, setCheckedState3] = useState(Array(uniqueBrokerNames.length).fill(false));
   const [checkedState4, setCheckedState4] = useState(Array(uniqueGroups.length).fill(false));

    const handleSearchChange1 = (event) => {
        setSearchQuery1(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
    };
    const handleSearchChange2 = (event) => {
      setSearchQuery2(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };
  const handleSearchChange3 = (event) => {
    setSearchQuery3(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
};
const handleSearchChange4 = (event) => {
  setSearchQuery4(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
};

const handleCheckboxChange1 = (index) => {
  const updatedCheckedState = [...checkedState1];
  updatedCheckedState[index] = !updatedCheckedState[index];
  setCheckedState1(updatedCheckedState);
};
const handleCheckboxChange2 = (itemIndex) => {
  const updatedCheckedState = [...checkedState2];
  updatedCheckedState[itemIndex] = !updatedCheckedState[itemIndex];
  setCheckedState2(updatedCheckedState);
};
const handleCheckboxChange3 = (index) => {
  const updatedCheckedState = [...checkedState3];
  updatedCheckedState[index] = !updatedCheckedState[index];
  setCheckedState3(updatedCheckedState);
};
const handleCheckboxChange4 = (itemIndex) => {
  const updatedCheckedState = [...checkedState4];
  updatedCheckedState[itemIndex] = !updatedCheckedState[itemIndex];
  setCheckedState4(updatedCheckedState);
};

const clearAll = () => {
  setCheckedState1(Array(uniquePartyNames.length).fill(false));
  setCheckedState2(Array(uniqueItems.length).fill(false));
  setCheckedState3(Array(uniqueBrokerNames.length).fill(false));
  setCheckedState4(Array(uniqueGroups.length).fill(false));
};

    useEffect(() => {
        setIsAnyAccordionOpen(isOpen1 || isOpen2 || isOpen3 || isOpen4);
    }, [isOpen1, isOpen2, isOpen3, isOpen4]);

    // Initial default dates in "d M, Y" format
    useEffect(() => {
        const defaultDates = ["04 Apr 2024", "04 Apr 2025"];
        const convertedDates = defaultDates.map(date => {
            const parsedDate = parse(date, 'dd MMM yyyy', new Date());
            return format(parsedDate, 'yyyy-MM-dd');
        });
        setSelectedDates(convertedDates);
    }, []);

    const filteredItems = uniqueItems.filter((item) =>
      item.item.toLowerCase().includes(searchQuery2.toLowerCase())
    );

    const filteredGroups = uniqueGroups.filter((item) =>
      item.stockGroup.toLowerCase().includes(searchQuery4.toLowerCase())
    );

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
                          <div className="input-group" style={{ flexWrap: "nowrap" }}>
                              <Flatpickr
                                  className="form-control border-0 dash-filter-picker shadow"
                                  options={{
                                      mode: "range",
                                      dateFormat: "d M, Y",
                                      defaultDate: ["01 Apr 2024", "01 Apr 2025"]
                                  }}
                                  onChange={(dates) => handleDateChange(dates)}
                              />
                              <div className="input-group-text bg-primary border-primary text-white">
                                  <i className="ri-calendar-2-line"></i>
                              </div>
                          </div>
                      </div>
                  </Row>
              </form>
          </div>
          {!isLargeOrMedium && (
              <div className="card-header border-0" style={{marginTop:'1rem'}}>
                  <div className="row align-items-center" style={{ justifyContent: 'space-between' }}>
                      <div className="col">
                          <ul role="tablist" className="nav-tabs-custom card-header-tabs border-bottom-0 nav" style={{ width: '100%' }}>
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
          )}
      </BreadCrumb>

      {!isSmallDevice && (
          <div className="card-header border-0">
              <div className="row align-items-center" style={{ justifyContent: 'space-between' }}>
                  <div className="col">
                      <ul role="tablist" className="nav-tabs-custom card-header-tabs border-bottom-0 nav" style={{ width: '100%' }}>
                          <li className="nav-item flex-grow-1">
                              <a
                                  href="#"
                                  className={`fw-semibold nav-link ${activeTab === 'statistics' ? 'active' : ''}`}
                                  onClick={() => setActiveTab('statistics')}
                                  style={{ width: '107%', textAlign: 'center', backgroundColor: '#fff', marginLeft: '-2rem', marginTop: '-1rem' }}
                              >
                                  Statistics <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">12</span>
                              </a>
                          </li>
                          <li className="nav-item flex-grow-1">
                              <a
                                  href="#"
                                  className={`fw-semibold nav-link ${activeTab === 'vouchers' ? 'active' : ''}`}
                                  onClick={() => setActiveTab('vouchers')}
                                  style={{ width: '115%', textAlign: 'center', backgroundColor: '#fff', marginLeft: '-2rem', marginTop: '-1rem' }}
                              >
                                  Vouchers <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">5</span>
                              </a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      )}


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
                        <div className="d-flex justify-content-end p-2" style={{marginTop:'-1.5rem'}}>
          <i className="ri-close-line" style={{ cursor: 'pointer' }} onClick={toggleDropdown}></i>
        </div>
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <h5 className="fs-16">Filters</h5>
                                </div>
                                <div className="flex-shrink-0">
                                    <a className="text-decoration-underline" style={{ cursor: 'pointer' }} onClick={clearAll}>Clear All</a>
                                </div>
                            </div>
                        </div>
                        <div className="accordion accordion-flush">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-transparent shadow-none"
              type="button"
              id="flush-headingBrands"
              onClick={toggleAccordion1}
            >
              <span className="text-muted text-uppercase fs-12 fw-medium">Party</span>
              <span className="badge bg-success rounded-pill align-middle ms-1">{uniquePartyNames.length}</span>
            </button>
          </h2>
          <div className={`collapse ${isOpen1 ? 'show' : ''}`} id="flush-collapseBrands" aria-labelledby="flush-headingBrands">
            <div className="accordion-body text-body pt-0">
              <div className="search-box search-box-sm">
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search Party..."
                  value={searchQuery1}
                  onChange={handleSearchChange1}
                />
                <i className="ri-search-line search-icon"></i>
              </div>
              <div className="d-flex flex-column gap-2 mt-3">
                {uniquePartyNames
                  .filter(party => party.toLowerCase().includes(searchQuery1.toLowerCase()))
                  .slice(0, 3)
                  .map((party, index) => (
                    <div className="form-check" key={index}>
                      <Input className="form-check-input" type="checkbox" id={`partyName${index}`} 
                       checked={checkedState1[index]}
                       onChange={() => handleCheckboxChange1(index)}
                       />
                      <Label className="form-check-label" htmlFor={`partyName${index}`}>
                        {party}
                      </Label>
                    </div>
                  ))}
                {showMore1 &&
                  uniquePartyNames
                    .filter(party => party.toLowerCase().includes(searchQuery1.toLowerCase()))
                    .slice(3)
                    .map((party, index) => (
                      <div className="form-check" key={index + 3}>
                        <Input className="form-check-input" type="checkbox" id={`partyNameMore${index}`}
                         checked={checkedState1[index]}
                         onChange={() => handleCheckboxChange1(index)}
                          />
                        <Label className="form-check-label" htmlFor={`partyNameMore${index}`}>
                          {party}
                        </Label>
                      </div>
                    ))}
                {uniquePartyNames.length > 3 && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                      onClick={() => setShowMore1(!showMore1)}
                    >
                      {showMore1 ? 'Show Less' : `${uniquePartyNames.length - 3} More`}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Other accordion items */}
      </div>
      <div className="accordion accordion-flush">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-transparent shadow-none"
            type="button"
            id="flush-headingBrands"
            onClick={toggleAccordion2}
          >
            <span className="text-muted text-uppercase fs-12 fw-medium">Items</span>
            <span className="badge bg-success rounded-pill align-middle ms-1">{filteredItems.length}</span>
          </button>
        </h2>
        <div className={`collapse ${isOpen2 ? 'show' : ''}`} id="flush-collapseBrands" aria-labelledby="flush-headingBrands">
          <div className="accordion-body text-body pt-0">
            <div className="search-box search-box-sm">
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Search Items..."
                value={searchQuery2}
                onChange={handleSearchChange2}
              />
              <i className="ri-search-line search-icon"></i>
            </div>
            <div className="d-flex flex-column gap-2 mt-3">
              {filteredItems.slice(0, 3).map((item, itemIndex) => (
                <div className="form-check" key={itemIndex}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`itemsName${itemIndex}`}
                    checked={checkedState2[itemIndex]}
                    onChange={() => handleCheckboxChange2(itemIndex)}
                    value={item.item}
                    // Handle checkbox logic here if needed
                  />
                  <label className="form-check-label" htmlFor={`itemsName${itemIndex}`}>
                    {item.item}
                  </label>
                </div>
              ))}
              {showMore2 && filteredItems.slice(3).map((item, itemIndex) => (
                <div className="form-check" key={itemIndex + 3}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`itemsNameMore${itemIndex}`}
                    checked={checkedState2[itemIndex]}
                    onChange={() => handleCheckboxChange2(itemIndex)}
                    value={item.item}
                    // Handle checkbox logic here if needed
                  />
                  <label className="form-check-label" htmlFor={`itemsNameMore${itemIndex}`}>
                    {item.item}
                  </label>
                </div>
              ))}
              {filteredItems.length > 3 && (
                <div>
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                    onClick={() => setShowMore2(!showMore2)}
                  >
                    {showMore2 ? 'Show Less' : `${filteredItems.length - 3} More`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Other accordion items */}
    </div>
      <div className="accordion accordion-flush">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-transparent shadow-none"
              type="button"
              id="flush-headingBrands"
              onClick={toggleAccordion3}
            >
              <span className="text-muted text-uppercase fs-12 fw-medium">Agents</span>
              <span className="badge bg-success rounded-pill align-middle ms-1">{ uniqueBrokerNames.length}</span>
            </button>
          </h2>
          <div className={`collapse ${isOpen3 ? 'show' : ''}`} id="flush-collapseBrands" aria-labelledby="flush-headingBrands">
            <div className="accordion-body text-body pt-0">
              <div className="search-box search-box-sm">
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search Agents..."
                  value={searchQuery3}
                  onChange={handleSearchChange3}
                />
                <i className="ri-search-line search-icon"></i>
              </div>
              <div className="d-flex flex-column gap-2 mt-3">
                { uniqueBrokerNames
                  .filter(broker => broker.toLowerCase().includes(searchQuery3.toLowerCase()))
                  .slice(0, 3)
                  .map((broker, index) => (
                    <div className="form-check" key={index}>
                      <Input className="form-check-input" type="checkbox" id={`partyName${index}`} 
                        checked={checkedState3[index]}
                        onChange={() => handleCheckboxChange3(index)}
                        />
                      <Label className="form-check-label" htmlFor={`partyName${index}`}>
                        {broker}
                      </Label>
                    </div>
                  ))}
                {showMore3 &&
                  uniqueBrokerNames
                    .filter(broker => broker.toLowerCase().includes(searchQuery3.toLowerCase()))
                    .slice(3)
                    .map((broker, index) => (
                      <div className="form-check" key={index + 3}>
                        <Input className="form-check-input" type="checkbox" id={`partyNameMore${index}`}
                          checked={checkedState3[index]}
                          onChange={() => handleCheckboxChange3(index)}
                           />
                        <Label className="form-check-label" htmlFor={`partyNameMore${index}`}>
                          {broker}
                        </Label>
                      </div>
                    ))}
                {uniqueBrokerNames.length > 3 && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                      onClick={() => setShowMore3(!showMore3)}
                    >
                      {showMore3 ? 'Show Less' : `${uniqueBrokerNames.length - 3} More`}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Other accordion items */}
      </div>
      <div className="accordion accordion-flush">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-transparent shadow-none"
            type="button"
            id="flush-headingBrands"
            onClick={toggleAccordion4}
          >
            <span className="text-muted text-uppercase fs-12 fw-medium">Groups</span>
            <span className="badge bg-success rounded-pill align-middle ms-1">{filteredGroups.length}</span>
          </button>
        </h2>
        <div className={`collapse ${isOpen4 ? 'show' : ''}`} id="flush-collapseBrands" aria-labelledby="flush-headingBrands">
          <div className="accordion-body text-body pt-0">
            <div className="search-box search-box-sm">
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Search Items..."
                value={searchQuery4}
                onChange={handleSearchChange4}
              />
              <i className="ri-search-line search-icon"></i>
            </div>
            <div className="d-flex flex-column gap-2 mt-3">
              {filteredGroups.slice(0, 3).map((item, itemIndex) => (
                <div className="form-check" key={itemIndex}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`itemsName${itemIndex}`}
                    checked={checkedState4[itemIndex]}
                    onChange={() => handleCheckboxChange4(itemIndex)}
                    value={item.stockGroup}
                    // Handle checkbox logic here if needed
                  />
                  <label className="form-check-label" htmlFor={`itemsName${itemIndex}`}>
                    {item.stockGroup}
                  </label>
                </div>
              ))}
              {showMore4 && filteredGroups.slice(3).map((item, itemIndex) => (
                <div className="form-check" key={itemIndex + 3}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`itemsNameMore${itemIndex}`}
                    checked={checkedState4[itemIndex]}
                    onChange={() => handleCheckboxChange4(itemIndex)}
                    value={item.stockGroup}
                    // Handle checkbox logic here if needed
                  />
                  <label className="form-check-label" htmlFor={`itemsNameMore${itemIndex}`}>
                    {item.stockGroup}
                  </label>
                </div>
              ))}
              {filteredGroups.length > 3 && (
                <div>
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                    onClick={() => setShowMore4(!showMore4)}
                  >
                    {showMore4 ? 'Show Less' : `${filteredGroups.length - 3} More`}
                  </button>
                </div>
              )}
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
                    top: 21%; /* Adjust this value based on your header height */
                    right: 1%;
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
                    height: 50%;
                }
            `}</style>
        </div>
    );
};

export default Filters;
