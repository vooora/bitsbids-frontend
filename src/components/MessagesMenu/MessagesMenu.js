import React from "react";
import "./MessagesMenu.css";

const MessagesMenu = () => {
  return (
    <div className="container p-0">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xl-12 mb-0 mb-md-0">
          <h5 className="font-weight-bold mb-0 text-center text-lg-start"></h5>
          <div
            className="card p-0"
            style={{ border: "none", height: "calc(100vh - 6vh)" }}
          >
            <div
              className="card-head d-flex justify-content-center align-items-center"
              style={{ borderBottom: "1px solid rgb(205, 220, 223)" }}
            >
              <p className="mb-3 pt-1 mt-3 ">
                <b className="" style={{ fontSize: "1.5rem" }}>
                  Messages
                </b>
              </p>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li
                  className="p-3"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <a
                    href="#!"
                    className="d-flex justify-content-between"
                    style={{ textDecoration: "none", color: "#000000" }}
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-0-strong"
                        width="50"
                      />
                      <div className="pt-0">
                        <p
                          className="fw-bold mb-0"
                          style={{ textDecoration: "none" }}
                        >
                          John Doe
                        </p>
                        <p className="small mb-1 p-2">That's great!</p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <span className="badge bg-black float-end custom-badge px-2.5 p-1.5">
                        1
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesMenu;
