// import React from 'react';
// import { MDBListGroup, MDBListGroupItem, MDBBadge } from 'mdb-react-ui-kit';

// export default function MessagesMenu() {
//   return (
//     <MDBListGroup style={{ minWidth: '22rem' }} light>
//       <MDBListGroupItem active aria-current='true' className='d-flex justify-content-between align-items-center'>
//         Name 1
//         <MDBBadge pill light>
//           14
//         </MDBBadge>
//       </MDBListGroupItem>

//       <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
//         Name 2
//         <MDBBadge pill dark>
//           2
//         </MDBBadge>
//       </MDBListGroupItem>

//       <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
//         Name 3
//         <MDBBadge pill dark>
//           1
//         </MDBBadge>
//       </MDBListGroupItem>
//     </MDBListGroup>
//   );
// }

import React from 'react';
import "./MessagesMenu.css";

const MessagesMenu = () => {
  return (
    <section style={{ backgroundColor: '#FFFFFF' }}>
      <div className="input-group mb-0 p-3" style={{ maxHeight: '100px' }}>
      <input
        type="search"
        className="form-control rounded form-control-lg w-100"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <span className="input-group-text border-0" id="search-addon">
        <i className="fas fa-search"></i>
      </span>
    </div>
      <div className="container p-0">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xl-12 mb-0 p-2 mb-md-0">
            <h5 className="font-weight-bold mb-0 text-center text-lg-start"></h5>
            <div className="card">
              <div className="card-body">
                <ul className="list-unstyled mb-0">

                  <li className="p-3" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #e0e0e0' }}>
                    <a href="#!" className="d-flex justify-content-between" style={{ textDecoration: 'none', color: '#000000' }}>
                      <div className="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar" className="rounded-circle d-flex align-self-center me-3 shadow-0-strong" width="50" />
                        <div className="pt-0">
                          <p className="fw-bold mb-0" style={{ textDecoration: 'none'  }}>John Doe</p>
                          <p className="small mb-1 p-2">That's great!</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <span className="badge bg-black float-end custom-badge px-2.5 p-1.5">1</span>
                      </div>
                    </a>
                  </li>

                  <li className="p-3" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #e0e0e0' }}>
                    <a href="#!" className="d-flex justify-content-between" style={{ textDecoration: 'none', color: '#000000' }}>
                      <div className="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar" className="rounded-circle d-flex align-self-center me-3 shadow-0-strong" width="50" />
                        <div className="pt-0">
                          <p className="fw-bold mb-0" style={{ textDecoration: 'none'  }}>John Doe</p>
                          <p className="small mb-1 p-2">That's great!</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <span className="badge bg-black float-end custom-badge px-2.5 p-1.5">1</span>
                      </div>
                    </a>
                  </li>

                  <li className="p-3" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #e0e0e0' }}>
                    <a href="#!" className="d-flex justify-content-between" style={{ textDecoration: 'none', color: '#000000' }}>
                      <div className="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar" className="rounded-circle d-flex align-self-center me-3 shadow-0-strong" width="50" />
                        <div className="pt-0">
                          <p className="fw-bold mb-0" style={{ textDecoration: 'none'  }}>John Doe</p>
                          <p className="small mb-1 p-2">That's great!</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <span className="badge bg-black float-end custom-badge px-2.5 p-1.5">1</span>
                      </div>
                    </a>
                  </li>

                  <li className="p-3" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #e0e0e0' }}>
                    <a href="#!" className="d-flex justify-content-between" style={{ textDecoration: 'none', color: '#000000' }}>
                      <div className="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar" className="rounded-circle d-flex align-self-center me-3 shadow-0-strong" width="50" />
                        <div className="pt-0">
                          <p className="fw-bold mb-0" style={{ textDecoration: 'none'  }}>John Doe</p>
                          <p className="small mb-1 p-2">That's great!</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <span className="badge bg-black float-end custom-badge px-2.5 p-1.5">1</span>
                      </div>
                    </a>
                  </li>

                  <li className="p-3" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #e0e0e0' }}>
                    <a href="#!" className="d-flex justify-content-between" style={{ textDecoration: 'none', color: '#000000' }}>
                      <div className="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar" className="rounded-circle d-flex align-self-center me-3 shadow-0-strong" width="50" />
                        <div className="pt-0">
                          <p className="fw-bold mb-0" style={{ textDecoration: 'none'  }}>John Doe</p>
                          <p className="small mb-1 p-2">That's great!</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <span className="badge bg-black float-end custom-badge px-2.5 p-1.5">1</span>
                      </div>
                    </a>
                  </li>

                  <li className="p-3" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #e0e0e0' }}>
                    <a href="#!" className="d-flex justify-content-between" style={{ textDecoration: 'none', color: '#000000' }}>
                      <div className="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar" className="rounded-circle d-flex align-self-center me-3 shadow-0-strong" width="50" />
                        <div className="pt-0">
                          <p className="fw-bold mb-0" style={{ textDecoration: 'none'  }}>John Doe</p>
                          <p className="small mb-1 p-2">That's great!</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <span className="badge bg-black float-end custom-badge px-2.5 p-1.5">1</span>
                      </div>
                    </a>
                  </li>

                  
                  {/* Add other list items here */}
                </ul>
              </div>
            </div>
          </div>

          {/* Continue with the rest of the code */}
        </div>
      </div>
    </section>
  );
}

export default MessagesMenu;
