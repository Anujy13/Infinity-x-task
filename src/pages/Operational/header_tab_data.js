import React from 'react';
const isMobile = window.innerWidth <= 767.98;
const HeaderTabData = () => {
    return (
        <div className="card-header border-0" style={{ marginLeft: '1rem' }}>
            <div className="row align-items-center">
                <div className="col">
                    <ul role="tablist" className="nav-tabs-custom card-header-tabs border-bottom-0 nav" style={{marginTop:'0.5rem'}}>
                    <li className="nav-item" style={{ width: isMobile ? '30%' : '18%', }}>
  <a href="#" className="active fw-semibold nav-link">
    Opening
  </a>
</li>
<li className="nav-item" style={{ width: '18%', }}>
  <a href="#" className="fw-semibold nav-link">
    In
  </a>
</li>
<li className="nav-item" style={{ width: '18%',  }}>
  <a href="#" className="fw-semibold nav-link">
    Out
  </a>
</li>
<li className="nav-item" style={{ width: '18%',}}>
  <a href="#" className="fw-semibold nav-link">
    Closing
  </a>
</li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HeaderTabData;
