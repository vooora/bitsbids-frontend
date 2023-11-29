import React from "react";
import "./ChatBox.css";

const ChatBox = () => {
  return (
    <div className="container p-0">
      <div className="row d-flex justify-content-center">
        <div
          className="col-md-12 col-lg-12 col-xl-12 p-0"
          style={{ height: "calc(100vh - 6vh)" }}
        >
          <div
            className="card"
            id="chat1"
            style={{
              borderRadius: "0px",
              backgroundColor: "#FFFFFF",
              height: "100%",
            }}
          >
            <div
              className="card-header d-flex justify-content-between align-items-center p-0 bg-#CDDCDF text-#CDDCDF border-bottom-0"
              style={{
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
              }}
            >
              <i className="fas fa-angle-left"></i>
              <p
                className="mb-0 p-4 fw-bold"
                style={{
                  color: "#000000",
                  backgroundColor: "#CDDCDF",
                  width: "100%",
                  height: "100%",
                }}
              >
                abcd-anonym
              </p>
              <i className="fas fa-times"></i>
            </div>
            <div className="card-body d-flex align-items-end">
              <div className="d-flex flex-column mb-4"></div>

              <div
                className="input-group mb-0 p-3"
                style={{ maxHeight: "100px" }}
              >
                <input
                  type="text"
                  className="form-control rounded form-control-lg w-100"
                  placeholder="Type something"
                  aria-label="Type something"
                  aria-describedby="Type something-addon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
